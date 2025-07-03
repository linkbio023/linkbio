"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownUp, LayoutTemplate, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { memo } from "react";

// Sortable bio item
const SortableBioItem = memo(function SortableBioItemComponent({
  item,
  handleDeleteItem,
  handleChangeItemTitle,
  handleChangeItemLink,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: item?.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function deleteItem() {
    handleDeleteItem(item);
  }

  function onTitleChange() {
    const title = document.getElementById(item.id)?.value;
    handleChangeItemTitle(item, title);
  }

  function onLinkChange() {
    const link = document.getElementById(`link-${item.id}`)?.value;
    handleChangeItemLink(item, link);
  }

  return (
    <Card
      style={style}
      ref={setNodeRef}
      className="border-primary bg-primary/5 backdrop-blur-sm touch-none"
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Input
            type="text"
            name="title"
            id={item.id}
            value={item.title}
            maxLength={255}
            placeholder="Title"
            onChange={onTitleChange}
            required
          />
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="cursor-move"
          title="Move Up or Down"
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
        >
          <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Move</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Input
          type="url"
          name="link"
          id={`link-${item.id}`}
          value={item?.link}
          maxLength={2048}
          placeholder="Link"
          onChange={onLinkChange}
          required
        />
      </CardContent>
      <CardFooter>
        <div className="flex flex-row justify-end gap-2 w-full">
          <Button variant="outline" size="sm" onClick={deleteItem}>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
});

export default SortableBioItem;
