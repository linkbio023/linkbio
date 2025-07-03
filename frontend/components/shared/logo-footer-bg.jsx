
import Image from "next/image";

export default function FooterBG() {
  return (
    <Image
      src="/images/bg-footer.png" // Chnage your logo path here
      alt={`Footer BG`}
      height={100}
      width={100}
    />
  );
}
