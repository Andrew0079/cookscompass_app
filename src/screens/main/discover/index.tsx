import React, { useEffect } from "react";
import { StyleSheet, ScrollView, StatusBar, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Box, useToast, Divider } from "native-base";
import { HorizontalCardListView, CategoryRecipeCard } from "./components";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { NbTextView, ToastView } from "@components";
import { RootState } from "../../../redux/store";
import socket from "../../../services/socket-service";
import { FlashList } from "@shopify/flash-list";
import {
  optimisticUpdateLikeStatus,
  revertUpdateLikeStatus,
  realTimeUpdateLikeCount,
} from "../../../redux/slices/discovery-slice";
import { handleRecipeActions } from "../../../utils/functions";

const data = [
  { title: "Lovely Salad", itemKey: "salad" },
  {
    title: "Healthy Treats",
    itemKey: "treat",
  },
  { title: "Yummy Soups", itemKey: "soup" },
  { title: "Healthy Smoothies", itemKey: "smoothie" },
];

const isIOS = Platform.OS === "ios";

function Discover({ navigation }) {
  const dispatch = useDispatch();
  const toast = useToast();

  const userId = useSelector(
    (state: RootState) => state?.user?.value?.customUserId
  );

  const discoveryData = useSelector(
    (state: RootState) => state?.discovery?.value
  );

  useEffect(() => {
    const likeUpdateHandler = (data) => {
      const currentRecipeId = data?.recipeId;
      const newLikeCount = data?.newLikeCount;
      const userActionId = parseInt(data?.userId) === parseInt(userId);

      if (currentRecipeId && newLikeCount !== undefined && !userActionId) {
        dispatch(
          realTimeUpdateLikeCount({ recipeId: currentRecipeId, newLikeCount })
        );
      }
    };

    socket.on("likeUpdate", likeUpdateHandler);

    return () => {
      socket.off("likeUpdate", likeUpdateHandler); // Clean up the event listener when the component unmounts
    };
  }, []);

  const handleRecipeActionLikeClick = async (recipeId: string) => {
    dispatch(optimisticUpdateLikeStatus({ recipeId }));
    try {
      await handleRecipeActions(recipeId);
    } catch (error) {
      toast.show({
        placement: "top",
        render: () => <ToastView text="Unable to perform like action" />,
      });
      // If the server call fails, revert the optimistic update
      dispatch(revertUpdateLikeStatus({ recipeId }));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={isIOS ? ["top"] : undefined}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View
        style={styles.headerArea}
        px={5}
        borderBottomColor="gray.200"
        borderBottomWidth={1}
      >
        <NbTextView fontSize="xl" fontWeight="600">
          Discover Recipes
        </NbTextView>
      </View>
      <ScrollView style={styles.scrollView} bounces={false}>
        <View
          width="100%"
          marginTop={3} // Adjust as needed
          marginBottom={5}
        >
          <NbTextView
            fontSize="lg"
            marginLeft={4}
            paddingBottom={2}
            color="gray.500"
            fontWeight="800"
          >
            WHAT'S HOT
          </NbTextView>
          <FlashList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => {
              const lastItemKey = data?.[data.length - 1]?.itemKey;

              return (
                <Box
                  marginLeft={4}
                  marginRight={lastItemKey === item.itemKey ? 4 : 0}
                >
                  <CategoryRecipeCard
                    title={item.title}
                    itemKey={item.itemKey}
                  />
                </Box>
              );
            }}
            estimatedItemSize={350}
          />
        </View>
        <Divider width="92%" alignSelf="center" />
        {discoveryData?.length > 0 &&
          discoveryData.map((category, index) => (
            <Box key={index}>
              <HorizontalCardListView
                categoryData={category}
                navigation={navigation}
                onHandleRecipeActionLikeClick={handleRecipeActionLikeClick}
              />
              {discoveryData.length - 1 !== index && (
                <Divider width="92%" alignSelf="center" />
              )}
            </Box>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  headerImage: {
    flexGrow: 1,
    height: 230, // Set a fixed height
    borderRadius: 25,
  },
  overlayContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Adjust opacity for desired darkness
  },
  headerArea: {
    paddingBottom: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});

export default Discover;
