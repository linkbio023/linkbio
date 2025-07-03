"use client";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Content from "@/components/dashboard/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QrCodeCustomizer from "@/components/qr-code/qr-code-customizer";
import QrCodeInputFields from "@/components/qr-code/qr-code-input-fields";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import BackButton from "@/components/shared/buttons/back-button";
const QrCode = dynamic(() => import("@/components/qr-code/qr-code"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex justify-center">
      <div className="flex items-center h-80 w-auto max-w-80 max-h-80">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    </div>
  ),
});

export default function QRCodeView() {
  const [qrCodeType, setQrCodeType] = useState("text");
  const [qrCodeDesign, setQrCodeDesign] = useState({
    type: "svg",
    shape: "square",
    width: 300,
    height: 300,
    margin: 4,
    data: "Hello World",
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      crossOrigin: "anonymous",
      margin: 15,
    },
    dotsOptions: {
      type: "square",
      color: "#000",
      gradient: {
        type: "radial",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#000" },
          { offset: 1, color: "#000" },
        ],
      },
    },
    cornersSquareOptions: {
      type: "square",
      color: "#000",
      gradient: {
        type: "radial",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#000" },
          { offset: 1, color: "#000" },
        ],
      },
    },
    cornersDotOptions: {
      type: "dot",
      color: "#000",
      gradient: {
        type: "radial",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#000" },
          { offset: 1, color: "#000" },
        ],
      },
    },
    backgroundOptions: {
      round: 0,
      color: "#fff",
      gradient: {
        type: "linear",
        rotation: 45,
        colorStops: [
          { offset: 0, color: "#FAACA8" },
          { offset: 1, color: "#DDD6F3" },
        ],
      },
    },
  });

  function changeDesign(key, value) {
    setQrCodeDesign((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleQrCodeTypeChange(value) {
    setQrCodeType(() => value);
  }

  function handleQrCodeDataChange(value) {
    changeDesign("data", value);
  }

  return (
    <Content title="QR Code" extra={<BackButton />}>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-2">
        <div className="col-span-1">
          {/* Left side */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Customize your QR Code</CardTitle>
              <CardDescription>
                Give your QR Code a unique identity.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* Data & design */}
              <Tabs defaultValue="data" className="w-full">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="data" className="w-full">
                    Data
                  </TabsTrigger>
                  <TabsTrigger value="design" className="w-full">
                    Design
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  forceMount
                  className="data-[state=inactive]:hidden"
                  value="data"
                >
                  {/* Data collection and input feilds */}
                  <div className="grid gap-4">
                    {/* Input fields */}
                    <QrCodeInputFields
                      changeQrCodeType={handleQrCodeTypeChange}
                      currentQrCodeType={qrCodeType}
                      updateData={handleQrCodeDataChange}
                    />
                  </div>
                </TabsContent>
                <TabsContent
                  forceMount
                  className="data-[state=inactive]:hidden"
                  value="design"
                >
                  <div className="grid gap-4">
                    {/* Design */}
                    <QrCodeCustomizer
                      changeDesign={changeDesign}
                      currentDesign={qrCodeDesign}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          {/* Right side */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Preview your QR Code</CardTitle>
              <CardDescription>
                Preview your QR Code as your audience will see
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              {/* QR Code Preview */}
              <div className="sticky top-0">
                <div className="p-1">
                  <QrCode currentDesign={qrCodeDesign} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Content>
  );
}
