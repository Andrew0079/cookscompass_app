import React from "react";
import { Box } from "native-base";
import NbTextView from "./nb-text-view";
import { StyleSheet } from "react-native";

function ToastView({ text }: { text: string }) {
  return (
    <Box style={styles.toast}>
      <NbTextView color="white">{text}</NbTextView>
    </Box>
  );
}

const styles = StyleSheet.create({
  toast: {
    backgroundColor: "#e6352b",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
    elevation: 10,
  },
});

export default ToastView;
