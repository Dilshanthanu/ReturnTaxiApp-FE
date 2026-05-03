import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Checkbox from "../Checkbox";

describe("Checkbox", () => {
  it("renders label correctly", () => {
    const { getByText } = render(
      <Checkbox label="Agree" checked={false} onChange={() => {}} />,
    );
    expect(getByText("Agree")).toBeTruthy();
  });

  it("calls onChange when pressed", () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Checkbox label="Agree" checked={false} onChange={onChange} />,
    );
    fireEvent.press(getByText("Agree"));
    expect(onChange).toHaveBeenCalled();
  });
});
