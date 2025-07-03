"use client";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { memo } from "react";

const ColorPicker = memo(function ColorPicker({
  handleColorChange,
  currentColor,
}) {
  function onColorChange(color) {
    handleColorChange(color);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <span className="sr-only">Toggle color picker</span>
          <span
            className={`h-6 w-6 rounded-full block`}
            style={{ backgroundColor: `${currentColor}` }}
          ></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <div className="grid gap-2">
          <HexAlphaColorPicker color={currentColor} onChange={onColorChange} />
          <HexColorInput
            placeholder="Hex Color Code"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            color={currentColor}
            onChange={onColorChange}
            maxLength={9}
            prefixed
            alpha
          />
        </div>
      </PopoverContent>
    </Popover>
  );
});

export default ColorPicker;
