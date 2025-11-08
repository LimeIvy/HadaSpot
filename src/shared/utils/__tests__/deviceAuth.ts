import AsyncStorage from "@react-native-async-storage/async-storage";

import { getDeviceId } from "../deviceAuth";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("getDeviceId", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("初回取得時にUUIDを生成する", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const deviceId = await getDeviceId();

    expect(deviceId).toBeDefined();
    expect(deviceId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("deviceId", deviceId);
  });

  it("2回目以降は同じIDを返す", async () => {
    const existingId = "existing-device-id";
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(existingId);

    const deviceId = await getDeviceId();

    expect(deviceId).toBe(existingId);
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });
});
