import { Platform, StatusBar } from "react-native";

const getPlatFormStyle = () =>
  Platform.OS === "android"
    ? { paddingTop: StatusBar.currentHeight }
    : { paddingTop: 0 };

export { getPlatFormStyle };
