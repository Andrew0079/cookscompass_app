import React, { useState } from "react";
import { HStack, Box, View, Spinner, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { ROUTES } from "../../../../utils/common";
import { FlashList } from "@shopify/flash-list";
import {
  VerticalRecipeCardView,
  RecipeCardSkeletonListView,
  // @ts-ignore
} from "@components";
import { Node } from "../../../../common/interfaces/interfaces";

function Footer({ isLoading }: { isLoading: boolean }) {
  return isLoading ? <Spinner size="sm" color="#CACCCE" /> : null;
}

const renderRecipeCard = (node: Node, navigation) => {
  const {
    id,
    likes,
    isRecipeLiked,
    mainImage,
    name,
    totalTime,
    nutrientsPerServing,
  } = node;

  const handleNavigation = (node: Node) => {
    navigation.navigate(ROUTES.RECIPE, {
      node: node,
      path: ROUTES.SEARCH,
    });
  };

  return (
    <VerticalRecipeCardView
      recipeId={id}
      likes={likes}
      isRecipeLiked={isRecipeLiked}
      image={mainImage}
      recipeName={name}
      totalTime={totalTime}
      kcal={nutrientsPerServing?.calories}
      onHandleNavigation={() => handleNavigation(node)}
    />
  );
};

function VerticalCardListView({ navigation, data, loadingData, onEndReached }) {
  const [isLoading, setIsLoading] = useState(false);

  // Function to process data into pairs
  const processDataIntoPairs = (data) => {
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      pairs.push([data[i], i + 1 < data.length ? data[i + 1] : null]);
    }
    return pairs;
  };

  const dataPairs = processDataIntoPairs(data);

  return (
    <Box style={styles.flashListContainer}>
      {loadingData ? (
        <RecipeCardSkeletonListView />
      ) : (
        <FlashList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          estimatedItemSize={200}
          data={dataPairs}
          ListFooterComponent={<Footer isLoading={isLoading} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            setIsLoading(true);
            onEndReached();
            setIsLoading(false);
          }}
          renderItem={({ item: [firstNode, secondNode] }) => {
            return (
              <Box
                shadow={5}
                width="95%"
                alignSelf="center"
                paddingTop={2}
                paddingBottom={2}
                paddingRight={1}
                paddingLeft={1}
              >
                <HStack space={2} alignItems="center" justifyContent="center">
                  {/* First Column */}
                  {firstNode && (
                    <VStack
                      flex={1}
                      borderRadius={10}
                      alignItems={secondNode ? "center" : "fex-start"}
                      justifyContent="center"
                    >
                      {renderRecipeCard(firstNode.node, navigation)}
                    </VStack>
                  )}

                  {/* Second Column */}
                  {secondNode && (
                    <VStack
                      flex={1}
                      borderRadius={10}
                      alignItems="center"
                      justifyContent="center"
                    >
                      {renderRecipeCard(secondNode.node, navigation)}
                    </VStack>
                  )}
                </HStack>
              </Box>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    overflow: "hidden",
    height: 80,
    borderRadius: 5,
  },
  flashListContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default VerticalCardListView;
