import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isGatedRoute } from "@/lib/gated-routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The previous carve-out here waved through "/dashboard/autopilot", a route
  // that does not exist — the dashboard lives at /autopilot, which the matcher
  // never covered. So the rule protected nothing and the real page was open.

  // Admin routes protection
  const isAdminRoute = pathname.startsWith("/admin");
  const isGatedTool = isGatedRoute(pathname);
  const isProtectedRoute =
    isAdminRoute || pathname.startsWith("/dashboard") || isGatedTool;

  // Fail CLOSED, not open. Without Supabase credentials we cannot authenticate
  // anyone, so protected routes must be refused rather than waved through.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (isProtectedRoute) {
      return new NextResponse(
        "Authentication is not configured on this deployment. " +
          "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable sign-in.",
        { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } }
      );
    }
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll:    () => request.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Not logged in → redirect to login, remembering where they were headed so
  // the login page can send them back rather than dumping them on /dashboard.
  if (!user && isProtectedRoute) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  // Logged in → fetch role and redirect correctly
  if (user && (pathname === "/dashboard" || isAdminRoute)) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role ?? "new_user";

    // Admin authorization check
    if (isAdminRoute && role !== "admin") {
      // If they try to access admin but aren't admin, redirect to normal dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname === "/dashboard") {
      if (role === "admin")          return NextResponse.redirect(new URL("/admin", request.url));
      if (role === "new_user")       return NextResponse.redirect(new URL("/dashboard/onboarding", request.url));
      if (role === "agency_client")  return NextResponse.redirect(new URL("/dashboard/agency",     request.url));
      if (role === "pro_user")       return NextResponse.redirect(new URL("/dashboard/pro",        request.url));
    }
  }

  // Already logged in → don't show login/register
  if (user && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  // A route not listed here never reaches the middleware at all, whatever the
  // logic above says. That is why /autopilot was open: it was protected in
  // spirit and absent from this list.
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    // No public tool routes are listed. GATED_TOOLS in lib/gated-routes is
    // empty, and a route the middleware has no decision to make about should
    // not cost a Supabase round trip on every request. When the SaaS work
    // reintroduces gating, a path has to be added in BOTH places — this list
    // and GATED_TOOLS — or the check silently never runs.
  ],
};