import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { AuthUserProvider } from "@/context/AuthUserContext";
import AnalyticsIntegration from "@/analytics/analytics-integration";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal"],
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          poppins.variable
        )}
      >
        {/* Analytics */}
        <AnalyticsIntegration />
        {/* Auth Provider */}
        <AuthUserProvider>{children}</AuthUserProvider>
      </body>
    </html>
  );
}
