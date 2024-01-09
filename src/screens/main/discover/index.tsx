import React, { useEffect, useState } from "react";
import { StyleSheet, Animated } from "react-native";
import { Text, View } from "native-base";
import { FlashList } from "@shopify/flash-list";
// @ts-ignore
import { api } from "@api/api";
import { CategoryRecipeCard } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/loading-slice";
import { RootState } from "../../../redux/store";

const AnimatedScrollView = Animated.ScrollView;
const AnimatedImage = Animated.Image;

const getRecipesByCategoryTags = async (tag: string) => {
  try {
    const response = await api.getRecipeByTag(tag);
    const nextPage =
      response?.data?.recipeSearch?.pageInfo?.hasNextPage || false;

    const data = response?.data?.recipeSearch?.edges || [];
    const cursor = response?.data?.recipeSearch?.pageInfo?.endCursor || null;
    return { data, nextPage, cursor };
  } catch (error) {
    return { data: [], nextPage: null, cursor: null };
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

function HorizontalCardListView({ data, navigation }) {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => (
        <CategoryRecipeCard item={item} navigation={navigation} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      estimatedItemSize={12}
      // Add additional FlashList props as needed
    />
  );
}

function Discover({ navigation }) {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.value);

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
    const fetchInitialCategories = async () => {
      dispatch(setLoading(true));
      try {
        const initialCategories = ["drinks", "Low-Carb", "chicken"];
        const fetchedCategories = await Promise.all(
          initialCategories.map(async (tag) => ({
            title: tag,
            data: await getRecipesByCategoryTags(tag),
          }))
        );
        setCategories(fetchedCategories);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchInitialCategories();
  }, []);

  useEffect(() => {
    const fetchMoreCategories = async () => {
      try {
        const moreCategories = ["Paleo", "desserts"];
        const fetchedCategories = await Promise.all(
          moreCategories.map(async (tag) => ({
            title: tag,
            data: await getRecipesByCategoryTags(tag),
          }))
        );
        setCategories((prevCategories) => [
          ...prevCategories,
          ...fetchedCategories,
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    if (!loading) {
      fetchMoreCategories();
    }
  }, [loading]);

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
        {!loading && (
          <AnimatedImage
            source={require("../../../../assets/backgrounds/soup.jpg")}
            style={[
              styles.backgroundImage,
              { transform: [{ translateY: backgroundTranslateY }] },
            ]}
            alt="Background Image"
          />
        )}
        {categories.length > 0 &&
          categories.map((category, index) => (
            <View key={index} style={styles.listContainer}>
              <SectionHeader
                title={category.title}
                color={index < 2 ? "white" : "black"}
              />
              <HorizontalCardListView
                data={category.data.data}
                navigation={navigation}
              />
            </View>
          ))}
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
    height: "30%", // Adjust as needed
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
