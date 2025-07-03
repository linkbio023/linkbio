import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Playstore({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `https://play.google.com/store/apps/details?id=${e.target.playstore.value}`;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="playstore">Playstore Package Name</Label>
        <Input
          id="playstore"
          type="text"
          placeholder="com.google.android.apps.maps"
          maxLength={150}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for playstore is 150 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
