import React, { useState, useRef } from "react";
import {
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Text, Center, View, VStack, Button, IconButton } from "native-base";
// @ts-ignore
import { Header, Alert, ActivityIndicator, Modal } from "@components";
import { FontAwesome } from "@expo/vector-icons";
import { ROUTES } from "../../../utils/common";

// @ts-ignore
import { api } from "@api/api";

function Verification({ navigation }) {
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const inputRefs = Array(6)
    .fill(0)
    .map(() => useRef(null));

  // Handle changes in the input fields
  const handleCodeChange = (text: string, index: number) => {
    // Limit the code to 6 characters
    if (text.length <= 6) {
      // Create a copy of the current code
      let updatedCode = code;

      // Update the specific digit at the given index
      updatedCode =
        updatedCode.substr(0, index) + text + updatedCode.substr(index + 1);

      setCode(updatedCode);

      if (text.length === 1 && index < 5) {
        // Automatically focus on the next input field
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleVerificationChange = async () => {
    try {
      setLoading(true);

      const response = await api.sendVerificationCode(
        "andrew.99strublics@gmail.com",
        code
      );
      console.log(response);
      setLoading(false);
    } catch (error) {
      const authenticationError = `* ${error.message}`;
      setFormError(authenticationError);
      setLoading(false);
      setVisible(true);
    }
  };

  const handleResendVerificationCode = async () => {
    try {
      setLoading(true);
      await api.resendVerificationCode("andrew.99strublics@gmail.com");
      setLoading(false);
      navigation.navigate(ROUTES.AUTH, { screen: ROUTES.SIGN_IN });
    } catch (error) {
      const authenticationError = `* ${error.message}`;
      setFormError(authenticationError);
      setLoading(false);
      setVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="default" />
      <Modal visible={visible} onClose={setVisible}>
        <Alert
          backgroundColor="white"
          errorMessage={formError}
          onPress={() => setVisible(false)}
        />
      </Modal>
      <ActivityIndicator loading={loading} spinSize="lg" />
      <Header>
        <IconButton
          icon={<FontAwesome name="chevron-left" size={18} color="black" />}
          onPress={() => navigation.navigate(ROUTES.SIGN_IN_OR_SIGN_UP)}
          variant="unstyled"
        />
      </Header>
      <VStack
        justifyContent="flex-start"
        alignItems="center"
        flex={1}
        paddingTop={50}
      >
        <Center>
          <Text fontSize="3xl" fontWeight="bold">
            Verification
          </Text>
          <Text>Enter the 6-digit code sent to </Text>
          <Text>your email address.</Text>
        </Center>
        <View style={styles.container}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <TextInput
                key={index}
                style={styles.input}
                value={index < code.length ? code[index] : ""}
                onChangeText={(text) => handleCodeChange(text, index)}
                maxLength={1}
                ref={inputRefs[index]}
                keyboardType="numeric"
                secureTextEntry
              />
            ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            setCode("");
            inputRefs[0].current.focus();
          }}
        >
          <Text paddingBottom={19} underline>
            Clear
          </Text>
        </TouchableOpacity>
        <Button
          width="40%"
          borderRadius="25"
          variant="outline"
          onPress={() => handleVerificationChange()}
        >
          <Text>Verify</Text>
        </Button>
        <TouchableOpacity onPress={() => handleResendVerificationCode()}>
          <Text color="blue.500" marginTop={4}>
            Resend Code
          </Text>
        </TouchableOpacity>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 45,
    // paddingBottom: 45,
  },
  input: {
    width: 45,
    height: 45,
    fontSize: 20,
    textAlign: "center",
    margin: 5,
    borderRadius: 5, // Add borderRadius to create square boxes
    borderWidth: 1, // Add a border to create square boxes
  },
});

export default Verification;
