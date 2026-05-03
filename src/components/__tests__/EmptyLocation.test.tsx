import React from "react";
import { render, fireEvent } from "@/src/utils/testUtils";
import EmptyLocation from "../EmptyLocation";

describe("EmptyLocation", () => {
  it("renders correctly with default translations", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<EmptyLocation onPress={onPressMock} />);

    // We expect the translation keys or translated strings
    // Our jest.setup.js i18n mock returns the key itself or the translation based on config
    // The exact text output depends on how i18next is mocked in jest.setup.js.
    // Assuming the common fallback returns the string key itself
    expect(getByText("select_location")).toBeTruthy();
    expect(getByText("tap_to_select_location")).toBeTruthy();
  });

  it("calls onPress when tapped", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<EmptyLocation onPress={onPressMock} />);

    // Find an element and press it
    fireEvent.press(getByText("select_location"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
