import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Linkedin({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `https://www.linkedin.com/in/${e.target.linkedin.value}`;

    updateData(data);
  };

  return (
    <form className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="linkedin">Linkedin Profile Username</Label>
        <Input
          id="linkedin"
          type="text"
          placeholder="Linkedin Profile"
          maxLength={32}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for linkedin profile is 32 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
