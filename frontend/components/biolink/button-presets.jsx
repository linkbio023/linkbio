import { memo } from "react";

const buttonVariationsWithName = [
  {
    name: "Uplift",
    design: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#ffffff",
      borderWidth: 0.125,
      borderRadius: 0,
      borderColor: "#000000",
      textColor: "#000000",
      shadow:
        "1px 1px rgba(0, 0, 0, 0.5), 2px 2px rgba(0, 0, 0, 0.5), 3px 3px rgba(0, 0, 0, 0.5), 4px 4px rgba(0, 0, 0, 0.5), 5px 5px 0px 0px rgba(0, 0, 0, 0.5)",
      extra: "",
    },
  },
  {
    name: "Filled Round",
    design: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#000000",
      borderWidth: 0.125,
      borderRadius: 1.5,
      borderColor: "#000000",
      textColor: "#ffffff",
      shadow: "",
      extra: "",
    },
  },
  {
    name: "Holo",
    design: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#ffffff",
      borderWidth: 0.125,
      borderRadius: 1.5,
      borderColor: "#000000",
      textColor: "#000000",
      shadow: "",
      extra: "",
    },
  },
  {
    name: "Serenity",
    design: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#057A55",
      borderWidth: 0,
      borderRadius: 0.5,
      borderColor: "#000000",
      textColor: "#ffffff",
      shadow: "",
      extra: "",
    },
  },
  {
    name: "Emarald",
    design: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#50C878",
      borderWidth: 0,
      borderRadius: 0.5,
      borderColor: "#000000",
      textColor: "#000000",
      shadow: "",
      extra: "",
    },
  },
  {
    name: "Sunstone",
    design: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#E3A008",
      borderWidth: 0,
      borderRadius: 0.5,
      borderColor: "#000000",
      textColor: "#000000",
      shadow: "",
      extra: "",
    },
  },
  {
    name: "Sky",
    design: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#3F83F8",
      borderWidth: 0,
      borderRadius: 0.75,
      borderColor: "#000000",
      textColor: "#ffffff",
      shadow: "",
      extra: "",
    },
  },
  {
    name: "Indigo",
    design: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#5850EC",
      borderWidth: 0,
      borderRadius: 1.5,
      borderColor: "#000000",
      textColor: "#ffffff",
      shadow: "",
      extra: "",
    },
  },
  {
    name: "Rose",
    design: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#BF125D",
      borderWidth: 0,
      borderRadius: 1,
      borderColor: "#000000",
      textColor: "#ffffff",
      shadow: "",
      extra: "",
    },
  },
  {
    name: "Intense",
    design: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#E02424",
      borderWidth: 0,
      borderRadius: 0.5,
      borderColor: "#000000",
      textColor: "#ffffff",
      shadow: "",
      extra: "",
    },
  },
];

const ButtonPresets = memo(function ButtonPresetsComponent({
  chnageButtonDesign,
}) {
  function updateButtonDesign(design) {
    chnageButtonDesign(design);
  }

  function Button({ buttonDesign }) {
    return (
      <div>
        <style jsx>{`
          .button_preset {
            padding: ${buttonDesign?.design?.height}rem 0;
            border: ${buttonDesign?.design?.borderWidth}rem solid
              ${buttonDesign?.design?.borderColor};
            border-radius: ${buttonDesign?.design?.borderRadius}rem;
            color: ${buttonDesign?.design?.textColor};
            box-shadow: ${buttonDesign?.design?.shadow};
            ${buttonDesign?.design?.type == "solid"
              ? `background-color: ${buttonDesign?.design?.backgroundColor}`
              : `background-image: ${buttonDesign?.design?.backgroundColor}`};
          }
        `}</style>
        <button
          type="button"
          className={`button_preset w-full`}
          onClick={() => updateButtonDesign(buttonDesign)}
        >
          {buttonDesign?.name}
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 grid-cols-2">
      {buttonVariationsWithName.map((buttonDesign, index) => (
        <Button key={index} buttonDesign={buttonDesign} />
      ))}
    </div>
  );
});

export default ButtonPresets;
