import React from "react";
import { StyleSheet } from "react-native";
import { Center, Text, View } from "native-base";
import PieChart from "react-native-pie-chart";

function PieChartView({
  value,
  percentage,
  title,
}: {
  value: number;
  percentage: number;
  title: string;
}) {
  const sliceColor = ["#6495ED", "#C0C2C9"];
  const series = [percentage, 100 - percentage];
  return (
    <View>
      <View style={styles.chartContainer}>
        <PieChart
          widthAndHeight={82}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.8}
          coverFill="transparent"
        />
        <Center justifyContent="center" position="absolute">
          <Text fontSize="xs" color="#8d8486">
            {percentage}%
          </Text>
          <Text fontSize="xs" color="#8d8486">
            {value}g
          </Text>
        </Center>
      </View>
      <Center paddingTop={2}>
        <Text fontSize="xs" color="#8d8486">
          {title}
        </Text>
      </Center>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    marginHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PieChartView;
