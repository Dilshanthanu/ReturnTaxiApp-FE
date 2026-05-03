import React from "react";
import { render, fireEvent } from "@/src/utils/testUtils";
import Input from "../Input";

describe("Input", () => {
  it("renders label and placeholder correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <Input
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={() => {}}
      />,
    );
    expect(getByText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
  });

  it("updates text when changed", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={onChangeText}
      />,
    );
    fireEvent.changeText(
      getByPlaceholderText("Enter your email"),
      "test@example.com",
    );
    expect(onChangeText).toHaveBeenCalledWith("test@example.com");
  });

  it("shows error message when provided", () => {
    const { getByText } = render(
      <Input
        label="Email"
        value=""
        onChangeText={() => {}}
        errorMessage="Required field"
      />,
    );
    expect(getByText("Required field")).toBeTruthy();
  });
});
