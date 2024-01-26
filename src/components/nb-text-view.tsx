import React from "react";
import { Text as NBText } from "native-base";

function NbTextView({
  children,
  fontWeight = "400",
  fontStyle = "normal",
  ...props
}) {
  // Determine the font based on fontWeight and fontStyle
  let fontFamily = "FiraSansExtraCondensed";
  switch (fontWeight) {
    case "100":
      fontFamily += fontStyle === "italic" ? "-ThinItalic" : "-Thin";
      break;
    case "200":
      fontFamily +=
        fontStyle === "italic" ? "-ExtraLightItalic" : "-ExtraLight";
      break;
    case "300":
      fontFamily += fontStyle === "italic" ? "-LightItalic" : "-Light";
      break;
    case "400":
      fontFamily += fontStyle === "italic" ? "-RegularItalic" : "-Regular";
      break;
    case "500":
      fontFamily += fontStyle === "italic" ? "-MediumItalic" : "-Medium";
      break;
    case "600":
      fontFamily += fontStyle === "italic" ? "-SemiBoldItalic" : "-SemiBold";
      break;
    case "700":
      fontFamily += fontStyle === "italic" ? "-BoldItalic" : "-Bold";
      break;
    case "800":
      fontFamily += fontStyle === "italic" ? "-ExtraBoldItalic" : "-ExtraBold";
      break;
    case "900":
      fontFamily += fontStyle === "italic" ? "-BlackItalic" : "-Black";
      break;
    default:
      fontFamily += "-Regular";
  }

  return (
    <NBText fontFamily={fontFamily} fontWeight={fontWeight} {...props}>
      {children}
    </NBText>
  );
}

export default NbTextView;
