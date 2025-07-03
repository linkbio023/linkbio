import { GoogleAnalytics } from "@next/third-parties/google";

export default function GoogleAnalyticsIntegration() {
  return (
    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_GA_ID} />
  );
}
