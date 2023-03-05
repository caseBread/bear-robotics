import React from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import Draggable from "./components/Draggable";
import Box from "./components/Box";
import App from "./App";

test("Box를 드래그하여 다른 위치로 이동한다.", () => {
  render(<App />);

  const box = screen.getByTestId("test-box");
  fireEvent.mouseDown(box, { clientX: 0, clientY: 0 });
  fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });
  fireEvent.mouseUp(document);
  expect(box).toHaveStyle("top:100px, left:100px");
});

test("Box를 드래그하여 창 밖으로 이동시킬 수 없다.", () => {
  render(
    <Draggable>
      <Box />
    </Draggable>
  );

  const outsideX = window.innerWidth + 100;
  const outsideY = window.innerHeight + 100;

  const box = screen.getByTestId("test-box");
  fireEvent.mouseDown(box, { clientX: 0, clientY: 0 });
  fireEvent.mouseMove(document, {
    clientX: outsideX,
    clientY: outsideY,
  });
  fireEvent.mouseUp(document);

  const newPosition = box.getBoundingClientRect();
  expect(newPosition.x).toBeLessThanOrEqual(window.innerWidth);
  expect(newPosition.y).toBeLessThanOrEqual(window.innerHeight);
});
