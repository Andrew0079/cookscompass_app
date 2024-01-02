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
          const title =
            node.name.length > 25
              ? node.name.substring(0, 25) + "\n" + node.name.substring(25)
              : node.name;
          const totalTime = node.totalTime;

          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ROUTES.RECIPE, { id: node.id });
              }}
            >
              <Box
                style={[styles.shadowProp]}
                borderRadius={5}
                alignSelf="center"
                flexDirection="row"
                width="93%"
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
                <VStack justifyContent="space-between" paddingLeft={1}>
                  <HStack>
                    <Text fontWeight="bold" fontSize="xs">
                      {title}
                    </Text>
                  </HStack>
                  <HStack>
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
