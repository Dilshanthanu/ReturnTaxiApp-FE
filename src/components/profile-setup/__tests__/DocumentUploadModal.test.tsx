import React from "react";
import { Modalize } from "react-native-modalize";
import { render } from "@/src/utils/testUtils";
import DocumentUploadModal from "../DocumentUploadModal";

// Mock the pickers
jest.mock("expo-document-picker", () => ({
  getDocumentAsync: jest.fn().mockResolvedValue({
    canceled: false,
    assets: [{ uri: "test/doc" }],
  }),
}));

jest.mock("expo-image-picker", () => ({
  requestCameraPermissionsAsync: jest
    .fn()
    .mockResolvedValue({ status: "granted" }),
  launchCameraAsync: jest.fn().mockResolvedValue({
    canceled: false,
    assets: [{ uri: "test/img" }],
  }),
}));

// Mock react-native-modalize
jest.mock("react-native-modalize", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    Modalize: React.forwardRef(function Modalize(props: any, ref) {
      return (
        <View testID="modalize-mock">
          {props.HeaderComponent}
          {props.children}
        </View>
      );
    }),
  };
});

describe("DocumentUploadModal", () => {
  it("renders upload options correctly", () => {
    const ref = React.createRef<Modalize>();
    const { getByText } = render(
      <DocumentUploadModal
        modalRef={ref}
        title="Upload ID"
        description="Please provide your national ID"
      />,
    );

    // Header strings
    expect(getByText("Upload ID")).toBeTruthy();
    expect(getByText("Please provide your national ID")).toBeTruthy();

    // Body strings
    // Depending on missing i18n these might be the literal keys
    expect(getByText(/upload_files/i)).toBeTruthy();
    expect(getByText(/capture_document/i)).toBeTruthy();
    expect(getByText(/upload_document/i)).toBeTruthy();
  });
});
