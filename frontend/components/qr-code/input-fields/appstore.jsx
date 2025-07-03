import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Appstore({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = e.target.appstore.value;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="appstore">Appstore Link</Label>
        <Input
          id="appstore"
          type="url"
          placeholder="Appstore"
          maxLength={2048}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for appstore is 2048 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
