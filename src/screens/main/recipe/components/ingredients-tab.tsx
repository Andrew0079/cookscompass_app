import React from "react";
import { Box, Text, Divider, HStack, VStack } from "native-base";

function IngredientsTab({ recipeDetail }: any) {
  const ingredients: { name: string }[] = recipeDetail?.ingredients;
  return (
    <VStack space={2} paddingLeft={2} paddingRight={2}>
      {ingredients.map((item, index: number) => (
        <Box
          key={index}
          paddingLeft={3}
          paddingRight={3}
          paddingTop={index === 0 ? 5 : 0}
          paddingBottom={ingredients.length - 1 === index ? 10 : 0}
        >
          <HStack space={3} alignItems="center">
            <Text fontSize="sm">{`${index + 1}.`}</Text>
            <Text fontSize="sm" flex={1} flexWrap="wrap">
              {item.name}
            </Text>
          </HStack>
          <Divider my="2" />
        </Box>
      ))}
    </VStack>
  );
}

export default IngredientsTab;