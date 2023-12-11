import React, { useEffect, useState, useCallback } from "react";
import { VStack, Input, Icon, Text, View, Box } from "native-base";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
// @ts-ignore
import { api } from "@api/api";
// @ts-ignore
import { Alert, Modal, ActivityIndicator, Header } from "@components";
import { MaterialIcons } from "@expo/vector-icons";
import { HorizontalCardListView } from "./component";

function SearchRecipes() {
  const [loading, setLoading] = useState<boolean>(false);
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
    // loadRandomRecipes();
  }, []);

  return (
    <View flex={1}>
      <Header>
        <VStack
          width="100%"
          alignSelf="center"
          paddingLeft={5}
          paddingRight={5}
        >
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
      </Header>

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

        {randomRecipes.length > 0 ? (
          <HorizontalCardListView data={randomRecipes} />
        ) : (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            justifyContent="center"
            alignItems="center"
          >
            <VStack space={2} alignItems="center">
              <LottieView
                source={require("../../../../assets/animation/lottie/cooking-bowl.json")}
                autoPlay
                loop
                style={{ width: 400, height: 400 }}
              />
            </VStack>
          </Box>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "white",
  },
});

export default SearchRecipes;
