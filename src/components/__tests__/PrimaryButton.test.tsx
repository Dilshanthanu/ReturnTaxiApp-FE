import React from "react";
import { render, fireEvent } from "@/src/utils/testUtils";
import PrimaryButton from "../PrimaryButton";

describe("PrimaryButton (Secondary Type)", () => {
  it("renders text correctly in uppercase", () => {
    const { getByText } = render(
      <PrimaryButton type="SECONDARY" text="Cancel" onPress={() => {}} />,
    );
    expect(getByText("CANCEL")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <PrimaryButton type="SECONDARY" text="Cancel" onPress={onPress} />,
    );
    fireEvent.press(getByText("CANCEL"));
    expect(onPress).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <PrimaryButton
        type="SECONDARY"
        text="Cancel"
        onPress={onPress}
        disabled={true}
      />,
    );
    fireEvent.press(getByText("CANCEL"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
