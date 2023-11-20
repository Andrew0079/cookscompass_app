import React, { useEffect, useState, useCallback } from "react";
import { VStack, Input, Icon, Text } from "native-base";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
// @ts-ignore
import { api } from "@api/api";
// @ts-ignore
import { Alert, Modal, ActivityIndicator } from "@components";
import { MaterialIcons } from "@expo/vector-icons";
import { HorizontalCardListView } from "./component";

function SearchRecipes() {
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [randomRecipes, setRandomRecipes] = useState([]);

  const loadRandomRecipes = useCallback(async () => {
    try {
      const response = await api.getRandomRecipes({ number: 10 });
      setRandomRecipes([...randomRecipes, ...response.recipes]);
      setLoading(false);
    } catch (error) {
      setError("* Unable to get recipes!");
      setLoading(false);
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    loadRandomRecipes();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle="default" />
      <Modal visible={visible} onClose={setVisible}>
        <Alert
          backgroundColor="white"
          errorMessage={error}
          onPress={() => setVisible(false)}
        />
      </Modal>
      <ActivityIndicator loading={loading} spinSize="lg" />
      <VStack width="100%" alignSelf="center" paddingLeft={5} paddingRight={5}>
        <Input
          placeholder="Search recipes..."
          width="100%"
          variant="rounded"
          fontSize="14"
          InputLeftElement={
            <Icon
              margin="2"
              size="6"
              color="gray.500"
              as={<MaterialIcons name="search" />}
            />
          }
          InputRightElement={
            <Icon
              margin="2"
              size="6"
              color="gray.500"
              as={<MaterialIcons name="tune" />}
            />
          }
        />
      </VStack>
      <VStack paddingTop={5} paddingLeft={5} paddingBottom={5}>
        <Text>Recipe Results</Text>
      </VStack>
      <HorizontalCardListView data={randomRecipes} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
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
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },

  imageBackground: {
    width: 50,
    height: 50,
    justifyContent: "flex-end",
  },
});

export default SearchRecipes;
