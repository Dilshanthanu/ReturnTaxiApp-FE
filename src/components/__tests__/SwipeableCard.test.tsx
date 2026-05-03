import React from "react";
import { Text } from "react-native";
import { render } from "@/src/utils/testUtils";
import SwipeableCard from "../SwipeableCard";

// Mock Swipeable since Reanimated might not be fully available in Jest without setup
jest.mock("react-native-gesture-handler/ReanimatedSwipeable", () => {
  const React = require("react");
  const { View } = require("react-native");
  return (props: any) => (
    <View testID="swipeable-mock">
      {props.children}
      {props.renderRightActions && props.renderRightActions()}
    </View>
  );
});

describe("SwipeableCard", () => {
  it("renders underlying children and right actions", () => {
    const { getByText } = render(
      <SwipeableCard renderRightActions={() => <Text>RightAction</Text>}>
        <Text>CardContent</Text>
      </SwipeableCard>,
    );

    expect(getByText("CardContent")).toBeTruthy();
    expect(getByText("RightAction")).toBeTruthy();
  });
});
