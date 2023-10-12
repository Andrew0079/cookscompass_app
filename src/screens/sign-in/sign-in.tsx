import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { VStack, Input, Button, HStack, IconButton, Text } from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { ROUTES } from "../../utils/common";
import { Header, ImageBackgroundContainer, Brand } from "../../components";

const SOCIAL_LOGINS: {
  title: "google" | "facebook" | "apple";
  backgroundColor: string;
  color: string;
}[] = [
  { title: "google", backgroundColor: "red.600", color: "white" },
  { title: "facebook", backgroundColor: "blue.600", color: "white" },
  { title: "apple", backgroundColor: "white", color: "black" },
];

function SignIn({ navigation }) {
  return (
    <ImageBackgroundContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeAreaView}>
          <Header>
            <IconButton
              icon={
                <FontAwesome name="arrow-circle-left" size={28} color="white" />
              }
              onPress={() => navigation.navigate(ROUTES.SIGN_IN_OR_SIGN_UP)}
              variant="unstyled"
            />
          </Header>
          <Brand flex={1} />
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <VStack
              space={4}
              alignItems="center"
              justifyContent="flex-end"
              paddingLeft={10}
              paddingRight={10}
              flex={1}
            >
              <Input
                variant="rounded"
                placeholder="Email"
                height={10}
                backgroundColor="white"
              />
              <Input
                variant="rounded"
                placeholder="Password"
                backgroundColor="white"
                height={10}
                secureTextEntry
              />
              <Button
                backgroundColor="white"
                borderRadius="25"
                onPress={() => console.log("hello world")}
                color="white"
                width="50%"
              >
                <Text color="black" fontWeight="800">
                  Sign In
                </Text>
              </Button>
            </VStack>
          </KeyboardAvoidingView>
          <HStack
            space={3}
            paddingTop={5}
            alignItems="start"
            justifyContent="center"
            flex={1}
          >
            {SOCIAL_LOGINS.map(
              ({ title, backgroundColor, color }, index: number) => (
                <IconButton
                  key={`${title}-${index}`}
                  icon={<FontAwesome name={title} size={20} color={color} />}
                  backgroundColor={backgroundColor}
                  width={10}
                  height={10}
                  borderRadius="full"
                  onPress={() => console.log("Google login")}
                />
              )
            )}
          </HStack>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackgroundContainer>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
  },
  keyboardAvoidingView: { flex: 1 },
});

export default SignIn;
