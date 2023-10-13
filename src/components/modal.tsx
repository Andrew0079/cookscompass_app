import React, { ReactNode } from "react";
import {
  View,
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function Modal({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose?: (close: boolean) => void;
  children: ReactNode;
}) {
  return (
    <RNModal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose ? () => onClose(false) : undefined} // Close the modal when the user presses the hardware back button on Android
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose ? () => onClose(false) : undefined} // Close the modal when the user clicks outside
        style={styles.overlayContainer}
      >
        <View style={styles.overlayContent}>{children}</View>
      </TouchableOpacity>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  overlayContent: {
    elevation: 5, // Shadow on Android
    width: "80%",
  },
});

export default Modal;
