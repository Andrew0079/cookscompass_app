import { extendTheme } from "native-base";

const theme = extendTheme({
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
