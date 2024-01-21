import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Text, View, Box } from "native-base";
// @ts-ignore
import { api } from "@api/api";
import { HorizontalCardListView, CategoryRecipeCard } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/loading-slice";
import { RootState } from "../../../redux/store";
import socket from "../../../services/socket-service";
import { FlashList } from "@shopify/flash-list";

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

function Discover({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [foodTrivia, setFoodTrivia] = useState<string | null>(null);
  const [liked, setLiked] = useState(null);
  const [likedToRevert, setLikedToRevert] = useState(null);
  const [revertLike, setRevertLike] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.value);
  const userId = useSelector(
    (state: RootState) => state?.user?.value?.customUserId
  );

  useEffect(() => {
    socket.on("likeUpdate", (data) => {
      setCategories((prevCategories) => {
        return prevCategories.map((category) => {
          if (category?.data && category?.data?.data) {
            const newData = category.data.data.map((node) => {
              const currentRecipeId = node.node.id;
              const userActionId = parseInt(data?.userId) === parseInt(userId);

              const likedRecipeId = data?.recipeId;
              const newLikeCount = data?.newLikeCount;

              if (currentRecipeId === likedRecipeId && !userActionId) {
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
        } catch (err) {
          console.log("spoonacolar", err);
        }
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
    if (revertLike) {
      setCategories((prevCategories) => {
        return prevCategories.map((category) => {
          if (category?.data && category?.data?.data) {
            const newData = category.data.data.map((node) => {
              const currentRecipeId = node.node.id;
              const currentCount = likedToRevert?.count;
              const likedRecipeId = likedToRevert?.recipeId;
              const isLiked = likedToRevert?.isLiked;

              // user likes recipe
              if (currentRecipeId === likedRecipeId) {
                return {
                  ...node,
                  node: {
                    ...node.node,
                    likes: currentCount,
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
      setRevertLike(false);
    }
  }, [likedToRevert, revertLike]);

  useEffect(() => {
    const handleLikeUpdates = () => {
      setCategories((prevCategories) => {
        return prevCategories.map((category) => {
          if (category?.data && category?.data?.data) {
            const newData = category.data.data.map((node) => {
              const currentRecipeId = node.node.id;
              const currentCount = node.node.likes;
              const likedRecipeId = liked?.recipeId;
              const isLiked = liked?.isRecipeLiked;

              // to revert
              if (currentRecipeId === likedRecipeId) {
                setLikedToRevert({
                  recipeId: likedRecipeId,
                  count: currentCount,
                  isLiked,
                });
              }

              // user likes recipe
              if (currentRecipeId === likedRecipeId && !isLiked) {
                return {
                  ...node,
                  node: {
                    ...node.node,
                    likes: currentCount + 1,
                    isRecipeLiked: true,
                  },
                };
              }
              // user dislike recipe
              if (currentRecipeId === likedRecipeId && isLiked) {
                return {
                  ...node,
                  node: {
                    ...node.node,
                    likes: currentCount - 1,
                    isRecipeLiked: false,
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
    };

    handleLikeUpdates();
  }, [liked]);

  const data = [
    { title: "Yummy Soups", itemKey: "soup" },
    {
      title: "Healthy Treats",
      itemKey: "treat",
    },
    { title: "Lovely Salad", itemKey: "salad" },
    { title: "Healthy Smoothies", itemKey: "smoothie" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerArea}>
        <Text fontSize="xl" fontWeight="bold">
          Discover Recipes
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text fontWeight="bold" fontSize="lg" marginLeft={4} color="gray.500">
            WHAT'S HOT
          </Text>
          <FlashList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => {
              const lastItemKey = data?.[data.length - 1]?.itemKey;

              return (
                <Box
                  marginLeft={4}
                  marginRight={lastItemKey === item.itemKey ? 4 : 0}
                >
                  <CategoryRecipeCard
                    title={item.title}
                    itemKey={item.itemKey}
                  />
                </Box>
              );
            }}
            estimatedItemSize={350}
          />
        </View>

        {categories.length > 0 &&
          categories.map((category, index) => (
            <HorizontalCardListView
              key={index}
              categoryData={category}
              navigation={navigation}
              onSetLiked={setLiked}
              onSetRevertLike={setRevertLike}
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
    backgroundColor: "#f2f2f2",
  },
  header: {
    width: "100%",
    marginTop: 10, // Adjust as needed
    marginBottom: 10, // Adjust as needed
  },
  headerImage: {
    flexGrow: 1,
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
  headerArea: {
    paddingBottom: 10, // Adjust as per your requirement
    backgroundColor: "white", // Adjust as per your requirement
    alignItems: "center", // Center the header text horizontally
    justifyContent: "center", // Center the header text vertically
  },
});

export default Discover;
