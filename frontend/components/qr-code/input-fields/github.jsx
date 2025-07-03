import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GitHub({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `https://www.github.com/${e.target.github.value}`;

    updateData(data);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="github">GitHub Username</Label>
        <Input
          id="github"
          type="text"
          placeholder="GitHub Profile"
          maxLength={32}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for github profile is 32 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
