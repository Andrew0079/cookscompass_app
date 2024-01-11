import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View, Box, Badge, VStack, HStack } from "native-base";
import { FlashList } from "@shopify/flash-list";
// @ts-ignore
import { api } from "@api/api";
import { CategoryRecipeCard, HeaderImageScrollView } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/loading-slice";
import { RootState } from "../../../redux/store";

const getRecipesByCategoryTags = async (tag: string) => {
  try {
    const response = await api.getRecipeByTag(tag);
    const nextPage =
      response?.data?.recipeSearch?.pageInfo?.hasNextPage || false;

    const data = response?.data?.recipeSearch?.edges || [];
    const cursor = response?.data?.recipeSearch?.pageInfo?.endCursor || null;
    return { data, nextPage, cursor };
  } catch (error) {
    return { data: [], nextPage: null, cursor: null };
  }
};

function HorizontalCardListView({ categoryData, navigation, index }) {
  const data = categoryData.data.data;
  const title = categoryData.title;
  return (
    <View style={styles.listContainer}>
      <Text fontWeight="bold" fontSize="xl" marginLeft={4} color="black">
        {title.toUpperCase()}
      </Text>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <CategoryRecipeCard item={item} navigation={navigation} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={350} // Set an appropriate estimated size
      />
    </View>
  );
}

function Discover({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [foodTrivia, setFoodTrivia] = useState<string | null>(null);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.value);

  useEffect(() => {
    const getData = async () => {
      dispatch(setLoading(true));
      const getFoodTrivia = async () => {
        try {
          const response = await api.getRandomFoodTrivia();
          if (response?.text) setFoodTrivia(response.text);
        } catch (err) {}
      };
      const fetchInitialCategories = async () => {
        try {
          const initialCategories = ["drinks", "Low-Carb", "chicken"];
          const fetchedCategories = await Promise.all(
            initialCategories.map(async (tag) => ({
              title: tag,
              data: await getRecipesByCategoryTags(tag),
            }))
          );
          setCategories(fetchedCategories);
        } catch (error) {
          console.error(error);
        }
      };
      if (!foodTrivia) {
        await getFoodTrivia();
      }
      await fetchInitialCategories();
      dispatch(setLoading(false));
    };

    getData();
  }, []);

  useEffect(() => {
    const fetchMoreCategories = async () => {
      try {
        const moreCategories = ["Paleo", "desserts"];
        const fetchedCategories = await Promise.all(
          moreCategories.map(async (tag) => ({
            title: tag,
            data: await getRecipesByCategoryTags(tag),
          }))
        );
        setCategories((prevCategories) => [
          ...prevCategories,
          ...fetchedCategories,
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    if (!loading && categories.length > 0) {
      fetchMoreCategories();
    }
  }, [loading]);

  return (
    <View style={styles.container}>
      <HeaderImageScrollView
        headerContent={
          <VStack justifyContent="flex-end" width="95%">
            <Text
              color="white"
              fontWeight="bold"
              fontStyle="italic"
              fontSize={22}
              paddingLeft={3}
              paddingBottom={3}
            >
              Did you know ?
            </Text>
            <Text
              color="white"
              fontWeight="bold"
              fontStyle="italic"
              paddingLeft={5}
              numberOfLines={7}
              fontSize={14}
              lineHeight={22}
            >
              {foodTrivia}
            </Text>
          </VStack>
        }
      >
        {categories.length > 0 &&
          categories.map((category, index) => (
            <HorizontalCardListView
              key={index}
              categoryData={category}
              navigation={navigation}
              index={index}
            />
          ))}
      </HeaderImageScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: 50,
  },
  listContainer: {
    height: 250,
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "30%", // Adjust as needed
    marginBottom: 20, // Space between the image and the next content
  },
  animatedHeader: {
    position: "absolute",
    backgroundColor: "white",
    height: 55,
    width: "100%",
    top: 0,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#CACCCE",
  },
});

export default Discover;
