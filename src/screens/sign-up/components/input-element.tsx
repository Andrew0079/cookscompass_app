import React from "react";
import { Input } from "native-base";

function InputElement({
  variant,
  backgroundColor,
  secureTextEntry,
  placeholder,
  onChangeText,
}: {
  variant?: string;
  backgroundColor?: string;
  secureTextEntry: boolean;
  placeholder: string;
  onChangeText: (inputValue: string) => void;
}) {
  return (
    <Input
      variant={variant ?? "underlined"}
      placeholder={placeholder}
      height={10}
      backgroundColor={backgroundColor ?? "white"}
      onChangeText={(inputValue) => onChangeText(inputValue)}
      secureTextEntry={secureTextEntry}
    />
  );
}

export default InputElement;
