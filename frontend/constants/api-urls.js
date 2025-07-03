const apiPath = process.env.NEXT_PUBLIC_API_URL;

export const apiUrls = {
  // User authentication
  user: {
    create: `${apiPath}/user/create`,
    update: `${apiPath}/user/update`,
    updateName: `${apiPath}/user/update-name`,
    updateEmail: `${apiPath}/user/update-email`,
    updatePassword: `${apiPath}/user/update-password`,
    delete: `${apiPath}/user/delete/`,
    view: `${apiPath}/user/view/`,
    profile: `${apiPath}/user/profile`,
    list: `${apiPath}/user/list`,
    count: `${apiPath}/user/count`,
  },
  // BioLink
  biolink: {
    create: `${apiPath}/biolink/create`,
    update: `${apiPath}/biolink/update`,
    delete: `${apiPath}/biolink/delete/`,
    view: `${apiPath}/biolink/view/`,
    administratorsView: `${apiPath}/biolink/administrators-view/`,
    publicView: `${apiPath}/biolink/public/`,
    check: `${apiPath}/biolink/check`,
    list: `${apiPath}/biolink/list`,
    count: `${apiPath}/biolink/count`,
    countByUser: `${apiPath}/biolink/count/user`,
  },
  // Media
  media: {
    create: `${apiPath}/media/create`,
    update: `${apiPath}/media/update`,
    delete: `${apiPath}/media/delete`,
    view: `${apiPath}/media/view/`,
    list: `${apiPath}/media/list`,
    count: `${apiPath}/media/count`,
  },
  // Analytics
  analytics: {
    // BioLink page analytics
    biolink: {
      create: `${apiPath}/stats/create/biolink`,
      view: `${apiPath}/stats/view/biolink/`,
    },
    // Link analytics of individual links
    link: {
      create: `${apiPath}/stats/create/link/`,
      view: `${apiPath}/stats/view/link/`,
    },
  },
  // Support
  support: {
    create: `${apiPath}/support/create`,
    update: `${apiPath}/support/update/`,
    view: `${apiPath}/support/view/`,
    list: `${apiPath}/support/list`,
    count: `${apiPath}/support/count`,
  },
  // Team
  administrator: {
    update: `${apiPath}/administrator/update`,
    view: `${apiPath}/administrator/view/`,
    list: `${apiPath}/administrator/list`,
    count: `${apiPath}/administrator/count`,
    check: `${apiPath}/administrator/check`,
  },
  // Subscription
  subscription: {
    view: `${apiPath}/subscription/view/`,
    list: `${apiPath}/subscription/list`,
    count: `${apiPath}/subscription/count`,
    stripe: {
      // Create a Stripe subscription session
      createSubscriptionSession: `${apiPath}/stripe/create-subscription-session`,
      // Webhook for Stripe events
      webhook: `${apiPath}/stripe/webhook`,
    },
  },
};
