import React from "react";
import { HStack, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function DiaryHeaderView() {
  return (
    <HStack
      justifyContent="space-between"
      px={5}
      alignContent="center"
      borderBottomWidth={1}
      borderBottomColor="#CACCCE"
    >
      <Image
        alt="logo"
        source={require("../../../../../assets/brand.png")}
        resizeMode="contain"
        style={{ width: 120, height: 50 }}
      />
      <HStack space={3} alignSelf="center">
        <TouchableOpacity>
          <Ionicons name="person-outline" size={23} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={23} />
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
}

export default DiaryHeaderView;
