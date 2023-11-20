import React, { useState, useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./src/screens/navigators/main-navigator";
import AuthNavigator from "./src/screens/navigators/auth-navigator";
import theme from "./theme";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import { ROUTES } from "./src/utils/common";
import { Auth } from "aws-amplify";

Amplify.configure(config);

const { Navigator, Screen } = createStackNavigator();

// Define common screen options to hide the header
const commonScreenOptions = {
  headerShown: false,
};

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isUserAuthenticated = async () => {
      try {
        await Auth.currentAuthenticatedUser();

        setIsAuthenticated(true); // User is authenticated
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false); // User is not authenticated
        setLoading(false);
      }
    };
    // Check if the user is authenticated
    isUserAuthenticated();
  }, []);

  // if (loading) {
  //   // We haven't finished checking for the token yet
  //   return <ActivityIndicator loading={loading} />;
  // }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Navigator
          screenOptions={{
            ...commonScreenOptions,
            headerShown: false,
          }}
        >
          {isAuthenticated ? (
            <Screen name={ROUTES.MAIN} component={MainNavigator} />
          ) : (
            <Screen name={ROUTES.AUTH} component={AuthNavigator} />
          )}

          {/* Add more screens as needed */}
        </Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
