import Script from "next/script";

export default function LinkedinInsightIntegration() {
  return (
    <Script id="linkedin-insight" strategy="afterInteractive">
      {`
            _linkedin_partner_id = "${process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `}
    </Script>
  );
}
