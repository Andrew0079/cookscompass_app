import React, { useEffect, useState, useCallback } from "react";
import { View } from "native-base";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
// @ts-ignore
import { api } from "@api/api";
import {
  Alert,
  Modal,
  ActivityIndicator,

  // @ts-ignore
} from "@components";

import {
  HorizontalCardListView,
  SearchScreenHeader,
  Filter,
  SearchRecipesAnimation,
} from "./components";

function SearchRecipes() {
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [section, setSection] = useState<string | null>("diet");

  const isRecipesListAvailable = randomRecipes.length > 0;

  const test = [
    {
      id: 716406,
      title: "Asparagus and Pea Soup: Real Convenience Food",
      image: "https://spoonacular.com/recipeImages/716406-312x231.jpg",
      imageType: "jpg",
    },
    {
      id: 644387,
      title: "Garlicky Kale",
      image: "https://spoonacular.com/recipeImages/644387-312x231.jpg",
      imageType: "jpg",
    },
    {
      id: 640941,
      title: "Crunchy Brussels Sprouts Side Dish",
      image: "https://spoonacular.com/recipeImages/640941-312x231.jpg",
      imageType: "jpg",
    },
    {
      id: 715540,
      title: "Summer Berry Salad",
      image: "https://spoonacular.com/recipeImages/715540-312x231.jpg",
      imageType: "jpg",
    },
    {
      id: 662670,
      title: "Swiss Chard Wraps",
      image: "https://spoonacular.com/recipeImages/662670-312x231.jpg",
      imageType: "jpg",
    },
    {
      id: 648320,
      title: "Jade Buddha Salmon Tartare",
      image: "https://spoonacular.com/recipeImages/648320-312x231.jpg",
      imageType: "jpg",
    },
    {
      id: 715543,
      title: "Homemade Guacamole",
      image: "https://spoonacular.com/recipeImages/715543-312x231.jpg",
      imageType: "jpg",
    },
    {
      id: 658509,
      title: "Roasted Broccoli with Lemon and Garlic",
      image: "https://spoonacular.com/recipeImages/658509-312x231.jpg",
      imageType: "jpg",
    },
    {
      id: 658579,
      title: "Roasted Endive Salad With Prosciutto, Figs and Pistachios",
      image: "https://spoonacular.com/recipeImages/658579-312x231.jpg",
      imageType: "jpg",
    },
    {
      id: 637162,
      title: "Carrot and Cabbage Salad With Coriander+cumin Dry Rub",
      image: "https://spoonacular.com/recipeImages/637162-312x231.jpg",
      imageType: "jpg",
    },
  ];
  return (
    <View flex={1}>
      <StatusBar barStyle="default" />
      <Modal visible={visible} onClose={setVisible}>
        <Alert
          backgroundColor="white"
          errorMessage={error}
          onPress={() => setVisible(false)}
        />
      </Modal>
      <ActivityIndicator loading={loading} spinSize="lg" />

      <SearchScreenHeader
        onSetIsFilterOpen={setIsFilterOpen}
        onSetLoading={setLoading}
      />

      <SafeAreaView style={styles.safeAreaView}>
        {!isFilterOpen && isRecipesListAvailable && (
          <HorizontalCardListView data={test} />
        )}
        <SearchRecipesAnimation />
        {isFilterOpen && <Filter section={section} onSetSection={setSection} />}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "white",
  },
  touchableOpacity: {
    padding: 4,
    borderColor: "#CACCCE",
    borderWidth: 1,
    borderRadius: 100,
  },
});

export default SearchRecipes;
