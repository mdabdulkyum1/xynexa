"use client";
import React, { useState, useRef } from "react";
import ReactQuill from "react-quill-new";

import "react-quill-new/dist/quill.snow.css"; 

const TextEditor = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Untitled Document");
  const quillRef = useRef(null);

  // Save the document as HTML
  const saveDocument = () => {
    try {
      const blob = new Blob([content], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.html`;
      a.click();
      URL.revokeObjectURL(url);
      alert("Document saved successfully!");
    } catch (error) {
      console.error("Error saving document:", error);
      alert("Failed to save the document.");
    }
  };

//   show contnt in console
  const handleContentChange = (value) => {
    setContent(value);
    // Extracting plain text from Quill editor
    const plainText = quillRef.current ? quillRef.current.getEditor().getText() : "";
    console.log("Editor Content:", plainText.trim());
    
  };

  // Save as PDF (placeholder)
  const saveAsPDF = () => {
    alert("PDF saving requires a library like jsPDF. This is a placeholder.");
  };

  // Share the document
  const shareDocument = async () => {
    try {
      const textContent = quillRef.current?.getEditor().getText() || content;
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: textContent,
        });
        console.log("Document shared successfully");
      } else {
        alert("Sharing is not supported on this browser. Copy the content manually.");
      }
    } catch (error) {
      console.error("Error sharing document:", error);
      alert("Failed to share the document.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="space-x-2">
            <button
              onClick={saveDocument}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
            <button
              onClick={saveAsPDF}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save PDF
            </button>
            <button
              onClick={shareDocument}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Share
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="p-4">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={handleContentChange}
            className="min-h-[500px]"
            modules={{
              toolbar: [
                [{ font: [] }],
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ align: [] }],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;