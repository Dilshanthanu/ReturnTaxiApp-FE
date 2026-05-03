import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { useThemeSettings } from "../../theme/ThemeContext";
import ThemedLayout from "../ThemedLayout";

jest.mock("../../theme/ThemeContext", () => ({
  useThemeSettings: jest.fn(),
}));

describe("ThemedLayout", () => {
  it("renders children in light theme", () => {
    (useThemeSettings as jest.Mock).mockReturnValue({ themeName: "light" });
    const { getByText } = render(
      <ThemedLayout>
        <Text>Light Theme Content</Text>
      </ThemedLayout>,
    );
    expect(getByText("Light Theme Content")).toBeTruthy();
  });

  it("renders children in dark theme with gradient", () => {
    (useThemeSettings as jest.Mock).mockReturnValue({ themeName: "dark" });
    const { getByText } = render(
      <ThemedLayout>
        <Text>Dark Theme Content</Text>
      </ThemedLayout>,
    );
    expect(getByText("Dark Theme Content")).toBeTruthy();
  });
});
