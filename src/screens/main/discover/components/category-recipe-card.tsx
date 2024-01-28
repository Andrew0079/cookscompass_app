import React from "react";
import { Box, Image, VStack, Pressable } from "native-base";
import { StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { NbTextView } from "../../../../components";

function CategoryRecipeCard({ title, itemKey }) {
  const urlMapper = {
    soup: require("../../../../../assets/backgrounds/soup.jpg"),
    treat: require("../../../../../assets/backgrounds/sweets.jpg"),
    salad: require("../../../../../assets/backgrounds/salad.jpg"),
    smoothie: require("../../../../../assets/backgrounds/smoothie.jpg"),
  };
  return (
    <Pressable
      rounded="2xl"
      // onPress={() => {
      //   onHandleNavigation();
      // }}
    >
      {({ isPressed }) => {
        const pressedStyle = isPressed
          ? {
              opacity: 0.4,
            }
          : {};
        return (
          <Box
            borderRadius="lg"
            style={pressedStyle}
            backgroundColor="white"
            rounded="lg"
            overflow="hidden"
            width={320}
            height={200}
            position="relative" // Parent box is positioned relatively
          >
            <Image
              source={urlMapper[itemKey]}
              alt="Recipe Image"
              style={styles.backgroundImage}
            />
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.3)", "transparent"]}
              style={styles.fullCardGradient}
              start={{ x: 0.3, y: 0.5 }}
              end={{ x: 1, y: 0 }}
            />
            <VStack
              justifyContent="center"
              alignItems="center"
              flex={1}
              padding={2}
            >
              <NbTextView color="white" fontSize="3xl">
                {title}
              </NbTextView>
            </VStack>
          </Box>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  fullCardGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 20,
  },
});

export default CategoryRecipeCard;
