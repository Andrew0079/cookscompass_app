import React from "react";
import { Box, Text, Divider, HStack, VStack } from "native-base";
// @ts-ignore
import { UnavailableView } from "@components";

function IngredientsWithServingsTab({ recipeDetail }: any) {
  const ingredients: string[] = recipeDetail?.ingredientLines;

  if (!ingredients) return <UnavailableView />;

  const ingredientsSize = ingredients?.length;
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
              {item}
            </Text>
          </HStack>
          {ingredientsSize - 1 !== index && <Divider my="2" />}
        </Box>
      ))}
    </VStack>
  );
}

export default IngredientsWithServingsTab;
