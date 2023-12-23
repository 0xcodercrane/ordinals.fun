import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function InscriptionPreview({ id }) {
  const [content, setContent] = useState("");

  const getContent = async () => {
    try {
      const url = "/ordinalslite/content/" + id;
      const data = await fetch(url);
      const textData = await data.text();
      setContent(textData);
    } catch (error) {
      console.log("content fetch", error);
    }
  };

  useEffect(() => {
    if (id) getContent();
  }, [id]);

  return (
    <div className="w-full h-full text-4xl bg-primary/10 rounded-lg p-3 flex justify-center items-center font-bold min-h-[400px]">
      {content}
    </div>
  );
}
