import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import validator from "validator";
import { ROUTES } from "../../../utils/common";
// @ts-ignore
import { Header, NbTextView } from "@components";
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  VStack,
  Button,
  HStack,
  IconButton,
  View,
  Center,
  Input,
  Checkbox,
  Divider,
} from "native-base";
import { api } from "../../../api/api";
import { setLoading } from "../../../redux/slices/loading-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setError } from "../../../redux/slices/error-slice";
import { setUser } from "../../../redux/slices/user-slice";

const SOCIAL_LOGINS: {
  title: "google" | "facebook" | "apple";
  backgroundColor: string;
  color: string;
}[] = [
  { title: "google", backgroundColor: "red.600", color: "white" },
  { title: "facebook", backgroundColor: "blue.600", color: "white" },
  { title: "apple", backgroundColor: "black", color: "white" },
];

function SignUp({ navigation, route }) {
  const loading = useSelector((state: RootState) => state.loading.value);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const isFromLogin = route?.params?.isFromLogin;

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
      dispatch(setError({ error: errorList.join("\n"), visible: true }));
    } else {
      // Clear the form error if there are no errors
      dispatch(setError({ error: null, visible: false }));
      await handleSignUp();
      // Perform any other action you want on successful validation
    }
  };

  const handleSignUp = async () => {
    try {
      dispatch(setLoading(true));
      const response = await api.signUp(email, password, username);

      const displayName = response?.displayName;
      const userEmail = response?.email;
      const emailVerified = response?.emailVerified;
      const phoneNumber = response?.phoneNumber;
      const uid = response?.uid;
      const token = (
        response as unknown as { stsTokenManager: { accessToken: string } }
      )?.stsTokenManager?.accessToken;

      dispatch(
        setUser({
          email: userEmail,
          emailVerified,
          token,
          uid,
          username: displayName,
        })
      );

      await api.createUser({
        displayName,
        email: userEmail,
        emailVerified,
        phoneNumber,
        uid,
      });

      dispatch(setLoading(false));
      navigation.navigate(ROUTES.AUTH, { screen: ROUTES.VERIFICATION });
    } catch (error) {
      const authenticationError = `* ${error.message}`;
      dispatch(setLoading(false));
      dispatch(setError({ error: authenticationError, visible: true }));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.touchableWithoutFeedbackContent}>
        {!loading && (
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
        )}
        <Header>
          <IconButton
            paddingLeft={5}
            icon={<FontAwesome name="chevron-left" size={18} color="black" />}
            onPress={() => {
              const prevRoute = isFromLogin
                ? ROUTES.SIGN_IN
                : ROUTES.SIGN_IN_OR_SIGN_UP;
              navigation.navigate(prevRoute);
            }}
            variant="unstyled"
          />
        </Header>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView>
            <KeyboardAvoidingView
              style={styles.keyboardAvoidingView}
              behavior="padding"
            >
              <VStack
                paddingTop={30}
                alignItems="center"
                justifyContent="center"
                paddingLeft={5}
                paddingRight={5}
                space={4}
              >
                <Center>
                  <NbTextView fontSize="3xl" fontWeight="800">
                    Create Account
                  </NbTextView>
                  <NbTextView fontSize="xs" fontWeight="800">
                    Fill your information below or register
                  </NbTextView>
                  <NbTextView fontSize="xs" fontWeight="800">
                    with your social account.
                  </NbTextView>
                </Center>

                {inputFieldsContainer.map(
                  (
                    { placeholder, secureTextEntry, onChangeText },
                    index: number
                  ) => (
                    <Input
                      key={`key-${index}`}
                      variant="rounded"
                      placeholder={placeholder}
                      height={10}
                      backgroundColor="white"
                      onChangeText={(inputValue) => onChangeText(inputValue)}
                      secureTextEntry={secureTextEntry}
                    />
                  )
                )}
              </VStack>
            </KeyboardAvoidingView>
            <HStack justifyContent="flex-start" paddingLeft={7} paddingTop={7}>
              <Checkbox value="accepted">
                <HStack space={1}>
                  <NbTextView fontWeight="bold">Agree with</NbTextView>
                  <NbTextView underline fontWeight="bold" color="#006ee6">
                    Terms & conditions
                  </NbTextView>
                </HStack>
              </Checkbox>
            </HStack>
            <Center
              flex={1}
              justifyContent="flex-start"
              paddingTop={7}
              paddingBottom={1}
            >
              <Button
                variant="outline"
                marginBottom={2}
                rounded="3xl"
                onPress={() => validateForm()}
                width="70%"
              >
                <NbTextView fontWeight="800">Sign Up</NbTextView>
              </Button>
              <HStack
                justifyContent="center"
                paddingBottom={18}
                paddingTop={8}
                alignItems="center"
                space={1}
              >
                <Divider width={20} />
                <NbTextView fontWeight="800"> Or sign in with</NbTextView>
                <Divider width={20} />
              </HStack>
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
                      icon={
                        <FontAwesome name={title} size={20} color={color} />
                      }
                      backgroundColor={backgroundColor}
                      width={10}
                      height={10}
                      borderRadius="full"
                      onPress={() => console.log("Google login")}
                    />
                  )
                )}
              </HStack>
              <HStack paddingTop={8} space={1}>
                <NbTextView>Already have an account?</NbTextView>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(ROUTES.SIGN_IN, { isFromSignUp: true });
                  }}
                >
                  <NbTextView underline color="#006ee6">
                    Sign In
                  </NbTextView>
                </TouchableOpacity>
              </HStack>
            </Center>
          </ScrollView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  touchableWithoutFeedbackContent: {
    flex: 1,
    backgroundColor: "white",
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
