import { Text, View } from "react-native";

import useCurrentAddress from "./hooks/useCurrentAddress";
import useCurrentLocation from "./hooks/useCurrentLocation";

const App = () => {
  const { currentLocation, locationError } = useCurrentLocation();
  const { city, addressError } = useCurrentAddress(
    currentLocation.latitude ?? 0,
    currentLocation.longitude ?? 0,
  );
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="w-full px-4">
        <View className="flex flex-col items-center gap-2">
          <Text className="text-center text-black">
            Latitude: {currentLocation.latitude}
          </Text>
          <Text className="text-center text-black">
            Longitude: {currentLocation.longitude}
          </Text>
          {city && <Text className="text-center text-black">City: {city}</Text>}
          {locationError && (
            <Text className="text-center text-red-500">
              Error: {locationError}
            </Text>
          )}
          {addressError && (
            <Text className="text-center text-red-500">
              Error: {addressError}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default App;
