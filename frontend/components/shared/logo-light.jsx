import { blinkConfig } from "@/config/blink-config";
import Image from "next/image";

export default function LogoLight() {
  return (
    <Image
      src="/images/globe.svg" // Chnage your logo path here
      alt={`${blinkConfig?.title} Logo`}
      height={100}
      width={100}
    />
  );
}
