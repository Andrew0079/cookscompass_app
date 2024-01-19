import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Image } from "react-native";
import { Text, View, VStack } from "native-base";
import { FlashList } from "@shopify/flash-list";
// @ts-ignore
import { api } from "@api/api";
import { CategoryRecipeCard } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/loading-slice";
import { RootState } from "../../../redux/store";
import socket from "../../../services/socket-service";

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

function HorizontalCardListView({
  categoryData,
  navigation,
  onSetLiked,
  liked,
  isLikeLoading,
}) {
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
          <CategoryRecipeCard
            item={item}
            navigation={navigation}
            isLikeLoading={isLikeLoading}
            onSetLiked={onSetLiked}
          />
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
  const [liked, setLiked] = useState(null);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isSocketLoading, setIsSocketLoading] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.value);

  useEffect(() => {
    socket.on("likeUpdate", (data) => {
      setIsSocketLoading(true);
      setCategories((prevCategories) => {
        return prevCategories.map((category) => {
          if (category?.data && category?.data?.data) {
            const newData = category.data.data.map((node) => {
              const currentRecipeId = node.node.id;

              const likedRecipeId = data?.recipeId;
              const newLikeCount = data?.newLikeCount;

              if (currentRecipeId === likedRecipeId) {
                return {
                  ...node,
                  node: {
                    ...node.node,
                    likes: newLikeCount,
                  },
                };
              } else {
                return node;
              }
            });
            // Return the updated category with the new data
            return {
              ...category,
              data: {
                ...category.data,
                data: newData,
              },
            };
          } else {
            return category;
          }
        });
      });
      setIsSocketLoading(false);
    });

    return () => {
      socket.off("likeUpdate"); // Clean up the event listener when the component unmounts
    };
  }, []);

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

  useEffect(() => {
    const handleLikeUpdates = () => {
      setIsLikeLoading(true);
      setCategories((prevCategories) => {
        return prevCategories.map((category) => {
          if (category?.data && category?.data?.data) {
            const newData = category.data.data.map((node) => {
              const currentRecipeId = node.node.id;
              const likedRecipeId = liked?.recipeId;
              const isLiked = liked?.type === "LIKE";

              // Update node properties based on the conditions
              if (currentRecipeId === likedRecipeId) {
                return {
                  ...node,
                  node: {
                    ...node.node,
                    isRecipeLiked: isLiked,
                  },
                };
              } else {
                return node;
              }
            });
            // Return the updated category with the new data
            return {
              ...category,
              data: {
                ...category.data,
                data: newData,
              },
            };
          } else {
            return category;
          }
        });
      });
      setIsLikeLoading(false);
    };

    handleLikeUpdates();
  }, [liked]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image
            source={require("../../../../assets/backgrounds/soup.jpg")}
            style={styles.headerImage}
          />
          <View style={styles.imageOverlay} />
          <View style={styles.overlayContent}>
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
          </View>
        </View>

        {categories.length > 0 &&
          categories.map((category, index) => (
            <HorizontalCardListView
              key={index}
              categoryData={category}
              navigation={navigation}
              liked={liked}
              isLikeLoading={isLikeLoading || isSocketLoading}
              onSetLiked={setLiked}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 10, // Adjust as needed
    marginBottom: 10, // Adjust as needed
  },
  headerImage: {
    width: "100%",
    height: 230, // Set a fixed height
    borderRadius: 25,
  },
  overlayContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Adjust opacity for desired darkness
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
});

export default Discover;
