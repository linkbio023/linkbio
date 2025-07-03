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
import { Slider } from "@/components/ui/slider";
import ColorPicker from "@/components/shared/color-picker";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import ImageInputWithPreview from "@/components/qr-code/image-input-preview";
import { memo } from "react";

// Configuration
const Configuration = memo(function Configuration({
  changeDesign,
  currentDesign,
}) {
  const currentDesignQrOptions = currentDesign?.qrOptions;

  function handleSizeChange(size) {
    changeDesign("width", size);
    changeDesign("height", size);
  }

  function handleErrorCorrectionLevelChange(level) {
    changeDesign("qrOptions", {
      ...currentDesignQrOptions,
      errorCorrectionLevel: level,
    });
  }

  function handleShapeChange(shape) {
    changeDesign("shape", shape);
  }

  function handleMarginChange(margin) {
    changeDesign("margin", margin[0]);
  }
  return (
    <div className="grid gap-6">
      <h3 className="text-sm font-bold">Configuration</h3>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Size */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="size">Size</Label>
          <Select
            onValueChange={handleSizeChange}
            defaultValue={currentDesign.height}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Size</SelectLabel>
                <SelectItem value={300}>300</SelectItem>
                <SelectItem value={500}>500</SelectItem>
                <SelectItem value={800}>800</SelectItem>
                <SelectItem value={1000}>1000</SelectItem>
                <SelectItem value={1200}>1200</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Error correction level */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="errorCorrectionLevel">Error Correction Level</Label>
          <Select
            onValueChange={handleErrorCorrectionLevelChange}
            defaultValue={currentDesignQrOptions.errorCorrectionLevel}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Error Correction Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Error Correction Level</SelectLabel>
                <SelectItem value="L">Low</SelectItem>
                <SelectItem value="M">Medium</SelectItem>
                <SelectItem value="Q">Quartile</SelectItem>
                <SelectItem value="H">High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Shape */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="shape">Shape</Label>
          <Select
            onValueChange={handleShapeChange}
            defaultValue={currentDesign.shape}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Shape" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Shape</SelectLabel>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Wraping margin */}
        <div className="lg:col-span-2 grid w-full gap-2">
          <Label htmlFor="margin">Margin</Label>
          <Slider
            defaultValue={[currentDesign.margin]}
            max={10}
            min={0}
            step={2}
            onValueChange={handleMarginChange}
            className="col-span-3"
            name="margin"
          />
        </div>
      </div>
    </div>
  );
});

