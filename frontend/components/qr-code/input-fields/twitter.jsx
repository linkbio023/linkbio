import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Twitter({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `https://twitter.com/intent/tweet?text=${e.target.tweet.value}`;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="tweet">Tweet</Label>
        <Textarea id="tweet" type="text" placeholder="Tweet" maxLength={64} />
        <p className="text-sm text-muted-foreground">
          The maximum length for tweet is 64 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
