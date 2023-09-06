import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";

function Header({ navigation, children }: { navigation: any; children?: any }) {
  return (
    <Box style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="caret-back" size={24} />
      </TouchableOpacity>
      {/* Add any additional header components or stylings here */}
      {children}
    </Box>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "red",
    marginLeft: 5,
    marginRight: 5,
  },
});
