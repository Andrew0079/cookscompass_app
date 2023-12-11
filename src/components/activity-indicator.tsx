import React from "react";
import { VStack, Center, Box, Text } from "native-base";
import LottieView from "lottie-react-native";

function ActivityIndicator({
  loading,
  loadingText,
  spinHeight,
  spinWidth,
  loadingTextColor,
}: {
  loading: boolean;
  spinHeight?: number;
  spinWidth?: number;
  loadingText?: string;
  loadingTextColor?: string;
}) {
  if (!loading) {
    return null; // Return null when loading is false to hide the overlay
  }

  const height = spinHeight ?? 100;
  const width = spinWidth ?? 100;

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="rgba(0, 0, 0, 0.5)" // Adjust the overlay background color and opacity here
      justifyContent="center"
      alignItems="center"
      zIndex={999999999999} // Ensure it's displayed above other components
    >
      <VStack space={2} alignItems="center">
        <LottieView
          source={require("../../assets/animation/lottie/loading-indicator.json")}
          autoPlay
          loop
          style={{ width, height }}
        />
        {loadingText && (
          <Center>
            <Text
              color={loadingTextColor ?? "white"}
              fontSize="md"
              fontWeight="700"
            >
              {loadingText}
            </Text>
          </Center>
        )}
      </VStack>
    </Box>
  );
}

export default ActivityIndicator;
