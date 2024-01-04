import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  onValue,
  ref,
  query,
  orderByChild,
  equalTo,
  push,
  update,
} from "firebase/database";
import { db } from "@/services/firebase";

export default function InscriptionCard({ inscription }) {
  const [content, setContent] = useState("");
  const [inscriptionData, setInscriptionData] = useState();
  const [exist, setExist] = useState(false);

  const getContent = async () => {
    if (inscription.inscriptionId)
      try {
        const url =
          "https://ordinalslite.com/content/" + inscription.inscriptionId;
        const data = await fetch(url);
        const textData = await data.text();
        setContent(textData);
      } catch (error) {
        console.log("content fetch", error);
      }
  };

  useEffect(() => {
    if (content) {
      if (content.indexOf("litemap") > -1) {
        const data = {
          id: inscription.inscriptionId,
          blockNumber: Number(content.split(".")[0]),
        };
        setInscriptionData(data);
      }
    }
  }, [content]);

  useEffect(() => {
    if (inscriptionData) {
      const dbQuery = query(
        ref(db, "inscriptions"),
        orderByChild("id"),
        equalTo(inscriptionData.id)
      );

      onValue(dbQuery, async (snapshot) => {
        const exist = snapshot.val();
        if (exist) {
          setExist(true);
        }
      });
    }
  }, [inscriptionData]);

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div className="rounded-lg p-3 bg-primary/20 backdrop-blur-md shadow shadow-black hover:bg-primary/30 duration-200 w-full">
      <p
        style={{ overflowWrap: "anywhere" }}
        className="bg-primary/20  text-xl text-center  rounded-lg mb-3 flex items-center p-2 justify-center font-semibold w-full h-[180px] lg:h-[200px]"
      >
        {content}
      </p>
      <Link
        href={"/inscription/" + inscription.inscriptionId}
        className="text-sm text-center text-gray-300 flex justify-between"
      >
        <p>Seller:</p> <p>#ltc1...48c5</p>
      </Link>
      <hr />
      <p className="text-center text-gray-300 mb-3 mt-1 text-sm">
        0.020 LTC ($ 1.5)
      </p>
      <div className="grid grid-cols-1 sm:gird-cols-2 gap-2">
        <button
          disabled={!exist}
          className={`py-1 rounded-md disabled:bg-primary/10  ${
            exist ? "main_btn text-white" : "text-gray-400/80"
          }`}
        >
          List
        </button>
      </div>
    </div>
  );
}
