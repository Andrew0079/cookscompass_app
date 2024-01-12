import React from "react";
import { VStack, Button, Text, Center, HStack, View, Box } from "native-base";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { ROUTES } from "../../../utils/common";
import LottieView from "lottie-react-native";

function Animation() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      justifyContent="flex-end"
      alignItems="center"
    >
      <LottieView
        source={require("../../../../assets/animation/lottie/cooking-bowl.json")}
        autoPlay
        loop
        style={{ width: 500, height: 500 }}
      />
    </Box>
  );
}

function SignInOrSignUp({ navigation }) {
  return (
    <View backgroundColor="white" flex={1}>
      <View flex={8}>
        <Animation />
      </View>
      <View flex={4}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <SafeAreaView style={styles.safeAreaView}>
          <VStack justifyContent="flex-end" flex={1} paddingBottom={70}>
            <Center>
              <HStack space={1}>
                <Text color="black" fontSize="3xl" fontWeight="bold">
                  Your
                </Text>
                <Text color="gray.400" fontSize="3xl" fontWeight="bold">
                  Recipe Heaven
                </Text>
              </HStack>
              <Text color="black" fontSize="2xl" fontWeight="bold">
                Awaits Exploration!
              </Text>
              <Button
                marginTop={8}
                marginBottom={8}
                variant="outline"
                borderRadius="20"
                onPress={() => {
                  navigation.navigate(ROUTES.SIGN_UP);
                }}
                width="70%"
              >
                <Text color="black" fontWeight="800">
                  Let's Get Started
                </Text>
              </Button>
              <HStack space={1}>
                <Text color="black" fontSize="md">
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(ROUTES.SIGN_IN);
                  }}
                >
                  <Text color="#006ee6" fontSize="md" underline>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </HStack>
            </Center>
          </VStack>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SignInOrSignUp;
