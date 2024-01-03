import React from "react";
import { View, StyleSheet } from "react-native";
import { HStack, Text, VStack } from "native-base";
import PieChart from "react-native-pie-chart";
import { PieChartView } from "@components";

const series = [30, 70];
const sliceColor = ["#fbd203", "gray"];

function NutritionTab({}: {}) {
  // const series = [percentageValue, 100 - percentageValue]; // First slice is the percentage, second is the remainder
  const sliceColor = ["#006ee6", "#D3D3D3"]; // Light blue for the percentage, gray for the remainder
  const series = [30, 70];
  return (
    <View>
      <HStack justifyContent="center" paddingTop={5}>
        <PieChartView />
        <PieChartView />
        <PieChartView />
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});

export default NutritionTab;
