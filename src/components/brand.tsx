import React from "react";
import { VStack, Text } from "native-base";

function Brand({ flex }: { flex?: number }) {
  return (
    <VStack flex={flex} alignItems="center" justifyContent="center">
      <Text color="white" fontSize="5xl" fontStyle="italic" fontWeight="800">
        Munch
      </Text>
      <Text
        textAlign="center"
        color="white"
        fontSize="xl"
        fontStyle="italic"
        fontWeight="600"
        width="80%"
      >
        "Where Every Dish Tells a Story"
      </Text>
    </VStack>
  );
}

export default Brand;
