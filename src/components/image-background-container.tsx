import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

function ImageBackgroundContainer({ children }) {
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require("../../assets/backgrounds/bowl.jpg")}
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust opacity as needed
  },
});

export default ImageBackgroundContainer;
