"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3003", { autoConnect: true });

export default function EditedTextPage() {
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3002/text").then((response) => {
      setEditedContent(response.data.content);
    });
    socket.on("updateClientContent", (content) => {
      setEditedContent(content);
      console.log("content::::", content);
    });
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  const renderContent = () => {
    return { __html: editedContent };
  };

  return <div dangerouslySetInnerHTML={renderContent()} />;
}
