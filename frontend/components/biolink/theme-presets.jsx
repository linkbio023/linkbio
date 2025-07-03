import { memo } from "react";

const themeVariations = [
  {
    name: "Cyberpunk",
    themeDesign: {
      backgroundType: "solid",
      backgroundImage: "",
      backgroundColor: "#f59e0b",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#ffffff",
      borderWidth: 0,
      borderRadius: 0,
      borderColor: "#000000",
      textColor: "#fbbf24",
      shadow: "",
    },
  },
  {
    name: "Creative",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#6f42c1",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#e83e8c",
      borderWidth: 0,
      borderRadius: 0.25,
      borderColor: "#ffffff",
      textColor: "#000000",
      shadow: "",
      extra: "",
    },
  },
  {
    name: "Minimalist",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#f5f5f4",
      backgroundGradient: "",
      themeTextColor: "#1f2937",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0.0625,
      borderRadius: 0.375,
      borderColor: "#e5e7eb",
      textColor: "#1f2937",
      shadow: "",
    },
  },
  {
    name: "Modern",
    themeDesign: {
      backgroundType: "solid",
      backgroundImage: "",
      backgroundColor: "#3b82f6",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0,
      borderRadius: 1.5,
      borderColor: "#000000",
      textColor: "#ffffff",
      shadow: "",
    },
  },
  {
    name: "Vintage",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#facc15",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0,
      borderRadius: 0.375,
      borderColor: "#000000",
      textColor: "#facc15",
      shadow: "",
    },
  },
  {
    name: "Professional",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#9ca3af",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0,
      borderRadius: 0.375,
      borderColor: "#000000",
      textColor: "#1f2937",
      shadow: "",
    },
  },
  {
    name: "Playful",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#22c55e",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0,
      borderRadius: 1.5,
      borderColor: "#000000",
      textColor: "#22c55e",
      shadow: "",
    },
  },
  {
    name: "Nature",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#22c55e",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0,
      borderRadius: 0.375,
      borderColor: "#000000",
      textColor: "#22c55e",
      shadow: "",
    },
  },
  {
    name: "Futuristic",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#3b82f6",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0,
      borderRadius: 1.5,
      borderColor: "#000000",
      textColor: "#3b82f6",
      shadow: "",
    },
  },
  {
    name: "Grunge",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#1f2937",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0,
      borderRadius: 1.5,
      borderColor: "#000000",
      textColor: "#1f2937",
      shadow: "",
    },
  },
  {
    name: "Pastel",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#ec4899",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0,
      borderRadius: 0.375,
      borderColor: "#000000",
      textColor: "#f472b6",
      shadow: "",
    },
  },
  {
    name: "Elegant",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#7e22ce",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0,
      borderRadius: 0.375,
      borderColor: "#000000",
      textColor: "#7e22ce",
      shadow: "",
    },
  },
  {
    name: "Gaming",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#22c55e",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0,
      borderRadius: 1.5,
      borderColor: "#000000",
      textColor: "#22c55e",
      shadow: "",
    },
  },
  {
    name: "Tech",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#2563eb",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0,
      borderRadius: 0.375,
      borderColor: "#000000",
      textColor: "#2563eb",
      shadow: "",
    },
  },
  {
    name: "Bohemian",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#fb923c",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0,
      borderRadius: 0.375,
      borderColor: "#000000",
      textColor: "#fb923c",
      shadow: "",
    },
  },
  {
    name: "Monochrome",
    themeDesign: {
      backgroundType: "solid", // image, gradient, solid
      backgroundImage: "",
      backgroundColor: "#000000",
      backgroundGradient: "",
      themeTextColor: "#ffffff",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0,
      borderRadius: 0.375,
      borderColor: "#000000",
      textColor: "#000000",
      shadow: "",
    },
  },
];

const ThemePresets = memo(function ThemePresets({ changeThemeDesign }) {
  function updateThemeDesign(themeDesign, buttonDesign) {
    changeThemeDesign(themeDesign, buttonDesign);
  }

  function Theme({ name, themeDesign, buttonDesign }) {
    return (
      <div>
        <style jsx>
          {`
            .theme_design {
              cursor: pointer;
              border-radius: 0.375rem;
              ${themeDesign.backgroundType === "image"
                ? `background-image: url(${themeDesign.backgroundImage});`
                : ""}
              ${themeDesign.backgroundType === "gradient"
                ? `background-image: ${themeDesign.backgroundGradient};`
                : ""}
              ${themeDesign.backgroundType === "solid"
                ? `background-color: ${themeDesign.backgroundColor};`
                : ""}
            }
          `}
        </style>
        <style jsx>
          {`
            .text {
              color: ${themeDesign.themeTextColor};
              font-weight: bold;
              font-size: 1rem;
              padding: 1rem;
            }
          `}
        </style>

        <div
          className={`theme_design`}
          onClick={() => updateThemeDesign(themeDesign, buttonDesign)}
        >
          <p className={`text`}>{name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 grid-cols-2">
      {themeVariations.map((theme, index) => (
        <Theme
          key={index}
          name={theme?.name}
          themeDesign={theme?.themeDesign}
          buttonDesign={theme?.buttonDesign}
        />
      ))}
    </div>
  );
});

export default ThemePresets;
