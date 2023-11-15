import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";
import {
  MainThread,
  SearchRecipes,
  Roulette,
  Profile,
  Settings,
} from "../main";

import { Ionicons } from "@expo/vector-icons"; // Import the icon library (Ionicons in this example)

const Tab = createBottomTabNavigator();

function BottomItem({ state, descriptors, navigation }) {
  const iconContainerByRouteName = {
    MainThread: "ios-home",
    SearchRecipes: "ios-search",
    Profile: "ios-person",
    Settings: "ios-settings",
    Roulette: require("../../../assets/icons/fortune-wheel.png"),
  };
  return (
    <SafeAreaView style={styles.bottomItemSafeAreView}>
      <View style={styles.bottomItemView}>
        {state.routes.map((route, index: number) => {
          const key = `bottomItem-${index}`;
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              {typeof iconContainerByRouteName[route.name] === "string" ? (
                <Ionicons
                  name={iconContainerByRouteName[route.name]}
                  size={25}
                />
              ) : (
                <Image
                  source={iconContainerByRouteName[route.name]}
                  style={{ width: 25, height: 25 }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomItem {...props} />}
    >
      <Tab.Screen name="MainThread" component={MainThread} />
      <Tab.Screen name="SearchRecipes" component={SearchRecipes} />
      <Tab.Screen name="Roulette" component={Roulette} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomItemSafeAreView: { backgroundColor: "white" },
  bottomItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default MainNavigator;
