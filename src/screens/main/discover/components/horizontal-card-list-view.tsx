import React from "react";
import { View, Text, Box, VStack, useToast } from "native-base";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from "react-native";
import {
  VerticalRecipeCardView,
  // @ts-ignore
} from "@components";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { handleRecipeActions } from "../../../../utils/functions";
import { Node } from "../../../../common/interfaces/interfaces";
import { ROUTES } from "../../../../utils/common";

function HorizontalCardListView({
  categoryData,
  navigation,
  onSetLiked,
  onSetRevertLike,
}) {
  const toast = useToast();

  const data = categoryData.data.data;
  const title = categoryData.title;

  const userId = useSelector(
    (state: RootState) => state.user.value?.customUserId
  );

  const handleRecipeActionLikeClick = async (
    recipeId: string,
    isRecipeLiked: boolean
  ) => {
    try {
      if (userId) {
        onSetLiked({ recipeId, isRecipeLiked });
        await handleRecipeActions(userId, recipeId);
      }
    } catch (error) {
      onSetRevertLike(true);
      toast.show({
        placement: "top",
        render: () => (
          <Box style={styles.toast}>
            <Text color="white">Unable to perform like action</Text>
          </Box>
        ),
      });
    }
  };

  const handleNavigation = (node: Node) => {
    navigation.navigate(ROUTES.RECIPE, {
      node: node,
      path: ROUTES.DISCOVER,
    });
  };

  return (
    <VStack>
      <View>
        <Text fontWeight="bold" fontSize="lg" marginLeft={4} color="gray.500">
          {title.toUpperCase()}
        </Text>
      </View>
      <Box
        height={280}
        marginBottom={18}
        justifyContent="center"
        shadow="9"
        backgroundColor="transparent"
      >
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
                  onHandleRecipeActionLikeClick={handleRecipeActionLikeClick}
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

const styles = StyleSheet.create({
  toast: {
    backgroundColor: "#e6352b",
    padding: 10,
    borderRadius: 10,
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.21,
    // shadowRadius: 7.68,
    // elevation: 10,
  },
});

export default HorizontalCardListView;
