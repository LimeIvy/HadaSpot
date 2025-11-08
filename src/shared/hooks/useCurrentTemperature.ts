import { useEffect, useState } from "react";

import { getCurrentTemperature } from "../utils/weatherService";

// 現在の気温を取得するカスタムフック
function useCurrentTemperature(
  latitude: number,
  longitude: number,
  city?: string | null,
) {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [temperatureError, setTemperatureError] = useState<string | null>(null);

  useEffect(() => {
    // 緯度経度が0の場合は実行しない
    if (latitude === 0 && longitude === 0) {
      return;
    }

    // cityがnullの場合は実行しない（位置情報がまだ取得できていない）
    if (city === null) {
      return;
    }

    void (async () => {
      try {
        const result = await getCurrentTemperature(latitude, longitude, city);
        if (typeof result === "number") {
          setTemperature(result);
          setTemperatureError(null);
        } else {
          setTemperatureError(result);
          setTemperature(null);
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "気温を取得できませんでした";
        setTemperatureError(message);
        setTemperature(null);
      }
    })();
  }, [latitude, longitude, city]);

  return { temperature, temperatureError };
}

export default useCurrentTemperature;
