import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Center, Text } from "native-base";
import { View, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { Discover, SearchRecipes, Roulette, Profile, Community } from "../main";

import { Ionicons } from "@expo/vector-icons"; // Import the icon library (Ionicons in this example)

const Tab = createBottomTabNavigator();

function BottomItem({ state, descriptors, navigation }) {
  const iconContainerByRouteName = {
    Discover: "fast-food-outline",
    Community: "people-outline",
    Search: "search-sharp",
    Profile: "person-outline",
    Roulette: "ios-star-outline",
  };
  return (
    <SafeAreaView style={styles.bottomItemSafeAreView}>
      <View style={styles.bottomItemView}>
        {state.routes.map((route, index: number) => {
          const key = `bottomItem-${index}`;
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;
          const focusedColor = isFocused ? "black" : "#86888A";

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
              <Center>
                <Ionicons
                  name={iconContainerByRouteName[route.name]}
                  color={focusedColor}
                  size={23}
                />
                <Text fontSize={11} color={focusedColor}>
                  {route.name}
                </Text>
              </Center>
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
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Search" component={SearchRecipes} />
      <Tab.Screen name="Roulette" component={Roulette} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* <Tab.Screen name="Settings" component={Settings} /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomItemSafeAreView: { backgroundColor: "white", height: 80 },

  bottomItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 12,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: "#CACCCE", // Customize the border color here
  },
});

export default MainNavigator;
