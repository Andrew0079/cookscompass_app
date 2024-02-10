import React from "react";
import { Input, HStack, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
// @ts-ignore
import { NbTextView } from "@components";
import { ROUTES } from "../../../../utils/common";

function TrackerHeaderView({ navigation, title, onSetScan }) {
  return (
    <VStack px={6}>
      <HStack justifyContent="space-between" alignItems="center">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTES.DIARY);
          }}
        >
          <AntDesign name="close" size={22} />
        </TouchableOpacity>
        <NbTextView fontWeight="700" fontSize="18">
          {title}
        </NbTextView>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal-sharp" size={22} />
        </TouchableOpacity>
      </HStack>
      <HStack
        px={3}
        py={5}
        space={5}
        justifyContent="center"
        alignItems="center"
      >
        <Input rounded="full" width="95%" size="xs" />
        <TouchableOpacity onPress={() => onSetScan(true)}>
          <MaterialCommunityIcons name="qrcode-scan" size={24} />
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
}

export default TrackerHeaderView;
