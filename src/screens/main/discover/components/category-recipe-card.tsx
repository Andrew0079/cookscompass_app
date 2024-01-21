import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, Box, VStack, HStack, Badge, useToast } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ROUTES } from "../../../../utils/common";
import { handleRecipeActions } from "../../../../utils/functions";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

function CategoryRecipeCard({ item, navigation, onSetLiked, onSetRevertLike }) {
  const toast = useToast();
  const node = item?.node;

  const userId = useSelector(
    (state: RootState) => state.user.value?.customUserId
  );

  if (!node) return;

  const { mainImage, name, likes, isRecipeLiked } = node;

  const handleRecipeActionClick = async () => {
    try {
      if (userId) {
        onSetLiked({ recipeId: node.id, isRecipeLiked });
        await handleRecipeActions(userId, node.id);
      }
    } catch (error) {
      onSetRevertLike(true);
      toast.show({
        placement: "top",
        render: () => (
          <Box style={styles.toast}>
            <Text color="white">Unable to perform like action</Text>
          </Box>
        ),
      });
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate(ROUTES.RECIPE, {
          node: node,
          path: ROUTES.DISCOVER,
        });
      }}
    >
      <Image
        source={{ uri: mainImage }}
        alt="Recipe Image"
        style={styles.backgroundImage}
        placeholder={require("../../../../../assets/backgrounds/fallback.jpeg")}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.3)", "transparent"]}
        style={styles.fullCardGradient}
        start={{ x: 0.3, y: 0.5 }}
        end={{ x: 1, y: 0 }}
      />
      <VStack justifyContent="space-between" flex={1}>
        <HStack justifyContent="space-between">
          <Badge
            height={6}
            margin={2}
            backgroundColor="white"
            borderRadius={20}
            size="0.5"
          >
            <Text color="black" fontWeight="bold" fontSize="xs">
              50 min
            </Text>
          </Badge>
          <HStack space={3} paddingRight={3} paddingTop={2}>
            <HStack alignContent="center" space={1}>
              <TouchableOpacity onPress={() => handleRecipeActionClick()}>
                <FontAwesome
                  name="heart"
                  size={22}
                  color={isRecipeLiked ? "#e6352b" : "white"}
                />
              </TouchableOpacity>
              <Text color="white" fontWeight="bold">
                {likes > 0 ? likes : null}
              </Text>
            </HStack>

            <TouchableOpacity>
              <FontAwesome name="bookmark" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="share-alt" size={22} color="white" />
            </TouchableOpacity>
          </HStack>
        </HStack>
        <HStack
          justifyContent="space-between"
          paddingTop={1}
          paddingLeft={2}
          paddingRight={2}
        >
          <Box justifyContent="flex-end" padding={1}>
            <Text
              color="white"
              fontWeight="bold"
              fontSize="lg"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {name}
            </Text>
          </Box>
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 320,
    height: 200,
    marginTop: 5,
    marginLeft: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  overlayContent: {
    justifyContent: "space-between",
    padding: 2,
    flex: 1,
  },
  fullCardGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 20,
  },
  toast: {
    backgroundColor: "#e6352b",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
    elevation: 10,
  },
});

export default CategoryRecipeCard;
