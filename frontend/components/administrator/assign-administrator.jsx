"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ShieldCheck, UserPlus, UserSearch } from "lucide-react";
import { dateFormatter } from "@/lib/date/date-formatter";
import { Separator } from "../ui/separator";
import {
  useCheckAdministrator,
  useUpdateAdministrator,
} from "@/services/administrator-services";
import { AdministratorDTO } from "@/DTO/administrator";
import { useState } from "react";
import { administatorRoleName } from "@/lib/administator-role-name";
import ErrorAlert from "../shared/alert/error-alert";

function DescriptionItem({ label, data }) {
  return (
    <div className="grid gap-2">
      <label className="block text-sm font-semibold">{label}</label>
      <p className="text-sm">{data}</p>
    </div>
  );
}

function UserDescription({ administrator }) {
  const { trigger, isMutating } = useUpdateAdministrator();

  async function handleAssignRole(event) {
    event.preventDefault();
    const role = event.target.role.value;

    const administratorDTO = new AdministratorDTO()
      .setId(administrator?.id)
      .setRole(role)
      .build();

    await trigger(administratorDTO);
  }

  return (
    <div className="md:col-span-2 grid gap-4">
      {/* Description */}
      <div className="grid gap-4 md:grid-cols-2">
        <DescriptionItem label={`Name`} data={administrator?.name} />
        <DescriptionItem label={`Email`} data={administrator?.email} />
        <DescriptionItem
          label={`Current Role`}
          data={administatorRoleName(administrator?.role)}
        />
        <DescriptionItem
          label={`Joining Date`}
          data={dateFormatter(administrator?.createdAt)}
        />
      </div>
      <Separator />
      {/* Assign Role */}
      <div className="grid gap-4">
        <form onSubmit={handleAssignRole} className="flex items-end space-x-2">
          <div className="grid gap-2 flex-1">
            <Label htmlFor="role">Assign Role</Label>
            <Select id="role" name="role" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">
            {isMutating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <ShieldCheck className="h-4 w-4 mr-2" />
            )}
            <span>Assign</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function AssignAdministrator() {
  const [email, setEmail] = useState(null);
  const { administrator, isLoading, data } = useCheckAdministrator(email);

  function handleSearch(event) {
    event.preventDefault();
    const email = event.target.email.value;
    setEmail(() => email);
  }

  return (
    <Dialog onOpenChange={() => setEmail(null)}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4" />
          <span>Administrator</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Administrator</DialogTitle>
          <DialogDescription>
            Assign a new administrator to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Search for user */}
          <form
            className="md:col-span-2 flex items-end space-x-2"
            onSubmit={handleSearch}
          >
            <div className="grid flex-1 gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Write users email..."
                maxLength={320}
                minLength={5}
                required
              />
            </div>
            <Button type="submit">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <UserSearch className="h-4 w-4" />
              )}
              <span>Search</span>
            </Button>
          </form>
          {/* Serach Result and Assign Section */}
          {administrator && !isLoading && email && data?.success == true && (
            <UserDescription administrator={administrator} />
          )}

          {/* Error Alert */}
          {data?.success == false && !isLoading && email && (
            <div className="md:col-span-2">
              <ErrorAlert message={data?.message} />
            </div>
          )}
        </div>
        {/* Footer */}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
