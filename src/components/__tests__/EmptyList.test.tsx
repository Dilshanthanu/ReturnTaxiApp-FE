import React from "react";
import { Text } from "react-native";
import { render } from "@/src/utils/testUtils";
import EmptyList from "../EmptyList";

describe("EmptyList", () => {
  it("renders with default text", () => {
    const { getByText } = render(<EmptyList />);
    expect(getByText("No items found")).toBeTruthy();
  });

  it("renders with custom text and subText", () => {
    const { getByText } = render(
      <EmptyList text="Custom Empty" subText="Please try again" />,
    );
    expect(getByText("Custom Empty")).toBeTruthy();
    expect(getByText("Please try again")).toBeTruthy();
  });

  it("renders custom icon if provided", () => {
    const { getByText } = render(<EmptyList icon={<Text>CustomIcon</Text>} />);
    expect(getByText("CustomIcon")).toBeTruthy();
  });
});
