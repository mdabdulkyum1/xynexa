"use client";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import('./components/TextEditor'), { ssr: false });


const page = () => {
    return (
        <div>
        
        <TextEditor></TextEditor>
        </div>
    );
};

export default page;