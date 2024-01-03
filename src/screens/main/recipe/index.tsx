import React, { useEffect, useState } from "react";
import { Box, Text, VStack, View, IconButton, HStack } from "native-base";
// @ts-ignore
import { api } from "@api/api";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/slices/loading-slice";
import { setError } from "../../../redux/slices/error-slice";
import { StyleSheet, StatusBar, Platform, ScrollView } from "react-native";
import { Image } from "expo-image";
import {
  TabView,
  NutritionTab,
  DirectionTab,
  IngredientsTab,
  IngredientsWithServingTab,
} from "./components";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ROUTES } from "../../../utils/common";

const tabs = ["Direction", "Serving", "Ingredients", "Nutrition", "Reviews"];

function Recipe({ route, navigation }) {
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getRecipeDetails = async () => {
      dispatch(setLoading(true));
      const id = route.params.id;
      if (id) {
        try {
          const response = await api.getRecipeById(id);
          const data = response?.data?.recipe || null;
          setRecipeDetail(data);
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
        }
      }
    };
    getRecipeDetails();
  }, [route.params.id]);

  return (
    <>
      {recipeDetail && (
        <View style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <View style={styles.topContainer}>
            <Image
              style={styles.image}
              source={{ uri: recipeDetail.mainImage }}
              alt="image"
              placeholder={require("../../../../assets/backgrounds/fallback.jpeg")}
              placeholderContentFit="cover"
            />
            <HStack style={styles.overlayButtons}>
              <TouchableOpacity
                style={styles.circleButton}
                onPress={() => {
                  navigation.navigate(ROUTES.SEARCH);
                }}
              >
                <FontAwesome name="chevron-left" size={20} color="white" />
              </TouchableOpacity>
            </HStack>
          </View>
          <View style={styles.bottomSection}>
            <HStack justifyContent="space-between" alignItems="center">
              <VStack paddingLeft={5} paddingTop={3} flexShrink={1}>
                <Text fontSize="sm" color="#8d8486">
                  Recipe
                </Text>
                <Text
                  fontSize="lg"
                  color="black"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {recipeDetail.name}
                </Text>
              </VStack>
              <HStack paddingRight={5}>
                <TouchableOpacity>
                  <IconButton
                    icon={<FontAwesome name="heart" size={22} color="black" />}
                    variant="unstyled"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <IconButton
                    icon={
                      <FontAwesome name="bookmark" size={22} color="black" />
                    }
                    variant="unstyled"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <IconButton
                    icon={
                      <FontAwesome name="share-alt" size={22} color="black" />
                    }
                    variant="unstyled"
                  />
                </TouchableOpacity>
              </HStack>
            </HStack>

            <Box paddingTop={2}>
              <TabView
                tabs={tabs}
                selectedTab={selectedTab}
                onSetSelectedTab={setSelectedTab}
              />
            </Box>
            <ScrollView style={styles.scrollView}>
              {selectedTab === "Ingredients" && (
                <IngredientsTab recipeDetail={recipeDetail} />
              )}
              {selectedTab === "Serving" && (
                <IngredientsWithServingTab recipeDetail={recipeDetail} />
              )}
              {selectedTab === "Direction" && (
                <DirectionTab recipeDetail={recipeDetail} />
              )}
              {selectedTab === "Nutrition" && <NutritionTab />}
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 4,
  },
  image: {
    width: "100%",
    height: "108%",
    resizeMode: "cover",
  },
  bottomSection: {
    flex: 6,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  scrollView: {
    flex: 1,
  },
  overlayButtons: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 1,
  },
});
export default Recipe;
