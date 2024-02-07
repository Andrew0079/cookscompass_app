import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, Platform } from "react-native";
import { Box, VStack, useToast } from "native-base";
// @ts-ignore
import { ToastView } from "@components";
// @ts-ignore
import { api } from "@api/api";
import { VerticalCardListView, SearchScreenHeader, Filter } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../../redux/slices/error-slice";
import { handleRecipeActions } from "../../../utils/functions";
import socket from "../../../services/socket-service";
import { RootState } from "../../../redux/store";
import { SafeAreaView } from "react-native-safe-area-context";

const difficulty = {
  "Under 1 hour": 60,
  "Under 45 minutes": 45,
  "Under 30 minutes": 30,
  "Under 15 minutes": 15,
};

const filterSections = {
  mealTime: true,
  macroNutrientsRange: true,
  maxPrepTime: true,
  tags: false,
  cuisines: false,
};

const isIOS = Platform.OS === "ios";

function Recipes({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState<object | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [after, setAfter] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [liked, setLiked] = useState(null);
  const [isLoadingOnScroll, setIsLoadingOnScroll] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  const userId = useSelector(
    (state: RootState) => state?.user?.value?.customUserId
  );

  const handleSelectItem = (section: string, item: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (filterSections[section]) {
        // Toggle the item
        if (updatedFilters[section] === item) {
          delete updatedFilters[section]; // Remove key if item is the same (toggle off)
        } else {
          updatedFilters[section] = item; // Set new item
        }
      } else {
        if (Array.isArray(updatedFilters[section])) {
          const sectionIndex = updatedFilters[section].indexOf(item);

          if (sectionIndex !== -1) {
            updatedFilters[section].splice(sectionIndex, 1);
            if (updatedFilters[section].length === 0) {
              delete updatedFilters[section]; // Remove key if array is empty after removal
            }
          } else {
            updatedFilters[section].push(item);
          }
        } else {
          if (updatedFilters[section] === item) {
            delete updatedFilters[section]; // Remove key if item is the same (toggle off)
          } else {
            updatedFilters[section] = [item]; // Create new array with the item
          }
        }
      }

      return updatedFilters;
    });
  };

  const fetchRecipes = async (additionalFilters = {}, isScrolling = false) => {
    try {
      if (!isScrolling) {
        setLoadingData(true);
      }
      const response = await api.getRecipesByFilter(additionalFilters);
      const nextPage =
        response?.data?.recipeSearch?.pageInfo?.hasNextPage || false;

      const data = response?.data?.recipeSearch?.edges || [];
      const cursor = response?.data?.recipeSearch?.pageInfo?.endCursor || null;

      if ((additionalFilters as { after: boolean })?.after) {
        // Pagination request, append new data
        setRecipes((prevRecipes) => [...prevRecipes, ...data]);
      } else {
        // Initial or filter change request, replace data
        setRecipes(data);
      }

      setAfter(cursor);
      setHasNextPage(nextPage);
      setLoadingData(false);
    } catch (error) {
      dispatch(
        setError({
          error: "Unable to load recipes. Please try again.",
          visible: true,
        })
      );
      setLoadingData(false);
    }
  };

  const getRecipesByFilter = async () => {
    if (query || (filters && Object.keys(filters).length > 0)) {
      const prepTime = difficulty?.[(filters as any)?.maxPrepTime];
      const maxPrepTime = prepTime ? { maxPrepTime: prepTime } : {};

      const customFilters = {
        ...filters,
        ...maxPrepTime,
        ...{ query },
      };

      setIsFilterOpen(false);

      await fetchRecipes(customFilters ? customFilters : {});
    }
  };

  const getRecipesByFilterOnScroll = async () => {
    if (hasNextPage && after) {
      await fetchRecipes({ after }, true);
      setIsLoadingOnScroll(false);
    }
  };

  const handleRecipeActionLikeClick = async (recipeId: string) => {
    // Capture the current state before making changes
    const originalRecipes = [...recipes];

    // Set the liked recipe in the state
    const likedRecipe = recipes.find((recipe) => recipe.node.id === recipeId);
    setLiked(likedRecipe);

    try {
      // Make the server-side request
      await handleRecipeActions(recipeId);
    } catch (error) {
      // If the server call fails, revert the optimistic update
      setRecipes(originalRecipes);
      toast.show({
        placement: "top",
        render: () => <ToastView text="Unable to perform like action" />,
      });
    }
  };

  useEffect(() => {
    const handleLikeUpdates = () => {
      setRecipes((prevCategories) => {
        return prevCategories.map((category) => {
          if (category?.node) {
            const node = category.node;
            const currentRecipeId = node.id;
            const currentCount = node.likes;
            const likedRecipeId = liked?.node?.id;
            const isLiked = node?.isRecipeLiked;

            // If the current recipe is the liked/disliked recipe
            if (currentRecipeId === likedRecipeId) {
              if (!isLiked) {
                return {
                  ...category,
                  node: {
                    ...node,
                    likes: parseInt(currentCount) + 1,
                    isRecipeLiked: true,
                  },
                };
              } else {
                return {
                  ...category,
                  node: {
                    ...node,
                    likes: parseInt(currentCount) - 1,
                    isRecipeLiked: false,
                  },
                };
              }
            } else {
              // No changes if the current recipe is not the liked/disliked one
              return category;
            }
          } else {
            // Return category unchanged if node does not exist
            return category;
          }
        });
      });
    };
    handleLikeUpdates();
  }, [liked]);

  useEffect(() => {
    const likeUpdateHandler = (data) => {
      const currentRecipeId = data?.recipeId;
      const newLikeCount = data?.newLikeCount;
      const userActionId = parseInt(data?.userId) === parseInt(userId);

      if (currentRecipeId && newLikeCount !== undefined && !userActionId) {
        setRecipes((prevRecipes) => {
          return prevRecipes.map((recipe) => {
            if (recipe.node.id === currentRecipeId) {
              return {
                ...recipe,
                node: {
                  ...recipe.node,
                  likes: newLikeCount,
                },
              };
            }
            return recipe;
          });
        });
      }
    };

    socket.on("likeUpdate", likeUpdateHandler);

    return () => {
      socket.off("likeUpdate", likeUpdateHandler); // Clean up the event listener when the component unmounts
    };
  }, []);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      await fetchRecipes();
    };
    fetchRandomRecipes();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={isIOS ? ["top"] : undefined}
    >
      <View style={styles.searchRecipesContainer}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
          translucent
        />
        <VStack flex={1}>
          <Box>
            <SearchScreenHeader
              hasFilter={!!(filters && Object.keys(filters).length > 0)}
              onSetIsFilterOpen={setIsFilterOpen}
              onSearch={getRecipesByFilter}
              onSetQuery={setQuery}
              onSetFilters={setFilters}
            />
          </Box>
          <Box flex={1}>
            {!isFilterOpen && (
              <VerticalCardListView
                loadingData={loadingData}
                navigation={navigation}
                data={recipes}
                isLoadingOnScroll={isLoadingOnScroll}
                onEndReached={getRecipesByFilterOnScroll}
                onHandleRecipeActionLikeClick={handleRecipeActionLikeClick}
                onSetIsLoadingOnScroll={setIsLoadingOnScroll}
              />
            )}
            {isFilterOpen && (
              <Filter
                filters={filters}
                onHandleSelectItem={handleSelectItem}
                onEndReached={getRecipesByFilter}
              />
            )}
          </Box>
        </VStack>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchRecipesContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "red",
  },
});

export default Recipes;
