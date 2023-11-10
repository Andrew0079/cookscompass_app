import React from "react";
import { VStack, Center, Spinner, Box, Text } from "native-base";

function ActivityIndicator({
  loading,
  spinColor,
  spinSize,
  loadingText,
  loadingTextColor,
}: {
  loading: boolean;
  spinColor?: string;
  spinSize?: string;
  loadingText?: string;
  loadingTextColor?: string;
}) {
  if (!loading) {
    return null; // Return null when loading is false to hide the overlay
  }

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
      zIndex={9999} // Ensure it's displayed above other components
    >
      <VStack space={2} alignItems="center">
        <Spinner
          color={spinColor ?? "white"}
          size={spinSize ?? "sm"}
          accessibilityLabel="Loading"
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
