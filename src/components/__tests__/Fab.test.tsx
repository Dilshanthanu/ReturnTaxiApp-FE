import React from "react";
import { render, fireEvent } from "@/src/utils/testUtils";
import Fab from "../Fab";

describe("Fab", () => {
  it("renders the fab component", () => {
    const onPressMock = jest.fn();
    // Assuming type "FB" or "Plus" does something, but the component simply renders a Plus icon
    const { getByText } = render(<Fab type="Plus" onPress={onPressMock} />);
    expect(getByText("PlusIcon")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Fab type="Plus" onPress={onPressMock} />);

    fireEvent.press(getByText("PlusIcon"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
