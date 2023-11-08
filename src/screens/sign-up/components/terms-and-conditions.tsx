import React from "react";
import { View, Text } from "native-base";

function TermsAndConditions() {
  return (
    <>
      <View>
        <Text fontSize="xs" textAlign="center">
          By Signing Up, you agree to our
        </Text>
        <Text fontSize="xs" textAlign="center">
          Terms & Privacy Policy
        </Text>
      </View>
      <View paddingTop={4}>
        <Text fontSize="xs">or</Text>
      </View>
    </>
  );
}

export default TermsAndConditions;
