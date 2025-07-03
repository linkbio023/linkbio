import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Facetime({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `facetime:${e.target.facetime.value}`;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="facetime">Facetime</Label>
        <Input
          id="facetime"
          type="text"
          placeholder="Facetime"
          maxLength={32}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for facetime is 32 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
