import React from "react";
import { Alert as NBAlert, HStack, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Alert({
  errorMessage,
  backgroundColor,
  onPress,
}: {
  errorMessage: string;
  backgroundColor: string;
  onPress: () => void;
}) {
  return (
    <NBAlert
      status="error"
      style={{ backgroundColor: backgroundColor, borderRadius: 10 }}
    >
      <HStack width="100%" justifyContent="flex-end">
        <TouchableOpacity onPress={() => onPress()}>
          <Ionicons name="close" size={20} color="black" />
        </TouchableOpacity>
      </HStack>
      <HStack width="100%" justifyContent="flex-start">
        <Text>{errorMessage}</Text>
      </HStack>
    </NBAlert>
  );
}

export default Alert;
