import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Spotify({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `https://open.spotify.com/user/${e.target.spotify.value}`;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="spotify">Spotify Profile</Label>
        <Input
          id="spotify"
          type="text"
          placeholder="Spotify Profile"
          maxLength={32}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for spotify profile is 32 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
