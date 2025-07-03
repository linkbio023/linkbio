import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GeoLocation({ updateData }) {
  // GEO:latitude,longitude

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `GEO:${e.target.latitude.value},${e.target.longitude.value}`;

    updateData(data);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          type="text"
          placeholder="Latitude"
          maxLength={32}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for latitude is 32 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          id="longitude"
          type="text"
          placeholder="Longitude"
          maxLength={32}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for longitude is 32 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
