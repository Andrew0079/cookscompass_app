import React, { useState, useRef } from "react";
import { TextInput, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Text, Center, View, VStack, Button, IconButton } from "native-base";
import { Header } from "../../components";
import { FontAwesome } from "@expo/vector-icons";
import { ROUTES } from "../../utils/common";

function Verification({ navigation }) {
  const [code, setCode] = useState("");
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

  console.log(code);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="default" />
      <Header>
        <IconButton
          icon={
            <FontAwesome name="arrow-circle-left" size={28} color="black" />
          }
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
        <Button
          variant="unstyled"
          paddingBottom={45}
          onPress={() => {
            setCode("");
            inputRefs[0].current.focus();
          }}
        >
          <Text underline>Clear</Text>
        </Button>
        <Button width="50%" borderRadius="10">
          <Text color="white">Verify</Text>
        </Button>
        <Button variant="unstyled" paddingBottom={45}>
          <Text color="blue.500">Resend Code</Text>
        </Button>
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
