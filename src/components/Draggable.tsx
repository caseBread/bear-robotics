import React, { useCallback, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface Position {
  x: number;
  y: number;
}

const BOX_SIZE = { width: 48, height: 48 };

const Draggable = ({ children }: Props) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setDragging(true);
    },
    [setDragging]
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      setDragging(false);
    },
    [setDragging]
  );

  const handleMouseMove = (e: any) => {
    if (dragging) {
      if (
        0 <= e.pageX &&
        e.pageX + BOX_SIZE.width <= window.innerWidth &&
        0 <= e.pageY &&
        e.pageY + BOX_SIZE.height <= window.innerHeight
      ) {
        setPosition({
          x: e.pageX,
          y: e.pageY,
        });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div
      className="absolute"
      style={{ top: position.y, left: position.x }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};
export default Draggable;
