// 気温のキャッシュ（cityをキーとして保存）
const temperatureCache = new Map<
  string,
  { temperature: number; timestamp: number }
>();

// キャッシュの有効期限（ミリ秒）- 1時間
const CACHE_EXPIRY_MS = 60 * 60 * 1000;

export async function getCurrentTemperature(
  latitude: number,
  longitude: number,
  city?: string | null,
): Promise<number | string> {
  const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenWeather API keyが設定されていません");
  }

  // cityが指定されている場合、キャッシュをチェック
  if (city) {
    const cached = temperatureCache.get(city);
    if (cached) {
      const now = Date.now();
      // キャッシュが有効期限内かチェック
      if (now - cached.timestamp < CACHE_EXPIRY_MS) {
        return cached.temperature;
      }
      // キャッシュが期限切れの場合は削除
      temperatureCache.delete(city);
    }
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`,
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.cod === 401) {
        throw new Error("APIキーが無効か、サブスクリプションが必要です");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // 現在の気温を取得する
    const tempValue = data.main?.temp;
    if (tempValue !== undefined && typeof tempValue === "number") {
      // cityが指定されている場合、キャッシュに保存
      if (city) {
        temperatureCache.set(city, {
          temperature: tempValue,
          timestamp: Date.now(),
        });
      }
      return tempValue;
    }

    throw new Error("現在の気温データがレスポンスに見つかりません");
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "現在の気温を取得できませんでした";
    return message;
  }
}
