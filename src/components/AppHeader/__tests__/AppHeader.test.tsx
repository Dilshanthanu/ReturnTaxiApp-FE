import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@/src/utils/testUtils";
import AppHeader from "../AppHeader";

describe("AppHeader", () => {
  it("renders title correctly", () => {
    const { getByText } = render(<AppHeader title="Test Title" />);
    expect(getByText("Test Title")).toBeTruthy();
  });

  it("renders subtitle correctly", () => {
    const { getByText } = render(
      <AppHeader title="Test Title" subTitle="Test SubTitle" />,
    );
    expect(getByText("Test SubTitle")).toBeTruthy();
  });

  it("calls onBackPress when back button clicked", () => {
    const onBackPressMock = jest.fn();
    const { getByText } = render(
      <AppHeader title="Test" onBackPress={onBackPressMock} />,
    );

    // The back button has an ArrowLeft icon
    fireEvent.press(getByText("ArrowLeftIcon"));
    expect(onBackPressMock).toHaveBeenCalledTimes(1);
  });

  it("renders right component correctly", () => {
    const renderRight = () => <Text>RightAction</Text>;
    const { getByText } = render(
      <AppHeader title="Test" renderRight={renderRight} />,
    );
    expect(getByText("RightAction")).toBeTruthy();
  });
});
