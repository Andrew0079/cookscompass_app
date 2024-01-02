import React from "react";
import { Text } from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  badge: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
});

function FilterBadge({
  item,
  fontWeight = "normal",
  isSelected = false,
  backgroundColor = "white",
  onPress,
}: {
  item: string;
  isSelected?: boolean;
  fontWeight?: "normal" | "bold";
  backgroundColor?: string;
  onPress: () => void;
}) {
  const badgeStyle = {
    ...styles.badge,
    backgroundColor: isSelected ? "black" : backgroundColor,
    borderRadius: 25,
  };
  return (
    <TouchableOpacity onPress={onPress} style={badgeStyle}>
      <Text
        padding={2}
        fontWeight={fontWeight}
        color={isSelected || backgroundColor !== "white" ? "white" : "black"}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
}

export default FilterBadge;