// Background color picker
const Background = memo(function Background({ changeDesign, currentDesign }) {
  const currentDesignBackgroundOptions = currentDesign?.backgroundOptions;
  const singleColor = currentDesignBackgroundOptions?.color;
  const currentBackgroundGradient = currentDesignBackgroundOptions?.gradient;
  const gradientType = currentBackgroundGradient?.type;
  const gradientRotation = currentBackgroundGradient?.rotation;
  const gradientColorStops = currentBackgroundGradient?.colorStops;

  const gradientColor0 =
    gradientColorStops && gradientColorStops.length > 0
      ? gradientColorStops[0].color
      : "#ffffff";
  const gradientColor1 =
    gradientColorStops && gradientColorStops.length > 0
      ? gradientColorStops[1].color
      : "#ffffff";

  function handleBackgroundColorChange(color) {
    changeDesign("backgroundOptions", {
      ...currentDesignBackgroundOptions,
      color: color,
    });
    // if backgroundOptions has a gradient, remove it
    if (currentBackgroundGradient) {
      changeDesign("backgroundOptions", {
        ...currentDesignBackgroundOptions,
        gradient: "",
      });
    }
  }

  function handleGradientColorChange(color, position) {
    if (!currentBackgroundGradient) {
      // if backgroundOptions has no gradient, create one
      changeDesign("backgroundOptions", {
        ...currentDesignBackgroundOptions,
        gradient: {
          type: "linear",
          rotation: 0,
          colorStops: [
            { offset: 0, color: gradientColor0 },
            { offset: 1, color: gradientColor1 },
          ],
        },
      });
    } else {
      // if backgroundOptions has a gradient, update the color
      const updatedGradient = gradientColorStops?.map((stop) => {
        if (stop.offset === position) {
          return { ...stop, color: color };
        }
        return stop;
      });
      changeDesign("backgroundOptions", {
        ...currentDesignBackgroundOptions,
        gradient: {
          ...currentBackgroundGradient,
          colorStops: updatedGradient,
        },
      });
    }
    if (currentDesign.backgroundOptions.color) {
      // if backgroundOptions has a color, remove it
      changeDesign("backgroundOptions", {
        ...currentDesignBackgroundOptions,
        color: "",
      });
    }
  }

  function handleGradientTypeChange(type) {
    // If no gradient exist, create one
    if (!currentBackgroundGradient) {
      changeDesign("backgroundOptions", {
        ...currentDesignBackgroundOptions,
        gradient: {
          type: type,
          rotation: 0,
          colorStops: [
            { offset: 0, color: gradientColor0 },
            { offset: 1, color: gradientColor1 },
          ],
        },
      });
    } else {
      // If gradient exist, update the type
      changeDesign("backgroundOptions", {
        ...currentDesignBackgroundOptions,
        gradient: {
          ...currentBackgroundGradient,
          type: type,
        },
      });
    }
  }

  function handleGradientAngleChange(angle) {
    changeDesign("backgroundOptions", {
      ...currentDesignBackgroundOptions,
      gradient: {
        ...currentBackgroundGradient,
        rotation: angle[0],
      },
    });
  }

  return (
    <div className="grid gap-6">
      <h3 className="text-sm font-bold">Background Color</h3>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Single color */}
        <div className="lg:col-span-2 grid w-full gap-2">
          <Label htmlFor="singleColor">Single Color</Label>
          <ColorPicker
            handleColorChange={handleBackgroundColorChange}
            currentColor={singleColor}
          />
        </div>
        {/* Gradient color Picker */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="gradientType">Gradient Type</Label>
          <Select
            defaultValue={gradientType || "linear"}
            onValueChange={handleGradientTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gradient type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gradient Type</SelectLabel>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="radial">Radial</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="lg:col-span-1 grid w-full gap-2">
          <div className="grid gap-4 grid-cols-2">
            <div className="col-span-1 grid w-full gap-2">
              <Label htmlFor="gradientStartColor">Start Color</Label>
              <ColorPicker
                handleColorChange={(color) =>
                  handleGradientColorChange(color, 0)
                }
                currentColor={gradientColor0}
              />
            </div>
            <div className="col-span-1 grid w-full gap-2">
              <Label htmlFor="gradientEndColor">End Color</Label>
              <ColorPicker
                handleColorChange={(color) =>
                  handleGradientColorChange(color, 1)
                }
                currentColor={gradientColor1}
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 grid w-full gap-2">
          <Label htmlFor="gradientColorAngle">Gardient Angle</Label>
          <Slider
            defaultValue={[gradientRotation]}
            max={180}
            min={-180}
            step={1}
            onValueChange={handleGradientAngleChange}
            className="col-span-3"
            name="angle"
            disabled={!(gradientColorStops && gradientColorStops.length > 0)}
          />
        </div>
      </div>
    </div>
  );
});

// Image options
const ImageOption = memo(function ImageOption({ changeDesign, currentDesign }) {
  const currentDesignImageOptions = currentDesign.imageOptions;
  function handleHideBackgroundDotsChange() {
    changeDesign("imageOptions", {
      ...currentDesignImageOptions,
      hideBackgroundDots: !currentDesignImageOptions?.hideBackgroundDots,
    });
  }

  function handleImageSizeChange(imageSize) {
    changeDesign("imageOptions", {
      ...currentDesignImageOptions,
      imageSize: imageSize[0] / 10,
    });
  }

  function handleImageMarginChange(margin) {
    changeDesign("imageOptions", {
      ...currentDesignImageOptions,
      margin: margin[0],
    });
  }

  function handleImageChange(image) {
    changeDesign("image", image);
  }

  function handleImageRemove() {
    changeDesign("image", null);
  }

  return (
    <div className="grid gap-6">
      <h3 className="text-sm font-bold">Image</h3>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Image Input */}
        <ImageInputWithPreview
          handleQrCodeImageChange={handleImageChange}
          handleQrCodeImageRemove={handleImageRemove}
          currentImage={currentDesignImageOptions?.image}
        />
        {/* Image */}
        <div className="lg:col-span-2 grid w-full gap-2">
          <Label htmlFor="hideBackgroundDots">Hide Background Dots</Label>
          <Switch
            name="hideBackgroundDots"
            onCheckedChange={handleHideBackgroundDotsChange}
            defaultChecked={currentDesignImageOptions.hideBackgroundDots}
          />
        </div>
        {/* Image margin */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="imageMargin">Image Margin</Label>
          <Slider
            defaultValue={[currentDesignImageOptions.margin]}
            max={15}
            min={0}
            step={1}
            onValueChange={handleImageMarginChange}
            className="col-span-3"
            name="imageMargin"
          />
        </div>
        {/* Image size */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="imageSize">Image Size</Label>
          <Slider
            defaultValue={[currentDesignImageOptions.imageSize * 10]}
            max={10}
            min={1}
            step={1}
            onValueChange={handleImageSizeChange}
            className="col-span-3"
            name="imageSize"
          />
        </div>
      </div>
    </div>
  );
});

// Inner dots
const InnerDots = memo(function InnerDots({ changeDesign, currentDesign }) {
  const currentDesignDotsOptions = currentDesign.dotsOptions;
  const singleColor = currentDesignDotsOptions?.color;
  const currentDotsGradient = currentDesignDotsOptions?.gradient;
  const gradientType = currentDotsGradient?.type;
  const gradientRotation = currentDotsGradient?.rotation;
  const gradientColorStops = currentDotsGradient?.colorStops;
  const gradientColor0 =
    gradientColorStops && gradientColorStops.length > 0
      ? gradientColorStops[0].color
      : "#ffffff";
  const gradientColor1 =
    gradientColorStops && gradientColorStops.length > 0
      ? gradientColorStops[1].color
      : "#ffffff";

  function handleInnerDotsTypeChange(type) {
    changeDesign("dotsOptions", {
      ...currentDesignDotsOptions,
      type: type,
    });
  }

  function handleInnerDotsColorChange(color) {
    changeDesign("dotsOptions", {
      ...currentDesignDotsOptions,
      color: color,
    });
    // if dotsOptions has a gradient, remove it
    if (currentDotsGradient) {
      changeDesign("dotsOptions", {
        ...currentDesignDotsOptions,
        gradient: "",
      });
    }
  }

  function handleInnerDotsGradientTypeChange(type) {
    // If no gradient exist, create one
    if (!currentDotsGradient) {
      changeDesign("dotsOptions", {
        ...currentDesignDotsOptions,
        gradient: {
          type: type,
          rotation: 0,
          colorStops: [
            { offset: 0, color: gradientColor0 },
            { offset: 1, color: gradientColor1 },
          ],
        },
      });
    } else {
      // If gradient exist, update the type
      changeDesign("dotsOptions", {
        ...currentDesignDotsOptions,
        gradient: {
          ...currentDotsGradient,
          type: type,
        },
      });
    }
  }

  function handleGradientColorChange(color, position) {
    if (!currentDotsGradient) {
      // if dotsOptions has no gradient, create one
      changeDesign("dotsOptions", {
        ...currentDesignDotsOptions,
        gradient: {
          type: "linear",
          rotation: 0,
          colorStops: [
            { offset: 0, color: gradientColor0 },
            { offset: 1, color: gradientColor1 },
          ],
        },
      });
    } else {
      // if dotsOptions has a gradient, update the color
      const updatedGradient = gradientColorStops?.map((stop) => {
        if (stop.offset === position) {
          return { ...stop, color: color };
        }
        return stop;
      });
      changeDesign("dotsOptions", {
        ...currentDesignDotsOptions,
        gradient: {
          ...currentDotsGradient,
          colorStops: updatedGradient,
        },
      });
    }
    if (singleColor) {
      // if dotsOptions has a color, remove it
      changeDesign("dotsOptions", {
        ...currentDesignDotsOptions,
        color: "",
      });
    }
  }

  function handleGradientAngleChange(angle) {
    changeDesign("dotsOptions", {
      ...currentDesignDotsOptions,
      gradient: {
        ...currentDotsGradient,
        rotation: angle[0],
      },
    });
  }
  return (
    <div className="grid gap-6">
      <h3 className="text-sm font-bold">Inner Dots</h3>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Innter dot type */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="innerDotsType">Inner Dots Type</Label>
          <Select
            defaultValue={currentDesignDotsOptions?.type}
            onValueChange={handleInnerDotsTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select inner dots type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Inner Dots Type</SelectLabel>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="dots">Dot</SelectItem>
                <SelectItem value="rounded">Rounded</SelectItem>
                <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                <SelectItem value="classy">Classy</SelectItem>
                <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Inner dots color */}
        {/* Single color */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="singleColor">Single Color</Label>
          <ColorPicker
            handleColorChange={handleInnerDotsColorChange}
            currentColor={singleColor}
          />
        </div>
        {/* Gradient color Picker */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="gradientType">Gradient Type</Label>
          <Select
            defaultValue={gradientType || "linear"}
            onValueChange={handleInnerDotsGradientTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gradient type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gradient Type</SelectLabel>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="radial">Radial</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="lg:col-span-1 grid w-full gap-2">
          <div className="grid gap-4 grid-cols-2">
            <div className="col-span-1 grid w-full gap-2">
              <Label htmlFor="gradientStartColor">Start Color</Label>
              <ColorPicker
                handleColorChange={(color) =>
                  handleGradientColorChange(color, 0)
                }
                currentColor={gradientColor0}
              />
            </div>
            <div className="col-span-1 grid w-full gap-2">
              <Label htmlFor="gradientEndColor">End Color</Label>
              <ColorPicker
                handleColorChange={(color) =>
                  handleGradientColorChange(color, 1)
                }
                currentColor={gradientColor1}
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 grid w-full gap-2">
          <Label htmlFor="gradientColorAngle">Gardient Angle</Label>
          <Slider
            defaultValue={[gradientRotation]}
            max={180}
            min={-180}
            step={1}
            onValueChange={handleGradientAngleChange}
            className="col-span-3"
            name="angle"
            disabled={!(gradientColorStops && gradientColorStops.length > 0)}
          />
        </div>
      </div>
    </div>
  );
});

// Corner squares
const CornerSquares = memo(function CornerSquares({
  changeDesign,
  currentDesign,
}) {
  const currentDesignCornerSquaresOptions = currentDesign.cornersSquareOptions;
  const singleColor = currentDesignCornerSquaresOptions?.color;
  const currentGradient = currentDesignCornerSquaresOptions?.gradient;
  const gradientType = currentGradient?.type;
  const gradientRotation = currentGradient?.rotation;
  const gradientColorStops = currentGradient?.colorStops;
  const gradientColor0 =
    gradientColorStops && gradientColorStops.length > 0
      ? gradientColorStops[0].color
      : "#ffffff";
  const gradientColor1 =
    gradientColorStops && gradientColorStops.length > 0
      ? gradientColorStops[1].color
      : "#ffffff";

  function handleCornersSquareTypeChange(type) {
    changeDesign("cornersSquareOptions", {
      ...currentDesignCornerSquaresOptions,
      type: type,
    });
  }

  function handleBackgroundColorChange(color) {
    changeDesign("cornersSquareOptions", {
      ...currentDesignCornerSquaresOptions,
      color: color,
    });
    // if cornersSquareOptions has a gradient, remove it
    if (currentGradient) {
      changeDesign("cornersSquareOptions", {
        ...currentDesignCornerSquaresOptions,
        gradient: "",
      });
    }
  }

  function handleGradientColorChange(color, position) {
    if (!currentDesign.cornersSquareOptions.gradient) {
      // if cornersSquareOptions has no gradient, create one
      changeDesign("cornersSquareOptions", {
        ...currentDesignCornerSquaresOptions,
        gradient: {
          type: "linear",
          rotation: 0,
          colorStops: [
            { offset: 0, color: gradientColor0 },
            { offset: 1, color: gradientColor1 },
          ],
        },
      });
    } else {
      // if cornersSquareOptions has a gradient, update the color
      const updatedGradient = gradientColorStops?.map((stop) => {
        if (stop.offset === position) {
          return { ...stop, color: color };
        }
        return stop;
      });
      changeDesign("cornersSquareOptions", {
        ...currentDesignCornerSquaresOptions,
        gradient: {
          ...currentGradient,
          colorStops: updatedGradient,
        },
      });
    }
    if (singleColor) {
      // if cornersSquareOptions has a color, remove it
      changeDesign("cornersSquareOptions", {
        ...currentDesignCornerSquaresOptions,
        color: "",
      });
    }
  }

  function handleGradientTypeChange(type) {
    // If no gradient exist, create one
    if (!currentGradient) {
      changeDesign("dotsOptions", {
        ...currentDesignCornerSquaresOptions,
        gradient: {
          type: type,
          rotation: 0,
          colorStops: [
            { offset: 0, color: gradientColor0 },
            { offset: 1, color: gradientColor1 },
          ],
        },
      });
    } else {
      // If gradient exist, update the type
      changeDesign("cornersSquareOptions", {
        ...currentDesignCornerSquaresOptions,
        gradient: {
          ...currentGradient,
          type: type,
        },
      });
    }
  }

  function handleGradientAngleChange(angle) {
    changeDesign("cornersSquareOptions", {
      ...currentDesignCornerSquaresOptions,
      gradient: {
        ...currentGradient,
        rotation: angle[0],
      },
    });
  }

  return (
    <div className="grid gap-6">
      <h3 className="text-sm font-bold">Corner Squares</h3>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Corner squares type */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="cornerSquaresType">Corner Squares Type</Label>
          <Select
            defaultValue={currentDesignCornerSquaresOptions?.type}
            onValueChange={handleCornersSquareTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select corner squares type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Corner Squares Type</SelectLabel>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="dot">Circle</SelectItem>
                <SelectItem value="extra-rounded">Rounded</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Corner squares color */}
        {/* Single color */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="singleColor">Single Color</Label>
          <ColorPicker
            handleColorChange={handleBackgroundColorChange}
            currentColor={singleColor}
          />
        </div>
        {/* Gradient color Picker */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="gradientType">Gradient Type</Label>
          <Select
            defaultValue={gradientType}
            onValueChange={handleGradientTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gradient type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gradient Type</SelectLabel>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="radial">Radial</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="lg:col-span-1 grid w-full gap-2">
          <div className="grid gap-4 grid-cols-2">
            <div className="col-span-1 grid w-full gap-2">
              <Label htmlFor="gradientStartColor">Start Color</Label>
              <ColorPicker
                handleColorChange={(color) =>
                  handleGradientColorChange(color, 0)
                }
                currentColor={gradientColor0}
              />
            </div>
            <div className="col-span-1 grid w-full gap-2">
              <Label htmlFor="gradientEndColor">End Color</Label>
              <ColorPicker
                handleColorChange={(color) =>
                  handleGradientColorChange(color, 1)
                }
                currentColor={gradientColor1}
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 grid w-full gap-2">
          <Label htmlFor="gradientColorAngle">Gardient Angle</Label>
          <Slider
            defaultValue={[gradientRotation]}
            max={180}
            min={-180}
            step={1}
            onValueChange={handleGradientAngleChange}
            className="col-span-3"
            name="angle"
            disabled={!(gradientColorStops && gradientColorStops.length > 0)}
          />
        </div>
      </div>
    </div>
  );
});

// Corner dots
const CornerDots = memo(function CornerDots({ changeDesign, currentDesign }) {
  const currentDesignCornersDotOptions = currentDesign.cornersDotOptions;
  const singleColor = currentDesignCornersDotOptions?.color;
  const currentGradient = currentDesignCornersDotOptions?.gradient;
  const gradientType = currentGradient?.type;
  const gradientRotation = currentGradient?.rotation;
  const gradientColorStops = currentGradient?.colorStops;
  const gradientColor0 =
    gradientColorStops && gradientColorStops.length > 0
      ? gradientColorStops[0].color
      : "#ffffff";
  const gradientColor1 =
    gradientColorStops && gradientColorStops.length > 0
      ? gradientColorStops[1].color
      : "#ffffff";

  function handleCornerDotsTypeChange(type) {
    changeDesign("cornersDotOptions", {
      ...currentDesignCornersDotOptions,
      type: type,
    });
  }

  function handleBackgroundColorChange(color) {
    changeDesign("cornersDotOptions", {
      ...currentDesignCornersDotOptions,
      color: color,
    });
    // if cornersDotOptions has a gradient, remove it
    if (currentGradient) {
      changeDesign("cornersDotOptions", {
        ...currentDesignCornersDotOptions,
        gradient: "",
      });
    }
  }

  function handleGradientColorChange(color, position) {
    if (!currentGradient) {
      // if cornersDotOptions has no gradient, create one
      changeDesign("cornersDotOptions", {
        ...currentDesignCornersDotOptions,
        gradient: {
          type: "linear",
          rotation: 0,
          colorStops: [
            { offset: 0, color: gradientColor0 },
            { offset: 1, color: gradientColor1 },
          ],
        },
      });
    } else {
      // if cornersDotOptions has a gradient, update the color
      const updatedGradient = gradientColorStops?.map((stop) => {
        if (stop.offset === position) {
          return { ...stop, color: color };
        }
        return stop;
      });
      changeDesign("cornersDotOptions", {
        ...currentDesignCornersDotOptions,
        gradient: {
          ...currentGradient,
          colorStops: updatedGradient,
        },
      });
    }
    if (currentDesign.cornersDotOptions.color) {
      // if cornersDotOptions has a color, remove it
      changeDesign("cornersDotOptions", {
        ...currentDesignCornersDotOptions,
        color: "",
      });
    }
  }

  function handleGradientTypeChange(type) {
    // If no gradient exist, create one
    if (!currentGradient) {
      changeDesign("dotsOptions", {
        ...currentDesignCornersDotOptions,
        gradient: {
          type: type,
          rotation: 0,
          colorStops: [
            { offset: 0, color: gradientColor0 },
            { offset: 1, color: gradientColor1 },
          ],
        },
      });
    } else {
      changeDesign("cornersDotOptions", {
        ...currentDesignCornersDotOptions,
        gradient: {
          ...currentGradient,
          type: type,
        },
      });
    }
  }

  function handleGradientAngleChange(angle) {
    changeDesign("cornersDotOptions", {
      ...currentDesignCornersDotOptions,
      gradient: {
        ...currentGradient,
        rotation: angle[0],
      },
    });
  }

  return (
    <div className="grid gap-6">
      <h3 className="text-sm font-bold">Corner Dots</h3>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Corner dots type */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="cornerDotsType">Corner Dots Type</Label>
          <Select
            defaultValue={currentDesignCornersDotOptions?.type}
            onValueChange={handleCornerDotsTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select corner dots type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Corner Dots Type</SelectLabel>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="dot">Dot</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Corner dots color */}
        {/* Single color */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="singleColor">Single Color</Label>
          <ColorPicker
            handleColorChange={handleBackgroundColorChange}
            currentColor={singleColor}
          />
        </div>
        {/* Gradient color Picker */}
        <div className="lg:col-span-1 grid w-full gap-2">
          <Label htmlFor="gradientType">Gradient Type</Label>
          <Select
            defaultValue={gradientType}
            onValueChange={handleGradientTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gradient type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gradient Type</SelectLabel>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="radial">Radial</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="lg:col-span-1 grid w-full gap-2">
          <div className="grid gap-4 grid-cols-2">
            <div className="col-span-1 grid w-full gap-2">
              <Label htmlFor="gradientStartColor">Start Color</Label>
              <ColorPicker
                handleColorChange={(color) =>
                  handleGradientColorChange(color, 0)
                }
                currentColor={gradientColor0}
              />
            </div>
            <div className="col-span-1 grid w-full gap-2">
              <Label htmlFor="gradientEndColor">End Color</Label>
              <ColorPicker
                handleColorChange={(color) =>
                  handleGradientColorChange(color, 1)
                }
                currentColor={gradientColor1}
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 grid w-full gap-2">
          <Label htmlFor="gradientColorAngle">Gardient Angle</Label>
          <Slider
            defaultValue={[gradientRotation]}
            max={180}
            min={-180}
            step={1}
            onValueChange={handleGradientAngleChange}
            className="col-span-3"
            name="angle"
            disabled={!(gradientColorStops && gradientColorStops.length > 0)}
          />
        </div>
      </div>
    </div>
  );
});

const QrCodeCustomizer = memo(function QrCodeCustomizer({
  changeDesign,
  currentDesign,
}) {
  return (
    <div className="grid gap-4">
      {/* Size, shape, error level change */}
      <Configuration
        changeDesign={changeDesign}
        currentDesign={currentDesign}
      />
      <Separator className="my-4" />
      {/* Background color change */}
      <Background changeDesign={changeDesign} currentDesign={currentDesign} />
      <Separator className="my-4" />
      {/* Center Image */}
      <ImageOption changeDesign={changeDesign} currentDesign={currentDesign} />
      <Separator className="my-4" />
      {/* Inner dots */}
      <InnerDots changeDesign={changeDesign} currentDesign={currentDesign} />
      <Separator className="my-4" />
      {/* Corner squires */}
      <CornerSquares
        changeDesign={changeDesign}
        currentDesign={currentDesign}
      />
      <Separator className="my-4" />
      {/* Corner dots */}
      <CornerDots changeDesign={changeDesign} currentDesign={currentDesign} />
    </div>
  );
});

export default QrCodeCustomizer;
