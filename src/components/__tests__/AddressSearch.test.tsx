import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddressSearchField from "../AddressSearch";

// Mocking GooglePlacesAutocomplete is already done in jest.setup.js
// but we might need to verify if we can find elements.

describe("AddressSearchField", () => {
  const onSelect = jest.fn();

  it("renders correctly with placeholder", () => {
    const { getByPlaceholderText } = render(
      <AddressSearchField onSelect={onSelect} placeholder="Search Location" />,
    );
    expect(getByPlaceholderText("Search Location")).toBeTruthy();
  });

  it("calls onSelect with undefined when X button is pressed", () => {
    const { getByText } = render(<AddressSearchField onSelect={onSelect} />);

    // The X icon renders as 'XIcon' in our lucide mock
    fireEvent.press(getByText("XIcon"));

    expect(onSelect).toHaveBeenCalledWith({
      address: undefined,
      latitude: undefined,
      longitude: undefined,
    });
  });
});
