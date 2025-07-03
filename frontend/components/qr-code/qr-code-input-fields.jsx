"use client";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import InputFieldLoader from "@/components/qr-code/input-field-loader";
import { Separator } from "@/components/ui/separator";
import { Combobox } from "@/components/shared/combobox";
import Text from "@/components/qr-code/input-fields/text";

const Url = dynamic(() => import("@/components/qr-code/input-fields/url"), {
  ssr: true,
  loading: () => <InputFieldLoader />,
});
const Email = dynamic(() => import("@/components/qr-code/input-fields/email"), {
  ssr: true,
  loading: () => <InputFieldLoader />,
});
const Phone = dynamic(() => import("@/components/qr-code/input-fields/phone"), {
  ssr: true,
  loading: () => <InputFieldLoader />,
});
const Sms = dynamic(() => import("@/components/qr-code/input-fields/sms"), {
  ssr: true,
  loading: () => <InputFieldLoader />,
});
const Wifi = dynamic(() => import("@/components/qr-code/input-fields/wifi"), {
  ssr: true,
  loading: () => <InputFieldLoader />,
});
const Contact = dynamic(
  () => import("@/components/qr-code/input-fields/contact"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Event = dynamic(() => import("@/components/qr-code/input-fields/event"), {
  ssr: true,
  loading: () => <InputFieldLoader />,
});
const GeoLocation = dynamic(
  () => import("@/components/qr-code/input-fields/geo-location"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const WhatsApp = dynamic(
  () => import("@/components/qr-code/input-fields/whatsapp"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Telegram = dynamic(
  () => import("@/components/qr-code/input-fields/telegram"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Viber = dynamic(() => import("@/components/qr-code/input-fields/viber"), {
  ssr: true,
  loading: () => <InputFieldLoader />,
});
const Facebook = dynamic(
  () => import("@/components/qr-code/input-fields/facebook"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Twitter = dynamic(
  () => import("@/components/qr-code/input-fields/twitter"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const LinkedIn = dynamic(
  () => import("@/components/qr-code/input-fields/linkedin"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Instagram = dynamic(
  () => import("@/components/qr-code/input-fields/instagram"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const YouTube = dynamic(
  () => import("@/components/qr-code/input-fields/youtube"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Pinterest = dynamic(
  () => import("@/components/qr-code/input-fields/pinterest"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Snapchat = dynamic(
  () => import("@/components/qr-code/input-fields/snapchat"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const TikTok = dynamic(
  () => import("@/components/qr-code/input-fields/tiktok"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Spotify = dynamic(
  () => import("@/components/qr-code/input-fields/spotify"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const GitHub = dynamic(
  () => import("@/components/qr-code/input-fields/github"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Facetime = dynamic(
  () => import("@/components/qr-code/input-fields/facetime"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Crypto = dynamic(
  () => import("@/components/qr-code/input-fields/crypto"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Stripe = dynamic(
  () => import("@/components/qr-code/input-fields/stripe"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Paypal = dynamic(
  () => import("@/components/qr-code/input-fields/paypal"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Playstore = dynamic(
  () => import("@/components/qr-code/input-fields/playstore"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);
const Appstore = dynamic(
  () => import("@/components/qr-code/input-fields/appstore"),
  {
    ssr: true,
    loading: () => <InputFieldLoader />,
  }
);

function SelectedQrCodeInputField({ qrCodeType, updateData }) {
  switch (qrCodeType) {
    case "text":
      return <Text updateData={updateData} />;
    case "url":
      return <Url updateData={updateData} />;
    case "email":
      return <Email updateData={updateData} />;
    case "phone":
      return <Phone updateData={updateData} />;
    case "sms":
      return <Sms updateData={updateData} />;
    case "wifi":
      return <Wifi updateData={updateData} />;
    case "contact":
      return <Contact updateData={updateData} />;
    case "event":
      return <Event updateData={updateData} />;
    case "geolocation":
      return <GeoLocation updateData={updateData} />;
    case "whatsapp":
      return <WhatsApp updateData={updateData} />;
    case "telegram":
      return <Telegram updateData={updateData} />;
    case "viber":
      return <Viber updateData={updateData} />;
    case "facebook":
      return <Facebook updateData={updateData} />;
    case "twitter":
      return <Twitter updateData={updateData} />;
    case "linkedin":
      return <LinkedIn updateData={updateData} />;
    case "instagram":
      return <Instagram updateData={updateData} />;
    case "youtube":
      return <YouTube updateData={updateData} />;
    case "pinterest":
      return <Pinterest updateData={updateData} />;
    case "snapchat":
      return <Snapchat updateData={updateData} />;
    case "tiktok":
      return <TikTok updateData={updateData} />;
    case "spotify":
      return <Spotify updateData={updateData} />;
    case "github":
      return <GitHub updateData={updateData} />;
    case "facetime":
      return <Facetime updateData={updateData} />;
    case "crypto":
      return <Crypto updateData={updateData} />;
    case "stripe":
      return <Stripe updateData={updateData} />;
    case "paypal":
      return <Paypal updateData={updateData} />;
    case "playstore":
      return <Playstore updateData={updateData} />;
    case "appstore":
      return <Appstore updateData={updateData} />;
    default:
      return <Text updateData={updateData} />;
  }
}

const qrCodeTypes = [
  { value: "text", label: "Text" },
  { value: "url", label: "URL" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "sms", label: "SMS" },
  { value: "wifi", label: "WiFi" },
  { value: "contact", label: "Contact - vCard" },
  { value: "event", label: "Event" },
  { value: "geolocation", label: "Geolocation" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "viber", label: "Viber" },
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "pinterest", label: "Pinterest" },
  { value: "snapchat", label: "Snapchat" },
  { value: "tiktok", label: "TikTok" },
  { value: "spotify", label: "Spotify" },
  { value: "github", label: "GitHub" },
  { value: "facetime", label: "Facetime" },
  { value: "crypto", label: "Crypto" },
  { value: "stripe", label: "Stripe" },
  { value: "paypal", label: "Paypal" },
  { value: "playstore", label: "Google Playstore" },
  { value: "appstore", label: "Apple App Store" },
];

export default function QrCodeInputFields({
  currentQrCodeType,
  changeQrCodeType,
  updateData,
}) {
  function handleQrCodeTypeChange(value) {
    changeQrCodeType(value);
    updateData(" ");
  }

  return (
    <div className="grid gap-8">
      {/* Select QR Code type */}
      <div className="lg:col-span-1 grid w-full gap-2">
        <Label htmlFor="qrCodeType">QR Code type</Label>
        <Combobox
          items={qrCodeTypes}
          onChange={handleQrCodeTypeChange}
          defaultValue={currentQrCodeType}
          placeholder={"Select QR Code Type"}
        />
      </div>
      <Separator />
      {/* QR Code input fields */}
      <SelectedQrCodeInputField
        qrCodeType={currentQrCodeType}
        updateData={updateData}
      />
    </div>
  );
}
