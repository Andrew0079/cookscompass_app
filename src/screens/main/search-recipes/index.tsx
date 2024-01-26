import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, StatusBar } from "react-native";
import { useToast } from "native-base";
// @ts-ignore
import { ToastView } from "@components";
// @ts-ignore
import { api } from "@api/api";
import { VerticalCardListView, SearchScreenHeader, Filter } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../../redux/slices/error-slice";
import { RootState } from "../../../redux/store";
import { handleRecipeActions } from "../../../utils/functions";

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

function SearchRecipes({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState<object | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [after, setAfter] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [liked, setLiked] = useState(null);

  const dispatch = useDispatch();
  const toast = useToast();

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
    }
  };

  const handleRecipeActionLikeClick = async (recipeId: string) => {
    setLiked(recipeId);

    const likedRecipe = recipes.forEach((recipe) => {
      console.log(recipe);
    });

    // const nodeIndex = discovery.data.data.findIndex(
    //   (recipe) => recipe.node.id === recipeId
    // );
    // try {
    //   await handleRecipeActions(recipeId);
    // } catch (error) {
    //   toast.show({
    //     placement: "top",
    //     render: () => <ToastView text="Unable to perform like action" />,
    //   });
    //   // If the server call fails, revert the optimistic update
    // }
  };

  useEffect(() => {
    const handleLikeUpdates = () => {
      setRecipes((prevCategories) => {
        return prevCategories.map((category) => {
          if (category?.data && category?.data?.data) {
            const newData = category.data.data.map((node) => {
              const currentRecipeId = node.node.id;
              const currentCount = node.node.likes;
              const likedRecipeId = liked?.recipeId;
              const isLiked = liked?.isRecipeLiked;

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

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      await fetchRecipes();
    };
    fetchRandomRecipes();
  }, []);

  return (
    <View style={styles.searchRecipesContainer}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.topSection}>
        <SearchScreenHeader
          hasFilter={!!(filters && Object.keys(filters).length > 0)}
          onSetIsFilterOpen={setIsFilterOpen}
          onSearch={getRecipesByFilter}
          onSetQuery={setQuery}
          onSetFilters={setFilters}
        />
        <SafeAreaView style={styles.safeAreaView}>
          {!isFilterOpen && (
            <VerticalCardListView
              loadingData={loadingData}
              navigation={navigation}
              data={recipes}
              onEndReached={getRecipesByFilterOnScroll}
              onHandleRecipeActionLikeClick={handleRecipeActionLikeClick}
            />
          )}
          {isFilterOpen && (
            <Filter
              filters={filters}
              onHandleSelectItem={handleSelectItem}
              onEndReached={getRecipesByFilter}
            />
          )}
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchRecipesContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  topSection: {
    flex: 4,
  },
  bottomSection: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "white",
  },
});

export default SearchRecipes;
