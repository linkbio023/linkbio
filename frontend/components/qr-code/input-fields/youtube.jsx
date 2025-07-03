import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Youtube({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `https://www.youtube.com/channel/${e.target.youtube.value}`;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="youtube">Youtube Channel Username</Label>
        <Input
          id="youtube"
          type="text"
          placeholder="Youtube Channel"
          maxLength={64}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for youtube channel is 64 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
