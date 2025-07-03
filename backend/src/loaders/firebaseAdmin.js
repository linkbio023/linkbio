import config from "../config/index.js";
import { cert, initializeApp } from "firebase-admin/app";

export default async () => {
  config.firebaseAdminConfig.private_key =
  config.firebaseAdminConfig.private_key.replace(/\\n/g, "\n");

  const firebaseAdminConfig = config.firebaseAdminConfig;
  initializeApp({
    credential: cert({
      projectId: firebaseAdminConfig.project_id,
      clientEmail: firebaseAdminConfig.client_email,
      privateKey: firebaseAdminConfig.private_key,
    }),
  });
};
