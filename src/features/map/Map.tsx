import { useRef } from "react";
import { Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import useCurrentAddress from "../../shared/hooks/useCurrentAddress";
import useCurrentLocation from "../../shared/hooks/useCurrentLocation";
import useCurrentTemperature from "../../shared/hooks/useCurrentTemperature";
import MapButton from "./components/MapButton";
import { customMapStyle } from "./utils/mapStyles";

const Map = () => {
  const mapRef = useRef<MapView>(null);
  const { currentLocation, locationError } = useCurrentLocation();
  const { city, addressError } = useCurrentAddress(
    currentLocation.latitude ?? 0,
    currentLocation.longitude ?? 0,
  );
  const { temperature, temperatureError } = useCurrentTemperature(
    currentLocation.latitude ?? 0,
    currentLocation.longitude ?? 0,
    city,
  );
  const isValidLocation =
    currentLocation.latitude != null &&
    currentLocation.longitude != null &&
    currentLocation.latitude !== 0 &&
    currentLocation.longitude !== 0;

  return (
    <View className="relative flex-1">
      {!isValidLocation || locationError ? (
        <View className="flex-1 items-center justify-center">
          <Text>{locationError ?? "位置情報を取得中..."}</Text>
        </View>
      ) : (
        <>
          <MapView
            ref={mapRef}
            style={{ width: "100%", height: "100%" }}
            customMapStyle={customMapStyle}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: currentLocation.latitude!,
              longitude: currentLocation.longitude!,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: currentLocation.latitude!,
                longitude: currentLocation.longitude!,
              }}
            />
          </MapView>
          <MapButton
            onPressIcon={() => {
              if (isValidLocation && mapRef.current) {
                mapRef.current.animateToRegion(
                  {
                    latitude: currentLocation.latitude!,
                    longitude: currentLocation.longitude!,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  },
                  500,
                );
              }
            }}
          />
        </>
      )}
    </View>
  );
};

export default Map;
