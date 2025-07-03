import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Url({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(e.target.url.value);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          type="url"
          placeholder="https://www.example.com"
          maxLength={2048}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for URL is 2048 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
