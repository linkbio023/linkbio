"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import MediaInput from "@/components/media/media-input";
import { useDeleteMedia, useListMedia } from "@/services/media-services";

function DeleteConfirmationDialog({
  openDeleteDialog,
  setOpenDeleteDialog,
  selectedImageIds,
  setSelectedImage,
}) {
  const { trigger, isMutating } = useDeleteMedia();

  async function handleDelete() {
    await trigger({ mediaList: selectedImageIds });

    if (!isMutating) {
      setOpenDeleteDialog(false);
      setSelectedImage([]);
    }
  }

  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Media</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the selected media?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isMutating}>Cancel</Button>
          </DialogClose>
          <Button
            variant="outline"
            disabled={isMutating}
            onClick={handleDelete}
          >
            {isMutating ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SelectAllCheckbox({ isChecked, onChange, disabled }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="select-all"
        checked={isChecked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
      <label
        htmlFor="select-all"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Select All
      </label>
    </div>
  );
}

function MediaCard({ media, isSelected, onSelect }) {
  return (
    <div key={media.id} className="overflow-hidden">
      <div className="p-0 relative">
        <div className="absolute top-2 left-2 z-10">
          <Checkbox checked={isSelected} onCheckedChange={onSelect} />
        </div>
        <Image
          src={media.url}
          alt={media.alt}
          width={640}
          height={360}
          unoptimized
          className="h-auto max-w-full rounded-lg"
        />
      </div>
    </div>
  );
}

export default function MediaLibrary() {
  const { mediaList, isLoading, isValidating } = useListMedia();
  const [selectedImage, setSelectedImage] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  function handleSelectImage(imageId) {
    setSelectedImage((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  }

  function handleSelectAll(value) {
    if (value == "all") {
      setSelectedImage(mediaList?.map((media) => media.id));
    } else {
      setSelectedImage([]);
    }
  }

  function handleDeleteConfirmation() {
    setOpenDeleteDialog(true);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row gap-2 justify-between items-start">
        <div className="grid gap-2">
          <CardTitle>Media Library</CardTitle>
          <CardDescription>
            Manage your images here. You can upload up to 20 images.
          </CardDescription>
        </div>
        {/* Media Input Dialog */}
        <MediaInput />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <SelectAllCheckbox
            isChecked={selectedImage.length == mediaList?.length}
            onChange={() =>
              handleSelectAll(
                selectedImage.length == mediaList?.length ? "none" : "all"
              )
            }
            disabled={isLoading || isValidating}
          />
          <Button
            variant="outline"
            size="sm"
            disabled={selectedImage.length == 0}
            onClick={handleDeleteConfirmation}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>

          <DeleteConfirmationDialog
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
            selectedImageIds={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>

        {/* Loading when data loading */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : null}

        {/* No media found */}
        {mediaList?.length == 0 && !isLoading && !isValidating ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">No media found</p>
          </div>
        ) : null}

        {/* Media list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaList?.map((media) => (
            <MediaCard
              key={media.id}
              media={media}
              isSelected={selectedImage.includes(media.id)}
              onSelect={() => handleSelectImage(media.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
