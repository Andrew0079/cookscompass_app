import React from "react";
import { Box } from "native-base";
import { StyleSheet, FlatList } from "react-native";
import { searchFilterSections, searchFilterSectionData } from "./filters";
import FilterItem from "./components/filter-item";

function Filter({
  filters,
  section,
  onSetSection,
  onSetFilters,
}: {
  filters: object | null;
  section: string | null;
  onSetSection: (value: string | null) => void;
  onSetFilters: (value: object | null) => void;
}) {
  return (
    <Box style={styles.flatListContainer}>
      {/* Categories */}
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
      {/* Items by categories */}
      <FlatList
        data={searchFilterSectionData.filter(
          (item: { key: string }) => item.key === section
        )}
        renderItem={({ item }) => (
          <FilterItem
            filters={filters}
            data={item.data}
            section={section}
            onSetFilters={onSetFilters}
          />
        )}
        keyExtractor={(item) => item.key}
        removeClippedSubviews={true}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  horizontalFlatList: {
    marginBottom: 10,
  },
});

export default Filter;
