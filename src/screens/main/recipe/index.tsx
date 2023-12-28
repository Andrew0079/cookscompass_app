import React from "react";
import { Box, Text } from "native-base";
// @ts-ignore
import { RecipeCardView } from "@components";

function Recipe({ route }) {
  console.log(route);
  return <RecipeCardView />;
}

export default Recipe;
