"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "lucide-react";
import { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
const Canvas = () => {
    const colorInputRef = useRef(null);
    const canvasRef = useRef(null);
    const [strokeColor, setStrokeColor] = useState('#a855f7');
    const [eraseMode, setEraseMode] = useState(false);


    const handleStrokeColorChange = (e) => {
        setStrokeColor(e.target.value)
    }
  return (
    <div>
        <hspan className="font-semibold text-[1.5rem] leading-8 sm:text-4xl  sm:leading-tight ">Draw Here</hspan>


      <div className="mt-6  conatiner mx-auto">
        <ReactSketchCanvas
          width="100%"
          height="500px"
          ref={canvasRef}
          canvasColor="transparent"
          strokeColor="#000"
          className="!rounded-2xl !border-purple-500 dark:!border-purple-800"
        />

        <div>
       {/* Color picker */}
       <Button
          size="icon"
          onClick={() => colorInputRef.current?.click()}
          style={{ backgroundColor: strokeColor }}
        >
          <input
            type="color"
            ref={colorInputRef}
            className="sr-only"
            value={strokeColor}
            onChange={handleStrokeColorChange}
          />
        </Button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
