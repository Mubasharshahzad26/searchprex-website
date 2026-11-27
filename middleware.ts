import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isGatedRoute } from "@/lib/gated-routes";
import { MASTER_ADMIN_COOKIE, isMasterAdminCookie } from "@/lib/admin-master";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin & internal-tool routes protection.
  //
  // Both /admin, /content-admin, and internal automation/generation consoles
  // (/autopilot, /bulk-generation, /content-generator) require authentication
  // and admin privileges. `isCmsRoute` ensures all checks below stay aligned.
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isContentAdminRoute = pathname.startsWith("/content-admin");
  const isInternalToolRoute =
    pathname === "/autopilot" ||
    pathname.startsWith("/autopilot/") ||
    pathname === "/bulk-generation" ||
    pathname.startsWith("/bulk-generation/") ||
    pathname === "/content-generator" ||
    pathname.startsWith("/content-generator/");
  const isCmsRoute = isAdminRoute || isContentAdminRoute || isInternalToolRoute;
  const isGatedTool = isGatedRoute(pathname);

  const isProtectedRoute =
    isCmsRoute || pathname.startsWith("/dashboard") || isGatedTool;

  // Master admin session, set by the login page (see lib/admin-master.ts).
  // Cookie only: there is deliberately no ?admin_key= query login any more.
  if (await isMasterAdminCookie(request.cookies.get(MASTER_ADMIN_COOKIE)?.value)) {
    return NextResponse.next({ request });
  }

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

  // Not logged in -> redirect to login, remembering where they were headed so
  // the login page can send them back rather than dumping them on /dashboard.
  if (!user && isProtectedRoute) {
    const login = new URL(isCmsRoute ? "/admin-login" : "/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  // Logged in -> fetch role and redirect correctly
  if (user && (pathname === "/dashboard" || isCmsRoute)) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role ?? "new_user";

    // Admin authorization check
    if (isCmsRoute && role !== "admin") {
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

  // Already logged in -> don't show login/register
  if (user && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  // Every protected surface must appear in BOTH the logic above and this
  // matcher list, or middleware never runs for that path.
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/content-admin/:path*",
    "/autopilot/:path*",
    "/bulk-generation/:path*",
    "/content-generator/:path*",
    "/login",
    "/admin-login",
    "/register",
  ],
};
