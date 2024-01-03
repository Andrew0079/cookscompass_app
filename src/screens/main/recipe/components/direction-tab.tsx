import React from "react";
import { Box, Text, Divider, HStack, VStack } from "native-base";

function DirectionTab({ recipeDetail }: any) {
  const directions = recipeDetail?.instructions;
  return (
    <VStack space={2} paddingLeft={2} paddingRight={2}>
      {directions.map((item: string, index: number) => (
        <Box
          key={index}
          paddingLeft={3}
          paddingRight={3}
          paddingTop={index === 0 ? 5 : 0}
          paddingBottom={directions.length - 1 === index ? 10 : 0}
        >
          <HStack space={3} alignItems="center">
            <Text fontSize="sm">{`${index + 1}.`}</Text>
            <Text fontSize="sm" flex={1} flexWrap="wrap">
              {item}
            </Text>
          </HStack>
          <Divider my="2" />
        </Box>
      ))}
    </VStack>
  );
}

export default DirectionTab;
