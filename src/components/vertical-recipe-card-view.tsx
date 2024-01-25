import React from "react";
import { Box, Image, Text, VStack, HStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

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
  onHandleRecipeActionLikeClick: (
    recipeId: string,
    isRecipeLiked: boolean
  ) => void;
  onHandleNavigation: () => void;
}) {
  const cardHeight = 260;
  const imageHeight = 165;
  const textHeight = cardHeight - imageHeight;
  return (
    <TouchableOpacity onPress={onHandleNavigation}>
      <Box
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
            <Text color="black" fontSize={10} bold>
              {totalTime}
            </Text>
          </Box>

          {/* Text Section */}
          <VStack height={textHeight} justifyContent="space-between">
            <Text
              fontSize="sm"
              color="gray.600"
              isTruncated
              noOfLines={3}
              paddingLeft={2}
              paddingTop={1}
              paddingRight={2}
            >
              {recipeName}
            </Text>
            <HStack
              space={3}
              justifyContent="space-between"
              paddingLeft={2}
              paddingRight={2}
              paddingBottom={2}
            >
              <HStack alignItems="center" space={1} justifyContent="center">
                <TouchableOpacity
                  onPress={() =>
                    onHandleRecipeActionLikeClick(recipeId, isRecipeLiked)
                  }
                >
                  <FontAwesome
                    name={isRecipeLiked ? "heart" : "heart-o"}
                    size={16}
                    color={isRecipeLiked ? "#e6352b" : "gray"}
                  />
                </TouchableOpacity>
                <Text color="gray.600" fontWeight="bold">
                  {likes > 0 ? likes : ""}
                </Text>
              </HStack>
              {kcal && <Text color="gray.600">{Math.round(kcal)} kcal</Text>}
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
}

export default VerticalRecipeCardView;
