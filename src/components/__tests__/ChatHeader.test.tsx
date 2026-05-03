import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ChatHeader from "../PrimaryHeader";

describe("ChatHeader", () => {
  it("renders title correctly", () => {
    const { getByText } = render(<ChatHeader title="Chat Room" />);
    expect(getByText("Chat Room")).toBeTruthy();
  });

  it("calls onBackPress when arrow left is pressed", () => {
    const onBackPress = jest.fn();
    const { getByText } = render(
      <ChatHeader title="Chat Room" onBackPress={onBackPress} />,
    );

    // ArrowLeft renders as 'ArrowLeftIcon'
    fireEvent.press(getByText("ArrowLeftIcon"));
    expect(onBackPress).toHaveBeenCalled();
  });

  it("calls onRightPress when ellipsis is pressed", () => {
    const onRightPress = jest.fn();
    const { getByText } = render(
      <ChatHeader title="Chat Room" onRightPress={onRightPress} />,
    );

    // EllipsisVertical renders as 'EllipsisVerticalIcon'
    fireEvent.press(getByText("EllipsisVerticalIcon"));
    expect(onRightPress).toHaveBeenCalled();
  });
});
