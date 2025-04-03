'use client'

import { Button } from "@/components/ui/button";
import { Eraser, Pen, Pencil, Redo, RotateCcw, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const Canvas = () => {
    const [strokeColor, setStrokeColor] = useState("#a855f7");
    const [strokeWidth, setStrokeWidth] = useState(4);
    const [eraserWidth, setEraserWidth] = useState(10);
    const [eraseMode, setEraseMode] = useState(false);
    return (
        <div className="container mx-auto px-4 py-6">
        <h1 className="font-semibold text-[1.5rem] leading-8 sm:text-4xl sm:leading-tight mb-6 text-center">
          Draw Your Sketch Here
        </h1>
  
        {/* Size Controls */}
        <div className="flex justify-center mb-8">
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
  
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Canvas Area */}
          <div className="w-full lg:w-3/4">
            <ReactSketchCanvas
              width="100%"
              height="500px"
              canvasColor="transparent"
              className="!rounded-2xl !border-purple-500 dark:!border-purple-800 w-full"
            />
          </div>
  
          {/* Controls Area */}
          <div className="w-full lg:w-1/4 flex flex-wrap justify-center lg:flex-col items-center gap-0">
            {/* Color picker */}
            <Button
              size="icon"
              style={{ backgroundColor: strokeColor }}
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
              disabled={eraseMode}
            >
              <input
                type="color"
                className="sr-only"
                value={strokeColor}
              />
            </Button>
  
            {/* Drawing Modes */}
            <div className="flex flex-row lg:flex-col gap-0">
              <Button
                size="icon"
                variant="outline"
                disabled={!eraseMode}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
              >
                <Pen size={16} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                disabled={eraseMode}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
              >
                <Eraser size={16} />
              </Button>
            </div>
  
            {/* Actions */}
            <div className="flex flex-row lg:flex-col gap-0">
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
              >
                <Redo size={16} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
              >
                <RotateCcw size={16} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
              >
                <Save size={16} />
              </Button>
              <button
                className="px-2 py-2 bg-red-500 hover:bg-red-600 hover:shadow-lg text-white rounded w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Canvas;
