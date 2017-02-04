import React, { Component } from "react";
import { Layer, Stage } from "react-konva";

import DragImage from "./drag_img";

function App() {
  return (
    <Stage width={700} height={700}>
      <Layer>
        <DragImage image="http://konvajs.github.io/assets/yoda.jpg" />
      </Layer>
    </Stage>
  );
}

export default App;
