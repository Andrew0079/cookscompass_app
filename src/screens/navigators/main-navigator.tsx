import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Center, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
} from "react-native";
import { Discover, Recipes, Tools, Diary, Progress } from "../main";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; // Import the icon library (Ionicons in this example)

const Tab = createBottomTabNavigator();

const isIOS = Platform.OS === "ios";

function BottomItem({ state, descriptors, navigation }) {
  const ionicIcons = {
    Diary: "book",
    Progress: "stats-chart",
    Tools: "apps",
  };
  const materialIcons = {
    Discover: "food-apple",
    Recipes: "chef-hat",
  };

  const screenWidth = Dimensions.get("window").width;
  const tabWidth = screenWidth / state.routes.length;

  return (
    <SafeAreaView style={styles.bottomItemSafeAreView} edges={["bottom"]}>
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

          const ionicIcon = ionicIcons[route.name];
          const materialIcon = materialIcons[route.name];

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
                {ionicIcon && (
                  <Ionicons name={ionicIcon} color={focusedColor} size={23} />
                )}

                {materialIcon && (
                  <MaterialCommunityIcons
                    name={materialIcon}
                    color={focusedColor}
                    size={23}
                  />
                )}

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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: keyboardVisible ? "none" : "flex",
        },
      }}
      tabBar={(props) => <BottomItem {...props} />}
    >
      <Tab.Screen name="Diary" component={Diary} />
      <Tab.Screen name="Progress" component={Progress} />
      <Tab.Screen name="Tools" component={Tools} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Recipes" component={Recipes} />
    </Tab.Navigator>
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
    borderColor: "#CACCCE",
  },
});

export default MainNavigator;
