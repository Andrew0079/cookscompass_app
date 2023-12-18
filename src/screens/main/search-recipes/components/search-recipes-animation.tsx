import React from "react";
import { VStack, Box } from "native-base";
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
      <VStack space={2} alignItems="center">
        <LottieView
          source={require("../../../../../assets/animation/lottie/cooking-bowl.json")}
          autoPlay
          loop
          style={{ width: 400, height: 400 }}
        />
      </VStack>
    </Box>
  );
}

export default SearchRecipesAnimation;
