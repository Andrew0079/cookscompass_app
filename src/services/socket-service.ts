import { EXPO_PUBLIC_BASE_URL_IOS_DEV, EXPO_PUBLIC_ANDROID_DEV } from "@env";
import { Platform } from "react-native";
import io from "socket.io-client";

const URL =
  Platform.OS === "android"
    ? EXPO_PUBLIC_ANDROID_DEV
    : EXPO_PUBLIC_BASE_URL_IOS_DEV;

const socket = io(URL, {
  transports: ["websocket"], // Use WebSocket transport
});

export default socket;
