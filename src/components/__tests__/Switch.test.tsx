import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Switch from "../Switch";

describe("Switch", () => {
  it("renders with label", () => {
    const { getByText } = render(
      <Switch label="Notification" checked={false} />,
    );
    expect(getByText("Notification")).toBeTruthy();
  });

  it("calls onChange when label is pressed", () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Switch label="Notification" checked={false} onChange={onChange} />,
    );

    fireEvent.press(getByText("Notification"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
