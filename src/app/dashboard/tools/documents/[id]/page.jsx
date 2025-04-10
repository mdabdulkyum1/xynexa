"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/components/loading/Loading";

const EditPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  // Fetch the single document by ID
  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/documents/${id}`);
        setDoc(res.data);
        setUpdatedTitle(res.data.title);
        setUpdatedContent(res.data.content);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch document", err);
      }
    };
    if (id) fetchDoc();
  }, [id]);

  // Update handler
  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/documents/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      });
      alert("✅ Document updated successfully!");
      router.push("/documents"); // or wherever you want to redirect
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) return <div><Loading></Loading></div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Document</h1>
      <input
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <textarea
        value={updatedContent}
        onChange={(e) => setUpdatedContent(e.target.value)}
        className="w-full p-2 border rounded h-40"
      />
      <button
        onClick={handleUpdate}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
};

export default EditPage;
