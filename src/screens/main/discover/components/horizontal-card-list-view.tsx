import React from "react";
import { View, Box, VStack } from "native-base";
import { FlashList } from "@shopify/flash-list";
import {
  VerticalRecipeCardView,
  NbTextView,
  // @ts-ignore
} from "@components";

import { Node } from "../../../../common/interfaces/interfaces";
import { ROUTES } from "../../../../utils/common";

function HorizontalCardListView({
  categoryData,
  navigation,
  onHandleRecipeActionLikeClick,
}) {
  const data = categoryData.data.data;
  const title = categoryData.title;

  const handleNavigation = (node: Node) => {
    navigation.navigate(ROUTES.RECIPE, {
      node: node,
      path: ROUTES.DISCOVER,
    });
  };

  return (
    <VStack>
      <View paddingBottom={1}>
        <NbTextView
          fontSize="lg"
          marginLeft={4}
          paddingTop={3}
          paddingBottom={2}
          color="gray.500"
          fontWeight="800"
        >
          {title.toUpperCase()}
        </NbTextView>
      </View>
      <Box marginBottom={4} justifyContent="center">
        <FlashList
          data={data}
          renderItem={({ item: { node } }: { item: { node: Node } }) => {
            const itemId = node?.id;
            const lastItemId = data[data.length - 1]?.node?.id;
            const firstItemId = data?.[0]?.node?.id;

            const {
              id,
              likes,
              isRecipeLiked,
              mainImage,
              name,
              totalTime,
              nutrientsPerServing,
            } = node;

            return (
              <Box
                height={270}
                marginLeft={firstItemId === itemId ? 4 : 3}
                marginRight={lastItemId === itemId ? 4 : 0}
              >
                <VerticalRecipeCardView
                  recipeId={id}
                  likes={likes}
                  isRecipeLiked={isRecipeLiked}
                  image={mainImage}
                  recipeName={name}
                  totalTime={totalTime}
                  kcal={nutrientsPerServing?.calories}
                  onHandleRecipeActionLikeClick={onHandleRecipeActionLikeClick}
                  onHandleNavigation={() => handleNavigation(node)}
                />
              </Box>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={350} // Set an appropriate estimated size
        />
      </Box>
    </VStack>
  );
}

export default HorizontalCardListView;
