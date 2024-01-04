import React from "react";
import { Center, Divider, HStack, Text, VStack, View } from "native-base";
// @ts-ignore
import { PieChartView } from "@components";

const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const calculateMacronutrientPercentages = (nutrients) => {
  if (
    !nutrients ||
    typeof nutrients.carbs !== "number" ||
    typeof nutrients.protein !== "number" ||
    typeof nutrients.fat !== "number"
  ) {
    return {
      carbsPercentage: 0,
      proteinPercentage: 0,
      fatPercentage: 0,
    };
  }

  // Combined weight of carbs, protein, and fat
  const combinedWeight = nutrients.carbs + nutrients.protein + nutrients.fat;

  // Calculate percentages based on the combined weight
  const carbsPercentage = (nutrients.carbs / combinedWeight) * 100;
  const proteinPercentage = (nutrients.protein / combinedWeight) * 100;
  const fatPercentage = (nutrients.fat / combinedWeight) * 100;

  return {
    carbsPercentage: Math.round(carbsPercentage),
    proteinPercentage: Math.round(proteinPercentage),
    fatPercentage: Math.round(fatPercentage),
  };
};

function ItemDivider() {
  return (
    <Center paddingTop={2} paddingBottom={2} paddingLeft={3} paddingRight={3}>
      <Divider />
    </Center>
  );
}

function MainMacro({
  title,
  value,
  unit,
}: {
  title: string;
  value: number | string;
  unit?: string;
}) {
  return (
    <HStack
      backgroundColor="#F5F5F5"
      justifyContent="space-between"
      paddingLeft={4}
      paddingRight={4}
      paddingTop={1}
      paddingBottom={1}
    >
      <Text fontWeight="bold" fontSize="xs">
        {title}
      </Text>
      <Text fontWeight="bold" fontSize="xs">
        {value === "section" ? "" : value && unit ? `${value} ${unit}` : "-"}
      </Text>
    </HStack>
  );
}

function SecondaryMacro({
  title,
  value,
  unit,
}: {
  title: string;
  value: number;
  unit?: string;
}) {
  return (
    <HStack
      justifyContent="space-between"
      paddingLeft={4}
      paddingTop={1}
      paddingBottom={1}
      paddingRight={4}
    >
      <Text fontSize="xs">{title}</Text>
      <Text fontSize="xs">{value && unit ? `${value} ${unit}` : "-"}</Text>
    </HStack>
  );
}

function NutritionTab({ recipeDetail }: any) {
  const nutrientsPerServing = recipeDetail?.nutrientsPerServing;
  const { carbs, fat, protein } = nutrientsPerServing;
  const { carbsPercentage, proteinPercentage, fatPercentage } =
    calculateMacronutrientPercentages(nutrientsPerServing);

  const servingWeight = recipeDetail?.servingWeight
    ? Math.round(recipeDetail?.servingWeight)
    : null;

  const {
    calcium,
    iron,
    potassium,
    sodium,
    vitaminD,
    calories,
    saturatedFat,
    sugar,
    fiber,
    fat: fatValue,
    carbs: carbsValue,
    protein: proteinValue,
    iodine,
    phosphorus,
    selenium,
    zinc,
    vitaminA,
    vitaminC,
    vitaminE,
    vitaminB6,
    vitaminB12,
  } = nutrientsPerServing;

  const secondaryMacro = [
    { calcium, unit: "mg" },
    { iron, unit: "mg" },
    { potassium, unit: "mg" },
    { sodium, unit: "mg" },
    { vitaminD, unit: "UI" },
  ];

  const otherMacro = [
    { iodine, unit: "g" },
    { phosphorus, unit: "mg" },
    { selenium, unit: "mcg" },
    { zinc, unit: "mg" },
    { vitaminA, unit: "IU" },
    { vitaminC, unit: "mg" },
    { vitaminE, unit: "g" },
    { vitaminB6, unit: "mg" },
    { vitaminB12, unit: "mcg" },
  ];
  return (
    <View paddingTop={3}>
      {servingWeight && (
        <VStack paddingLeft={7}>
          <Text>One serving: {servingWeight}</Text>
        </VStack>
      )}
      <HStack justifyContent="center" paddingTop={2} paddingBottom={2}>
        <PieChartView
          percentage={carbsPercentage}
          value={Math.round(carbs)}
          title="Carbs"
        />
        <PieChartView
          percentage={proteinPercentage}
          value={Math.round(protein)}
          title="Protein"
        />
        <PieChartView
          percentage={fatPercentage}
          value={Math.round(fat)}
          title="Fat"
        />
      </HStack>

      <VStack>
        <MainMacro title="Calories" value={calories} unit="cal" />
        <ItemDivider />
        <MainMacro title="Total Fat" value={fatValue} unit="g" />
        <SecondaryMacro title="Saturated Fat" value={saturatedFat} unit="g" />
        <ItemDivider />

        <MainMacro title="Total Carbohydrate" value={carbsValue} unit="g" />
        <SecondaryMacro title="Total Sugars" value={sugar} unit="g" />
        <ItemDivider />
        <MainMacro title="Dietary Fiber" value={fiber} unit="g" />
        <ItemDivider />
        <MainMacro title="Protein" value={proteinValue} unit="g" />
        <ItemDivider />

        {secondaryMacro.map((item) => {
          const nutrientKey = Object.keys(item)[0]; // Get the key (nutrient name)
          const nutrientValue = item[nutrientKey]; // Get the corresponding value
          return (
            <View key={nutrientKey}>
              <SecondaryMacro
                title={capitalizeFirstLetter(nutrientKey)}
                value={nutrientValue}
                unit={item.unit}
              />
            </View>
          );
        })}
        <MainMacro title="Other" value="section" />
        <ItemDivider />
        {otherMacro.map((item, index: number) => {
          const nutrientKey = Object.keys(item)[0]; // Get the key (nutrient name)
          const nutrientValue = item[nutrientKey]; // Get the corresponding value

          const isLastItem = otherMacro.length - 1 === index;
          return (
            <View paddingBottom={isLastItem ? 35 : 0} key={nutrientKey}>
              <SecondaryMacro
                title={capitalizeFirstLetter(nutrientKey)}
                value={nutrientValue}
                unit={item.unit}
              />
            </View>
          );
        })}
      </VStack>
    </View>
  );
}

export default NutritionTab;
