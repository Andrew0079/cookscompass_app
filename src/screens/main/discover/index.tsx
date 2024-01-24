import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Text, View, Box } from "native-base";
// @ts-ignore
import { api } from "@api/api";
import axios from "axios";
import {
  HorizontalCardListView,
  CategoryRecipeCard,
  LoadingSkeletonListView,
} from "./components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import socket from "../../../services/socket-service";
import { FlashList } from "@shopify/flash-list";

function Discover({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [liked, setLiked] = useState(null);
  const [likedToRevert, setLikedToRevert] = useState(null);
  const [revertLike, setRevertLike] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const initialCategories = [
  //   "drinks",
  //   "Low-Carb",
  //   "chicken",
  //   "Paleo",
  //   "desserts",
  // ];

  const userId = useSelector(
    (state: RootState) => state?.user?.value?.customUserId
  );

  const discoveryData = useSelector(
    (state: RootState) => state?.discovery?.value
  );

  useEffect(() => {
    const likeUpdateHandler = (data) => {
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
    };

    socket.on("likeUpdate", likeUpdateHandler);

    return () => {
      socket.off("likeUpdate", likeUpdateHandler); // Clean up the event listener when the component unmounts
    };
  }, []);

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
        <View
          shadow={9}
          width="100%"
          marginTop={3} // Adjust as needed
          marginBottom={5}
        >
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

        {loading && <LoadingSkeletonListView categories={[]} />}

        {discoveryData?.length > 0 &&
          discoveryData.map((category, index) => (
            <Box key={index}>
              <HorizontalCardListView
                categoryData={category}
                navigation={navigation}
                onSetLiked={setLiked}
                onSetRevertLike={setRevertLike}
              />
            </Box>
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
