import React from "react";
import { HStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ROUTES } from "../../../../utils/common";
// @ts-ignore
import { NbTextView } from "@components";

function DiaryHeaderView({ navigation }) {
  return (
    <HStack
      justifyContent="space-between"
      px={5}
      alignContent="center"
      borderBottomWidth={1}
      borderBottomColor="gray.200"
    >
      <NbTextView fontWeight="800" color="green.600" fontSize="24">
        NutriZen
      </NbTextView>
      <HStack space={3} alignSelf="center">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTES.PROFILE);
          }}
        >
          <Ionicons name="person-outline" size={23} color="#16a34a" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={23} color="#16a34a" />
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
}

export default DiaryHeaderView;
