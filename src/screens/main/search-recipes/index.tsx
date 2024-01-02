import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
// @ts-ignore
import { api } from "@api/api";
import {
  HorizontalCardListView,
  SearchScreenHeader,
  Filter,
  SearchRecipesAnimation,
} from "./components";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/slices/loading-slice";
import { setError } from "../../../redux/slices/error-slice";

function SearchRecipes({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState<object | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [query, setQuery] = useState<string | null>(null);

  const dispatch = useDispatch();

  const isRecipesListAvailable = recipes.length > 0;

  const resetSearch = () => {
    setQuery(null);
    setIsFilterOpen(false);
  };

  const handleSelectItem = (section: string, title: string, item: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      // Check if the section exists and has items array
      if (
        updatedFilters[section] &&
        Array.isArray(updatedFilters[section].items)
      ) {
        const sectionIndex = updatedFilters[section].items.indexOf(item);

        if (sectionIndex !== -1) {
          // Remove the item if it is already selected
          updatedFilters[section].items.splice(sectionIndex, 1);
        } else {
          // Add the item if it is not selected
          updatedFilters[section].items.push(item);
        }
      } else {
        // Create a new section with the title and item
        updatedFilters[section] = { title: title, items: [item] };
      }

      return updatedFilters;
    });
  };

  useEffect(() => {
    const getRecipesByFilter = async () => {
      dispatch(setLoading(true));
      try {
        const response = await api.getRecipesByFilter();
        const data = response?.data?.recipeSearch?.edges || [];
        setRecipes(data);
        setSearch(false);
        dispatch(setLoading(false));
      } catch (error) {
        setSearch(false);
        dispatch(
          setError({
            error: "Unable to load recipes. Please try again.",
            visible: true,
          })
        );
        dispatch(setLoading(false));
      }
    };

    if (search && (query || filters)) {
      getRecipesByFilter();
    }
  }, [search]);

  return (
    <View style={styles.searchRecipesContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.topSection}>
        <SearchScreenHeader
          hasFilter={!!(filters && Object.keys(filters).length > 0)}
          onSetIsFilterOpen={setIsFilterOpen}
          onSearch={setSearch}
          onSetQuery={setQuery}
          onSetFilters={setFilters}
        />
        <SafeAreaView style={styles.safeAreaView}>
          {!isFilterOpen && isRecipesListAvailable && (
            <HorizontalCardListView navigation={navigation} data={recipes} />
          )}
          <SearchRecipesAnimation />
          {isFilterOpen && (
            <Filter filters={filters} onHandleSelectItem={handleSelectItem} />
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
