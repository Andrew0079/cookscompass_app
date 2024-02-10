import { Button } from "native-base";
import React from "react";
import NbTextView from "./nb-text-view";

function ThemedButton({ title, width, ...props }) {
  return (
    <Button
      {...props}
      backgroundColor="green.600"
      _pressed={{
        backgroundColor: "green.500",
      }}
      rounded="xl"
      width={width ?? "70%"}
    >
      <NbTextView color="white" fontWeight="800">
        {title}
      </NbTextView>
    </Button>
  );
}

export default ThemedButton;
