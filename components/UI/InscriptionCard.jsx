import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function InscriptionCard({ inscription, index }) {
  const [content, setContent] = useState("");

  const getContent = async () => {
    if (inscription.inscriptionId)
      try {
        const url = "/ordinalslite/content/" + inscription.inscriptionId;
        const data = await fetch(url);
        const textData = await data.text();
        setContent(textData);
      } catch (error) {
        console.log("content fetch", error);
      }
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div className="rounded-lg p-3 bg-primary/20 backdrop-blur-md shadow shadow-black hover:bg-primary/30 duration-200 w-full">
      <div className="bg-primary/20  text-xl text-center rounded-lg mb-3 flex items-center p-2 justify-center font-semibold w-full h-[180px]">
        {index}.litemap
      </div>
      <Link
        href={"/inscription/" + inscription.inscriptionId}
        className="text-sm text-center text-gray-300 flex justify-between"
      >
        <p>Seller:</p> <p>#ltc1...48c5</p>
      </Link>
      <hr />
      <p className="text-center text-gray-300 mb-3 mt-1 text-sm">
        0.00269 LTC ($ 0.19)
      </p>
      <div className="grid grid-cols-1 sm:gird-cols-2 gap-2">
        <button className="main_btn py-1">Buy</button>
      </div>
    </div>
  );
}
