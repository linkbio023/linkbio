import { blinkConfig } from "@/config/blink-config";
import Image from "next/image";

export default function LogoDark() {
  return (
    <Image
      src="/images/logo-dark.png" // Chnage your logo path here
      alt={`${blinkConfig?.title} Logo`}
      height={100}
      width={100}
    />
  );
}
