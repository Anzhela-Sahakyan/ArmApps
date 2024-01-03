"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3003");

export default function EditedTextPage() {
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3002/text").then((response) => {
      setEditedContent(response.data.content);
    });
    socket.on("updateContent", (content) => {
      setEditedContent(content);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>{editedContent}</div>;
}
