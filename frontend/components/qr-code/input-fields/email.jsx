import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Email({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = `mailto:${e.target.email.value}`;
    updateData(email);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="contact@email.com"
          maxLength={254}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for email is 254 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
