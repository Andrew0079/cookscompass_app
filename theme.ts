import { extendTheme } from "native-base";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#F5F5F5", // Light gray
      100: "#E5E5E5",
      200: "#CCCCCC",
      300: "#B2B2B2",
      400: "#999999",
      500: "#808080", // Medium gray
      600: "#666666",
      700: "#4C4C4C",
      800: "#333333",
      900: "#1A1A1A", // Dark gray
    },
    secondary: {
      50: "#FFFFFF", // White
      100: "#F0F0F0",
      200: "#D9D9D9",
      300: "#C3C3C3",
      400: "#ACACAC",
      500: "#969696", // Light gray
      600: "#7F7F7F",
      700: "#696969",
      800: "#525252",
      900: "#3C3C3C", // Dark gray
    },
    accent: {
      500: "#FFFFFF", // Blue (adjust as needed)
    },
    background: {
      100: "#FFFFFF", // White
      500: "#F5F5F5", // Light gray
    },
    // Add more color configurations as needed
  },
  fontConfig: {
    FiraSansExtraCondensed: {
      100: {
        normal: "FiraSansExtraCondensed-Thin",
        italic: "FiraSansExtraCondensed-ThinItalic",
      },
      200: {
        normal: "FiraSansExtraCondensed-ExtraLight",
        italic: "FiraSansExtraCondensed-ExtraLightItalic",
      },
      300: {
        normal: "FiraSansExtraCondensed-Light",
        italic: "FiraSansExtraCondensed-LightItalic",
      },
      400: {
        normal: "FiraSansExtraCondensed-Regular",
      },
      500: {
        normal: "FiraSansExtraCondensed-Medium",
        italic: "FiraSansExtraCondensed-MediumItalic",
      },
      600: {
        normal: "FiraSansExtraCondensed-SemiBold",
        italic: "FiraSansExtraCondensed-SemiBoldItalic",
      },
      700: {
        normal: "FiraSansExtraCondensed-Bold",
        italic: "FiraSansExtraCondensed-BoldItalic",
      },
      800: {
        normal: "FiraSansExtraCondensed-ExtraBold",
        italic: "FiraSansExtraCondensed-ExtraBoldItalic",
      },
      900: {
        normal: "FiraSansExtraCondensed-Black",
        italic: "FiraSansExtraCondensed-BlackItalic",
      },
    },
  },
  fonts: {
    heading: "FiraSansExtraCondensed-Medium",
    body: "FiraSansExtraCondensed-Medium",
    mono: "FiraSansExtraCondensed-Medium",
  },
});

export default theme;
