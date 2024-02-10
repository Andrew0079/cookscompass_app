import { HStack, View, IconButton, VStack } from "native-base";
import React from "react";
import { NbTextView } from "../../../../components";
import { FontAwesome } from "@expo/vector-icons";

function NutritionView({ nutrition }) {
  console.log(nutrition);
  return (
    <View flex={1}>
      <HStack>
        <IconButton
          paddingLeft={5}
          icon={<FontAwesome name="chevron-left" size={18} color="#18181b" />}
          // onPress={() => {
          //   const prevRoute = isFromSignUp
          //     ? ROUTES.SIGN_UP
          //     : ROUTES.SIGN_IN_OR_SIGN_UP;
          //   navigation.navigate(prevRoute);
          // }}
          variant="unstyled"
        />
      </HStack>
      <VStack px={5}>
        <NbTextView fontSize="22">Balance Juice Zitrone</NbTextView>
        <NbTextView fontSize="16">{nutrition.brands}</NbTextView>
      </VStack>
    </View>
  );
}

export default NutritionView;
