import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./src/screens/navigators/main-navigator";
import AuthNavigator from "./src/screens/navigators/auth-navigator";
import theme from "./theme";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import { ROUTES } from "./src/utils/common";

Amplify.configure(config);

const { Navigator, Screen } = createStackNavigator();

// Define common screen options to hide the header
const commonScreenOptions = {
  headerShown: false,
};

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Navigator
          initialRouteName={ROUTES.AUTH}
          screenOptions={{
            ...commonScreenOptions,
            headerShown: false,
          }}
        >
          <Screen name={ROUTES.AUTH} component={AuthNavigator} />
          <Screen name={ROUTES.MAIN} component={MainNavigator} />
          {/* Add more screens as needed */}
        </Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
