import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TabSelector from "../TabSelector";

describe("TabSelector", () => {
  const tabs = ["Home", "Profile", "Settings"];
  const onTabChange = jest.fn();

  it("renders all tabs", () => {
    const { getByText } = render(
      <TabSelector tabs={tabs} activeTab={0} onTabChange={onTabChange} />,
    );
    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Profile")).toBeTruthy();
    expect(getByText("Settings")).toBeTruthy();
  });

  it("calls onTabChange when a tab is pressed", () => {
    const { getByText } = render(
      <TabSelector tabs={tabs} activeTab={0} onTabChange={onTabChange} />,
    );

    fireEvent.press(getByText("Profile"));
    expect(onTabChange).toHaveBeenCalledWith(1);
  });
});
