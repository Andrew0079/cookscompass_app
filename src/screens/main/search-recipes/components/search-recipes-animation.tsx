import React from "react";
import { VStack, Box, Center } from "native-base";
import LottieView from "lottie-react-native";

function SearchRecipesAnimation() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      justifyContent="center"
      alignItems="center"
    >
      <Center alignItems="center" paddingBottom={60}>
        <LottieView
          source={require("../../../../../assets/animation/lottie/cook-search.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </Center>
    </Box>
  );
}

export default SearchRecipesAnimation;
