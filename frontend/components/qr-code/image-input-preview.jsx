"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ImageInputWithPreview({
  handleQrCodeImageChange,
  handleQrCodeImageRemove,
}) {
  //   Takes image input and shows a preview of the image
  // Image can be uploaded by clicking on the preview
  // Image can be removed by clicking on the remove button
  const [image, setImage] = useState(null);
  const imageInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        handleQrCodeImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    handleQrCodeImageRemove();
    imageInputRef.current.value = "";
  };

  return (
    <div className="grid gap-2 grid-cols-3 w-60">
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      <div
        className="col-span-2 w-40 h-40 bg-gray-100 flex items-center justify-center cursor-pointer border-2 border-dashed"
        onClick={() => imageInputRef.current.click()}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-600">Upload Image</span>
        )}
      </div>
      {image && (
        <Button onClick={handleImageRemove} variant="outline" size="icon">
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
