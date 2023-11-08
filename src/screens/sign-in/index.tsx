import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import validator from "validator";
import { VStack, Input, Button, HStack, IconButton, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { ROUTES } from "../../utils/common";
import {
  Header,
  ImageBackgroundContainer,
  Brand,
  Modal,
  Alert,
} from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../../api/api";

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
  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();
  const [formError, setFormError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const validateForm = () => {
    const errorList = [];

    // Check if username is at least four characters
    if (!email || !validator.isEmail(email)) {
      errorList.push("* Invalid email address.");
    }
    if (!password) {
      errorList.push("* Passwords is required.");
    }
    // Set the form error message if there are errors
    if (errorList.length > 0) {
      setFormError(errorList.join("\n"));
      setVisible(true); // Show the modal
    } else {
      // Clear the form error if there are no errors
      setFormError(null);
      setVisible(false); // Hide the modal
      setIsFormValid(true);
      // Perform any other action you want on successful validation
    }
  };

  useEffect(() => {
    const handleSignIn = async () => {
      if (isFormValid) {
        try {
          const response = await api.signIn(email, password);
          console.log(response);
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    handleSignIn();
  }, [isFormValid]);

  return (
    <ImageBackgroundContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeAreaView}>
          <Modal visible={visible} onClose={setVisible}>
            <Alert
              backgroundColor="white"
              errorMessage={formError}
              onPress={() => setVisible(false)}
            />
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
                marginTop={10}
                variant="rounded"
                placeholder="Email"
                height={10}
                backgroundColor="white"
                onChangeText={(inputValue) => setEmail(inputValue)}
              />
              <Input
                variant="rounded"
                placeholder="Password"
                backgroundColor="white"
                height={10}
                onChangeText={(inputValue) => setPassword(inputValue)}
                secureTextEntry
              />
              <Button
                backgroundColor="white"
                borderRadius="25"
                onPress={() => validateForm()}
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
  keyboardAvoidingView: { flex: 1 },
});

export default SignIn;
