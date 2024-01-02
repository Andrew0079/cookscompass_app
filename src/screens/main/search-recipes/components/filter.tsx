import React from "react";
import { View, Text, Box } from "native-base";
import { StyleSheet } from "react-native";
// @ts-ignore
import { FilterBadge } from "@components";
import { FlashList } from "@shopify/flash-list";

const diet = [
  "Gluten-Free",
  "Keto-Friendly",
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Paleo",
  "High-Protein",
  "High-Fiber",
];

const cuisines = [
  "American",
  "Asian",
  "British",
  "Brazilian",
  "Chinese",
  "Cajun & Creole",
  "Central europe",
  "Cuban",
  "Caribbean",
  "Eastern europe",
  "French",
  "Filipino",
  "Greek",
  "German",
  "Hawaiian",
  "Hungarian",
  "Irish",
  "Indian",
  "South east asian",
  "Jamaican",
  "Korean",
  "Mexican",
  "Mediterranean",
  "Middle eastern",
  "Moroccan",
  "Nordic",
  "Portuguese",
  "Spanish",
  "Swedish",
  "Thai",
  "Turkish",
  "Vietnamese",
];

const dishTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

const difficulty = [
  "Under 1 hour",
  "Under 45 minutes",
  "Under 30 minutes",
  "Under 15 minutes",
];

const calories = ["500", "550", "600", "650", "700"];

const searchFilterItems = [
  { key: "tags", title: "Diet", data: diet },
  {
    key: "macroNutrientsRange",
    title: "Calories Under",
    data: calories,
  },
  {
    key: "maxPrepTime",
    title: "Difficulty",
    data: difficulty,
  },
  { key: "cuisines", title: "Cuisines", data: cuisines },

  { key: "mealTime", title: "Dish Types", data: dishTypes },
];

export { searchFilterItems };

const RenderItem = ({ item, filters, onHandleSelectItem }) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <View style={styles.itemsContainer}>
        {item.data.map((subItem: string, index: number) => {
          let isSelected;
          if (filters?.[item.key] && Array.isArray(filters[item.key])) {
            // If the value is an array, check if it includes the subItem
            isSelected = filters?.[item.key]?.includes(subItem);
          } else {
            // If the value is not an array, directly compare it with the subItem
            isSelected =
              filters?.[item.key]?.toLocaleLowerCase() ===
              subItem?.toLocaleLowerCase();
          }
          const formattedSubItem =
            item.key === "mealTime" ? subItem.toUpperCase() : subItem;
          return (
            <Box padding={1} key={index}>
              <FilterBadge
                isSelected={isSelected}
                item={subItem}
                onPress={() => onHandleSelectItem(item.key, formattedSubItem)}
              />
            </Box>
          );
        })}
      </View>
    </View>
  );
};

function Filter({ filters, onHandleSelectItem }: any) {
  return (
    <View style={styles.container}>
      <FlashList
        contentContainerStyle={styles.flashList}
        data={searchFilterItems}
        extraData={filters}
        renderItem={({ item }) => {
          return (
            <RenderItem
              item={item}
              filters={filters}
              onHandleSelectItem={onHandleSelectItem}
            />
          );
        }}
        keyExtractor={(item) => item.key}
        estimatedItemSize={50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flex: 6,
  },
  bottomView: {
    flex: 1,
  },
  categoryContainer: {
    paddingBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    paddingLeft: 15,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 5,
  },
  flashList: {
    paddingTop: 10,
    paddingBottom: 15,
  },
});

export default Filter;
