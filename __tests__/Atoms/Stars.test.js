import React from "react";
import { render } from "@testing-library/react";
import { Stars } from "Atoms";

test("First check", () => {
  const { container } = render(<Stars />);
  expect(container).toMatchSnapshot();
});
