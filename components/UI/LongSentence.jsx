import React from "react";

export default function LongSentence({ text }) {
  return <p className="break-words mb-3 text-center" style={{overflowWrap: "anywhere"}}>{text}</p>;
}
