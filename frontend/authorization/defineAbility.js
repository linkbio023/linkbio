import { defineAbility } from "@casl/ability";

export default function defineAbilityFor(userRole, userSubscription) {
  return defineAbility((can, cannot) => {
    if (userRole) {
      switch (userRole) {
        case "admin":
          // Admin can do everything
          can("manage", "all");
          break;
        case "moderator":
          // Modeator has the same access as admin but with some restrictions on Administrator part
          can("read", ["AdminDashboard", "Dashboard"]);
          can("manage", [
            "Biolink",
            "Support",
            "Analytics",
            "Subscribers",
            "Settings",
            "Billing",
            "ManageBiolink",
            "ManageUser",
            "ManageSubscribers",
            "ManageSupport",
          ]);
          can("update", [
            "Biolink",
            "Support",
            "Analytics",
            "Subscribers",
            "Settings",
            "Billing",
          ]);
          break;
        default:
          // Normal User can create Biolinks, Qrcodes, Media, view Analytics, view Settings, view Billing
          can("read", [
            "UserDashboard",
            "Dashboard",
            "Biolink",
            "Qrcode",
            "Media",
            "Analytics",
            "Settings",
            "Billing",
          ]);
          break;
      }
    }
    // Subscription based access control for features
    if (userSubscription) {
      switch (userSubscription) {
        case "pro":
          // Pro user can create 5 biolinks
          can("create", ["Biolink"]);
          can("create", ["SupportRequest"]);
          cannot("create", ["Biolink"], { count: 5 });
          cannot("read", ["UpgradeMessage", "UpgradePage"]);
          break;
        case "premium":
          // premium user can create 10 biolinks
          can("create", ["Biolink"]);
          can("create", ["SupportRequest"]);
          cannot("create", ["Biolink"], { count: 10 });
          cannot("read", ["UpgradeMessage", "UpgradePage"]);
          break;
        default:
          // Free user can create only 1 biolink
          can("read", ["UpgradeMessage", "UpgradePage"]);
          can("create", ["Biolink"]);
          cannot("create", ["Biolink"], { count: 1 });
          cannot("create", ["SupportRequest"]);
          cannot("read", [
            "BrowserAnalytics",
            "CountryAnalytics",
            "RefererAnalytics",
            "OSAnalytics",
          ]);
          break;
      }
    }
  });
}
