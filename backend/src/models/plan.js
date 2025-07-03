import { model, Schema } from "mongoose";
// Subscription plan model
const planSchema = new Schema(
  {
    name: {
      // Name of the plan
      type: String,
      required: true,
    },
    description: {
      // Description of the plan
      type: String,
      required: true,
    },
    price: {
      // Price of the plan
      type: Number,
      required: true,
    },
    currency: {
      // The currency in which the price is denominated (e.g., USD, EUR).
      type: String,
      enum: ["usd", "eur", "cad", "gbp", "aud", "inr"],
      required: true,
    },
    interval: {
      // The billing interval for the subscription plan (e.g., monthly, yearly).
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },
    trialPeriod: {
      // The number of days in the trial period
      type: Number,
      required: true,
    },
    active: {
      // Indicates if the plan is active or not
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Plan", planSchema);
