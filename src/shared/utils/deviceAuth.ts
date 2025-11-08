import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

export async function getDeviceId() {
  const deviceId = await AsyncStorage.getItem("deviceId");
  if (!deviceId || deviceId === "") {
    const newDeviceId = uuidv4();
    await AsyncStorage.setItem("deviceId", newDeviceId);
    return newDeviceId;
  }
  return deviceId;
}
