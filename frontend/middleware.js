import { NextResponse } from "next/server";
import { applicationUrls } from "@/constants/application-urls";
import { SESSION_COOKIE_NAME } from "@/constants/application-constants";
import defineAbilityFor from "@/authorization/defineAbility";
import { userRoles } from "@/constants/user-roles";

export default async function middleware(req) {
  const session = req.cookies.get(SESSION_COOKIE_NAME)?.value || "";
  // Redirect to the login page if session is not found
  if (!session) {
    const absoluteUrl = new URL(applicationUrls.login.root, req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  const { pathname } = req.nextUrl;

  // Don't allow the user to acces upgrade path if he is already subscribed
  // if (pathname === applicationUrls.dashboard.upgrade) {
  //   const sessionData = JSON.parse(session);
  //   const subscriptionPlan = sessionData?.subscription?.plan || "";
  //   if (subscriptionPlan !== ("free" || null)) {
  //     const absoluteUrl = new URL(
  //       applicationUrls.notFound.root,
  //       req.nextUrl.origin
  //     );
  //     return NextResponse.redirect(absoluteUrl.toString());
  //   }
  // }

  if (pathname.startsWith("/dashboard/manage/")) {
    const sessionData = JSON.parse(session);
    const role = sessionData?.role || "";
    // const subscription = sessionData?.subscription || "";
    // const role = req.cookies.get(USER_ROLE_COOKIE_NAME)?.value || "";
    // Check the role of the user, if the user is an admin or moderator
    // If the role is not admin or moderator return a notFound page
    if (role !== userRoles.ADMIN && role !== userRoles.MODERATOR) {
      const absoluteUrl = new URL(
        applicationUrls.notFound.root,
        req.nextUrl.origin
      );
      return NextResponse.redirect(absoluteUrl.toString());
    }
    const ability = defineAbilityFor(role, "_");
    // If he is either of them check if he has access to that route
    // If he don't have access to that path return a notFound page

    // Administrator Path
    if (
      pathname?.startsWith(applicationUrls.dashboard.manage.administrator.list)
    ) {
      if (!ability.can("read", "ManageAdministrator")) {
        const absoluteUrl = new URL(
          applicationUrls.notFound.root,
          req.nextUrl.origin
        );
        return NextResponse.redirect(absoluteUrl.toString());
      }
    }

    // ManageBiolink Path
    if (pathname?.startsWith(applicationUrls.dashboard.manage.biolinks.list)) {
      if (!ability.can("read", "ManageBiolink")) {
        const absoluteUrl = new URL(
          applicationUrls.notFound.root,
          req.nextUrl.origin
        );
        return NextResponse.redirect(absoluteUrl.toString());
      }
    }

    // ManageUser Path
    if (pathname?.startsWith(applicationUrls.dashboard.manage.users.list)) {
      if (!ability.can("read", "ManageUser")) {
        const absoluteUrl = new URL(
          applicationUrls.notFound.root,
          req.nextUrl.origin
        );
        return NextResponse.redirect(absoluteUrl.toString());
      }
    }

    // ManageSubscribers Path
    if (
      pathname?.startsWith(applicationUrls.dashboard.manage.subscription.list)
    ) {
      if (!ability.can("read", "ManageSubscribers")) {
        const absoluteUrl = new URL(
          applicationUrls.notFound.root,
          req.nextUrl.origin
        );
        return NextResponse.redirect(absoluteUrl.toString());
      }
    }

    // ManageSupport Path
    if (pathname?.startsWith(applicationUrls.dashboard.manage.support.list)) {
      if (!ability.can("read", "ManageSupport")) {
        const absoluteUrl = new URL(
          applicationUrls.notFound.root,
          req.nextUrl.origin
        );
        return NextResponse.redirect(absoluteUrl.toString());
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  // The `matcher` key is required to define the routes where the middleware should run
  matcher: ["/dashboard/:path*", "/dashboard"],
};
