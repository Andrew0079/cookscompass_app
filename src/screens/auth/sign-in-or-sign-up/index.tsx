import React from "react";
import { VStack, Button, Text } from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import { ROUTES } from "../../../utils/common";
import { ImageBackgroundContainer, Brand } from "../../../components";
import { StatusBar } from "expo-status-bar";

function SignInOrSignUp({ navigation }) {
  return (
    <ImageBackgroundContainer>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeAreaView}>
        <VStack
          space={6}
          alignItems="center"
          justifyContent="flex-end"
          paddingLeft={10}
          paddingRight={10}
          paddingBottom={5}
          flex={1}
        >
          <Brand />
          <Button
            variant="outline"
            borderRadius="25"
            onPress={() => navigation.navigate(ROUTES.SIGN_IN)}
            width="50%"
          >
            <Text color="white" fontWeight="800">
              Sign In
            </Text>
          </Button>
          <Button
            variant="outline"
            borderRadius="25"
            onPress={() => navigation.navigate(ROUTES.SIGN_UP)}
            width="50%"
          >
            <Text color="white" fontWeight="800">
              Sign Up
            </Text>
          </Button>
          <Button
            paddingTop={6}
            variant="unstyled"
            onPress={() => navigation.navigate(ROUTES.VERIFICATION)}
          >
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
