import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import validator from "validator";
import { ROUTES } from "../../../utils/common";
// @ts-ignore
import { Header, Modal, ActivityIndicator, Alert } from "@components";
import { InputElement, TermsAndConditions } from "./components";
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  VStack,
  Button,
  HStack,
  IconButton,
  Text,
  View,
  Center,
} from "native-base";
import { api } from "../../../api/api";

const SOCIAL_LOGINS: {
  title: "google" | "facebook" | "apple";
  backgroundColor: string;
  color: string;
}[] = [
  { title: "google", backgroundColor: "red.600", color: "white" },
  { title: "facebook", backgroundColor: "blue.600", color: "white" },
  { title: "apple", backgroundColor: "black", color: "white" },
];

function SignUp({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const inputFieldsContainer = [
    {
      placeholder: "Username",
      onChangeText: setUsername,
      secureTextEntry: false,
    },
    { placeholder: "Email", onChangeText: setEmail, secureTextEntry: false },
    {
      placeholder: "Password",
      onChangeText: setPassword,
      secureTextEntry: true,
    },
    {
      placeholder: "Confirm Password",
      onChangeText: setConfirmPassword,
      secureTextEntry: true,
    },
  ];

  const validateForm = async () => {
    const errorList = [];

    // Check if username is at least four characters
    if (!username || username.length < 4) {
      errorList.push("* Username must be at least four characters.");
    }

    // Check if email is a valid email address
    if (!email || !validator.isEmail(email)) {
      errorList.push("* Invalid email address.");
    }

    if (!password) {
      errorList.push("* Passwords is required.");
    }

    if (!confirmPassword) {
      errorList.push("* Confirm Password is required.");
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      errorList.push("* Passwords do not match.");
    }

    // Check if any field is empty
    if (!username || !email || !password || !confirmPassword) {
      errorList.push("* All fields are required.");
    }

    // Set the form error message if there are errors
    if (errorList.length > 0) {
      setFormError(errorList.join("\n"));
      setVisible(true); // Show the modal
    } else {
      // Clear the form error if there are no errors
      setFormError(null);
      await handleSignUp();
      // Perform any other action you want on successful validation
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await api.signUp(email, password, {
        preferred_username: username,
      });

      setLoading(false);
      navigation.navigate(ROUTES.AUTH, { screen: ROUTES.VERIFICATION });
    } catch (error) {
      const authenticationError = `* ${error.message}`;
      setLoading(false);
      setFormError(authenticationError);
      setVisible(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.touchableWithoutFeedbackContent}>
        <Header>
          <IconButton
            paddingLeft={5}
            icon={<FontAwesome name="chevron-left" size={18} color="black" />}
            onPress={() => navigation.navigate(ROUTES.SIGN_IN_OR_SIGN_UP)}
            variant="unstyled"
          />
        </Header>
        <SafeAreaView style={styles.safeAreaView}>
          <ActivityIndicator loading={loading} />
          <Modal visible={visible} onClose={setVisible}>
            <Alert
              backgroundColor="white"
              errorMessage={formError}
              onPress={() => setVisible(false)}
            />
          </Modal>

          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View paddingTop={50} paddingLeft={10}>
              <Text fontSize="3xl" fontWeight="bold">
                Create your
              </Text>
              <Text fontSize="3xl" fontWeight="bold" paddingLeft={3}>
                free account
              </Text>
            </View>
            <VStack
              space={4}
              alignItems="center"
              justifyContent="center"
              paddingLeft={10}
              paddingRight={10}
              paddingBottom={30}
              paddingTop={50}
              backgroundColor="red"
              flex={1}
            >
              {inputFieldsContainer.map(
                (
                  { placeholder, secureTextEntry, onChangeText },
                  index: number
                ) => (
                  <InputElement
                    key={`input-element-${index}`}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
                  />
                )
              )}
            </VStack>
          </KeyboardAvoidingView>

          <Center flex={1} justifyContent="flex-start" paddingTop={5}>
            <Button
              variant="outline"
              marginBottom={2}
              borderRadius="25"
              onPress={() => validateForm()}
              width="40%"
            >
              <Text fontWeight="800">Sign Up</Text>
            </Button>
            <TermsAndConditions />
            <HStack
              space={5}
              marginTop={5}
              alignItems="start"
              justifyContent="center"
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
          </Center>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  touchableWithoutFeedbackContent: {
    flex: 1,
  },
  keyboardAvoidingView: { flex: 1 },
  errorAlert: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
    zIndex: 1,
  },
});

export default SignUp;
