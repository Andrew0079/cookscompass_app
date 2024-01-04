import React from "react";
import { StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { Text, View, Box } from "native-base";

function Card({ item }) {
  console.log(item);
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <ImageBackground
        source={require("../../../../../assets/backgrounds/fallback.jpeg")} // Replace with your image source
        style={styles.backgroundImage}
        imageStyle={styles.image} // Apply your image styles here
      >
        {/* Content at the top */}
        <View style={styles.topContent}>
          <Text>Top Content</Text>
        </View>

        {/* Content at the bottom */}
        <View style={styles.bottomContent}>
          <Text>Bottom Content</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 300,
    width: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "space-between", // Aligns content at the top and bottom
  },
  image: {
    width: "100%",
    height: "100%",
  },
  topContent: {
    // Style for top content
  },
  bottomContent: {
    // Style for bottom content
  },
});

export default Card;
