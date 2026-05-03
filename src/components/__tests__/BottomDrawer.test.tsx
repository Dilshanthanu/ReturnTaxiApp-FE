import React from "react";
import { Text } from "react-native";
import { Modalize } from "react-native-modalize";
import { render } from "@/src/utils/testUtils";
import BottomDrawer from "../BottomDrawer";

// Mock modalize
jest.mock("react-native-modalize", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    Modalize: React.forwardRef((props: any, ref) => {
      // simulate modalize simply rendering its children and components
      return (
        <View testID="modalize-mock" ref={ref}>
          {props.HeaderComponent}
          {props.children}
          {props.FooterComponent}
        </View>
      );
    }),
  };
});

describe("BottomDrawer", () => {
  it("renders children, header, and footer correctly", () => {
    const ref = React.createRef<Modalize>();
    const { getByText } = render(
      <BottomDrawer
        modalRef={ref}
        HeaderComponent={<Text>TestHeader</Text>}
        FooterComponent={<Text>TestFooter</Text>}
      >
        <Text>TestContent</Text>
      </BottomDrawer>,
    );

    expect(getByText("TestHeader")).toBeTruthy();
    expect(getByText("TestContent")).toBeTruthy();
    expect(getByText("TestFooter")).toBeTruthy();
  });
});
