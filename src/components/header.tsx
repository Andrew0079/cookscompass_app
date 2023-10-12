import React from "react";
import { HStack } from "native-base";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Header({ children }) {
  const safeAreaInsets = useSafeAreaInsets();
  const isAndroid = Platform.OS === "android";

  return (
    <HStack
      space={2}
      paddingLeft={2}
      style={isAndroid ? { paddingTop: safeAreaInsets.top } : {}}
    >
      {children}
    </HStack>
  );
}

export default Header;
