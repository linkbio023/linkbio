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
    <footer className="footer">
      <div class="footer-top-curve"></div>

      {/* ✅ Light green wavy stroke */}
      <svg
        className="absolute -top-4 left-0 w-full z-10 pointer-events-none"
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 50 C 240 0, 320 80, 480 40 C 640 0, 800 100, 960 40 C 1120 -10, 1280 80, 1440 30"
          stroke="#2EF4A5"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* ✅ Footer content */}
      <div className="flex justify-between items-center gap-6 footer-text">
        {/* Left - Website */}
        <div className="flex items-center gap-2 text-white text-sm font-semibold">
          <span>🌐</span>
          <span>WCA34.GOV.SA</span>
        </div>

        {/* Right - Logo Component + Text */}
        <div className="flex items-center justify-end">
          <Logo />
        </div>
      </div>
    </footer>
  );
}
