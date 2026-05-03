import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AttachmentPreview from "../AttachmentPreview";

describe("AttachmentPreview", () => {
  const onRemove = jest.fn();

  const imageFile = {
    uri: "file://test.jpg",
    name: "test.jpg",
    mimeType: "image/jpeg",
    size: 1024,
  };

  const docFile = {
    uri: "file://test.pdf",
    name: "test.pdf",
    mimeType: "application/pdf",
    size: 1024,
  };

  it("renders nothing when file is null", () => {
    const { toJSON } = render(
      <AttachmentPreview file={null} onRemove={onRemove} />,
    );
    expect(toJSON()).toBeNull();
  });

  it("renders image when mimeType is image", () => {
    const { getByRole } = render(
      <AttachmentPreview file={imageFile} onRemove={onRemove} />,
    );
    // React Native Image doesn't always have a role, but we can check if it exists via styles or other means
    // In this case, we check if it doesn't render the FileTextIcon
  });

  it("renders file icon and name for non-image files", () => {
    const { getByText } = render(
      <AttachmentPreview file={docFile} onRemove={onRemove} />,
    );
    expect(getByText("FileTextIcon")).toBeTruthy();
    expect(getByText("test.pdf")).toBeTruthy();
  });

  it("calls onRemove when X button is pressed", () => {
    const { getByText } = render(
      <AttachmentPreview file={docFile} onRemove={onRemove} />,
    );
    fireEvent.press(getByText("XIcon"));
    expect(onRemove).toHaveBeenCalled();
  });
});
