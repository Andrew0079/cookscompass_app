import React from "react";
import { Center, VStack, Skeleton, Box, HStack } from "native-base";

function VerticalRecipeCardSkeletonView() {
  const cardHeight = 260;
  const imageHeight = 160;
  const textHeight = cardHeight - imageHeight;

  return (
    <Center w="185" h={cardHeight}>
      <VStack
        w="100%"
        height={cardHeight}
        borderWidth="1"
        space={4}
        overflow="hidden"
        rounded="md"
        _dark={{ borderColor: "coolGray.300" }}
        _light={{ borderColor: "coolGray.200" }}
      >
        {/* Image Skeleton */}
        <Skeleton
          startColor="gray.300"
          endColor="gray.400"
          height={imageHeight}
          width="100%"
        />

        {/* Text Section Skeleton */}
        <VStack height={textHeight} justifyContent="space-between">
          <Skeleton.Text px="4" />
        </VStack>
      </VStack>
    </Center>
  );
}

export default VerticalRecipeCardSkeletonView;
