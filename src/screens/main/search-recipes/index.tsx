import React, { useEffect, useState } from "react";
import { Button, HStack, View } from "native-base";
import { SafeAreaView, StatusBar, StyleSheet, FlatList } from "react-native";
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

const DEFAULT_SECTION = "diet";

function SearchRecipes({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState<object | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [section, setSection] = useState<string | null>(DEFAULT_SECTION);
  const [search, setSearch] = useState<boolean>(false);
  const [query, setQuery] = useState<string | null>(null);

  const dispatch = useDispatch();

  const isRecipesListAvailable = recipes.length > 0;

  const resetSearch = () => {
    setQuery(null);
    setFilters(null);
    setIsFilterOpen(false);
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
        resetSearch();
      } catch (error) {
        resetSearch();
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

  useEffect(() => {
    if (!isFilterOpen) {
      setFilters(null);
    }
  }, [isFilterOpen]);

  return (
    <View flex={1} style={styles.searchRecipesContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.topSection}>
        <SearchScreenHeader
          onSetIsFilterOpen={setIsFilterOpen}
          onSearch={setSearch}
          onSetQuery={setQuery}
        />
        <SafeAreaView style={styles.safeAreaView}>
          {!isFilterOpen && isRecipesListAvailable && (
            <HorizontalCardListView navigation={navigation} data={recipes} />
          )}
          <SearchRecipesAnimation />
          {isFilterOpen && (
            <Filter
              filters={filters}
              section={section}
              onSetSection={setSection}
              onSetFilters={setFilters}
            />
          )}
        </SafeAreaView>
      </View>

      {isFilterOpen && (
        <View style={styles.bottomSection}>
          <HStack space={2} justifyContent="center" alignContent="center">
            <Button
              variant="outline"
              borderRadius="20"
              width="30%"
              onPress={() => setFilters(null)}
            >
              Clear Filter
            </Button>
            <Button
              variant="outline"
              borderRadius="20"
              width="30%"
              onPress={() => setSearch(true)}
            >
              Search
            </Button>
          </HStack>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topSection: {
    flex: 4,
  },
  bottomSection: {
    flex: 1,
  },
  searchRecipesContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  safeAreaView: {
    flex: 1,
    alignContent: "center",
  },
});

export default SearchRecipes;
