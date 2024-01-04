import React, { useState } from "react";
import { HStack, Box, Text, Badge, View, Spinner, VStack } from "native-base";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ROUTES } from "../../../../utils/common";
import { FlashList } from "@shopify/flash-list";

function Footer({ isLoading }: { isLoading: boolean }) {
  return isLoading ? <Spinner size="sm" color="#CACCCE" /> : null;
}

function HorizontalCardListView({ navigation, data, onEndReached }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={styles.flashListContainer}>
      <FlashList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        estimatedItemSize={200}
        data={data}
        ListFooterComponent={<Footer isLoading={isLoading} />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setIsLoading(true);
          onEndReached();
          setIsLoading(false);
        }}
        renderItem={({ item: { node } }: any) => {
          const title = node?.name;
          const totalTime = node?.totalTime;
          const calories = node?.nutrientsPerServing?.calories;

          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ROUTES.RECIPE, { node: node });
              }}
            >
              <Box
                style={[styles.shadowProp]}
                borderRadius={5}
                alignSelf="center"
                flexDirection="row"
                width="95%"
                backgroundColor="white"
                marginBottom={
                  data[data.length - 1].node.id === node.id ? 70 : 3
                }
                padding={1}
              >
                <Image
                  style={styles.image}
                  source={{ uri: node.mainImage }}
                  alt="image"
                  transition={1000}
                  placeholder={require("../../../../../assets/backgrounds/fallback.jpeg")}
                  placeholderContentFit="cover"
                />
                <VStack
                  justifyContent="space-between"
                  paddingLeft={1}
                  width="79%"
                >
                  <HStack justifyContent="space-between" space={1}>
                    {title && (
                      <Text
                        fontWeight="bold"
                        fontSize="xs"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ flexShrink: 1 }}
                      >
                        {title}
                      </Text>
                    )}
                    {totalTime && (
                      <Badge
                        borderRadius={5}
                        style={{ borderColor: "#8d8486" }}
                        variant="outline"
                      >
                        <Text fontSize="xs" color="#8d8486">
                          {totalTime}
                        </Text>
                      </Badge>
                    )}
                  </HStack>
                  <HStack justifyContent="space-between">
                    {calories && (
                      <Text fontSize="xs" color="#8d8486">
                        {Math.round(calories)} kcal
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Box>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    overflow: "hidden",
    height: 80,
    borderRadius: 5,
  },
  flashListContainer: {
    zIndex: 9999999,
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 15,
    paddingBottom: 5,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default HorizontalCardListView;
