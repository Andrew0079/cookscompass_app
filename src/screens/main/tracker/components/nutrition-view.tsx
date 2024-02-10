import { View } from "native-base";
import React from "react";
import { NbTextView } from "../../../../components";

function NutritionView({ nutrition }) {
  console.log(nutrition);
  return (
    <View>
      <NbTextView>hey</NbTextView>
    </View>
  );
}

export default NutritionView;
