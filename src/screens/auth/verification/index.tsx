import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Center, HStack, Text, VStack, Button } from "native-base";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ROUTES } from "../../../utils/common";
import {
  Modal,
  Alert,
  ActivityIndicator,
  // @ts-ignore
} from "@components";
import { emailVerification } from "../../../services/auth";

function Verification({ navigation, route }) {
  const [formError, setFormError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [manualVerificationSent, setManualVerificationSent] = useState(false);

  const isManual = route?.params?.manual;

  const handleEmailVerification = async () => {
    setLoading(true);
    try {
      await emailVerification();
      setLoading(false);
    } catch (error) {
      setFormError("Unable to send verification email!");
      setVisible(true);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Modal visible={visible} onClose={setVisible}>
        <Alert
          backgroundColor="white"
          errorMessage={formError}
          onPress={() => setVisible(false)}
        />
      </Modal>
      <ActivityIndicator loading={loading} />
      <VStack flex={1} justifyContent="flex-start">
        <Center>
          <LottieView
            source={require("../../../../assets/animation/lottie/email.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
          {isManual && !manualVerificationSent ? (
            <Button
              borderRadius={20}
              variant="outline"
              marginBottom={5}
              onPress={() => {
                handleEmailVerification();
                setManualVerificationSent(true);
              }}
            >
              <Text>Send Verification</Text>
            </Button>
          ) : (
            <Center>
              <Text fontSize="xl" fontWeight="bold">
                Check your email
              </Text>
              <Text fontWeight="bold" paddingBottom={5}>
                We have sent a verification link
              </Text>

              <HStack marginBottom={5}>
                <Text>Didn't receive the email? </Text>
                <TouchableOpacity onPress={() => handleEmailVerification()}>
                  <Text fontWeight="bold">Click to resend</Text>
                </TouchableOpacity>
              </HStack>
            </Center>
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.SIGN_IN);
            }}
          >
            <HStack justifyContent="center" alignItems="center">
              <FontAwesome name="arrow-left" size={13} color="#006ee6" />
              <Text style={{ marginLeft: 5 }} color="#006ee6">
                Back to log in
              </Text>
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
