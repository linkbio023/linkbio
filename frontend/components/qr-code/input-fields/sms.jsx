import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Sms({ updateData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const smsNumber = e.target.phone.value;
    const smsMessage = e.target.sms.value;
    const data = `SMSTO:${smsNumber}:${smsMessage}`;
    updateData(data);
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
      <div className="grid gap-2">
        <Label htmlFor="sms">SMS</Label>
        <Textarea
          id="sms"
          type="text"
          placeholder="Write your SMS here"
          maxLength={2048}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for SMS is 2048 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
