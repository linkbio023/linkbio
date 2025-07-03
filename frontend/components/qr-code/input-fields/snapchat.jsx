import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Snapchat({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `https://www.snapchat.com/add/${e.target.snapchat.value}`;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="snapchat">Snapchat Username</Label>
        <Input
          id="snapchat"
          type="text"
          placeholder="Snapchat Profile"
          maxLength={64}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for snapchat profile is 64 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
