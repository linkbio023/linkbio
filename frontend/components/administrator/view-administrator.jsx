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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { dateFormatter } from "@/lib/date/date-formatter";
import { Loader2, ShieldCheck } from "lucide-react";
import {
  useUpdateAdministrator,
  useViewAdministrator,
} from "@/services/administrator-services";
import { AdministratorDTO } from "@/DTO/administrator";
import { administatorRoleName } from "@/lib/administator-role-name";

function DescriptionItem({ label, data }) {
  return (
    <div className="grid gap-2">
      <label className="block text-sm font-semibold">{label}</label>
      <p className="text-sm">{data}</p>
    </div>
  );
}

export default function ViewAdministrator({ id }) {
  const { administrator, isLoading, isValidating } = useViewAdministrator(id);
  const { trigger, isMutating } = useUpdateAdministrator(id);

  async function handleUpdateRole(event) {
    event.preventDefault();
    const role = event.target.role.value;

    const administrator = new AdministratorDTO()
      .setId(id)
      .setRole(role)
      .build();

    await trigger(administrator);
  }

  return (
    <Content
      title={`Administrator Details`}
      extra={<BackButton />}
      isValidating={isValidating}
      isLoading={isLoading}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {/* User Details */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{administrator?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* User Details Data */}
              <div className="grid gap-4 md:grid-cols-2">
                <DescriptionItem label={`Email`} data={administrator?.email} />
                <DescriptionItem
                  label={`Current Role`}
                  data={administatorRoleName(administrator?.role)}
                />
                <DescriptionItem
                  label={`Joining Date`}
                  data={dateFormatter(administrator?.createdAt)}
                />
                <DescriptionItem
                  label={`Last Updated`}
                  data={dateFormatter(administrator?.updatedAt)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Update Role */}
        <div className="md:col-span-1 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Update Role</CardTitle>
              <CardDescription>
                Change role of the administrator
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm">
                  Assigning a new role will change the current administritive
                  privileges of the user
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleUpdateRole} className="grid gap-4 w-full">
                <div className="grid gap-2">
                  <Label htmlFor="role">Assign Role</Label>
                  <Select name="role" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit">
                  {isMutating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}
                  <span>Assign</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Content>
  );
}
