"use client";

import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function EditorPage() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const filePickerCallback = (callback, value, meta) => {
    if (meta.filetype === "image") {
      const fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      fileInput.setAttribute("accept", "image/*");
      fileInput.onchange = () => {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          callback(reader.result, { text: file.name });
          console.log(reader.result);
        };

        reader.readAsDataURL(file);
      };
      fileInput.click();
    }
  };

  return (
    <>
      <Editor
        apiKey="648x67vxw9cwm2pctnh96gvv7s22ln1vbzoxuba686flsmvh"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | image | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          file_picker_callback: filePickerCallback,
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
