import * as Location from "expo-location";
import { PermissionStatus } from "expo-location";
import { renderHook, waitFor } from "@testing-library/react-native";

import useCurrentLocation from "../useCurrentLocation";

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getLastKnownPositionAsync: jest.fn(),
  reverseGeocodeAsync: jest.fn(),
  PermissionStatus: {
    GRANTED: "granted",
    DENIED: "denied",
    UNDETERMINED: "undetermined",
  },
}));

describe("useCurrentLocation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the current location", async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue(
      {
        status: PermissionStatus.GRANTED,
      },
    );

    (Location.getLastKnownPositionAsync as jest.Mock).mockResolvedValue({
      coords: {
        latitude: 35.6762,
        longitude: 139.6503,
      },
    });

    const { result } = renderHook(() => useCurrentLocation());

    await waitFor(() => {
      expect(result.current.currentLocation.latitude).toBe(35.6762);
      expect(result.current.currentLocation.longitude).toBe(139.6503);
      expect(result.current.locationError).toBeNull();
    });
  });

  it("should return error when permission is denied", async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue(
      {
        status: PermissionStatus.DENIED,
      },
    );

    const { result } = renderHook(() => useCurrentLocation());

    await waitFor(() => {
      expect(result.current.locationError).toBe(
        "Permission to access location was denied",
      );
      expect(result.current.currentLocation.latitude).toBeNull();
      expect(result.current.currentLocation.longitude).toBeNull();
    });
  });
});
