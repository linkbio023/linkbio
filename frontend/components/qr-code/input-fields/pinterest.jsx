import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Pinterest({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `https://www.pinterest.com/${e.target.pinterest.value}`;

    updateData(data);
  };
  return (
    <form className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="pinterest">Pinterest Username</Label>
        <Input
          id="pinterest"
          type="text"
          placeholder="Pinterest Profile"
          maxLength={64}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for pinterest profile is 64 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
