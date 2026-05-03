import React from "react";
import { render, fireEvent } from "@/src/utils/testUtils";
import Chip from "../Chip";

describe("Chip", () => {
  it("renders label correctly", () => {
    const { getByText } = render(<Chip label="Test Chip" />);
    expect(getByText("Test Chip")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(<Chip label="Press Me" onPress={onPress} />);
    fireEvent.press(getByText("Press Me"));
    expect(onPress).toHaveBeenCalled();
  });

  it("calls onDelete when delete icon is pressed", () => {
    const onDelete = jest.fn();
    const { getByTestId } = render(
      <Chip label="Delete Me" onDelete={onDelete} />,
    );
    const deleteButton = getByTestId("chip-delete-button");
    fireEvent.press(deleteButton);
    expect(onDelete).toHaveBeenCalled();
  });

  it("renders disabled state correctly", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Chip label="Disabled" onPress={onPress} disabled={true} />,
    );
    fireEvent.press(getByText("Disabled"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
