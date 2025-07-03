import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Viber({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `viber://pa?chatURI=${e.target.chatURI.value}&context=${e.target.context.value}&text=${e.target.text.value}`;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="chatURI">Chat URI</Label>
        <Input id="chatURI" type="text" placeholder="Chat URI" maxLength={32} />
        <p className="text-sm text-muted-foreground">
          The maximum length for chat URI is 32 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="context">Context</Label>
        <Input id="context" type="text" placeholder="Context" maxLength={32} />
        <p className="text-sm text-muted-foreground">
          The maximum length for context is 32 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="text">Text</Label>
        <Textarea id="text" type="text" placeholder="Text" maxLength={140} />
        <p className="text-sm text-muted-foreground">
          The maximum length for text is 140 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
