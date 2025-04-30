"use client";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import('./components/TextEditor'), { ssr: false });

const Page = () => {
  return (
    <div>
      <TextEditor />
    </div>
  );
};

export default Page;
