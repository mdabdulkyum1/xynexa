'use client';

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';

const DocsEditor = () => {
  const [title, setTitle] = useState('Untitled Document');
  const [fontColor, setFontColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffff00');
  const [fontSize, setFontSize] = useState('16px');
  const [fontFamily, setFontFamily] = useState('Sans Serif');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '<p>Start writing your document...</p>',
  });

  const handleSave = () => {
    const html = editor?.getHTML();
    console.log('Saved Content:', html);
  };

  const applyStyles = () => {
    if (!editor) return;
    editor.chain().focus()
      .setColor(fontColor)
      .updateAttributes('textStyle', {
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
          <button
            className="bg-[#014E4E] text-white dark:text-[#014E4E] dark:bg-white px-1 py-1 lg:px-4 lg:py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
          <button className="bg-[#014E4E] text-white dark:text-[#014E4E] dark:bg-white px-1 py-1 lg:px-4 lg:py-2 rounded-md">
            Save PDF
          </button>
          <button className=" bg-[#014E4E] px-1 py-1 lg:px-4 lg:py-2 rounded-md text-white dark:text-[#014E4E] dark:bg-white">
            Share ➤
          </button>
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

        {/* <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className="btn">•</button> */}
        {/* <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className="btn">1.</button> */}
        <button onClick={() => editor?.chain().focus().toggleBold().run()} className="btn font-bold bg-white text-black dark:text-white dark:bg-black">B</button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()} className="btn italic bg-white text-black dark:text-white dark:bg-black">I</button>
        <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className="btn underline bg-white text-black dark:text-white dark:bg-black">U</button>

        <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />

        <button onClick={applyStyles} className="btn bg-white text-black dark:text-white dark:bg-black">Apply Style</button>
        <button onClick={applyHighlight} className="btn bg-white text-black dark:text-white dark:bg-black">Highlight</button>
        <button onClick={() => editor?.chain().focus().undo().run()} className="btn bg-white text-black dark:text-white dark:bg-black">Undo</button>
      </div>

      {/* Editor Content */}
      <div className="min-h-[400px] p-6 bg-white border rounded-md shadow">
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
