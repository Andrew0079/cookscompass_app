import {
  Text,
  Box,
  Center,
  VStack,
  Input,
  Button,
  HStack,
  IconButton,
} from "native-base";
import { SafeAreaView, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const SOCIAL_LOGINS: {
  title: "google" | "facebook" | "apple";
  color: string;
}[] = [
  { title: "google", color: "red.600" },
  { title: "facebook", color: "blue.600" },
  { title: "apple", color: "black" },
];

function Login() {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../../assets/backgrounds/green-white.jpg")}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <Box flex={1}>
          <Center flex={1}>
            <VStack space={4} width="75%" mx="auto" alignItems="center">
              <Input variant="rounded" placeholder="Email" />
              <Input variant="rounded" placeholder="Password" secureTextEntry />
              <Button
                size={7}
                borderRadius="25"
                onPress={() => console.log("hello world")}
                width="30%"
              >
                Sign In
              </Button>
              <Box flexDirection="row" alignItems="center">
                <Text backgroundColor="red">Don't have an account?</Text>
                <Button
                  backgroundColor="green"
                  marginLeft={-2.5}
                  variant="unstyled"
                  onPress={() => console.log("hello world")}
                >
                  <Text color="green.600" bold>
                    Sign Up
                  </Text>
                </Button>
              </Box>
            </VStack>
            {/* Social Logins */}
            <HStack space={3} alignItems="center" marginTop={4}>
              {SOCIAL_LOGINS.map(({ title, color }) => (
                <IconButton
                  icon={<FontAwesome name={title} size={20} color="white" />}
                  backgroundColor={color}
                  width={10}
                  height={10}
                  borderRadius="full"
                  onPress={() => console.log("Google login")}
                />
              ))}
            </HStack>
          </Center>
          <Center>
            <Button
              backgroundColor="green"
              marginLeft={-2.5}
              variant="unstyled"
              onPress={() => console.log("hello world")}
            >
              <Text color="green.600" bold>
                I'll do it later
              </Text>
            </Button>
          </Center>
        </Box>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default Login;
