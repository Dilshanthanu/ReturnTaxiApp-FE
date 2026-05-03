import React from "react";
import { render } from "@testing-library/react-native";
import { User } from "lucide-react-native";
import CardHeader from "../CardHeader";

describe("CardHeader", () => {
  it("renders title and icon correctly", () => {
    const { getByText } = render(
      <CardHeader title="User Profile" icon={User} color="blue" />,
    );

    expect(getByText("User Profile")).toBeTruthy();
    expect(getByText("UserIcon")).toBeTruthy();
  });

  it("renders subtitle when provided", () => {
    const { getByText } = render(
      <CardHeader
        title="User Profile"
        subTitle="Manage your account"
        icon={User}
        color="blue"
      />,
    );

    expect(getByText("Manage your account")).toBeTruthy();
  });
});
