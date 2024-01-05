import React, { useEffect, useState } from "react";
import { StyleSheet, Animated } from "react-native";
import { Text, View } from "native-base";
import { FlashList } from "@shopify/flash-list";
// @ts-ignore
import { api } from "@api/api";
import { CategoryRecipeCard } from "./components";

const AnimatedScrollView = Animated.ScrollView;
const AnimatedImage = Animated.Image;

const getRecipesByCategoryTags = async (tag: string, setData: any) => {
  try {
    const response = await api.getRecipeByTag(tag);
    const nextPage =
      response?.data?.recipeSearch?.pageInfo?.hasNextPage || false;

    const data = response?.data?.recipeSearch?.edges || [];
    const cursor = response?.data?.recipeSearch?.pageInfo?.endCursor || null;
    setData({ data, nextPage, cursor });
  } catch (error) {
    console.log(error);
  }
};

function SectionHeader({ title, color }: { title: string; color?: string }) {
  return (
    <Text
      fontWeight="bold"
      fontSize="xl"
      marginLeft={4}
      color={color ?? "black"}
    >
      {title}
    </Text>
  );
}

function HorizontalCardListView({ data }) {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <CategoryRecipeCard item={item} />}
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
  const [categoryTwo, setCategoryTwo] = useState({
    data: [],
    nextPage: null,
    cursor: null,
  });
  const [categoryThree, setCategoryThree] = useState({
    data: [],
    nextPage: null,
    cursor: null,
  });
  const [categoryFour, setCategoryFour] = useState({
    data: [],
    nextPage: null,
    cursor: null,
  });
  const [categoryFive, setCategoryFve] = useState({
    data: [],
    nextPage: null,
    cursor: null,
  });

  const [isImageVisible, setIsImageVisible] = useState(true);

  const [scrollY] = useState(new Animated.Value(0));
  const backgroundTranslateY = scrollY.interpolate({
    inputRange: [0, 370],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 370],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  scrollY.addListener(({ value }) => {
    setIsImageVisible(value < 100);
  });

  useEffect(() => {
    const getCategoryOne = async () => {
      await getRecipesByCategoryTags("drinks", setCategoryOne);
      await getRecipesByCategoryTags("Low-Carb", setCategoryTwo);
      await getRecipesByCategoryTags("chicken", setCategoryThree);
      await getRecipesByCategoryTags("Paleo", setCategoryFour);
      await getRecipesByCategoryTags("desserts", setCategoryFve);
    };
    getCategoryOne();
  }, []);

  return (
    <View style={styles.container}>
      {!isImageVisible && (
        <Animated.View
          style={[styles.animatedHeader, { opacity: headerOpacity }]}
        />
      )}
      <AnimatedScrollView
        contentContainerStyle={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={8}
      >
        <AnimatedImage
          source={require("../../../../assets/backgrounds/soup.jpg")}
          style={[
            styles.backgroundImage,
            { transform: [{ translateY: backgroundTranslateY }] },
          ]}
          alt="Background Image"
        />
        {categoryOne?.data.length > 0 && (
          <View
            style={{
              ...styles.listContainer,
              ...{ backgroundColor: "transparent" },
            }}
          >
            <SectionHeader title="Drinks" color="white" />
            <HorizontalCardListView data={categoryOne.data} />
          </View>
        )}
        {categoryTwo?.data.length > 0 && (
          <View style={styles.listContainer}>
            <SectionHeader title="Low Carbs Recipes" color="white" />
            <HorizontalCardListView data={categoryTwo.data} />
          </View>
        )}
        {categoryThree?.data.length > 0 && (
          <View style={styles.listContainer}>
            <SectionHeader title="Chicken" />
            <HorizontalCardListView data={categoryThree.data} />
          </View>
        )}
        {categoryFour?.data.length > 0 && (
          <View style={styles.listContainer}>
            <SectionHeader title="Paleo" />
            <HorizontalCardListView data={categoryFour.data} />
          </View>
        )}
        {categoryFive?.data.length > 0 && (
          <View style={styles.listContainer}>
            <SectionHeader title="Desserts" />
            <HorizontalCardListView data={categoryFive.data} />
          </View>
        )}
      </AnimatedScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: 50,
  },
  listContainer: {
    height: 250,
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "35%", // Adjust as needed
    marginBottom: 20, // Space between the image and the next content
  },
  animatedHeader: {
    position: "absolute",
    backgroundColor: "white",
    height: 55,
    width: "100%",
    top: 0,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#CACCCE",
  },
});

export default Discover;
