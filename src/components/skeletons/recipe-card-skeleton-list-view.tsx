import React from "react";
import { ScrollView } from "react-native";
import { Box, HStack, VStack } from "native-base";
import VerticalRecipeCardSkeletonView from "./vertical-recipe-card-skeleton-view";

function RecipeCardSkeletonListView({
  direction,
  skeletonPairCount,
}: {
  direction?: "horizontal" | "vertical";
  skeletonPairCount?: number;
}) {
  const count = skeletonPairCount ?? 8; // Number of skeleton pairs you want (since each row has 2, for 8 total skeletons)
  const isHorizontal = direction === "horizontal";
  // Function to generate an array of nulls with the length of skeletonPairCount
  const generateSkeletonPairs = () => Array.from({ length: count });
  return (
    <ScrollView horizontal={isHorizontal}>
      {generateSkeletonPairs().map((_, index) => (
        <Box
          key={index}
          width={isHorizontal ? undefined : "95%"}
          alignSelf="center"
          paddingTop={2}
          paddingBottom={2}
          paddingRight={1}
          paddingLeft={1}
        >
          <HStack space={2} alignItems="center" justifyContent="center">
            {/* First Column Skeleton */}
            <VStack
              flex={1}
              borderRadius={10}
              alignItems="center"
              justifyContent="center"
            >
              <VerticalRecipeCardSkeletonView />
            </VStack>

            {/* Second Column Skeleton */}
            <VStack
              flex={1}
              borderRadius={10}
              alignItems="center"
              justifyContent="center"
            >
              <VerticalRecipeCardSkeletonView />
            </VStack>
          </HStack>
        </Box>
      ))}
    </ScrollView>
  );
}

export default RecipeCardSkeletonListView;
