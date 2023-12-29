import React from "react";
import { Text, Badge } from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  badge: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
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
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Badge borderRadius={25} style={badgeStyle}>
        <Text
          padding={1}
          fontWeight={fontWeight}
          color={isSelected || backgroundColor !== "white" ? "white" : "black"}
        >
          {item}
        </Text>
      </Badge>
    </TouchableOpacity>
  );
}

export default FilterBadge;
