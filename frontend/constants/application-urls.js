export const applicationUrls = {
  root: "/",
  login: {
    root: "/page/authenticate",
    forgotPassword: "/page/authenticate/forgot-password",
  },
  notFound: {
    root: "/page/not-found",
  },
  dashboard: {
    root: "/dashboard",
    biolink: {
      list: "/dashboard/biolink",
      view: "/dashboard/biolink/",
    },
    qrcode: "/dashboard/qrcode",
    media: "/dashboard/media",
    profile: "/dashboard/profile",
    analytics: {
      list: "/dashboard/analytics",
      view: "/dashboard/analytics/",
    },
    settings: "/dashboard/settings",
    support: {
      list: "/dashboard/support",
      view: "/dashboard/support/",
    },
    upgrade: "/dashboard/upgrade",

    // Admin routes
    manage: {
      biolinks: {
        list: "/dashboard/manage/biolinks",
        view: "/dashboard/manage/biolinks/",
      },
      users: {
        list: "/dashboard/manage/users",
        view: "/dashboard/manage/users/",
      },
      subscription: {
        list: "/dashboard/manage/subscription",
        view: "/dashboard/manage/subscription/",
      },
      support: {
        list: "/dashboard/manage/support",
        view: "/dashboard/manage/support/",
      },
      administrator: {
        list: "/dashboard/manage/administrator",
        view: "/dashboard/manage/administrator/",
      },
    },
  },
  pages: {
    aboutUs: "/page/about-us",
    career: "/page/career",
    contactUs: "/page/contact-us",
    privacyPolicy: "/page/privacy-policy",
    termsOfService: "/page/terms-of-service",
    security: "/page/security",
  },
};
