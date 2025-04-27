"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { MdOutlineSaveAlt } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import "react-quill-new/dist/quill.snow.css";
import DocumentHeading from "./DocumentHeading";
import { toast } from "react-hot-toast";
import { useDocumentCreateMutation } from "@/redux/features/Api/documentApi";
import { useUserDataFromClerk } from "@/hooks/useUserDataFromClerk";
import { useRouter } from "next/navigation";
import "./editor.css"; 
import { pdfExporter } from 'quill-to-pdf';
import { saveAs } from 'file-saver';


const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const TextEditor = () => {
    const router = useRouter();
    const [documentCreate] = useDocumentCreateMutation();
    const { userData } = useUserDataFromClerk();
    const currentDocCreator_id = userData?.user?._id;
    const currentDocCreatorEmail = userData?.user?.email;
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("Untitled Document");
    const [isBrowser, setIsBrowser] = useState(false);
    const quillRef = useRef(null);

    // useEffect(() => {
    //     setIsBrowser(typeof window !== 'undefined');
    // }, []);

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
            toast.success("Document saved successfully!");
        } catch (error) {
            console.error("Error saving document:", error);
            toast.error("Failed to save the document.");
        }
    };

    //   show contnt in console
    const handleContentChange = (value) => {
        setContent(value);
        // Extracting plain text from Quill editor
        const plainText = quillRef.current ? quillRef.current.getEditor().getText() : "";
        // console.log("document title", title, "Editor Content:", plainText.trim());

    };

    // Save as PDF (placeholder)
    const savePdf = async () => {
        if (!quillRef.current) return;
    
        const editor = quillRef.current.getEditor(); 
        const delta = editor.getContents(); 
    
        const pdfAsBlob = await pdfExporter.generatePdf(delta);
        saveAs(pdfAsBlob, `${title || 'Untitled Document'}.pdf`); 
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
                toast.error("Sharing is not supported on this browser. Copy the content manually.");
            }
        } catch (error) {
            console.error("Error sharing document:", error);
            toast.error("Failed to share the document.");
        }
    };


    const handleSaveToDatabase = async () => {
        try {
            const plainText = quillRef.current?.getEditor().getText() || "";

            const docData = {
                title: title,
                content: content,
                docCreator_id: currentDocCreator_id,
                docCreatorEmail: currentDocCreatorEmail,
                plainText: plainText.trim(),

                createdAt: new Date().toISOString(),
            };

            const res = await documentCreate(docData).unwrap();
            console.log("Document saved to DB:", res);
            toast.success("Document saved to database!");
            router.push(`/dashboard/documents`);
        } catch (err) {
            console.error("Error saving to DB:", err);
            toast.error("Failed to save document to database.");
        }
    };


    return (
        <div className="min-h-screen bg-purple-50 dark:bg-[#0A0A0A] flex justify-center items-start p-4 ">
            <div className="w-full max-w-4xl   rounded-lg  ">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <DocumentHeading title={title} setTitle={setTitle}></DocumentHeading>

                    <div className="space-x-1 lg:space-x-2">
                        {/* db save */}
                        <button
                            onClick={handleSaveToDatabase}
                            className="btn px-2 py-1 lg:px-4 lg:py-2 bg-gradient-to-r border-fuchsia-700 from-fuchsia-700 to-pink-200 text-white rounded-md dark:border-none"
                        >
                            Save to DB
                        </button>
                        <button
                            onClick={saveDocument}
                            className="btn px-2 py-1 lg:px-4 lg:py-2 bg-gradient-to-r border-fuchsia-700 from-fuchsia-700 to-pink-200 text-white rounded-md  font-extrabold dark:border-none"
                        >
                            <MdOutlineSaveAlt />

                        </button>
                        <button
                            onClick={savePdf}
                            className="btn px-2 py-1 lg:px-4 lg:py-2 bg-gradient-to-r border-fuchsia-700 from-fuchsia-700 to-pink-200 text-white rounded-md dark:border-none"
                        >
                            <FaFilePdf />
                        </button>
                        <button
                            onClick={shareDocument}
                            className="btn px-2 py-1 lg:px-4 lg:py-2 bg-gradient-to-r border-fuchsia-700 from-fuchsia-700 to-pink-200 text-white rounded-md dark:border-none"
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
                        className=" quill-custom ql-editor"
                        modules={{
                            toolbar: [
                                [{ font: [] }, { size: [] }],
                                ["bold", "italic", "underline"],
                                [{ color: [] }, { background: [] }],
                                ["link", "image"],
                                [{ align: [] }],
                                [{ list: "ordered" }, { list: "bullet" }],
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