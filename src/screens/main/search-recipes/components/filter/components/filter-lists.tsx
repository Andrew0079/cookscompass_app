import React from "react";
import { Box } from "native-base";
import { StyleSheet, FlatList } from "react-native";
import { searchFilterSections, searchFilterSectionData } from "../filters";
import FilterItem from "./filter-item";

function FilterLists({
  section,
  onSetSection,
}: {
  section: string | null;
  onSetSection: (value: string | null) => void;
}) {
  return (
    <Box style={styles.flatListContainer}>
      <FlatList
        horizontal
        style={styles.horizontalFlatList}
        data={searchFilterSections}
        renderItem={({ item }) => (
          <FilterItem
            item={item.title}
            isTitle
            isSelected={section === item.key}
            itemKey={item.key}
            onSetSection={onSetSection}
          />
        )}
        keyExtractor={(item) => item.key}
        removeClippedSubviews={true}
      />
      <FlatList
        data={searchFilterSectionData.filter(
          (item: { key: string }) => item.key === section
        )}
        renderItem={({ item }) => <FilterItem data={item.data} />}
        keyExtractor={(item) => item.key}
        removeClippedSubviews={true}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  horizontalFlatList: {
    marginBottom: 15,
  },
});

export default FilterLists;
