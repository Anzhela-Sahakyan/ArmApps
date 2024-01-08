"use client";

import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3003");

export default function EditorPage() {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    socket.on("updateContent", (content) => {
      if (editorRef.current) {
        editorRef.current.setContent(content);
      }
    });
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const onSave = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log(content);

      socket.emit("updateContent", content);
      try {
        await axios.patch("http://localhost:3002/text", { content });
        console.log("text saved");
      } catch (error) {
        console.log("Text WASN'T saved");
      }
    }
  };

  const filePickerCallback = (callback: any, value: any, meta: any) => {
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
  const handleChange = (content: any) => {
    socket.emit("updateContent", content);

    axios.patch("http://localhost:3003/text", { content });
  };
  return (
    <>
      <Editor
        apiKey="648x67vxw9cwm2pctnh96gvv7s22ln1vbzoxuba686flsmvh"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="This is the initial content of the editor."
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
        onEditorChange={(content, editor) => handleChange(content)}
      />
      <button onClick={onSave}>Save</button>
    </>
  );
}
