import React from "react";
import { render } from "@/src/utils/testUtils";
import Warning from "../Warning";

describe("Warning", () => {
  it("renders the warning text correctly", () => {
    const { getByText } = render(<Warning text="This is a warning message" />);
    expect(getByText("This is a warning message")).toBeTruthy();
  });
});
