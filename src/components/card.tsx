import React from "react";
import { Box, Text, View, Center } from "native-base";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Card() {
  return (
    <TouchableOpacity style={styles.shadowProp}>
      <Center>
        <Box
          justifyContent="center"
          width="95%"
          borderRadius={10}
          overflow="hidden"
          backgroundColor="white"
          //   marginBottom={
          //     data[data.length - 1].node.id === node.id ? 70 : 3
          //   }
        >
          <Box style={styles.imageContainer}>
            <Image
              style={styles.image}
              //   source={{
              //     uri: node.mainImage,
              //   }}
              alt="image"
              transition={500}
              contentFit="cover"
              placeholder={require("../../../../../assets/backgrounds/fallback.jpeg")}
              placeholderContentFit="cover"
            />
          </Box>
          <View style={styles.footer} paddingLeft={3} justifyContent="center">
            <Text>6 mins ago</Text>
          </View>
        </Box>
      </Center>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  footer: {
    height: 40, // Adjust this to change the height of the footer area
  },
  imageContainer: {
    height: 130, // Adjust this to change the height of the image area
  },
  image: {
    width: "100%",
    height: "100%",
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
});

export default Card;
