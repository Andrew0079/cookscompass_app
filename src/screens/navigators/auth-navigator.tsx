import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignIn, SignUp, SignInOrSignUp } from "../auth";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignInOrSignUp"
    >
      <Stack.Screen name="SignInOrSignUp" component={SignInOrSignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
