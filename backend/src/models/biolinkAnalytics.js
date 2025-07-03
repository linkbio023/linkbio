import { model, Schema } from "mongoose";

const biokinkAnalyticsSchema = new Schema(
  {
    biolink: {
      type: Schema.Types.ObjectId,
      ref: "Biolink",
      required: true,
    },
    timestamp: { type: Date, default: new Date(), required: true },
    metadata: {
      country: { type: String, required: false, default: "Unknown" },
      browser: { type: String, required: false, default: "Unknown" },
      os: { type: String, required: false, default: "Unknown" },
      referer: { type: String, required: false, default: "Unknown" },
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

export default model("BiolinkAnalytics", biokinkAnalyticsSchema);
