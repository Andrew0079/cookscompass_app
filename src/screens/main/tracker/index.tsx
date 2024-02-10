import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "../../../api/api";
import { CameraView, TrackerHeaderView, NutritionView } from "./components";

const isIOS = Platform.OS === "ios";

function Tracker({ route, navigation }) {
  const title = route.params.title;

  const [scan, setScan] = useState(false);
  const [barcode, setBarcode] = useState<string | null>("9031100006587");
  const [nutrition, setNutrition] = useState();

  useEffect(() => {
    const getNutritionInfoViaUpc = async () => {
      try {
        const response = await api.getParsedNutritionInfoViaUpc(barcode);
        setNutrition(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (barcode) {
      getNutritionInfoViaUpc();
    }
  }, [barcode]);

  const content = nutrition ? (
    <NutritionView nutrition={nutrition} />
  ) : (
    <TrackerHeaderView
      title={title}
      navigation={navigation}
      onSetScan={setScan}
    />
  );

  return (
    <SafeAreaView
      style={styles.safeAreaView}
      edges={isIOS ? ["top", "bottom"] : undefined}
    >
      {scan ? (
        <CameraView scan={scan} onSetScan={setScan} onSetBarcode={setBarcode} />
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: "white" },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default Tracker;
