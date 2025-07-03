import { blinkConfig } from "@/config/blink-config";
import HomePageView from "@/components/home-page/home-page-view";

export const metadata = {
  title: `${blinkConfig?.title}`,
  description: `${blinkConfig?.tagline}`,
};

export default function HomePage() {
  return <HomePageView />;
}
