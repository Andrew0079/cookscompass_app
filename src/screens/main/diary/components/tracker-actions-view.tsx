import React from "react";
import { VStack, Box, HStack, Icon, Image } from "native-base";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// @ts-ignore
import { NbTextView } from "@components";
import WaterBottle from "./water-bottle";
import WaterGlass from "./water-glass";
import { Ionicons } from "@expo/vector-icons";
import { ROUTES } from "../../../../utils/common";

const trackingMap: { title: string; recommended: string; path?: string }[] = [
  {
    title: "Breakfast",
    recommended: "600-700g",
    path: require("../../../../../assets/png/breakfast.png"),
  },
  {
    title: "Lunch",
    recommended: "600-700g",
    path: require("../../../../../assets/png/lunch.png"),
  },
  {
    title: "Dinner",
    recommended: "600-700g",
    path: require("../../../../../assets/png/dinner.png"),
  },
  {
    title: "Snack",
    recommended: "600-700g",
    path: require("../../../../../assets/png/dessert.png"),
  },
];

function TrackerActionsView({ navigation }) {
  return (
    <VStack space={4}>
      {trackingMap.map(({ title, recommended, path }, index: number) => (
        <HStack
          key={`tracker-${index}`}
          space={3}
          alignItems="center"
          bg="white"
          padding={2}
          rounded="lg"
          shadow={4}
        >
          {/* Section 1: Image (20%) */}
          <Box flex={2} alignItems="center" justifyContent="center">
            <Image
              source={path as any}
              alt="Placeholder"
              width={45}
              height={45}
            />
          </Box>

          {/* Section 2: Two Rows of Text (60%) */}
          <VStack flex={6} space={1} justifyContent="center">
            <NbTextView fontSize="md">{title}</NbTextView>
            <NbTextView fontSize="sm" color="gray.500">
              {recommended}
            </NbTextView>
          </VStack>

          {/* Section 3: Icon (20%) */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.TRACKER, { title });
            }}
          >
            <Box flex={2} alignItems="center" justifyContent="center">
              <Icon
                as={MaterialIcons}
                name="add-circle"
                size="4xl"
                color="gray.400"
              />
            </Box>
          </TouchableOpacity>
        </HStack>
      ))}
      <VStack space={3} bg="white" px={4} py={2} rounded="lg" shadow={4}>
        <HStack justifyContent="space-between" width="100%" alignItems="center">
          <NbTextView>0L</NbTextView>
          <NbTextView>Water</NbTextView>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal-sharp" size={18} />
          </TouchableOpacity>
        </HStack>
        <HStack justifyContent="flex-start">
          <WaterBottle />
          <WaterGlass />
        </HStack>
      </VStack>
    </VStack>
  );
}

export default TrackerActionsView;
