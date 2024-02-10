import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { ImageBackground } from "react-native";
import { VStack, Center, HStack, View } from "native-base";
// @ts-ignore
import { NbTextView, ThemedButton } from "@components";
import { ROUTES } from "../../../utils/common";

function SignInOrSignUp({ navigation }) {
  return (
    <ImageBackground
      source={require("../../../../assets/backgrounds/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View flex={1} alignSelf="center" justifyContent="flex-end">
          <NbTextView fontWeight="800" color="white" fontSize="50">
            NutriZen
          </NbTextView>
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
                  <NbTextView fontSize="3xl" fontWeight="800" color="white">
                    Your
                  </NbTextView>
                  <NbTextView color="green.600" fontSize="3xl" fontWeight="800">
                    Recipe Heaven
                  </NbTextView>
                </HStack>
                <NbTextView fontSize="2xl" fontWeight="700" color="white">
                  Awaits Exploration!
                </NbTextView>
                <ThemedButton
                  title="Let's Get Started"
                  marginTop={8}
                  marginBottom={8}
                  onPress={() => {
                    navigation.navigate(ROUTES.SIGN_UP);
                  }}
                />
                <HStack space={1}>
                  <NbTextView color="white" fontSize="md">
                    Already have an account?
                  </NbTextView>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ROUTES.SIGN_IN);
                    }}
                  >
                    <NbTextView color="green.600" fontSize="md" underline>
                      Sign In
                    </NbTextView>
                  </TouchableOpacity>
                </HStack>
              </Center>
            </VStack>
          </SafeAreaView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default SignInOrSignUp;
