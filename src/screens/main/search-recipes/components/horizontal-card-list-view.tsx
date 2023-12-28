import React from "react";
import { HStack, Box, Image, Text, Badge } from "native-base";
import { StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ROUTES } from "../../../../utils/common";

function HorizontalCardListView({ navigation, data }) {
  return (
    <FlatList
      style={styles.flatList}
      data={data}
      renderItem={({ item: { node } }) => {
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
              marginBottom={data[data.length - 1].node.id === node.id ? 70 : 3}
              padding={1}
            >
              <Image
                style={styles.image}
                source={{
                  uri: node.mainImage,
                }}
                alt="image"
              />
              <HStack flex={1} padding={1} justifyContent="space-between">
                <Box justifyContent="space-between">
                  <Text fontWeight="bold" fontSize="xs">
                    {title}
                  </Text>
                  <HStack space={1}>
                    {node.mealTags.map((tag: string, index: number) => (
                      <Badge
                        key={`key-${index}`}
                        borderRadius={5}
                        style={{ borderColor: "#e68600" }}
                        variant="outline"
                      >
                        <Text fontSize="xs" color="#e68600">
                          {tag}
                        </Text>
                      </Badge>
                    ))}
                  </HStack>
                </Box>
                <Box>
                  <Badge
                    borderRadius={5}
                    style={{ borderColor: "#8d8486" }}
                    variant="outline"
                  >
                    <Text fontSize="xs" color="#8d8486">
                      {totalTime}
                    </Text>
                  </Badge>
                </Box>
              </HStack>
            </Box>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.node.id}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    overflow: "hidden",
    height: 80,
    borderRadius: 5,
  },
  flatList: {
    zIndex: 9999999,
    paddingTop: 10,
    paddingBottom: 25,
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
