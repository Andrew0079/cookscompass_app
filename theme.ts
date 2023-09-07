import { extendTheme } from "native-base";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#F0FAF3", // lightest green
      100: "#DFF2E6",
      200: "#BFE9D2",
      300: "#9EE1BD",
      400: "#7ED8A8",
      500: "#5DCF93", // base green
      600: "#4AC880",
      700: "#39C06D",
      800: "#28B85A",
      900: "#17B048", // darkest green (still kept light)
    },
    secondary: {
      50: "#E9E9E9", // soft grey
      100: "#D4D4D4",
      200: "#BEBEBE",
      300: "#A8A8A8",
      400: "#929292",
      500: "#7C7C7C",
      600: "#676767",
      700: "#515151",
      800: "#3B3B3B",
      900: "#262626",
    },
    accent: {
      500: "#FFD700", // if you want to keep your previous accent color
    },
    background: {
      100: "#FEFEFE", // almost white
      500: "#FFFFFF", // pure white
    },
  },
  // You can uncomment the fontConfig and fonts section once you have decided on a font.

  //   fontConfig: {
  //     Lato: {
  //       100: {
  //         normal: "Lato-Light",
  //         italic: "Lato-LightItalic",
  //       },
  //       200: {
  //         normal: "Lato-Regular",
  //         italic: "Lato-Italic",
  //       },
  //       300: {
  //         normal: "Lato-SemiBold",
  //         italic: "Lato-SemiBoldItalic",
  //       },
  //       400: {
  //         normal: "Lato-Bold",
  //         italic: "Lato-BoldItalic",
  //       },
  //     },
  //   },
  //   fonts: {
  //     heading: "Lato",
  //     body: "Lato",
  //     mono: "Lato",
  //   },
});

export default theme;
