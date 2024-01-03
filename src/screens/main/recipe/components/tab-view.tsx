import React from "react";
import { FlashList } from "@shopify/flash-list";
import { Text } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";

function TabView({
  tabs,
  selectedTab,
  onSetSelectedTab,
}: {
  tabs: string[];
  selectedTab: string;
  onSetSelectedTab: (value: string) => void;
}) {
  return (
    <FlashList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={tabs}
      estimatedItemSize={50}
      extraData={selectedTab}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.tab, item === selectedTab ? styles.activeTab : null]}
          onPress={() => onSetSelectedTab(item)}
        >
          <Text fontSize="md" color="#8d8486">
            {item}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.tabsContainer}
    />
  );
}

const styles = StyleSheet.create({
  tab: {
    justifyContent: "center",
    marginRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },

  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: "#CACCCE",
  },
  tabsContainer: {
    paddingHorizontal: 10,
  },
});

export default TabView;
