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

function SearchRecipes({ navigation }) {
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [section, setSection] = useState<string | null>("diet");

  const isRecipesListAvailable = recipes.length > 0;

  useEffect(() => {
    const getRecipesByFilter = async () => {
      // setLoading(true);
      try {
        const response = await api.getRecipesByFilter();
        const data = response?.data?.recipeSearch?.edges || [];
        setRecipes(data);
        // setLoading(false);
      } catch (error) {
        setError("Unable to load recipes. Please try again.");
        // setLoading(false);
        setVisible(true);
      }
    };

    getRecipesByFilter();
  }, []);

  return (
    <View flex={1}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Modal visible={visible} onClose={setVisible}>
        <Alert
          backgroundColor="white"
          errorMessage={error}
          onPress={() => setVisible(false)}
        />
      </Modal>
      <SearchScreenHeader onSetIsFilterOpen={setIsFilterOpen} />

      <SafeAreaView style={styles.safeAreaView}>
        {!isFilterOpen && isRecipesListAvailable && (
          <HorizontalCardListView navigation={navigation} data={recipes} />
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
