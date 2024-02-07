import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path, Defs, ClipPath } from "react-native-svg";

function WaterBottle() {
  const [fill, setFill] = useState(false);

  return (
    <TouchableOpacity onPress={() => setFill(true)}>
      <Svg width="64" height="64" viewBox="-20 0 64 64">
        <Defs>
          <ClipPath id="clip">
            <Path d="M7,6 L7,13 C7,13 0,23.9 0,25 L0,60 C0,61.1 0.9,62 2,62 L20,62 C21.1,62 22,61.1 22,60 L22,25 C22,23.9 15,13 15,13 L15,6 M17,4 C17,5.1 16.1,6 15,6 L7,6 C5.9,6 5,5.1 5,4 L5,2 C5,0.9 5.9,0 7,0 L15,0 C16.1,0 17,0.9 17,2 L17,4 L17,4 Z" />
          </ClipPath>
        </Defs>
        <Path
          clipPath="url(#clip)"
          d="M7,6 L7,13 C7,13 0,23.9 0,25 L0,60 C0,61.1 0.9,62 2,62 L20,62 C21.1,62 22,61.1 22,60 L22,25 C22,23.9 15,13 15,13 L15,6 M17,4 C17,5.1 16.1,6 15,6 L7,6 C5.9,6 5,5.1 5,4 L5,2 C5,0.9 5.9,0 7,0 L15,0 C16.1,0 17,0.9 17,2 L17,4 L17,4 Z"
          stroke="black"
          strokeWidth="2"
          fill={fill ? "blue" : "transparent"}
          fillOpacity={0.5} // Add fill opacity to make the fill visible
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default WaterBottle;
