import React from "react";
import { HStack, Box, Image, Text, Badge } from "native-base";
import { StyleSheet, FlatList } from "react-native";

function HorizontalCardListView({ data }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Box
          style={[styles.shadowProp]}
          rounded="lg"
          alignSelf="center"
          flexDirection="row"
          width="90%"
          backgroundColor="white"
          marginBottom={5}
          padding={1}
        >
          <Image
            style={{
              width: 80,
              overflow: "hidden",
              height: 80,
              borderRadius: 5,
            }}
            source={{
              uri: item.image,
            }}
            alt="image"
          />
          <HStack flex={1} padding={1} justifyContent="space-between">
            <Box>
              <Text fontWeight="bold" fontSize="xs">
                {item.title.length > 30
                  ? item.title.substring(0, 30) +
                    "\n" +
                    item.title.substring(30)
                  : item.title}
              </Text>
            </Box>
            <Box>
              <Badge borderRadius={5} colorScheme="success">
                Easy
              </Badge>
            </Box>
          </HStack>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
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
