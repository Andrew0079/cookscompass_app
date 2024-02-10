import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Center, HStack, VStack } from "native-base";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
// @ts-ignore
import { NbTextView } from "@components";
import { FontAwesome } from "@expo/vector-icons";
import { ROUTES } from "../../../utils/common";
import { emailVerification } from "../../../services/auth";
import { setLoading } from "../../../redux/slices/loading-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setError } from "../../../redux/slices/error-slice";
import { ThemedButton } from "../../../components";

const isIOS = Platform.OS === "ios";

function Verification({ navigation, route }) {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.value);
  const [manualVerificationSent, setManualVerificationSent] = useState(false);

  const isManual = route?.params?.manual;

  const handleEmailVerification = async () => {
    dispatch(setLoading(true));
    try {
      await emailVerification();
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(
        setError({ error: "Unable to send verification email!", visible: true })
      );
      dispatch(setLoading(false));
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {!loading && (
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
      )}
      <VStack flex={1} justifyContent="flex-start" paddingTop={isIOS ? 5 : 75}>
        <Center>
          <LottieView
            source={require("../../../../assets/animation/lottie/email-an.json")}
            autoPlay
            loop
            style={{ width: 210, height: 210 }}
          />
          {isManual && !manualVerificationSent ? (
            <ThemedButton
              width="50%"
              title="Send Verification"
              my={6}
              onPress={() => {
                handleEmailVerification();
                setManualVerificationSent(true);
              }}
            />
          ) : (
            <Center>
              <NbTextView fontSize="xl" fontWeight="800">
                Check your email
              </NbTextView>
              <NbTextView fontWeight="800" paddingBottom={5}>
                We have sent a verification link
              </NbTextView>

              <HStack marginBottom={5}>
                <NbTextView>Didn't receive the email? </NbTextView>
                <TouchableOpacity onPress={() => handleEmailVerification()}>
                  <NbTextView fontWeight="bold" color="green.600">
                    Click to resend
                  </NbTextView>
                </TouchableOpacity>
              </HStack>
            </Center>
          )}
          <TouchableOpacity
            onPress={() => {
              setManualVerificationSent(false);
              navigation.navigate(ROUTES.SIGN_IN);
            }}
          >
            <HStack justifyContent="center" alignItems="center">
              <FontAwesome name="arrow-left" size={13} color="#16a34a" />
              <NbTextView style={{ marginLeft: 5 }} color="green.600">
                Back to log in
              </NbTextView>
            </HStack>
          </TouchableOpacity>
        </Center>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
});
export default Verification;
