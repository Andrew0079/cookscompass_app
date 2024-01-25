import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, Box, VStack, HStack, Badge, useToast } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ROUTES } from "../../../../utils/common";
import { handleRecipeActions } from "../../../../utils/functions";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

function CategoryRecipeCard({ title, itemKey }) {
  const urlMapper = {
    soup: require("../../../../../assets/backgrounds/soup.jpg"),
    treat: require("../../../../../assets/backgrounds/sweets.jpg"),
    salad: require("../../../../../assets/backgrounds/salad.jpg"),
    smoothie: require("../../../../../assets/backgrounds/smoothie.jpg"),
  };
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      // onPress={() => {
      //   navigation.navigate(ROUTES.RECIPE, {
      //     // node: node,
      //     path: ROUTES.DISCOVER,
      //   });
      // }}
    >
      <Image
        source={urlMapper[itemKey]}
        alt="Recipe Image"
        style={styles.backgroundImage}
        placeholder={require("../../../../../assets/backgrounds/fallback.jpeg")}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.3)", "transparent"]}
        style={styles.fullCardGradient}
        start={{ x: 0.3, y: 0.5 }}
        end={{ x: 1, y: 0 }}
      />
      <VStack justifyContent="center" alignItems="center" flex={1} padding={2}>
        <Text color="white" fontSize="3xl">
          {title}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 320,
    height: 200,
    marginTop: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  overlayContent: {
    justifyContent: "space-between",
    padding: 2,
    flex: 1,
  },
  fullCardGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 20,
  },
  toast: {
    backgroundColor: "#e6352b",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
    elevation: 10,
  },
});

export default CategoryRecipeCard;
