import { render, fireEvent } from "@testing-library/react-native";
import SignupBackButton from "../SignupBackButton";

describe("SignupBackButton", () => {
  it("renders correctly with icon and text", () => {
    const { getByText } = render(<SignupBackButton />);
    expect(getByText("back")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(<SignupBackButton onPress={onPress} />);

    fireEvent.press(getByText("back"));
    expect(onPress).toHaveBeenCalled();
  });
});
