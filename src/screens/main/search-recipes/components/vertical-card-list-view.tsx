import React, { useState } from "react";
import { HStack, Box, Text, Badge, View, Spinner, VStack } from "native-base";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ROUTES } from "../../../../utils/common";
import { FlashList } from "@shopify/flash-list";
// @ts-ignore
import { VerticalRecipeCardView } from "@components";
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

function VerticalCardListView({ navigation, data, onEndReached }) {
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
    <View style={styles.flashListContainer}>
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
              style={[styles.shadowProp]}
              width="95%"
              alignSelf="center"
              padding={2}
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
    </View>
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
    zIndex: 9999999,
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 15,
    paddingBottom: 5,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default VerticalCardListView;
