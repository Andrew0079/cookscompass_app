import React, { ReactNode } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

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
    <>
      {visible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={onClose ? () => onClose(false) : undefined}
          activeOpacity={1}
        >
          {/* Stop propagation on the inner View */}
          <View
            style={styles.overlayContent}
            onStartShouldSetResponder={() => true}
          >
            {children}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  overlayContent: {
    elevation: 5, // Shadow on Android
    width: "80%",
    backgroundColor: "white", // Add a background color to the content area
    borderRadius: 10, // Optionally round the corners
  },
  overlay: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Ensure it overlays other components
  },
});

export default Modal;
