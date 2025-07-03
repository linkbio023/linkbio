import Stripe from "stripe";
import config from "../config/index.js";

export default async function getStripe() {
  const stripe = new Stripe(config.stripe.secretKey);

  return stripe;
}
