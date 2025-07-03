"use client";
import { apiUrls } from "@/constants/api-urls";
import { useEffect } from "react";
import LogoLight from "@/components/shared/logo-light";
import Logo from "@/components/shared/logo";
import { blinkConfig } from "@/config/blink-config";

export default function PublicViewFooter({ biolinkId }) {
  useEffect(() => {
    const sessionKey = "biolink-session-id";
    const sessionId = sessionStorage.getItem(sessionKey);
    if (!sessionId) {
      // Generate a new session ID
      const newSessionId = Math.random().toString(36).substring(2, 15);
      // Save the session ID in the session storage
      sessionStorage.setItem(sessionKey, newSessionId);

      // Get referer URL
      // "referer" is actually a misspelling of the word "referrer" that was accidentally introduced by the standard and has since become a common mistake.
      const referer = document?.referrer;

      // Send an event to the analytics service
      fetch(apiUrls.analytics.biolink.create, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Biolink-Session-ID": newSessionId,
        },
        body: JSON.stringify({
          biolinkId: biolinkId,
          referer: referer,
        }),
      });
    }
  }, [biolinkId]);

  return (
    <div 
    style={{
      backgroundColor: '#18371E',
      padding: '40px 15px',
      backgroundImage: `url(/images/bg-footer.png)`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
    }}
    className="fixed bottom-0 left-0 right-0 h-14 backdrop-blur-xs flex items-center justify-between px-4 z-50">
      {/* <BiolinkShareButton /> */}
      <div className="flex items-center">
        <div className="flex flex-row items-center align-middle gap-2">
          <div className="w-full h-full max-w-6">
            <LogoLight />
          </div>
          <span className="text-sm font-semibold text-white">
            {blinkConfig?.title}
          </span>
        </div>
      </div>
      <div>
      <Logo />
      </div>
      {/* <BiolinkPrivacyButton /> */}
    </div>
  );
}
