"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Wifi({ updateData }) {
  // WIFI:S:<SSID>;T:<WEP|WPA|blank>;P:<PASSWORD>;H:<true|false|blank>;;
  const [security, setSecurity] = useState("WPA");
  const [hidden, setHidden] = useState("false");

  const handleSecurityInput = (value) => {
    setSecurity(value);
  };

  const handleHiddenInput = (value) => {
    setHidden(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ssid = e.target.ssid.value;
    const password = e.target.password.value;
    const data = `WIFI:S:${ssid};T:${security};P:${password};H:${hidden};;`;
    updateData(data);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="ssid">WiFi Name (SSID)</Label>
        <Input id="ssid" type="text" placeholder="WiFi Name" maxLength={32} />
        <p className="text-sm text-muted-foreground">
          The maximum length for SSID is 32 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="text"
          placeholder="Password"
          maxLength={63}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for password is 63 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="security">Security</Label>
        <Select
          id="security"
          defaultValue={security}
          onValueChange={handleSecurityInput}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Security" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Wifi Security Type</SelectLabel>
              <SelectItem value="WEP">WEP</SelectItem>
              <SelectItem value="WPA">WPA</SelectItem>
              <SelectItem value="nopass">No Password</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          The security type for the wifi.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="hidden">Hidden Network</Label>
        <Select
          id="hidden"
          defaultValue={hidden}
          onValueChange={handleHiddenInput}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Hidden" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Hidden Network</SelectLabel>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          The hidden status of the wifi.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
