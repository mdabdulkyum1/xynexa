'use client';

import { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Button } from "@/components/ui/button";
import {
  Eraser,
  Pen,
  Redo,
  RotateCcw,
  Save,
  Trash2,
  Pencil,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Canvas = () => {
  const colorInputRef = useRef(null);
  const canvasRef = useRef(null);
  const [strokeColor, setStrokeColor] = useState("#014E4E");
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [eraserWidth, setEraserWidth] = useState(10);
  const [eraseMode, setEraseMode] = useState(false);

  const handleStrokeColorChange = (e) => {
    setStrokeColor(e.target.value);
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleEraseClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };

  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };

  const handleSave = async () => {
    const dataURL = await canvasRef.current?.exportImage("png");
    if (dataURL) {
      const link = Object.assign(document.createElement("a"), {
        href: dataURL,
        style: { display: "none" },
        download: "xynexadocument.png",
      });
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const handleClearCanvas = () => {
    canvasRef.current?.clearCanvas();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="font-semibold text-[1.5rem] text-center leading-8 sm:text-4xl sm:leading-tight mb-6">
        Draw Your Sketch Here
      </h1>

      {/* Size Controls */}
      <div className="flex justify-center mb-8 flex-wrap gap-6 lg:gap-2">
        <div className="flex items-center gap-2">
          <Pencil size={20} />
          <input
            type="range"
            min="1"
            max="20"
            step="0.5"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
            className="w-full"
            disabled={eraseMode}
          />
        </div>
        <div className="flex items-center gap-2">
          <Eraser size={20} />
          <input
            type="range"
            min="5"
            max="50"
            step="1"
            value={eraserWidth}
            onChange={(e) => setEraserWidth(parseFloat(e.target.value))}
            className="w-full"
            disabled={!eraseMode}
          />
        </div>
      </div>

      <TooltipProvider>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-4">
          {/* Canvas Area */}
          <div className="w-full">
            <ReactSketchCanvas
              width="100%"
              height="400px"
              ref={canvasRef}
              canvasColor="transparent"
              strokeColor={eraseMode ? "white" : strokeColor}
              strokeWidth={eraseMode ? eraserWidth : strokeWidth}
              className="!rounded-2xl !border-[#014E4E] dark:!border-[#014E4E] w-full"
            />
          </div>

          {/* Controls Area */}
          <div className="w-full lg:w-1/4 flex sm:flex-row sm:gap-2 sm:justify-center lg:flex-col lg:items-start gap-6">
            {/* Color Picker */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  onClick={() => colorInputRef.current?.click()}
                  style={{ backgroundColor: strokeColor }}
                  className="lg:w-12 lg:h-12 w-8 h-8"
                  disabled={eraseMode}
                >
                  <input
                    type="color"
                    ref={colorInputRef}
                    className="sr-only"
                    value={strokeColor}
                    onChange={handleStrokeColorChange}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pick Color</TooltipContent>
            </Tooltip>

            {/* Drawing Modes */}
            <div className="flex gap-3 sm:flex-row sm:gap-2 lg:flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    disabled={!eraseMode}
                    onClick={handlePenClick}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <Pen size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Pen Tool</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    disabled={eraseMode}
                    onClick={handleEraseClick}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <Eraser size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Eraser</TooltipContent>
              </Tooltip>
            </div>

            {/* Actions */}
            <div className="flex gap-3 sm:flex-row sm:gap-2 lg:flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleUndoClick}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <Redo size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleRedoClick}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <RotateCcw size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleSave}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <Save size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Save Image</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleClearCanvas}
                    className="px-3 py-3 bg-red-500 hover:bg-red-600 hover:shadow-lg text-white rounded w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Clear Canvas</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Canvas;
