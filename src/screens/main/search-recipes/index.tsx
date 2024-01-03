import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, StatusBar } from "react-native";
// @ts-ignore
import { api } from "@api/api";
import {
  HorizontalCardListView,
  SearchScreenHeader,
  Filter,
  SearchRecipesAnimation,
} from "./components";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/loading-slice";
import { setError } from "../../../redux/slices/error-slice";
import { RootState } from "../../../redux/store";

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

  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.value);

  const isRecipesListAvailable = recipes.length > 0;

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

  const getRecipesByFilter = async () => {
    if (query || (filters && Object.keys(filters).length > 0)) {
      setIsFilterOpen(false);
      dispatch(setLoading(true));
      try {
        const prepTime = difficulty?.[(filters as any)?.maxPrepTime];
        const maxPrepTime = prepTime ? { maxPrepTime: prepTime } : {};

        const customFilters = query
          ? { ...filters, ...maxPrepTime, query }
          : { ...filters, ...maxPrepTime };
        const response = await api.getRecipesByFilter(customFilters);
        const nextPage =
          response?.data?.recipeSearch?.pageInfo?.hasNextPage || false;

        const data = response?.data?.recipeSearch?.edges || [];
        const cursor =
          response?.data?.recipeSearch?.pageInfo?.endCursor || null;

        setAfter(cursor);
        setRecipes(data);
        setHasNextPage(nextPage);

        dispatch(setLoading(false));
      } catch (error) {
        dispatch(
          setError({
            error: "Unable to load recipes. Please try again.",
            visible: true,
          })
        );
        dispatch(setLoading(false));
      }
    }
  };

  const getRecipesByFilterOnScroll = async () => {
    if (hasNextPage && after) {
      try {
        const prepTime = difficulty?.[(filters as any)?.maxPrepTime];
        const maxPrepTime = prepTime ? { maxPrepTime: prepTime } : {};

        const customFilters = query
          ? { ...filters, ...maxPrepTime, query, after }
          : { ...filters, ...maxPrepTime, after };

        const response = await api.getRecipesByFilter(customFilters);
        const nextPage =
          response?.data?.recipeSearch?.pageInfo?.hasNextPage || false;

        const data = response?.data?.recipeSearch?.edges || [];
        const cursor =
          response?.data?.recipeSearch?.pageInfo?.endCursor || null;

        setAfter(cursor);
        setRecipes([...recipes, ...data]);
        setHasNextPage(nextPage);
      } catch (error) {
        dispatch(
          setError({
            error: "Unable to load recipes. Please try again.",
            visible: true,
          })
        );
      }
    }
  };

  return (
    <View style={styles.searchRecipesContainer}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={loading}
      />
      <View style={styles.topSection}>
        <SearchScreenHeader
          hasFilter={!!(filters && Object.keys(filters).length > 0)}
          onSetIsFilterOpen={setIsFilterOpen}
          onSearch={getRecipesByFilter}
          onSetQuery={setQuery}
          onSetFilters={setFilters}
        />
        <SafeAreaView style={styles.safeAreaView}>
          {!isFilterOpen && isRecipesListAvailable && (
            <HorizontalCardListView
              navigation={navigation}
              data={recipes}
              onEndReached={getRecipesByFilterOnScroll}
            />
          )}
          <SearchRecipesAnimation />
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
  },
});

export default SearchRecipes;
