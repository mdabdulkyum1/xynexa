"use client";
import React, { useState, useRef, useEffect } from "react";
// import ReactQuill from "react-quill-new";
import { MdOutlineSaveAlt } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
// import "react-quill-new/dist/quill.snow.css"; 
import DocumentHeading from "./DocumentHeading";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const TextEditor = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Untitled Document");
  const [isBrowser, setIsBrowser] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

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
    console.log("document title",title, "Editor Content:", plainText.trim());
    
  };

  // Save as PDF (placeholder)
  const saveAsPDF = () => {
    const input = document.querySelector(".ql-editor"); // Quill editor content
    if (!input) {
      alert("Error: Editor content not found.");
      return;
    }

    html2canvas(input, {
      backgroundColor: "#ffffff", // Ensures proper background color
      scale: 2, // Increases resolution for better quality
      useCORS: true, // Fixes cross-origin image issues
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // Adjust image width for A4
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${title}.pdf`);
    });
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
    <div className="min-h-screen bg-purple-100 dark:bg-[#0A0A0A] flex justify-center items-start p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <DocumentHeading title={title} setTitle={setTitle}></DocumentHeading>
         
          <div className="space-x-1 lg:space-x-2">
            <button
              onClick={saveDocument}
              className="px-2 py-1 lg:px-4 lg:py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-extrabold"
            >
              <MdOutlineSaveAlt />
             
            </button>
            <button
              onClick={saveAsPDF}
              className="px-2 py-1 lg:px-4 lg:py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              <FaFilePdf />
            </button>
            <button
              onClick={shareDocument}
              className="px-2 py-1 lg:px-4 lg:py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.50003C5 8.32845 4.32843 9.00003 3.5 9.00003C2.67157 9.00003 2 8.32845 2 7.50003C2 6.6716 2.67157 6.00003 3.5 6.00003C4.32843 6.00003 5 6.6716 5 7.50003ZM5.71313 8.66388C5.29445 9.45838 4.46048 10 3.5 10C2.11929 10 1 8.88074 1 7.50003C1 6.11931 2.11929 5.00003 3.5 5.00003C4.46048 5.00003 5.29445 5.54167 5.71313 6.33616L9.10424 4.21671C9.03643 3.98968 9 3.74911 9 3.50003C9 2.11932 10.1193 1.00003 11.5 1.00003C12.8807 1.00003 14 2.11932 14 3.50003C14 4.88074 12.8807 6.00003 11.5 6.00003C10.6915 6.00003 9.97264 5.61624 9.51566 5.0209L5.9853 7.22738C5.99502 7.31692 6 7.40789 6 7.50003C6 7.59216 5.99502 7.68312 5.9853 7.77267L9.51567 9.97915C9.97265 9.38382 10.6915 9.00003 11.5 9.00003C12.8807 9.00003 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5C9 11.2509 9.03643 11.0104 9.10425 10.7833L5.71313 8.66388ZM11.5 5.00003C12.3284 5.00003 13 4.32846 13 3.50003C13 2.6716 12.3284 2.00003 11.5 2.00003C10.6716 2.00003 10 2.6716 10 3.50003C10 4.32846 10.6716 5.00003 11.5 5.00003ZM13 11.5C13 12.3285 12.3284 13 11.5 13C10.6716 13 10 12.3285 10 11.5C10 10.6716 10.6716 10 11.5 10C12.3284 10 13 10.6716 13 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
             
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