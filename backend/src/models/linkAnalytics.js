import { model, Schema } from "mongoose";

// Link analytics schema
// Country, browser, os, referrer, and timestamp
// Timeseries data, expires after 30 days

const linkAnalyticsSchema = new Schema(
  {
    link: {
      type: Schema.Types.ObjectId,
      ref: "Link",
      required: true,
    },
    timestamp: { type: Date, default: new Date(), required: true },
    metadata: {
      country: { type: String, required: false },
      browser: { type: String, required: false },
      os: { type: String, required: false },
      referrer: { type: String, required: false },
    },
    clicks: { type: Number, default: 1, required: true },
  },
  {
    timeseries: {
      timeField: "timestamp",
      metaField: "metadata",
      granularity: "seconds",
    },
    autoCreate: false,
    expireAfterSeconds: 2592000, // 30 days = 2592000 seconds
  }
);

export default model("LinkAnalytics", linkAnalyticsSchema);
