import React from "react";
import { render } from "@/src/utils/testUtils";
import MapSelectionScreen from "../MapSelectionScreen";

// Mock Location
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest
    .fn()
    .mockResolvedValue({ status: "granted" }),
  getCurrentPositionAsync: jest.fn().mockResolvedValue({
    coords: { latitude: 6.9, longitude: 79.8 },
  }),
  reverseGeocodeAsync: jest.fn().mockResolvedValue([
    {
      street: "Test St",
      city: "Colombo",
      region: "Western",
    },
  ]),
}));

// Mock react-native-maps
jest.mock("react-native-maps", () => {
  const React = require("react");
  const { View } = require("react-native");

  const MapView = (props: any) => (
    <View testID="map-view-mock">{props.children}</View>
  );
  const Marker = (props: any) => (
    <View testID="marker-mock">{props.children}</View>
  );

  return {
    __esModule: true,
    default: MapView,
    Marker,
    Region: {},
  };
});

// Mock react-native-modalize
jest.mock("react-native-modalize", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    Modalize: React.forwardRef((props: any, ref) => (
      <View testID="modalize-mock">{props.children}</View>
    )),
  };
});

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Provide a mock userStore so mobx observer works if any internal sub-component relies on it
jest.mock("@/src/store/UserStore", () => ({
  userStore: {},
}));

describe("MapSelectionScreen", () => {
  it("renders correctly", () => {
    const onConfirmMock = jest.fn();
    const onBackMock = jest.fn();

    const { getByTestId, getByText } = render(
      <MapSelectionScreen onConfirm={onConfirmMock} onBack={onBackMock} />,
    );

    expect(getByTestId("map-view-mock")).toBeTruthy();
    expect(getByTestId("modalize-mock")).toBeTruthy();
  });
});
