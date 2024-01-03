import React from "react";
import { StyleSheet } from "react-native";
import { Center, Text, VStack, View } from "native-base";
import PieChart from "react-native-pie-chart";

function PieChartView({}: {}) {
  // const series = [percentageValue, 100 - percentageValue]; // First slice is the percentage, second is the remainder
  const sliceColor = ["#6495ED", "#C0C2C9"]; // Light blue for the percentage, gray for the remainder
  const series = [30, 70];
  return (
    <View>
      <View style={styles.chartContainer}>
        <PieChart
          widthAndHeight={75}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.8} // Adjust to make the doughnut hole larger or smaller
          coverFill="transparent"
        />
        <VStack justifyContent="center" position="absolute">
          <Text fontSize="xs" color="#8d8486">
            25 %
          </Text>
          <Text fontSize="xs" color="#8d8486">
            13 g
          </Text>
        </VStack>
      </View>
      <Center paddingTop={2}>
        <Text fontSize="xs" color="#8d8486">
          Carbs
        </Text>
      </Center>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  chartContainer: {
    marginHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PieChartView;
