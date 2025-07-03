import { blinkConfig } from "@/config/blink-config";
import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/images/logo.svg" // Chnage your logo path here
      alt={`${blinkConfig?.title} Logo`}
      height={100}
      width={150}
    />
  );
}
