import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { PermissionStatus } from "expo-location";

// 現在地の緯度経度情報の型定義
type LocationType = {
  latitude: number | null;
  longitude: number | null;
};

// 現在地を取得するカスタムフック
function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState<LocationType>({
    latitude: null,
    longitude: null,
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      // 位置情報を使ってよいかの判定を返す
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== PermissionStatus.GRANTED) {
        setError("Permission to access location was denied");
        return;
      }

      const location = await Location.getLastKnownPositionAsync({});

      setCurrentLocation({
        latitude: location?.coords.latitude ?? null,
        longitude: location?.coords.longitude ?? null,
      });
    })();
  }, []);

  return { currentLocation, error };
}

export default useCurrentLocation;
