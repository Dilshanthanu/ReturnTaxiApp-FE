import React from "react";
import { render, fireEvent } from "@/src/utils/testUtils";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("renders with placeholder", () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        label="Search"
        placeholder="Search..."
        value=""
        onChangeText={() => {}}
      />,
    );
    expect(getByPlaceholderText("Search...")).toBeTruthy();
  });

  it("calls onChangeText when typing", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar
        label="Search"
        placeholder="Search..."
        value=""
        onChangeText={onChangeText}
      />,
    );
    fireEvent.changeText(getByPlaceholderText("Search..."), "query");
    expect(onChangeText).toHaveBeenCalledWith("query");
  });

  it("calls onAdvancedSearch when filter button is pressed", () => {
    const onAdvancedSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBar
        label="Search"
        placeholder="Search..."
        value=""
        onChangeText={() => {}}
        onAdvancedSearch={onAdvancedSearch}
      />,
    );
    fireEvent.press(getByTestId("advanced-search-button"));
    expect(onAdvancedSearch).toHaveBeenCalled();
  });
});
