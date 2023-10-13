import React from "react";
import { VStack, Center, Spinner, Text } from "native-base";
import Modal from "./modal";

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
  return (
    <Modal visible={loading}>
      <VStack space={2} justifyContent="center">
        <Spinner
          color={spinColor}
          size={spinSize}
          accessibilityLabel="LoadingPosts"
        />
        <Center>
          <Text color={loadingTextColor} fontSize="md" fontWeight="700">
            {loadingText}
          </Text>
        </Center>
      </VStack>
    </Modal>
  );
}

export default ActivityIndicator;
