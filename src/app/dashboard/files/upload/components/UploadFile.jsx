"use client"

import { useRef, useState } from "react"
import { UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"

const UploadFile = () => {
  const fileInputRef = useRef(null)
  const [files, setFiles] = useState([])

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files)
    setFiles(selected)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(droppedFiles)
  }

  return (
    <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Upload Your File</h2>
        <Button size="sm" variant="outline" onClick={() => fileInputRef.current.click()}>
          Upload files
        </Button>
      </div>

      <div className="text-sm mb-6">
        <p>
          <span className="font-bold text-black">13.25 GB</span> used from 15 GB
        </p>
        <div className="h-2 bg-gray-200 rounded-full my-2">
          <div className="h-2 rounded-full bg-primary w-[88%]"></div>
        </div>
        <div className="text-xs flex gap-5 text-gray-500 items-center">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
            <span>Compressed</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span>
            <span>Spreadsheet</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-pink-500 inline-block"></span>
            <span>Others</span>
          </div>
        </div>
      </div>

      <div
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50 transition"
      >
        <UploadCloud className="w-10 h-10 text-gray-500 mb-3" />
        <p className="text-sm font-semibold text-gray-600">Upload your files</p>
        <p className="text-xs text-gray-500 mt-1">
          Drag and drop your files here or <span className="text-blue-500 underline">choose files</span>
        </p>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-medium mb-2">Selected Files:</h4>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default UploadFile
