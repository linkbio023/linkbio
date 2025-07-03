import { default as expressLoader } from "./express.js";
import { default as mongooseLoader } from "./mongoose.js";
import { default as firebaseAdminLoader } from "./firebaseAdmin.js";

export default async ({ app }) => {
  // Load the database
  await mongooseLoader();
  console.log("DB loaded and connected");

  // Load the express app
  await expressLoader({ app });
  console.log("Express loaded");

  // Load the firebase admin
  await firebaseAdminLoader();
  console.log("Firebase Admin loaded");
};
