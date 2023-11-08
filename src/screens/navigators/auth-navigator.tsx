import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../sign-in";
import SignUp from "../sign-up";
import SignInOrSignUp from "../sign-in-or-sign-up";
import Verification from "../verification";

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
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
