import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Contact({ updateData }) {
  // Vcard 3.0 format
  // BEGIN:VCARD
  // VERSION:3.0
  // N:z
  // ORG:x
  // TITLE:c
  // TEL:12345679
  // URL:zxing.appspot.com/generator
  // EMAIL:aronno.ahsan.sust@gmail.com
  // ADR:m l
  // NOTE:f
  // END:VCARD

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `BEGIN:VCARD
VERSION:3.0
N:${e.target.name.value}
ORG:${e.target.organization.value}
TITLE:${e.target.title.value}
TEL:${e.target.phone.value}
URL:${e.target.url.value}
EMAIL:${e.target.email.value}
ADR:${e.target.address.value}
NOTE:${e.target.note.value}
END:VCARD`;

    updateData(data);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" placeholder="Name" maxLength={32} />
        <p className="text-sm text-muted-foreground">
          The maximum length for name is 32 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="organization">Organization</Label>
        <Input
          id="organization"
          type="text"
          placeholder="Organization"
          maxLength={32}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for organization is 32 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="title">Job Designation</Label>
        <Input
          id="title"
          type="text"
          placeholder="Designation"
          maxLength={32}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for designation is 32 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="text" placeholder="Phone" maxLength={32} />
        <p className="text-sm text-muted-foreground">
          The maximum length for phone is 32 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="url">Website</Label>
        <Input
          id="url"
          type="text"
          placeholder="https://www.example.com"
          maxLength={32}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for URL is 32 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="text" placeholder="Email" maxLength={32} />
        <p className="text-sm text-muted-foreground">
          The maximum length for email is 32 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" type="text" placeholder="Address" maxLength={32} />
        <p className="text-sm text-muted-foreground">
          The maximum length for address is 32 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="note">Note</Label>
        <Input id="note" type="text" placeholder="Note" maxLength={32} />
        <p className="text-sm text-muted-foreground">
          The maximum length for note is 32 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
