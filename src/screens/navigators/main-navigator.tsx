import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Center, Text } from "native-base";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
} from "react-native";
import { Discover, SearchRecipes, Menu, Profile, Community } from "../main";

import { Ionicons } from "@expo/vector-icons"; // Import the icon library (Ionicons in this example)

const Tab = createBottomTabNavigator();

const isIOS = Platform.OS === "ios";

function BottomItem({ state, descriptors, navigation }) {
  const iconContainerByRouteName = {
    Discover: "fast-food-outline",
    Community: "people-outline",
    Profile: "person-outline",
    Menu: "ios-grid-outline",
    Search: "search-sharp",
  };

  const screenWidth = Dimensions.get("window").width;
  const tabWidth = screenWidth / state.routes.length;

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
              style={{ width: tabWidth }}
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
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const { height, width } = Dimensions.get("window");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={{ height, width }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: keyboardVisible ? "none" : "flex",
          },
        }}
        tabBar={(props) => <BottomItem {...props} />}
      >
        <Tab.Screen name="Discover" component={Discover} />
        <Tab.Screen name="Community" component={Community} />
        <Tab.Screen name="Menu" component={Menu} />
        <Tab.Screen name="Search" component={SearchRecipes} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomItemSafeAreView: {
    backgroundColor: "white",
    height: isIOS ? 80 : 65,
  },
  bottomItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: isIOS ? 12 : 10,
    borderTopWidth: 1,
    borderColor: "#CACCCE", // Customize the border color here
  },
});

export default MainNavigator;
