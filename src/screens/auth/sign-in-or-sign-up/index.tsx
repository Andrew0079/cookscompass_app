import React from "react";
import { VStack, Button, Text, Center, HStack } from "native-base";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { ROUTES } from "../../../utils/common";
import { ImageBackgroundContainer } from "../../../components";
import { StatusBar } from "expo-status-bar";

function SignInOrSignUp({ navigation }) {
  return (
    <ImageBackgroundContainer>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeAreaView}>
        <VStack justifyContent="flex-end" flex={1} paddingBottom={70}>
          <Center>
            <HStack space={1}>
              <Text color="white" fontSize="3xl" fontWeight="bold">
                Your
              </Text>
              <Text color="gray.400" fontSize="3xl" fontWeight="bold">
                Recipe Heaven
              </Text>
            </HStack>
            <Text color="white" fontSize="2xl" fontWeight="bold">
              Awaits Exploration!
            </Text>
            <Button
              marginTop={5}
              marginBottom={5}
              variant="subtle"
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
              <Text color="white" fontSize="md">
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(ROUTES.SIGN_IN);
                }}
              >
                <Text color="white" fontSize="md" underline>
                  Sign In
                </Text>
              </TouchableOpacity>
            </HStack>
          </Center>
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
