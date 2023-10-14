import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./src/screens/navigators/main-navigator";
import AuthNavigator from "./src/screens/navigators/auth-navigator";
import theme from "./theme";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";

Amplify.configure(config);

const { Navigator, Screen } = createStackNavigator();

// Define common screen options to hide the header
const commonScreenOptions = {
  headerShown: false,
};

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Navigator
          initialRouteName="Auth"
          screenOptions={{
            ...commonScreenOptions,
            headerShown: false,
          }}
        >
          <Screen name="Auth" component={AuthNavigator} />
          <Screen name="Main" component={MainNavigator} />
          {/* Add more screens as needed */}
        </Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
