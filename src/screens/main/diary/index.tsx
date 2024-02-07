import React, { useState } from "react";
import { VStack, HStack, Icon } from "native-base";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { MaterialIcons } from "@expo/vector-icons";
// @ts-ignore
import { NbTextView } from "@components";
import {
  NutritionSectionView,
  DiaryHeaderView,
  TrackerActionsView,
} from "./components";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const isIOS = Platform.OS === "ios";

const formatDate = (date: Date) => {
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (isToday) {
    return `Today, ${monthNames[date.getMonth()]} ${date.getDate()}`;
  } else {
    return `${dayNames[date.getDay()]}, ${
      monthNames[date.getMonth()]
    } ${date.getDate()}`;
  }
};

function Diary() {
  const [date, setDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const insets = useSafeAreaInsets();

  const onDayPress = (day) => {
    setDate(new Date(day.timestamp));
    setIsCalendarVisible(false); // Hide the calendar after a date is selected
  };

  return (
    <SafeAreaView
      style={styles.safeAreaView}
      edges={isIOS ? ["top"] : undefined}
    >
      {isCalendarVisible && (
        <TouchableWithoutFeedback onPress={() => setIsCalendarVisible(false)}>
          <View style={styles.overlay}>
            <Calendar
              style={styles.calendar}
              current={date.toISOString()}
              onMonthChange={(month) => {
                console.log("month changed", month);
              }}
              onDayPress={onDayPress}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      <DiaryHeaderView />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <VStack
          space={4}
          paddingLeft={3}
          paddingRight={3}
          paddingBottom={5}
          flex={1}
          alignContent="center"
        >
          <NutritionSectionView />
          <HStack justifyContent="space-between" alignItems="center" px={6}>
            <TouchableOpacity
              onPress={() =>
                setDate(new Date(date.setDate(date.getDate() - 1)))
              }
            >
              <Icon as={MaterialIcons} name="arrow-left" size={28} />
            </TouchableOpacity>
            <HStack space={1} alignItems="center">
              <Ionicons name="calendar-outline" size={15} />
              <NbTextView
                onPress={() => setIsCalendarVisible(!isCalendarVisible)}
              >
                {formatDate(date)} {/* Format the date as you prefer */}
              </NbTextView>
            </HStack>

            <TouchableOpacity
              onPress={() =>
                setDate(new Date(date.setDate(date.getDate() + 1)))
              }
            >
              <Icon as={MaterialIcons} name="arrow-right" size={28} />
            </TouchableOpacity>
          </HStack>
          <TrackerActionsView />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    width: width,
    height: height,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    zIndex: 2,
  },
  calendar: {
    width: width,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 60,
    borderRadius: 20,
  },
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#fff",
  // },
});

export default Diary;
