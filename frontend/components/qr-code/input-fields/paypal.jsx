import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Paypal({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = e.target.paypal.value;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="paypal">Paypal Url</Label>
        <Input id="paypal" type="url" placeholder="Paypal" maxLength={2048} />
        <p className="text-sm text-muted-foreground">
          The maximum length for paypal is 2048 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
