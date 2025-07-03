"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useDeleteBiolink } from "@/services/biolink-services";
import { useState } from "react";

export default function BiolinkDeleteButton({ id }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { trigger, isMutating } = useDeleteBiolink(id);

  async function handleDelete() {
    await trigger();
    if (!isMutating) {
      setOpenDeleteDialog(false);
    }
  }

  return (
    <Popover open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-72">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <strong className="font-bold leading-none">Are you sure?</strong>
            <p className="text-sm text-muted-foreground">
              Deleted biolinks are permanently removed from the system.
            </p>
          </div>
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
