import React from "react";
import { VStack, Button, Text } from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import { ROUTES } from "../../utils/common";
import { ImageBackgroundContainer, Brand } from "../../components";
import { StatusBar } from "expo-status-bar";

function SignInOrSignUp({ navigation }) {
  return (
    <ImageBackgroundContainer>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeAreaView}>
        <Brand flex={2} />
        <VStack
          space={6}
          alignItems="center"
          justifyContent="center"
          paddingLeft={10}
          paddingRight={10}
          flex={1}
        >
          <Button
            borderRadius="25"
            onPress={() => navigation.navigate(ROUTES.SIGN_IN)}
            width="50%"
            backgroundColor="white"
          >
            <Text color="black" fontWeight="800">
              Sign In
            </Text>
          </Button>
          <Button
            borderRadius="25"
            onPress={() => navigation.navigate(ROUTES.SIGN_UP)}
            width="50%"
            backgroundColor="white"
          >
            <Text color="black" fontWeight="800">
              Sign Up
            </Text>
          </Button>
        </VStack>
        <VStack
          space={4}
          alignItems="center"
          marginBottom={5}
          flex={1}
          justifyContent="flex-end"
        >
          <Button variant="unstyled" onPress={() => console.log("hello world")}>
            <Text color="white" bold>
              I'll do it later
            </Text>
          </Button>
        </VStack>
      </SafeAreaView>
    </ImageBackgroundContainer>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SignInOrSignUp;
