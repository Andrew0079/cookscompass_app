import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import validator from "validator";
import {
  VStack,
  Input,
  Button,
  HStack,
  IconButton,
  Text,
  Center,
  View,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
// @ts-ignore
import { ROUTES } from "@utils/common";
import {
  Header,
  Modal,
  Alert,
  ActivityIndicator,
  // @ts-ignore
} from "@components";
// @ts-ignore
import { api } from "@api/api";

const SOCIAL_LOGINS: {
  title: "google" | "facebook" | "apple";
  backgroundColor: string;
  color: string;
}[] = [
  { title: "google", backgroundColor: "red.600", color: "white" },
  { title: "facebook", backgroundColor: "blue.600", color: "white" },
  { title: "apple", backgroundColor: "black", color: "white" },
];

function SignIn({ navigation }) {
  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();
  const [formError, setFormError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = async () => {
    setLoading(true);
    const errorList = [];

    if (!email || !validator.isEmail(email)) {
      errorList.push("* Invalid email address.");
    }
    if (!password) {
      errorList.push("* Password is required.");
    }

    if (errorList.length > 0) {
      setFormError(errorList.join("\n"));
      setLoading(false);
      setVisible(true);
    } else {
      setFormError(null);
      await handleSignIn(); // Handle sign-in without showing the modal immediately
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await api.signIn(email, password);
      console.log(response);
      setLoading(false); // Turn off loading after a successful sign-in
      navigation.navigate(ROUTES.MAIN, { screen: ROUTES.MAIN_THREAD });
    } catch (error) {
      setLoading(false); // Turn off loading in case of an error
      const errorMessage = `* ${error.message}`;
      setVisible(true);
      setFormError(errorMessage);
    }
  };

  return (
    // <ImageBackgroundContainer>
    <View alignContent="center" flex={1} backgroundColor="white">
      <Modal visible={visible} onClose={setVisible}>
        <Alert
          backgroundColor="white"
          errorMessage={formError}
          onPress={() => setVisible(false)}
        />
      </Modal>
      <ActivityIndicator loading={loading} spinSize="lg" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeAreaView}>
          <Header>
            <IconButton
              icon={<FontAwesome name="chevron-left" size={18} color="black" />}
              onPress={() => navigation.navigate(ROUTES.SIGN_IN_OR_SIGN_UP)}
              variant="unstyled"
            />
          </Header>
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
              <Text fontWeight="bold" fontSize="4xl">
                Sign In
              </Text>
              <Input
                marginTop={5}
                variant="rounded"
                placeholder="Email"
                height={10}
                color="black"
                onChangeText={(inputValue) => setEmail(inputValue)}
              />
              <Input
                variant="rounded"
                placeholder="Password"
                color="black"
                height={10}
                onChangeText={(inputValue) => setPassword(inputValue)}
                secureTextEntry
              />
            </VStack>
          </KeyboardAvoidingView>
          <Center paddingTop={7}>
            <Button
              variant="outline"
              borderRadius="25"
              onPress={() => validateForm()}
              marginBottom={3}
              color="white"
              width="40%"
            >
              <Text fontWeight="800">Sign In</Text>
            </Button>
            <Button variant="unstyled">
              <Text color="blue.500">Forgot your password?</Text>
            </Button>
          </Center>
          <HStack
            flex={1}
            space={3}
            paddingTop={3}
            alignItems="start"
            justifyContent="center"
            marginBottom={5}
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
          <HStack justifyContent="center">
            <Button
              variant="unstyled"
              onPress={() =>
                navigation.navigate(ROUTES.AUTH, {
                  screen: ROUTES.VERIFICATION,
                })
              }
            >
              <Text color="blue.500">Verify Account?</Text>
            </Button>
          </HStack>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
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
