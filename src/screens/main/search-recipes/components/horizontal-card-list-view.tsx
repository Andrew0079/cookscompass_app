import React from "react";
import { HStack, Box, Image, Text, Badge } from "native-base";
import { StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function HorizontalCardListView({ data }) {
  return (
    <FlatList
      style={styles.flatList}
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Box
            style={[styles.shadowProp]}
            rounded="lg"
            alignSelf="center"
            flexDirection="row"
            width="90%"
            backgroundColor="white"
            marginBottom={data[data.length - 1].id === item.id ? 16 : 3}
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
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    zIndex: 9999999,
    marginTop: 10,
    paddingTop: 10,
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
