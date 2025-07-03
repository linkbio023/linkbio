import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Instagram({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `https://www.instagram.com/${e.target.instagram.value}`;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="instagram">Instagram Username</Label>
        <Input
          id="instagram"
          type="text"
          placeholder="Instagram Profile Link"
          maxLength={64}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for instagram profile is 64 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
