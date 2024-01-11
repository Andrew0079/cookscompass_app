import React from "react";

import ListItemTemplate from "./list-item-template";

function DirectionTab({ recipeDetail }: any) {
  const directions = recipeDetail?.instructions;

  return <ListItemTemplate data={directions} />;
}

export default DirectionTab;
