import React from "react";
import { Box, Text, View } from "native-base";
import { StyleSheet, StatusBar, Platform } from "react-native";
import { Image } from "expo-image";

function RecipeCardView({ recipeDetail }) {
  console.log(recipeDetail);
  return (
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
          placeholder={require("../../../assets/backgrounds/fallback.jpeg")}
          placeholderContentFit="cover"
        />
      </View>
      <View style={styles.bottomSection}></View>
    </View>
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
    // Shadow properties
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
});

export default RecipeCardView;
