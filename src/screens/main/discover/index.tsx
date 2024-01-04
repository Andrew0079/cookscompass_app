import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { HStack, Text, VStack, View } from "native-base";
import { FlashList } from "@shopify/flash-list";
// @ts-ignore
import { api } from "@api/api";
import { Card } from "./components";

// Placeholder data for the sections
const healthyDrinksData = [
  {
    /* ...data... */
  },
];
const whatToCookData = [
  {
    /* ...data... */
  },
];
const communityRecipesData = [
  {
    /* ...data... */
  },
];
const quickLinksData = [
  {
    /* ...data... */
  },
];

function SectionHeader({ title }) {
  return (
    <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>
      {title}
    </Text>
  );
}

function HorizontalCardListView({ data }) {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <Card item={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      estimatedItemSize={50}
      // Add additional FlashList props as needed
    />
  );
}

function Discover() {
  const [categoryOne, setCategoryOne] = useState({
    data: [],
    nextPage: null,
    cursor: null,
  });

  useEffect(() => {
    const getCategoryOne = async () => {
      try {
        const response = await api.getRecipeByTag(["drinks"]);
        const nextPage =
          response?.data?.recipeSearch?.pageInfo?.hasNextPage || false;

        const data = response?.data?.recipeSearch?.edges || [];
        const cursor =
          response?.data?.recipeSearch?.pageInfo?.endCursor || null;
        setCategoryOne({ data, nextPage, cursor });
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryOne();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 300 }}>
          <SectionHeader title="Healthy Drinks" />
          <HorizontalCardListView data={categoryOne.data} />
        </View>

        <View style={{ height: 300 }}>
          <SectionHeader title="What to Cook Tonight" />
          <HorizontalCardListView data={categoryOne.data} />
        </View>
        {/* 
        <View>
          <SectionHeader title="Community Recipes" />
          <HorizontalCardListView data={communityRecipesData} />
        </View>

        <View>
          <SectionHeader title="Quick Links" />
          <HorizontalCardListView data={quickLinksData} />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Discover;
