import React from "react";
import { Box, Text } from "native-base";

function RecipeCardView({ route }) {
  console.log(route);
  return (
    <Box flex={1} background="white">
      <Text>hello</Text>
    </Box>
  );
}

export default RecipeCardView;
