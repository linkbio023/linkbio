"use client";
import { memo, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const QrCode = memo(function QrCode({ currentDesign }) {
  const ref = useRef(null);
  const qrCode = useRef();

  useEffect(() => {
    qrCode.current = new QRCodeStyling(currentDesign);
    if (ref.current) {
      ref.current.innerHTML = '';
      qrCode.current.append(ref.current);
    }
  }, [currentDesign]);

  async function downloadQrCode() {
    await qrCode.current.download({
      name: "qr-code",
      extension: "png",
    });
  }

  return (
    <div className="grid gap-4 justify-center w-full h-full">
      <div ref={ref} className="*:max-w-80 *:max-h-full *:w-full *:h-full mt-6" />
    </div>
  );
});

export default QrCode;
