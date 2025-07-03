"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateSupport } from "@/services/support-services";
import { Loader2, MailPlus, Send } from "lucide-react";
import { SupportDTO } from "@/DTO/support";

export default function CreateSupport() {
  const { trigger, isMutating } = useCreateSupport();

  async function handleSubmit(e) {
    e.preventDefault();
    const title = e.target.subject.value;
    const details = e.target.details.value;

    const support = new SupportDTO()
      .setTitle(title)
      .setDetails(details)
      .build();

    await trigger(support);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <MailPlus className="h-4 w-4" />
          <span>Support</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Looking for help?</DialogTitle>
          <DialogDescription>
            If you need help, please fill out the form below and we will get back to you on email as soon as possible.
          </DialogDescription>
        </DialogHeader>
        {/* Input support request */}
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              type="text"
              placeholder="Write subject..."
              maxLength={120}
            />
            <p className="text-sm text-muted-foreground">
              The maximum length for subject is 120 characters.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sms">Details</Label>
            <Textarea
              id="details"
              type="text"
              placeholder="Write your problem details here..."
              maxLength={3000}
            />
            <p className="text-sm text-muted-foreground">
              The maximum length for details is 3000 characters.
            </p>
          </div>
          <Button type="submit">
            {isMutating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            <span>Submit</span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
