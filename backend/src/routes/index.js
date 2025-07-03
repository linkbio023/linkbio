import { Router } from "express";
import user from "./user.js";
import support from "./support.js";
import stripe from "./stripe.js";
import biolink from "./biolink.js";
import analytics from "./analytics.js";
import media from "./media.js";
import administrator from "./administrator.js";
import subscription from "./subscription.js";

export default () => {
  const app = Router();

  user(app);
  support(app);
  stripe(app);
  biolink(app);
  analytics(app);
  media(app);
  administrator(app);
  subscription(app);

  return app;
};
