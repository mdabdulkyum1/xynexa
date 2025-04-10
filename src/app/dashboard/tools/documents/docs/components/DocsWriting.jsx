"use client";

import React, { useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';

const DocsEditor = () => {
  const editorWrapperRef = useRef(null);
  const [title, setTitle] = useState('Untitled Document');
  const [fontColor, setFontColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffff00');
  const [fontSize, setFontSize] = useState('16px');
  const [fontFamily, setFontFamily] = useState('Sans Serif');

  const { userData } = useUserDataFromClerk();
  const docCreator_id = userData?.user?._id;
  const docCreatorEmail = userData?.user?.email;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "<p>Start writing your document...</p>",
  });

  const handleSave = async () => {
    const html = editor?.getHTML();
    const newDoc = { title, content: html, docCreator_id, docCreatorEmail };

    try {
      const response = await axios.post('http://localhost:5000/api/documents/create', newDoc);
      console.log('Document saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

 


  // const handleSavePDF = () => {
  //   if (!editor) {
  //     console.error('Editor instance not available');
  //     return;
  //   }
  
  //   console.log('Download started...');
  
  //   const editorElement = document.createElement('div');
  //   editorElement.innerHTML = editor.getHTML() || '<p>No content available</p>';
  
  //   // Apply consistent styles
  //   editorElement.style.padding = '20px';
  //   editorElement.style.fontFamily = fontFamily;
  //   editorElement.style.fontSize = fontSize;
  //   editorElement.style.color = fontColor;
  //   editorElement.style.backgroundColor = '#ffffff';
  
  //   const opt = {
  //     margin: 0.5,
  //     filename: `${title || 'Untitled'}.pdf`,
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2, useCORS: true },
  //     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  //   };
  
  //   try {
  //     html2pdf().set(opt).from(editorElement).save().then(() => {
  //       console.log('✅ PDF has been saved to your downloads folder.');
  //     });
  //   } catch (error) {
  //     console.error('❌ Error generating PDF:', error);
  //   }
  // };
  
 
  
  const handleShare = () => {
    const documentSlug = title.trim().replace(/\s+/g, '-').toLowerCase();
    const shareableLink = `${window.location.origin}/documents/${documentSlug}`;
  
    if (navigator.share) {
      navigator.share({
        title: title || 'Untitled Document',
        text: 'Check out this document!',
        url: shareableLink,
      })
      .then(() => console.log('✅ Shared successfully!'))
      .catch((err) => console.error('❌ Error sharing:', err));
    } else {
      navigator.clipboard.writeText(shareableLink)
        .then(() => {
          alert('🔗 Shareable link copied to clipboard!');
        })
        .catch((err) => {
          console.error('❌ Failed to copy link:', err);
        });
    }
  };
  


  const applyStyles = () => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .setColor(fontColor)
      .updateAttributes("textStyle", {
        fontSize,
        fontFamily,
      })
      .run();
  };

  const applyHighlight = () => {
    editor?.chain().focus().toggleHighlight({ color: bgColor }).run();
  };

  return (
    <div className="p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          className="text-xl font-semibold border px-4 py-2 rounded-md w-1/3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex gap-3">
          <button onClick={handleSave} className="bg-[#014E4E] text-white px-4 py-2 rounded-md">
            Save
          </button>
          <button  className="bg-[#014E4E] text-white px-4 py-2 rounded-md">
            Save PDF
          </button>
          <button onClick={handleShare}  className="bg-[#014E4E] text-white px-4 py-2 rounded-md">Share ➤</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border px-2 py-2 mb-4 rounded-md shadow-sm">
        <select className="px-2 py-1 border rounded-md text-sm">
          <option>Normal</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
        </select>

        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="px-2 py-1 border rounded-md text-sm"
        >
          <option>Sans Serif</option>
          <option>Arial</option>
          <option>Georgia</option>
          <option>Courier New</option>
          <option>Times New Roman</option>
        </select>

        {/* <button onClick={() => editor?.chain().focus().toggleBold().run()} className="btn font-bold">B</button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()} className="btn italic">I</button>
        <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className="btn underline">U</button> */}

        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />

        <button onClick={applyStyles} className="btn">
          Apply Style
        </button>
        <button onClick={applyHighlight} className="btn">
          Highlight
        </button>
        <button
          onClick={() => editor?.chain().focus().undo().run()}
          className="btn"
        >
          Undo
        </button>
      </div>

      {/* Editor Content */}
      <div
        ref={editorWrapperRef}
        className="min-h-[400px] p-6 bg-white border rounded-md shadow"
      >
        <EditorContent editor={editor} />
      </div>

      <style jsx>{`
        .btn {
          padding: 4px 8px;
          background: #f3f4f6;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
        }
        .btn:hover {
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default DocsEditor;
