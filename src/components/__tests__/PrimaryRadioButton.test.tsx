import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { User } from 'lucide-react-native';
import PrimaryRadioButton from "../PrimaryRadioButton";

describe("PrimaryRadioButton", () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title correctly", () => {
    const { getByText } = render(
      <PrimaryRadioButton
        title="Option A"
        checked={false}
        onChange={onChange}
      />,
    );
    expect(getByText("Option A")).toBeTruthy();
  });

  it("renders icon when provided", () => {
    const { getByText } = render(
      <PrimaryRadioButton
        title="Option A"
        checked={false}
        onChange={onChange}
        icon={User}
      />,
    );
    expect(getByText("UserIcon")).toBeTruthy();
  });

  it("calls onChange when pressed", () => {
    const { getByText } = render(
      <PrimaryRadioButton
        title="Option A"
        checked={false}
        onChange={onChange}
      />,
    );

    fireEvent.press(getByText("Option A"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not call onChange when disabled", () => {
    const { getByText } = render(
      <PrimaryRadioButton
        title="Option A"
        checked={false}
        onChange={onChange}
        disabled={true}
      />,
    );

    fireEvent.press(getByText("Option A"));
    expect(onChange).not.toHaveBeenCalled();
  });
});
