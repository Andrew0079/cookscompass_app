import React from "react";
import { HStack, Box } from "native-base";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Header({
  children,
  paddingBottom,
  borderBottomWidth,
  borderBottomColor,
}: {
  children: React.ReactNode;
  paddingBottom?: number;
  borderBottomWidth?: number;
  borderBottomColor?: string;
}) {
  const safeAreaInsets = useSafeAreaInsets();
  const isAndroid = Platform.OS === "android";

  return (
    <Box
      borderBottomWidth={borderBottomWidth}
      borderBottomColor={borderBottomColor}
      backgroundColor="white"
      paddingBottom={paddingBottom}
      paddingTop={isAndroid ? safeAreaInsets.top : 50}
      zIndex={1}
    >
      <HStack>{children}</HStack>
    </Box>
  );
}

export default Header;
