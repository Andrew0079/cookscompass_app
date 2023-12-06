import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  Center,
  ScrollView,
  HStack,
  VStack,
  Image,
} from "native-base";
import { SafeAreaView, StyleSheet, ImageBackground } from "react-native";
import { getPlatFormStyle } from "../../../utils/common";
import { api } from "../../../api/api";

const getStyles = () =>
  StyleSheet.create({
    safeAreaView: { flex: 1 },
    horizontalList: {
      backgroundColor: "red",
    },
    verticalList: {
      flexGrow: 1, // Allow the ScrollView to grow and fill available space
    },
    imageBackground: {
      width: "100%",
      height: "100%",
      justifyContent: "flex-end",
    },
    verticalListItem: {
      height: 200, // Adjust the height as needed
      marginBottom: 16,
      borderRadius: 20,
      overflow: "hidden",
    },
  });

function Discover() {
  const [recipes, setRecipes] = useState([]);

  // Sample data for small horizontal cards at the top
  const smallCardData = [
    {
      id: 1,
      title: "Category 1",
      image: require("./burger.jpg"),
    },
    {
      id: 2,
      title: "Category 2",
      image: require("./burger.jpg"),
    },
    {
      id: 3,
      title: "Category 1",
      image: require("./burger.jpg"),
    },
    {
      id: 4,
      title: "Category 2",
      image: require("./burger.jpg"),
    },
    {
      id: 5,
      title: "Category 1",
      image: require("./burger.jpg"),
    },
    {
      id: 6,
      title: "Category 2",
      image: require("./burger.jpg"),
    },
    // Add more small card data here
  ];

  const styles = getStyles();

  // useEffect(() => {
  //   const loadRandomRecipes = async () => {
  //     try {
  //       const response = await api.getRandomRecipes({ number: 10 });
  //       setRecipes(response.recipes);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   loadRandomRecipes();
  // }, []);

  return (
    <SafeAreaView style={{ ...getPlatFormStyle(), ...styles.safeAreaView }}>
      <VStack space={4} alignItems="center" style={{ flex: 1 }}>
        <Center w="90%" h="10" bg="indigo.300" rounded="md" shadow={5}></Center>
        <Center w="100%" shadow={3}>
          <ScrollView horizontal>
            {/* Horizontal small cards at the top */}
            <HStack space={1} padding={1} alignItems="center">
              {smallCardData.map((card) => (
                <Center key={card.id} width={100} height={100}>
                  <Image
                    source={card.image}
                    alt={card.title}
                    size={16}
                    borderRadius="md"
                  />
                  <Text>{card.title}</Text>
                </Center>
              ))}
            </HStack>
          </ScrollView>
        </Center>
        <ScrollView style={styles.verticalList}>
          {/* Vertical list of recipe cards */}
          <VStack padding={3} alignItems="flex-start">
            {recipes.length > 0 &&
              recipes.map((recipe) => {
                return (
                  <Box
                    key={recipe.id}
                    width="100%"
                    marginBottom={4}
                    borderRadius="20"
                    overflow="hidden"
                    style={styles.verticalListItem}
                  >
                    <ImageBackground
                      style={styles.imageBackground}
                      source={{
                        uri: recipe.image,
                      }}
                      resizeMode="cover"
                    >
                      <Box
                        style={{
                          padding: 10,
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        <Text fontSize="md" fontWeight="bold" color="white">
                          {recipe.title}
                        </Text>
                      </Box>
                    </ImageBackground>
                  </Box>
                );
              })}
          </VStack>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}

export default Discover;
