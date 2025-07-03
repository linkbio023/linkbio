import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Crypto({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = e.target.crypto.value;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="crypto">Crypto Address</Label>
        <Input
          id="crypto"
          type="text"
          placeholder="Crypto Address"
          maxLength={62}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for crypto address is 62 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
