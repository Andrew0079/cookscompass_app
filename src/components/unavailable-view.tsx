import { HStack, Text } from "native-base";
import React from "react";

function UnavailableView() {
  return (
    <HStack padding={7}>
      <Text color="gray.400">Not available</Text>
    </HStack>
  );
}

export default UnavailableView;
