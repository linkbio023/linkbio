import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function WhatsApp({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `https://wa.me/${e.target.phone.value}?text=${e.target.message.value}`;

    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="text" placeholder="Phone" maxLength={15} />
        <p className="text-sm text-muted-foreground">
          The maximum length for phone is 15 characters.
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
