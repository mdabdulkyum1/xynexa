"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { FaEdit } from "react-icons/fa";
import { useUserDataFromClerk } from "@/hooks/useUserDataFromClerk";
import { useParams, useRouter } from "next/navigation";
import "../../new/components/editor.css";
import DocumentHeading from "../../new/components/DocumentHeading";
import { useDocumentGetByIdQuery, useDocumentUpdateMutation } from "@/redux/features/Api/documentApi";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const TextEditor = () => {
    const router = useRouter();
    const quillRef = useRef(null);
    const { userData } = useUserDataFromClerk();
    const { id } = useParams();
    const [isBrowser, setIsBrowser] = useState(false);

    const { data: document = {}, isLoading, isError, error } = useDocumentGetByIdQuery(id);
    const [documentUpdate, { isLoading: isUpdating }] = useDocumentUpdateMutation();

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const currentDocCreator_id = userData?.user?._id;
    const currentDocCreatorEmail = userData?.user?.email;

    // Eta diye window check
    useEffect(() => {
        setIsBrowser(typeof window !== 'undefined');
    }, []);

    // Jokhon document load hobe, tokhon title and content set hobe
    useEffect(() => {
        if (document?.document) {
            setTitle(document.document.title || "");
            setContent(document.document.content || ""); // document er content set
        }
    }, [document]);

    const handleContentChange = (value) => {
        setContent(value);
        const plainText = quillRef.current ? quillRef.current.getEditor().getText() : "";
        // console.log("document title", title, "Editor Content:", plainText.trim());
    };

    const shareDocument = async () => {
        try {
            const textContent = quillRef.current?.getEditor().getText() || content;
            if (navigator.share) {
                await navigator.share({
                    title: title,
                    text: textContent,
                });
                // console.log("Document shared successfully");
            } else {
                toast.error("Failed to share the document.");
            }
        } catch (error) {
            console.error("Error sharing document:", error);
            toast.error("Failed to share the document.");
        }
    };

    const handleUpdate = async () => {
        if (!title.trim() || !content.trim()) {
            toast.error("Title and Content cannot be empty!");
            return;
        }
    
        try {
            await documentUpdate({
                id,
                title,
                content,
                creator: {
                    _id: currentDocCreator_id,
                    email: currentDocCreatorEmail,
                },
            }).unwrap();
    
            // console.log("Document updated successfully!");
            Swal.fire({
                icon: "success",
                title: "Document Updated!",
                text: "Your document has been updated successfully.",
                timer: 2000,
                showConfirmButton: false,
            });
            router.push("/dashboard/documents"); 
        } catch (error) {
            console.error("Failed to update document:", error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Something went wrong. Please try again!",
            });
        }
    };
    

    return (
        <div className="min-h-screen bg-purple-50 dark:bg-[#0A0A0A] flex justify-center items-start p-4">
            <div className="w-full max-w-4xl rounded-lg">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <DocumentHeading title={title} setTitle={setTitle} />
                    <div className="space-x-1 lg:space-x-2">
                        <button  onClick={handleUpdate} className="btn px-2 py-1 lg:px-4 lg:py-2 bg-gradient-to-r border-fuchsia-700 from-fuchsia-700 to-pink-200 text-white rounded-md font-extrabold dark:border-none">
                            <FaEdit />
                        </button>
                        <button
                            onClick={shareDocument}
                            className="btn px-2 py-1 lg:px-4 lg:py-2 bg-gradient-to-r border-fuchsia-700 from-fuchsia-700 to-pink-200 text-white rounded-md dark:border-none"
                        >
                            {/* Share Icon */}
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 7.50003C5 8.32845 4.32843 9.00003 3.5 9.00003C2.67157 9.00003 2 8.32845 2 7.50003C2 6.6716 2.67157 6.00003 3.5 6.00003C4.32843 6.00003 5 6.6716 5 7.50003ZM5.71313 8.66388C5.29445 9.45838 4.46048 10 3.5 10C2.11929 10 1 8.88074 1 7.50003C1 6.11931 2.11929 5.00003 3.5 5.00003C4.46048 5.00003 5.29445 5.54167 5.71313 6.33616L9.10424 4.21671C9.03643 3.98968 9 3.74911 9 3.50003C9 2.11932 10.1193 1.00003 11.5 1.00003C12.8807 1.00003 14 2.11932 14 3.50003C14 4.88074 12.8807 6.00003 11.5 6.00003C10.6915 6.00003 9.97264 5.61624 9.51566 5.0209L5.9853 7.22738C5.99502 7.31692 6 7.40789 6 7.50003C6 7.59216 5.99502 7.68312 5.9853 7.77267L9.51567 9.97915C9.97265 9.38382 10.6915 9.00003 11.5 9.00003C12.8807 9.00003 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5C9 11.2509 9.03643 11.0104 9.10425 10.7833L5.71313 8.66388ZM11.5 5.00003C12.3284 5.00003 13 4.32846 13 3.50003C13 2.6716 12.3284 2.00003 11.5 2.00003C10.6716 2.00003 10 2.6716 10 3.50003C10 4.32846 10.6716 5.00003 11.5 5.00003ZM13 11.5C13 12.3285 12.3284 13 11.5 13C10.6716 13 10 12.3285 10 11.5C10 10.6716 10.6716 10 11.5 10C12.3284 10 13 10.6716 13 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
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
                        className="quill-custom ql-editor"
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
