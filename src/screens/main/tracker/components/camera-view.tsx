import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { HStack, Input } from "native-base";
// @ts-ignore
import { NbTextView } from "@components";
import { AntDesign } from "@expo/vector-icons";

const scanAreaSize = 260;

const isIOS = Platform.OS === "ios";

function CameraView({ scan, onSetScan, onSetBarcode }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      setCameraActive(true);
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    onSetBarcode(data);
    onSetScan(false);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={isIOS ? "padding" : "height"}
      keyboardVerticalOffset={isIOS ? 60 : 0}
    >
      <View style={styles.outerContainer}>
        <HStack
          justifyContent="space-between"
          px={6}
          paddingBottom={3}
          paddingTop={1}
          alignItems="center"
        >
          <TouchableOpacity
            onPress={() => {
              onSetScan(false);
            }}
          >
            <AntDesign name="close" size={22} />
          </TouchableOpacity>

          <NbTextView fontWeight="700" fontSize="18" alignSelf="center">
            Scan a Barcode
          </NbTextView>
          <View />
        </HStack>

        <View
          style={[
            styles.container,
            cameraActive ? {} : { backgroundColor: "black" },
          ]}
        >
          {cameraActive && (
            <BarCodeScanner
              style={StyleSheet.absoluteFillObject}
              onBarCodeScanned={scan ? handleBarCodeScanned : undefined}
            >
              <View style={styles.scanArea}></View>
            </BarCodeScanner>
          )}
        </View>
        <HStack px={4} paddingTop={4}>
          <Input
            width="100%"
            rounded="lg"
            placeholder="Manually enter barcode"
            onFocus={() => {
              setCameraActive(false);
            }}
            onBlur={() => {
              setCameraActive(true);
            }}
          />
        </HStack>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    height: scanAreaSize - 20,
    width: scanAreaSize,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 20,
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -(scanAreaSize / 2), // This ensures the scan area is centered horizontally
    marginTop: -(scanAreaSize / 2), // This ensures the scan area is centered vertically
  },
  scanAgainButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#fff",
  },
  scanAgainText: {
    color: "#000",
    textAlign: "center",
  },
});

export default CameraView;
