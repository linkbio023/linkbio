import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Phone({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = `tel:${e.target.phone.value}`;
    updateData(phone);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" placeholder="+1234567890" maxLength={15} />
        <p className="text-sm text-muted-foreground">
          The maximum length for phone is 15 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
