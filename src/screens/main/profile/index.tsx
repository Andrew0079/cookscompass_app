import React from "react";
import { View, Text, Avatar } from "native-base";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { VStack, HStack } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

function Profile() {
  const user = useSelector((state: RootState) => state.user.value);
  console.log(user);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <VStack>
        <HStack
          alignContent="center"
          justifyContent="space-between"
          paddingLeft={10}
          paddingRight={10}
          marginTop={5}
        >
          <Text fontWeight="bold" fontSize="4xl" alignSelf="center">
            {user.email}
          </Text>
          <Avatar
            size={60}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
        </HStack>
        <View backgroundColor="white" marginTop={15}>
          <TouchableOpacity>
            <HStack
              alignContent="center"
              justifyContent="space-between"
              paddingLeft={4}
              paddingRight={4}
              paddingTop={2}
              paddingBottom={2}
            >
              <Text>Email</Text>
              <FontAwesome name="chevron-right" size={15} />
            </HStack>
          </TouchableOpacity>
        </View>

        <View backgroundColor="white" marginTop={5}>
          <TouchableOpacity>
            <HStack
              alignContent="center"
              justifyContent="space-between"
              paddingLeft={4}
              paddingRight={4}
              paddingTop={2}
              paddingBottom={2}
            >
              <Text>Email</Text>
              <FontAwesome name="chevron-right" size={15} />
            </HStack>
          </TouchableOpacity>
        </View>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  keyboardAvoidingView: { flex: 1 },
});

export default Profile;
