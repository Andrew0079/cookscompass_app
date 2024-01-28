import React from "react";
import { Box, Image, VStack, HStack, Pressable } from "native-base";
import { TouchableOpacity, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import NbTextView from "./nb-text-view";

const isIOS = Platform.OS === "ios";

const shadowStyle = {
  shadowColor: "#000000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.18,
  shadowRadius: 4.59,
  backgroundColor: "white",
};

function VerticalRecipeCardView({
  recipeId,
  isRecipeLiked,
  likes,
  recipeName,
  image,
  totalTime,
  kcal,
  onHandleRecipeActionLikeClick,
  onHandleNavigation,
}: {
  recipeId: string;
  isRecipeLiked: boolean;
  likes: number;
  recipeName: string;
  image: string;
  totalTime: string;
  kcal: number;
  onHandleRecipeActionLikeClick: (recipeId: string) => void;
  onHandleNavigation: () => void;
}) {
  const cardHeight = 260;
  const imageHeight = 165;
  const textHeight = cardHeight - imageHeight;

  return (
    <Pressable
      style={isIOS ? shadowStyle : {}}
      rounded="lg"
      onPress={() => {
        onHandleNavigation();
      }}
    >
      {({ isPressed }) => {
        const pressedStyle = isPressed
          ? {
              opacity: 0.4,
            }
          : {};
        return (
          <Box
            style={[isIOS ? shadowStyle : {}, pressedStyle]}
            shadow={!isIOS ? 3 : 0}
            backgroundColor="white"
            rounded="lg"
            overflow="hidden"
            width={185}
            height={cardHeight}
            position="relative" // Parent box is positioned relatively
          >
            <VStack>
              {/* Image Section */}
              <Image
                source={{ uri: image }}
                alt="Card Image"
                width="100%"
                height={imageHeight}
                borderTopLeftRadius="lg"
                borderTopRightRadius="lg"
              />

              {/* Overlay Box acting like a badge */}
              <Box
                position="absolute"
                top={2}
                right={2}
                backgroundColor="white"
                px={2}
                py={1}
                rounded="full"
              >
                <NbTextView color="black" fontSize={11} bold>
                  {totalTime}
                </NbTextView>
              </Box>

              {/* Text Section */}
              <VStack height={textHeight} justifyContent="space-between">
                <NbTextView
                  fontSize="sm"
                  color="gray.600"
                  isTruncated
                  noOfLines={3}
                  paddingLeft={2}
                  paddingTop={1}
                  paddingRight={2}
                >
                  {recipeName}
                </NbTextView>
                <HStack
                  space={3}
                  justifyContent="space-between"
                  paddingLeft={2}
                  paddingRight={2}
                  paddingBottom={2}
                >
                  <HStack alignItems="center" space={1} justifyContent="center">
                    <TouchableOpacity
                      onPress={() => onHandleRecipeActionLikeClick(recipeId)}
                    >
                      <FontAwesome
                        name={isRecipeLiked ? "heart" : "heart-o"}
                        size={16}
                        color={isRecipeLiked ? "#e6352b" : "gray"}
                      />
                    </TouchableOpacity>
                    <NbTextView color="gray.600" fontWeight="bold">
                      {likes > 0 ? likes : ""}
                    </NbTextView>
                  </HStack>
                  {kcal && (
                    <NbTextView color="gray.600">
                      {Math.round(kcal)} kcal
                    </NbTextView>
                  )}
                </HStack>
              </VStack>
            </VStack>
          </Box>
        );
      }}
    </Pressable>
  );
}

export default VerticalRecipeCardView;
