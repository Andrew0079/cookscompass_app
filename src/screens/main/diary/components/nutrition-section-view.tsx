import React from "react";
import { VStack, Box, HStack, Center } from "native-base";
import PieChart from "react-native-pie-chart";
// @ts-ignore
import { NbTextView } from "@components";

const sliceColor = ["#6495ED", "#C0C2C9"];
const series = [60, 100 - 60];

function NutritionSectionView() {
  return (
    <Box>
      <HStack justifyContent="center">
        <Center p={4} alignContent="center" justifyContent="center" shadow={4}>
          <PieChart
            widthAndHeight={120}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.9}
            coverFill="transparent"
          />
          <Center justifyContent="center" position="absolute">
            <NbTextView fontWeight="800" fontSize="xl">
              2999
            </NbTextView>
            <NbTextView fontSize="xs">KCAL LEFT</NbTextView>
          </Center>
        </Center>
      </HStack>

      <HStack
        space={12}
        justifyContent="center"
        bg="white"
        p={4}
        rounded="lg"
        shadow={4}
      >
        <VStack flex={1} alignItems="center">
          <NbTextView>Carbs</NbTextView>
          <NbTextView>0/ 465g</NbTextView>
        </VStack>

        <VStack flex={1} alignItems="center">
          <NbTextView>Protein</NbTextView>
          <NbTextView>0/ 300g</NbTextView>
        </VStack>

        <VStack flex={1} alignItems="center">
          <NbTextView>Fat</NbTextView>
          <NbTextView>0/ 200g</NbTextView>
        </VStack>
      </HStack>
    </Box>
  );
}

export default NutritionSectionView;
