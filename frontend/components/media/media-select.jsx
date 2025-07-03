"use client";
import { useListMedia } from "@/services/media-services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function MediaSelect({ handleSelectedMedia }) {
  const { mediaList, isLoading } = useListMedia();
  const [openModal, setOpenModal] = useState(false);

  function handleSelect(media) {
    handleSelectedMedia(media);
    setOpenModal(false);
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild onClick={() => setOpenModal(true)}>
        <Button>Choose Media</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
          <DialogDescription>
            Choose a media file from your library.
          </DialogDescription>
        </DialogHeader>
        {/* Loading */}
        {isLoading && (
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        )}
        {/* Media list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaList?.map((media) => (
            <div
              key={media.id}
              onClick={() => handleSelect(media)}
              className="cursor-pointer"
            >
              <Image
                src={media.url}
                alt={media.alt}
                width={100}
                height={100}
                unoptimized
                className="h-auto max-w-full rounded-lg hover:shadow-lg hover:scale-105 transition-transform"
              />
              <p className="font-medium">{media?.title}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
