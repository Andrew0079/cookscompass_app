import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../login/login";
import Signup from "../signup/signup";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
