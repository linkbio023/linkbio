"use client";
import Content from "@/components/dashboard/content";
import BackButton from "@/components/shared/buttons/back-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { dateFormatter } from "@/lib/date/date-formatter";
import { useUpdateSupport, useViewSupport } from "@/services/support-services";
import { HeartOff, Loader2, SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";

function DescriptionItem({ label, data }) {
  return (
    <div className="grid gap-2">
      <label className="block text-sm font-semibold">{label}</label>
      <p className="text-sm">{data}</p>
    </div>
  );
}

function CloseTicketConfirmationDialog({ openDialog, setOpenDialog, id }) {
  const { trigger, isMutating } = useUpdateSupport(id);

  async function handleTicketClose() {
    await trigger({ status: "closed" });

    if (!isMutating) {
      setOpenDialog(false);
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Close Ticket?</DialogTitle>
          <DialogDescription>
            Are you sure you want to close this ticket?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isMutating}>Cancel</Button>
          </DialogClose>
          <Button
            variant="outline"
            disabled={isMutating}
            onClick={handleTicketClose}
          >
            {isMutating ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <HeartOff className="h-4 w-4" />
            )}
            <span>Close Ticket</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminViewSupport({ id }) {
  const [openDialog, setOpenDialog] = useState(false);
  const { supportData, isLoading, isValidating } = useViewSupport(id);

  function sendEmail() {
    const emailSubject = `Support Ticket: ${supportData.id} - ${supportData.title}`;
    const emailBody = supportData.details;
    const mailTo = `mailto:${supportData.user.email}?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailTo;
  }

  function handleDialog() {
    setOpenDialog(true);
  }

  return (
    <Content
      title={`Support Request Details`}
      isValidating={isValidating}
      isLoading={isLoading}
      extra={<BackButton />}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{supportData?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Data Description */}
              <div className="grid gap-4 mt-4">
                {/* Ticket Details */}
                <div className="grid gap-4 md:grid-cols-2">
                  <DescriptionItem label="Ticket Code" data={supportData.id} />
                  <DescriptionItem
                    label="Status"
                    data={supportData.status == "open" ? "Open" : "Closed"}
                  />
                  <DescriptionItem
                    label="Created At"
                    data={dateFormatter(supportData.createdAt)}
                  />
                  <DescriptionItem
                    label="Last Updated"
                    data={dateFormatter(supportData.updatedAt)}
                  />
                </div>
                <DescriptionItem label="Details" data={supportData.details} />
                <Separator />

                {/* User Details */}
                <div className="grid gap-4 md:grid-cols-2">
                  <DescriptionItem
                    label="User Name"
                    data={supportData.user.name}
                  />
                  <DescriptionItem
                    label="Email"
                    data={supportData.user.email}
                  />
                  <DescriptionItem
                    label="Joined At"
                    data={dateFormatter(supportData.user.createdAt)}
                  />
                  <DescriptionItem
                    label="Subscription Plan"
                    data={supportData.user.subscription || "N/A"}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Actions */}
        <div className="md:col-span-1 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>
                Reply to the user or change the status of the ticket
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm">
                  Send email will prompt you to your email client with the users
                  email address and the ticket code in the subject line.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="grid gap-4 w-full">
                <Button onClick={sendEmail}>
                  <SquareArrowOutUpRight className="w-4 h-4" />
                  <span>Send Email</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDialog}
                  disabled={supportData.status == "closed"}
                >
                  <HeartOff className="w-4 h-4" />
                  <span>Close Ticket</span>
                </Button>
              </div>
              <CloseTicketConfirmationDialog
                id={id}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </Content>
  );
}
