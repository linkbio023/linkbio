import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Facebook({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `https://www.facebook.com/${e.target.facebook.value}`;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="facebook">Facebook Profile Username</Label>
        <Input
          id="facebook"
          type="text"
          placeholder="Facebook"
          maxLength={64}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for facebook is 64 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
