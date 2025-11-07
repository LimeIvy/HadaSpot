import { Text, View } from "react-native";

import useCurrentLocation from "./hooks/useCurrentLocation";

const App = () => {
  const { currentLocation, error } = useCurrentLocation();
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
          {error && (
            <Text className="text-center text-red-500">Error: {error}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default App;
