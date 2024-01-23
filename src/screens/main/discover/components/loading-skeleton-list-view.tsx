import React from "react";
import { View, VStack, Text, Box } from "native-base";
// @ts-ignore
import { RecipeCardSkeletonListView } from "@components";

function LoadingSkeletonListView({ categories }: { categories: string[] }) {
  return (
    <View>
      {categories.map((category: string, index: number) => (
        <VStack key={`key-${index}`}>
          <View>
            <Text
              fontWeight="bold"
              fontSize="lg"
              marginLeft={4}
              color="gray.500"
            >
              {category.toUpperCase()}
            </Text>
          </View>
          <Box marginLeft={4} marginRight={4}>
            <RecipeCardSkeletonListView direction="horizontal" />
          </Box>
        </VStack>
      ))}
    </View>
  );
}

export default LoadingSkeletonListView;
