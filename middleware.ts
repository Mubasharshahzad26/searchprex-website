import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Autopilot dashboard = public internal tool (no auth required)
  if (pathname.startsWith("/dashboard/autopilot")) {
    return NextResponse.next();
  }

  // Admin routes protection
  const isAdminRoute = pathname.startsWith("/admin");
  const isProtectedRoute = isAdminRoute || pathname.startsWith("/dashboard");

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

  // Not logged in → redirect to login
  if (!user && (pathname.startsWith("/dashboard") || isAdminRoute)) {
    return NextResponse.redirect(new URL("/login", request.url));
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
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};