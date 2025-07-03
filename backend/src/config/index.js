import { config } from "dotenv";

const envFound = config();

if (envFound.error) {
  console.log("Couldn't find .env file");
  // throw new Error("Couldn't find .env file");
}

const env = process.env;

export default {
  // Port to run the server on
  port: parseInt(env.PORT, 10),
  // Frontend URL
  frontendURL: env.FRONTEND_URL,
  // MongoDB URI
  databaseURL: env.MONGODB_URI,
  // API Prefix
  api: {
    prefix: "/api",
  },
  // Firebase Admin SDK Service Account
  firebaseAdminConfig: {
    type: env.FIREBASE_ADMIN_TYPE,
    project_id: env.FIREBASE_ADMIN_PROJECT_ID,
    private_key_id: env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    private_key: env.FIREBASE_ADMIN_PRIVATE_KEY,
    client_email: env.FIREBASE_ADMIN_CLIENT_EMAIL,
    client_id: env.FIREBASE_ADMIN_CLIENT_ID,
    auth_uri: env.FIREBASE_ADMIN_AUTH_URI,
    token_uri: env.FIREBASE_ADMIN_TOKEN_URI,
    auth_provider_x509_cert_url: env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
    universe_domain: env.FIREBASE_ADMIN_UNIVERSE_DOMAIN,
  },
  // Stripe Configuration
  stripe: {
    secretKey: env.STRIPE_SECRET_KEY,
    webhookSecret: env.STRIPE_WEBHOOK_SECRET,
    plans: {
      pro: {
        yearlyPriceId: env.STRIPE_SUBSCRIPTION_PRO_PLAN_YEARLY_PRICE_ID,
        monthlyPriceId: env.STRIPE_SUBSCRIPTION_PRO_PLAN_MONTHLY_PRICE_ID,
      },
      premium: {
        yearlyPriceId: env.STRIPE_SUBSCRIPTION_PREMIUM_PLAN_YEARLY_PRICE_ID,
        monthlyPriceId: env.STRIPE_SUBSCRIPTION_PREMIUM_PLAN_MONTHLY_PRICE_ID,
      },
    },
  },
  
  // Cloudinary Configuration
  cloudinary: {
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    apiSecret: env.CLOUDINARY_API_SECRET,
  },

  // Default Admin user credentials (name, email, password)
  defaultAdmin: {
    name: env.ADMIN_USER_NAME || "Admin User",
    email: env.ADMIN_USER_EMAIL || "admin@gmail.com",
    password: env.ADMIN_USER_PASSWORD || "admin@123",
  },
};
