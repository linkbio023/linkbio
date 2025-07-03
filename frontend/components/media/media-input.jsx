"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CircleArrowUp,
  CloudUpload,
  ImagePlus,
  Loader2,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCountMedia, useCreateMedia } from "@/services/media-services";
import ErrorAlert from "../shared/alert/error-alert";

export default function MediaInput() {
  const { mediaCount } = useCountMedia();
  const { trigger, isMutating, data } = useCreateMedia();
  // Close the dialog when media is uploaded
  const [openModal, setOpenModal] = useState(false);
  if (data?.success && !isMutating && openModal) {
    setOpenModal(false);
  }

  const [image, setImage] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const imageInputRef = useRef(null);
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      // If file size is greater than 500KB or file type is not jpg, jpeg, png or svg disable the button
      if (
        file.size > 500000 ||
        !["image/jpeg", "image/png", "image/svg+xml"].includes(file.type)
      ) {
        setBtnDisabled(true);
      } else {
        setBtnDisabled(false);
      }
    }
  }

  function handleImageRemove() {
    setImage(null);
    imageInputRef.current.value = "";
    setBtnDisabled(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const image = e.target.image.files[0];
    const alt = e.target.alt.value;
    const title = e.target.title.value;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("alt", alt);
    formData.append("title", title);

    await trigger(formData);
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button>
          <ImagePlus className="h-4 w-4" />
          <span>Add Media</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Media</DialogTitle>
          <DialogDescription>
            Add a new media to your library
          </DialogDescription>
        </DialogHeader>
        <div>
          {mediaCount?.count <= 20 ? (
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="grid gap-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="image">Image</Label>
                <div className="grid gap-2 grid-cols-3 w-60">
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept=".jpg, .jpeg, .png, .svg"
                    className="hidden"
                    onChange={handleImageChange}
                    id="image"
                    name="image"
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
                      <div className="flex items-center flex-col gap-4 text-gray-600 text-center">
                        <CloudUpload className="h-6 w-6" />
                        <div className="grid gap-1">
                          <span className="text-sm font-medium">
                            Upload Image
                          </span>
                          <span className="text-xs">SVG, PNG, JPG</span>
                          <span className="text-xs">MAX 500KB</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Close Image Button */}
                  {image && (
                    <Button
                      onClick={handleImageRemove}
                      variant="outline"
                      size="icon"
                      className="col-span-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input id="alt" placeholder="Describe the image" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Image title" required />
              </div>
              <Button type="submit" disabled={btnDisabled || isMutating}>
                {isMutating ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <CircleArrowUp className="h-5 w-5 mr-2" />
                )}
                <span>Upload</span>
              </Button>
            </form>
          ) : (
            <ErrorAlert
              title={`Limit Reached`}
              message={`You can upload up to 20 images.`}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
