import React from "react";
import { Text, Badge } from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";

const getStyles = (isSelected: boolean) =>
  StyleSheet.create({
    badge: {
      backgroundColor: isSelected ? "black" : "white",
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
  fontWeight,
  isSelected,
  onPress,
}: {
  item: string;
  isSelected?: boolean;
  fontWeight?: "bold";
  onPress: () => void;
}) {
  const styles = getStyles(isSelected);
  return (
    <TouchableOpacity onPress={onPress}>
      <Badge borderRadius={25} style={styles.badge}>
        <Text
          padding={1}
          fontWeight={fontWeight}
          color={isSelected ? "white" : "black"}
        >
          {item}
        </Text>
      </Badge>
    </TouchableOpacity>
  );
}

export default FilterBadge;
