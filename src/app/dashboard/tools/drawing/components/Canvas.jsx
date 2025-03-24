"use client";
import { Button } from "@/components/ui/button";
import { Eraser, Pen, Redo, RotateCcw, Save, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

const Canvas = () => {
  const colorInputRef = useRef(null);
  const canvasRef = useRef(null);
  const [strokeColor, setStrokeColor] = useState("#a855f7");
  const [eraseMode, setEraseMode] = useState(false);

  // Color functionality
  const handleStrokeColorChange = (e) => {
    setStrokeColor(e.target.value);
  };

  // Drawing Pen function
  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  // Drawing erase Function
  const handleEraseClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  // Undo click
  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };

  // Redo Click
  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };

  // Save
  const handleSave = async () => {
    const dataURL = await canvasRef.current?.exportImage('png');
    if (dataURL) {
      const link = Object.assign(document.createElement('a'), {
        href: dataURL,
        style: { display: 'none' },
        download: 'xynexadocument.png'
      });
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

//    clear canvas 
const handleClearCanvas = () => {
    canvasRef.current.clearCanvas();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="font-semibold text-[1.5rem] leading-8 sm:text-4xl sm:leading-tight mb-6">
        Sketch Here
      </h1>


      <div className="flex flex-col lg:flex-row gap-6 lg:gap-1.5">
        {/* Canvas Area */}
        <div className="w-full">
          <ReactSketchCanvas
            width="100%"
            height="400px"
            ref={canvasRef}
            canvasColor="transparent"
            strokeColor={strokeColor}
            className="!rounded-2xl !border-purple-500 dark:!border-purple-800 w-full"
          />
        </div>

        {/* Controls Area */}
        <div className="w-full lg:w-1/4 flex flex-col items-center gap-6">
          {/* Color picker */}
          <Button
            size="icon"
            onClick={() => colorInputRef.current?.click()}
            style={{ backgroundColor: strokeColor }}
            className="w-12 h-12"
          >
            <input
              type="color"
              ref={colorInputRef}
              className="sr-only"
              value={strokeColor}
              onChange={handleStrokeColorChange}
            />
          </Button>

          {/* Drawing Modes */}
          <div className="flex flex-row lg:flex-col gap-3">
            <Button
              size="icon"
              variant="outline"
              disabled={!eraseMode}
              onClick={handlePenClick}
              className="w-12 h-12"
            >
              <Pen size={16} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              disabled={eraseMode}
              onClick={handleEraseClick}
              className="w-12 h-12"
            >
              <Eraser size={16} />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex flex-row lg:flex-col gap-3">
            <Button
              size="icon"
              variant="outline"
              onClick={handleUndoClick}
              className="w-12 h-12"
            >
              <Redo size={16} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={handleRedoClick}
              className="w-12 h-12"
            >
              <RotateCcw size={16} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={handleSave}
              className="w-12 h-12"
            >
              <Save size={16} />
            </Button>

            <button
              onClick={handleClearCanvas}
              className="px-3 py-3  bg-red-500 hover:bg-red-600 hover:shadow-lg text-white rounded "
            >
              <Trash2 /> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;