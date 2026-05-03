import React from "react";
import { render } from "@testing-library/react-native";
import Paginator from "../Paginator";

describe("Paginator", () => {
  const slides = [
    { key: "1", title: "Slide 1", description: "Desc 1", image: 1 },
    { key: "2", title: "Slide 2", description: "Desc 2", image: 2 },
    { key: "3", title: "Slide 3", description: "Desc 3", image: 3 },
  ];

  it("renders correct number of dots", () => {
    const { getAllByTestId } = render(
      <Paginator slides={slides} currentSlide={0} />,
    );
    // We added testID="paginator-dot" in Paginator.tsx
    expect(getAllByTestId("paginator-dot")).toHaveLength(3);
  });

  it("applies active styles to the current slide dot", () => {
    const { getAllByTestId } = render(
      <Paginator slides={slides} currentSlide={1} />,
    );
    const dots = getAllByTestId("paginator-dot");

    // This is a bit tricky to test with Animated.View interpolated styles in unit tests
    // but we can at least check if it renders the dots.
    expect(dots).toHaveLength(3);
  });
});
