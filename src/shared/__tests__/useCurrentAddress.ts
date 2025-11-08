import * as Location from "expo-location";
import { renderHook, waitFor } from "@testing-library/react-native";

import useCurrentAddress from "../hooks/useCurrentAddress";

jest.mock("expo-location", () => ({
  reverseGeocodeAsync: jest.fn(),
}));

describe("useCurrentAddress", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the current address", async () => {
    (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
      {
        city: "港区",
      },
    ]);

    const { result } = renderHook(() => useCurrentAddress(35.6762, 139.6503));

    await waitFor(() => {
      expect(result.current.city).toBe("港区");
      expect(result.current.addressError).toBeNull();
    });
  });
});
