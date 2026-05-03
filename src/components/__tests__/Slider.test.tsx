import React from "react";
import { render } from "@/src/utils/testUtils";
import Slider from "../Slider";

// Gesture components mock since gesture handler needs to be bypassed for standard renders
jest.mock("react-native-gesture-handler", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    GestureDetector: ({ children }: any) => (
      <View testID="gesture-detector">{children}</View>
    ),
    Gesture: {
      Pan: () => ({
        onStart: jest.fn().mockReturnThis(),
        onUpdate: jest.fn().mockReturnThis(),
        runOnJS: jest.fn().mockReturnThis(),
      }),
      Tap: () => ({
        onEnd: jest.fn().mockReturnThis(),
        runOnJS: jest.fn().mockReturnThis(),
      }),
      Simultaneous: jest.fn(),
    },
  };
});

describe("Slider", () => {
  it("renders correct number of stars based on count prop", () => {
    const { getAllByText } = render(<Slider rating={3} count={5} />);
    // "StarIcon" is output by our lucide-react-native mock
    const stars = getAllByText("StarIcon");
    expect(stars).toHaveLength(5);
  });
});
