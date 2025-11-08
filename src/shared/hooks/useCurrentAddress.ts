import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { type LocationGeocodedAddress } from "expo-location";

// 現在地を取得するカスタムフック
function useCurrentAddress(latitude: number, longitude: number) {
  const [city, setCity] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const address: LocationGeocodedAddress[] =
          await Location.reverseGeocodeAsync({
            latitude: latitude,
            longitude: longitude,
          });

        // 最初の要素のcityを取得
        const firstAddress = address[0];
        if (firstAddress && "city" in firstAddress) {
          const cityValue = firstAddress.city;
          setCity(typeof cityValue === "string" ? cityValue : null);
        } else {
          setCity(null);
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to get address";
        setAddressError(message);
      }
    })();
  }, [latitude, longitude]);

  return { city, addressError };
}

export default useCurrentAddress;
