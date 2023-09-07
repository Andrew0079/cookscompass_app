import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import theme from "./theme";

import { Login } from "./src/screens";

const { Navigator, Screen } = createStackNavigator();

const ANNOYING_BUG_MESSAGE =
  "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.";

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs([ANNOYING_BUG_MESSAGE]);
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Navigator
          initialRouteName="Login"
          screenOptions={{
            // header: () => <View style={styles.navigator} />,
            headerShown: false,
          }}
        >
          <Screen name="Login" component={Login} />
        </Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

// const styles = StyleSheet.create({
//   navigator: {
//     height: 55,
//     backgroundColor: "transparent",
//     alignItems: "center",
//     flexDirection: "row",
//     paddingLeft: 10,
//   },
// });
