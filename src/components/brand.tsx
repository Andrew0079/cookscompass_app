import React from "react";
import { VStack, Text } from "native-base";

function Brand({ flex }: { flex?: number }) {
  return (
    <VStack flex={flex} alignItems="center" justifyContent="center">
      <Text color="white" fontSize="4xl" fontStyle="italic" fontWeight="600">
        Munch
      </Text>
      <Text
        paddingTop={3}
        textAlign="center"
        color="white"
        fontSize="2xl"
        fontStyle="italic"
        fontWeight="400"
        width="80%"
      >
        "Where Every Dish{"\n"} Tells a Story"
      </Text>
    </VStack>
  );
}

export default Brand;
