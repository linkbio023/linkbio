"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Text({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(e.target.text.value);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="text">Text</Label>
        <Textarea
          id="text"
          placeholder="Write your text here"
          maxLength={7089}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for text is 7089 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
