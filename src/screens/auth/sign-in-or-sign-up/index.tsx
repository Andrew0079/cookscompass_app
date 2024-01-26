import React from "react";
import { VStack, Button, Center, HStack, View, Image } from "native-base";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
// @ts-ignore
import { NbTextView } from "@components";
import { ROUTES } from "../../../utils/common";

function SignInOrSignUp({ navigation }) {
  return (
    <View backgroundColor="white" flex={1}>
      <View flex={7} justifyContent="flex-end" alignSelf="center">
        <Image
          alt="logo"
          height={350}
          width={350}
          source={require("../../../../assets/favicon.png")}
        />
      </View>

      <View flex={4}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <SafeAreaView style={styles.safeAreaView}>
          <VStack justifyContent="flex-end" flex={1} paddingBottom={70}>
            <Center>
              <HStack space={1}>
                <NbTextView fontSize="3xl" fontWeight="800">
                  Your
                </NbTextView>

                <NbTextView color="gray.400" fontSize="3xl" fontWeight="800">
                  Recipe Heaven
                </NbTextView>
              </HStack>
              <NbTextView fontSize="2xl" fontWeight="700">
                Awaits Exploration!
              </NbTextView>
              <Button
                marginTop={8}
                marginBottom={8}
                variant="outline"
                rounded="3xl"
                onPress={() => {
                  navigation.navigate(ROUTES.SIGN_UP);
                }}
                width="70%"
              >
                <NbTextView color="black" fontWeight="800">
                  Let's Get Started
                </NbTextView>
              </Button>
              <HStack space={1}>
                <NbTextView color="black" fontSize="md">
                  Already have an account?
                </NbTextView>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(ROUTES.SIGN_IN);
                  }}
                >
                  <NbTextView color="#006ee6" fontSize="md" underline>
                    Sign In
                  </NbTextView>
                </TouchableOpacity>
              </HStack>
            </Center>
          </VStack>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SignInOrSignUp;
