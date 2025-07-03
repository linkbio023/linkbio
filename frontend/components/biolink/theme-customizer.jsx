"use client";
import { Label } from "@/components/ui/label";
import ColorPicker from "@/components/shared/color-picker";
import MediaSelect from "@/components/media/media-select";
import Image from "next/image";
import { Button } from "../ui/button";

export default function ThemeCustomizer({ currentDesign, changeDesign }) {
  function handleColorChange(color) {
    changeDesign({
      backgroundType: "solid",
      backgroundColor: color,
    });
  }

  function handleMediaChange(media) {
    changeDesign({
      backgroundType: "image",
      backgroundImage: media,
    });
  }

  function handleRemoveMedia() {
    changeDesign({
      backgroundType: "solid",
      backgroundColor: "#ffffff",
    });
  }

  return (
    <div className="grid gap-6">
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="backgroundColor">Background Color</Label>
        <ColorPicker
          currentColor={currentDesign?.themeDesign?.backgroundColor}
          handleColorChange={handleColorChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="backgroundImage">Background Image</Label>
        {/* Media preview with change button and remove button */}
        {currentDesign?.themeDesign?.backgroundType === "image" && (
          <div className="flex flex-col items-center gap-2 bg-white p-2 rounded-lg">
            <Image
              src={currentDesign?.themeDesign?.backgroundImage?.url}
              alt="Background Image"
              width={250}
              height={250}
              unoptimized
              className="h-auto max-w-full rounded-lg"
            />
            <div className="flex gap-2">
              {/* Change Media */}
              <MediaSelect handleSelectedMedia={handleMediaChange} />
              {/* Remove Media */}
              <Button variant="outline" onClick={handleRemoveMedia}>
                Remove
              </Button>
            </div>
          </div>
        )}

        {/* Media select */}
        {currentDesign?.themeDesign?.backgroundType !== "image" && (
          <MediaSelect handleSelectedMedia={handleMediaChange} />
        )}
      </div>
    </div>
  );
}
