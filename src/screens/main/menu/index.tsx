import React, { useState } from "react";
import { VStack, Box, Text, HStack, Icon } from "native-base";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { MaterialIcons } from "@expo/vector-icons"; // Ensure you have expo vector icons or replace with another icon library

const { width, height } = Dimensions.get("window");

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

function Menu() {
  const [date, setDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const onDayPress = (day) => {
    setDate(new Date(day.timestamp));
    setIsCalendarVisible(false); // Hide the calendar after a date is selected
  };

  console.log(width);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <VStack space={4} padding={2} width="95%" flex={1}>
        <Box paddingLeft={4} paddingRight={4} rounded="md" shadow={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <TouchableOpacity
              onPress={() =>
                setDate(new Date(date.setDate(date.getDate() - 1)))
              }
            >
              <Icon as={MaterialIcons} name="arrow-left" size={28} />
            </TouchableOpacity>
            <Text onPress={() => setIsCalendarVisible(!isCalendarVisible)}>
              {formatDate(date)} {/* Format the date as you prefer */}
            </Text>
            <TouchableOpacity
              onPress={() =>
                setDate(new Date(date.setDate(date.getDate() + 1)))
              }
            >
              <Icon as={MaterialIcons} name="arrow-right" size={28} />
            </TouchableOpacity>
          </HStack>
        </Box>
        <Box bg="secondary.500" p={4} rounded="md" shadow={3}>
          <Text>Row 2</Text>
        </Box>
        <Box bg="emerald.500" p={4} rounded="md" shadow={3}>
          <Text>Row 3</Text>
        </Box>
        {/* Add more rows as needed */}
      </VStack>

      {isCalendarVisible && (
        <View style={styles.overlay}>
          <Calendar
            style={styles.calendar}
            current={date.toISOString()}
            onMonthChange={(month) => {
              console.log("month changed", month);
            }}
            onDayPress={onDayPress}
            // ...other props
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 100,
    width: width,
    height: height,
    alignItems: "center",
    zIndex: 2, // Ensure it stays on top
  },
  calendar: {
    width: 300,
    borderRadius: 10, // Rounded corners for the calendar itself
    // Add any additional styling for the calendar here
  },
});

export default Menu;
