import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MessageInput from "../MessageInput";

describe("MessageInput", () => {
  it("renders with placeholder", () => {
    const { getByPlaceholderText } = render(
      <MessageInput placeholder="Type a message" value="" />,
    );
    expect(getByPlaceholderText("Type a message")).toBeTruthy();
  });

  it("calls onChangeText when typing", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <MessageInput
        placeholder="Type a message"
        value=""
        onChangeText={onChangeText}
      />,
    );

    fireEvent.changeText(getByPlaceholderText("Type a message"), "Hello");
    expect(onChangeText).toHaveBeenCalledWith("Hello");
  });

  it("calls onSend when send button is pressed", () => {
    const onSend = jest.fn();
    const { getByText } = render(
      <MessageInput value="Hello" onSend={onSend} />,
    );

    // SendHorizontal renders as 'SendHorizontalIcon'
    fireEvent.press(getByText("SendHorizontalIcon"));
    expect(onSend).toHaveBeenCalled();
  });

  it("calls onAddPress when plus button is pressed", () => {
    const onAddPress = jest.fn();
    const { getByText } = render(
      <MessageInput value="" onAddPress={onAddPress} />,
    );

    // Plus renders as 'PlusIcon'
    fireEvent.press(getByText("PlusIcon"));
    expect(onAddPress).toHaveBeenCalled();
  });
});
