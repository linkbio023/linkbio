"use client";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ColorPicker from "@/components/shared/color-picker";
import { memo } from "react";

const ButtonCustomizer = memo(function ButtonCustomizer({
  chnageButtonDesign,
  currentDesign,
}) {
  function handleButtonColorChange(color) {
    const newDesign = {
      ...currentDesign,
      design: {
        ...currentDesign.design,
        backgroundColor: color,
      },
    };

    chnageButtonDesign(newDesign);
  }

  function handleTextColorChange(color) {
    const newDesign = {
      ...currentDesign,
      design: {
        ...currentDesign.design,
        textColor: color,
      },
    };

    chnageButtonDesign(newDesign);
  }

  function handleBorderColorChange(color) {
    const newDesign = {
      ...currentDesign,
      design: {
        ...currentDesign.design,
        borderColor: color,
      },
    };

    chnageButtonDesign(newDesign);
  }

  function handleBorderChange(value) {
    const newDesign = {
      ...currentDesign,
      design: {
        ...currentDesign.design,
        borderWidth: value[0] / 16,
      },
    };

    chnageButtonDesign(newDesign);
  }

  function handleHeightChange(value) {
    const newDesign = {
      ...currentDesign,
      design: {
        ...currentDesign.design,
        height: value[0] / 16,
      },
    };

    chnageButtonDesign(newDesign);
  }

  function handleRadiousChange(value) {
    const newDesign = {
      ...currentDesign,
      design: {
        ...currentDesign.design,
        borderRadius: value[0] / 16,
      },
    };

    chnageButtonDesign(newDesign);
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <div className="col-span-1 grid w-full items-center gap-2">
          <Label htmlFor="backgroundColor">Button Color</Label>
          <ColorPicker
            handleColorChange={handleButtonColorChange}
            currentColor={currentDesign?.design?.backgroundColor}
          />
        </div>
        <div className="col-span-1 grid w-full items-center gap-2">
          <Label htmlFor="textColor">Text Color</Label>
          <ColorPicker
            handleColorChange={handleTextColorChange}
            currentColor={currentDesign?.design?.textColor}
          />
        </div>
        <div className="col-span-1 grid w-full items-center gap-2">
          <Label htmlFor="borderColor">Border Color</Label>
          <ColorPicker
            handleColorChange={handleBorderColorChange}
            currentColor={currentDesign?.design?.borderColor}
          />
        </div>
      </div>
      <div className="col-span-3 grid gap-6">
        <div className="grid grid-cols-4 gap-2">
          <Label htmlFor="border" className="col-span-1">
            Border
          </Label>
          <Slider
            value={[currentDesign?.design?.borderWidth * 16]}
            max={4}
            step={1}
            onValueChange={handleBorderChange}
            className="col-span-3"
            name="border"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Label htmlFor="height">Height</Label>
          <Slider
            value={[currentDesign?.design?.height * 16]}
            max={8}
            min={2}
            step={2}
            onValueChange={handleHeightChange}
            className="col-span-3"
            name="height"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Label htmlFor="radious">Radius</Label>
          <Slider
            value={[currentDesign?.design?.borderRadius * 16]}
            max={24}
            step={2}
            onValueChange={handleRadiousChange}
            className="col-span-3"
            name="radious"
          />
        </div>
      </div>
    </div>
  );
});

export default ButtonCustomizer;
