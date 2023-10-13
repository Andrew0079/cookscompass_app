import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import {
  VStack,
  Input,
  Button,
  HStack,
  IconButton,
  Text,
  Alert,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import validator from "validator";
import { ROUTES } from "../../utils/common";
import {
  Header,
  ImageBackgroundContainer,
  Brand,
  Modal,
  ActivityIndicator,
} from "../../components";

const SOCIAL_LOGINS: {
  title: "google" | "facebook" | "apple";
  backgroundColor: string;
  color: string;
}[] = [
  { title: "google", backgroundColor: "red.600", color: "white" },
  { title: "facebook", backgroundColor: "blue.600", color: "white" },
  { title: "apple", backgroundColor: "white", color: "black" },
];

function SignUp({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const validateForm = () => {
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
      errorList.push("* Confirm Passwords is required.");
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
      setVisible(false); // Hide the modal
      // Perform any other action you want on successful validation
    }
  };

  return (
    <ImageBackgroundContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeAreaView}>
          <ActivityIndicator
            loading={loading}
            loadingTextColor="white"
            spinColor="white"
            spinSize="lg"
            loadingText="Loading..."
          />
          <Modal visible={visible} onClose={setVisible}>
            <Alert status="error">
              <HStack width="100%" justifyContent="flex-end">
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Ionicons name="close" size={20} color="black" />
                </TouchableOpacity>
              </HStack>
              <HStack width="100%" justifyContent="flex-start">
                <Text>{formError}</Text>
              </HStack>
            </Alert>
          </Modal>
          <Header>
            <IconButton
              icon={
                <FontAwesome name="arrow-circle-left" size={28} color="white" />
              }
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
              <Brand />
              <Input
                variant="rounded"
                placeholder="Username"
                marginTop={10}
                height={10}
                backgroundColor="white"
                onChangeText={(usernameText) => setUsername(usernameText)}
              />
              <Input
                variant="rounded"
                placeholder="Email"
                height={10}
                backgroundColor="white"
                onChangeText={(emailText) => setEmail(emailText)}
              />
              <Input
                variant="rounded"
                placeholder="Password"
                backgroundColor="white"
                height={10}
                secureTextEntry
                onChangeText={(passwordText) => setPassword(passwordText)}
              />
              <Input
                variant="rounded"
                placeholder="Confirm Password"
                backgroundColor="white"
                height={10}
                secureTextEntry
                onChangeText={(confirmPasswordText) =>
                  setConfirmPassword(confirmPasswordText)
                }
              />
              <Button
                backgroundColor="white"
                borderRadius="25"
                onPress={() => validateForm()}
                color="white"
                width="50%"
              >
                <Text color="black" fontWeight="800">
                  Sign Up
                </Text>
              </Button>
            </VStack>
          </KeyboardAvoidingView>
          <HStack
            space={3}
            paddingTop={5}
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
  keyboardAvoidingView: { flex: 2 },
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
