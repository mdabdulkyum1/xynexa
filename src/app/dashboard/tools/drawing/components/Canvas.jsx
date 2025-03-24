"use client";
import { ReactSketchCanvas } from "react-sketch-canvas";
const Canvas = () => {
  return (
    <div>
        <h1 className="text-center lg:text-4xl md:text-2xl text-sm">Draw Here</h1>
      <div>
        <ReactSketchCanvas
          width="88%"
          height="500px"
          canvasColor="transparent"
          strokeColor="#000"
        />
      </div>
    </div>
  );
};

export default Canvas;
