import React from "react";
import { View, Text, Box } from "native-base";
import { StyleSheet } from "react-native";
// @ts-ignore
import { FilterBadge } from "@components";
import { FlashList } from "@shopify/flash-list";

const diet = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "High-Protein",
  "High-Fiber",
];

const cuisines = [
  "American",
  "Asian",
  "Barbecue",
  "British",
  "Brazilian",
  "Bulgogi",
  "Chinese",
  "Cajun & Creole",
  "Central Europe",
  "Cuban",
  "Caribbean",
  "Eastern Europe",
  "French",
  "Filipino",
  "Greek",
  "German",
  "Hawaiian",
  "Hungarian",
  "Irish",
  "Indian",
  "South East Asian",
  "Jamaican",
  "Korean",
  "Kosher",
  "Kimchi",
  "Mexican",
  "Mediterranean",
  "Middle Eastern",
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

const intolerances = [
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Sulfite",
  "Tree Nut",
  "Wheat",
];

const calories = ["500", "550", "600", "650", "700"];

const searchFilterItems = [
  { key: "diet", title: "Diet", data: diet },
  {
    key: "caloriesUnder",
    title: "Calories Under",
    data: calories,
  },
  {
    key: "difficulty",
    title: "Difficulty",
    data: difficulty,
  },
  { key: "cuisines", title: "Cuisines", data: cuisines },

  { key: "dishTypes", title: "Dish Types", data: dishTypes },
  {
    key: "intolerances",
    title: "Intolerances",
    data: intolerances,
  },
];

export { searchFilterItems };

const RenderItem = ({ item, filters, onHandleSelectItem }) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <View style={styles.itemsContainer}>
        {item.data.map((subItem: string, index: number) => {
          const isSelected = filters?.[item.key]?.items?.includes(subItem);
          return (
            <Box padding={1} key={index}>
              <FilterBadge
                isSelected={isSelected}
                item={subItem}
                onPress={() =>
                  onHandleSelectItem(item.key, item.title, subItem)
                }
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
