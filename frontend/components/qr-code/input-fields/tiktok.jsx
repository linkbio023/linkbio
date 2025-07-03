import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TikTok({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `https://www.tiktok.com/@${e.target.tiktok.value}`;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="tiktok">TikTok Username</Label>
        <Input
          id="tiktok"
          type="text"
          placeholder="TikTok Profile"
          maxLength={32}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for TikTok profile is 32 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
