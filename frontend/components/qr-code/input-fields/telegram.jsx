import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Telegram({ updateData }) {
  // https://core.telegram.org/bots/api#sendmessage

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `https://t.me/${e.target.chatId.value}?text=${e.target.message.value}`;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="chatId">Chat ID / Username</Label>
        <Input id="chatId" type="text" placeholder="@username" maxLength={32} />
        <p className="text-sm text-muted-foreground">
          The maximum length for chat ID is 32 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          type="text"
          placeholder="Message"
          maxLength={140}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for message is 140 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
