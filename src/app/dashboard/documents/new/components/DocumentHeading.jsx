"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

const DocumentHeading = ({title, setTitle}) => {

// const [boardName, setBoardName] = useState("Untitle Document");
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };


    return (
        <>
           <div className="flex items-center gap-4">
                {isEditing ? (
                    <input
                        type="text"
                        value={title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                        className="text-xl md:text-2xl lg:text-3xl font-bold rounded-full px-4 py-1 outline-none dark:bg-black bg-gray-50 dark:text-white"
                    />
                ) : (
                    <h3 className="md:text-3xl text-xl font-bold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                )}

                {/* Pencil Icon for Editing */}
                <Pencil
                    className="text-gray-500 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white"
                    onClick={() => setIsEditing(true)}
                />
            </div> 
        </>
    );
};

export default DocumentHeading;