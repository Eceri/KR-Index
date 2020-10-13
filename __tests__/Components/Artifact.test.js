import React from "react";
import renderer from "react-test-renderer";
import { Artifact } from "Components";

test("First check", () => {
  const component = renderer.create(<Artifact name="Abyssal Crown" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
