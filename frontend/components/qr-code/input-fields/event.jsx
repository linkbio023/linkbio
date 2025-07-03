"use client";
import { DatePicker } from "@/components/shared/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Event({ updateData }) {
  // VEVENT
  // BEGIN:VEVENT
  // SUMMARY:asd
  // DTSTART;VALUE=DATE:20240817
  // DTEND;VALUE=DATE:20240826
  // LOCATION:Hello
  // DESCRIPTION:qwertyuio
  // END:VEVENT

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleStartDateSelect = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setStartDate(
      `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`
    );
  };

  const handleEndDateSelect = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setEndDate(
      `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `BEGIN:VEVENT
SUMMARY:${e.target.summary.value}
DTSTART;VALUE=DATE:${startDate}
DTEND;VALUE=DATE:${endDate}
LOCATION:${e.target.location.value}
DESCRIPTION:${e.target.description.value}
END:VEVENT`;

    updateData(data);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="summary">Event Title</Label>
        <Input id="summary" type="text" placeholder="Summary" maxLength={32} />
        <p className="text-sm text-muted-foreground">
          The maximum length for summary is 32 characters.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="lg:col-span-1 grid gap-2">
          <Label htmlFor="start">Start Date</Label>
          <DatePicker onSelect={handleStartDateSelect} />
          <p className="text-sm text-muted-foreground">
            The start date of the event.
          </p>
        </div>
        <div className="lg:col-span-1 grid gap-2">
          <Label htmlFor="end">End Date</Label>
          <DatePicker onSelect={handleEndDateSelect} />
          <p className="text-sm text-muted-foreground">
            The end date of the event.
          </p>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="location">Event Location</Label>
        <Input
          id="location"
          type="text"
          placeholder="Location"
          maxLength={32}
        />
        <p className="text-sm text-muted-foreground">
          The maximum length for location is 32 characters.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Description" maxLength={255} />
        <p className="text-sm text-muted-foreground">
          The maximum length for description is 255 characters.
        </p>
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
