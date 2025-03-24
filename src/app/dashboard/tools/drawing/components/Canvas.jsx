"use client";
import { Button } from "@/components/ui/button";
import { Eraser, Icon, Pen, Redo, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
const Canvas = () => {
    const colorInputRef = useRef(null);
    const canvasRef = useRef(null);
    const [strokeColor, setStrokeColor] = useState('#a855f7');
    const [eraseMode, setEraseMode] = useState(false);

        // color fuctionality
    const handleStrokeColorChange = (e) => {
        setStrokeColor(e.target.value);
        console.log(strokeColor);
    }
    // Drawing Pen function
    const handlePenClick = (e) => {
        setEraseMode(false);
        canvasRef.current?.eraseMode(false)
    }
    // Drawaing earse Function
    const handleEraseClick = (e) => {
        setEraseMode(true);
        canvasRef.current?.eraseMode(true)
    }

    // Undo click
    const handleUndoClick = (e) => {
        canvasRef.current?.undo();
    }

    //  Redo Click

    const handleRedoClick = (e) => {
        canvasRef.current?.redo();
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
          strokeColor={strokeColor}
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

            {/* Drawing Modes  */}
            <div className="flex flex-col gap-3 pt-6">
                <Button
                    size="icon"
                    variant="outline"
                    disabled={!eraseMode}
                    onClick={handlePenClick}
                ><Pen size={16} /></Button>
                <Button 
                size="icon"
                variant="outline"
                disabled={eraseMode}
                onClick={handleEraseClick}
                ><Eraser size={16} /></Button>
            </div>


            {/* Actions  */}
            <div className="flex flex-col gap-3 pt-6">
                <Button
                    size="icon"
                    variant="outline"
                    disabled={!eraseMode}
                    onClick={handleUndoClick}
                ><Redo size={16} /></Button>
                <Button 
                size="icon"
                variant="outline"
                disabled={eraseMode}
                onClick={handleRedoClick}
                ><RotateCcw size={16} /></Button>
            </div>


        </div>
      </div>
    </div>
  );
};

export default Canvas;
