import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import validator from "validator";
import {
  VStack,
  Input,
  HStack,
  IconButton,
  View,
  Box,
  Divider,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
// @ts-ignore
import { ROUTES } from "@utils/common";
import {
  Header,
  NbTextView,
  ThemedButton,
  // @ts-ignore
} from "@components";
// @ts-ignore
import { api } from "@api/api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/loading-slice";
import { setUser } from "../../../redux/slices/user-slice";
import { setError } from "../../../redux/slices/error-slice";
import { RootState } from "../../../redux/store";

const SOCIAL_LOGINS: {
  title: "google" | "facebook" | "apple";
  backgroundColor: string;
  color: string;
}[] = [
  { title: "google", backgroundColor: "red.600", color: "white" },
  { title: "facebook", backgroundColor: "blue.600", color: "white" },
  { title: "apple", backgroundColor: "black", color: "white" },
];

const isIOS = Platform.OS === "ios";

function SignIn({ navigation, route }) {
  const loading = useSelector((state: RootState) => state.loading.value);
  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();

  const dispatch = useDispatch();

  const isFromSignUp = route?.params?.isFromSignUp;

  const validateForm = async () => {
    dispatch(setLoading(true));
    const errorList = [];

    if (!email || !validator.isEmail(email)) {
      errorList.push("* Invalid email address.");
    }
    if (!password) {
      errorList.push("* Password is required.");
    }

    if (errorList.length > 0) {
      dispatch(setError({ error: errorList.join("\n"), visible: true }));
      dispatch(setLoading(false));
    } else {
      dispatch(setError({ error: null, visible: false }));
      await handleSignIn();
    }
  };

  const getUser = async (uid: string) => {
    try {
      const response = await api.getUser(uid);
      const userId = response?.id;
      const userEmailVerified = response?.emailVerified;

      return { userId, userEmailVerified };
    } catch (error) {
      return;
    }
  };

  const updateUser = async (uid: string) => {
    try {
      await api.updateUser({ uid, emailVerified: true });
    } catch (error) {
      return;
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await api.signIn(email, password);
      const uid = response.uid;

      const { userId, userEmailVerified } = await getUser(uid);

      if (!response.emailVerified) {
        dispatch(
          setError({ error: "# Please verify your account", visible: true })
        );
      }
      if (!userEmailVerified) {
        await updateUser(uid);

        dispatch(
          setUser({
            email: response.email,
            token: response.stsTokenManager.accessToken,
            uid: response.uid,
            username: response.displayName,
            customUserId: userId,
            emailVerified: response.emailVerified,
          })
        );
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      const errorMessage = `* ${error.message}`;
      dispatch(setError({ error: errorMessage, visible: true }));
    }
  };

  return (
    <View alignContent="center" flex={1} backgroundColor="white">
      {!loading && (
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.touchableWithoutFeedbackContent}>
          <Header>
            <IconButton
              paddingLeft={5}
              icon={
                <FontAwesome name="chevron-left" size={18} color="#18181b" />
              }
              onPress={() => {
                const prevRoute = isFromSignUp
                  ? ROUTES.SIGN_UP
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
                  space={6}
                  alignItems="center"
                  justifyContent="flex-start"
                  paddingLeft={5}
                  paddingRight={5}
                  paddingTop={30}
                >
                  <NbTextView fontSize="4xl" fontWeight="800" color="dark.50">
                    Sign In
                  </NbTextView>
                  <NbTextView
                    fontSize="md"
                    marginTop={-3}
                    fontWeight="800"
                    color="dark.50"
                  >
                    Hi! Welcome back. You've been missed.
                  </NbTextView>
                  <Input
                    placeholder="Email"
                    backgroundColor="white"
                    borderRadius={10}
                    height={10}
                    onChangeText={(inputValue) => setEmail(inputValue)}
                  />
                  <Input
                    borderRadius={10}
                    placeholder="Password"
                    backgroundColor="white"
                    height={10}
                    onChangeText={(inputValue) => setPassword(inputValue)}
                    secureTextEntry
                  />
                  <Box alignSelf="flex-end">
                    <TouchableOpacity>
                      <NbTextView underline color="green.600">
                        Forgot your password?
                      </NbTextView>
                    </TouchableOpacity>
                  </Box>

                  <ThemedButton
                    title=" Sign In"
                    onPress={() => validateForm()}
                  />
                </VStack>
              </KeyboardAvoidingView>
              <View flex={1}>
                <HStack
                  justifyContent="center"
                  paddingTop={8}
                  paddingBottom={8}
                  alignItems="center"
                  space={1}
                >
                  <Divider width={20} />
                  <NbTextView fontWeight="800" color="dark.50">
                    Or sign in with
                  </NbTextView>
                  <Divider width={20} />
                </HStack>
                <HStack
                  space={5}
                  alignItems="start"
                  justifyContent="center"
                  marginBottom={5}
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
                <HStack
                  space={1}
                  flex={1}
                  paddingTop={5}
                  alignItems="flex-start"
                  justifyContent="center"
                >
                  <NbTextView>Don't have an account?</NbTextView>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ROUTES.SIGN_UP, {
                        isFromLogin: true,
                      });
                    }}
                  >
                    <NbTextView underline color="green.600">
                      Sign Up
                    </NbTextView>
                  </TouchableOpacity>
                </HStack>
              </View>
            </ScrollView>
            <HStack
              flex={1}
              justifyContent="center"
              alignItems="flex-end"
              paddingBottom={isIOS ? 0 : 6}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(ROUTES.VERIFICATION, {
                    manual: true,
                  });
                }}
              >
                <NbTextView color="green.600">Verify Account?</NbTextView>
              </TouchableOpacity>
            </HStack>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  touchableWithoutFeedbackContent: {
    flex: 1,
  },
  keyboardAvoidingView: { flex: 1 },
});

export default SignIn;
