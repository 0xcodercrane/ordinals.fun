import { addressFormat } from "@/utils";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowRight, FaCopy } from "react-icons/fa";

export default function WalletOpend({ setType }) {

  const [listType, setListType] = useState(false);

  return (
    <div className="p-4 rounded-lg bg-white/5 text-white backdrop-blur-xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer rounded-lg">
          {addressFormat("ltc1qyplhmvp6znvzgs8pxp5u9mgwjev7c8tfadus6p", 5)}
          <FaCopy />
        </div>
        <div className="flex gap-3">
          {/* <FaArrowsRotate className="text-xl cursor-pointer" /> */}
          <AiOutlineLoading3Quarters className="text-xl cursor-pointer animate-spin" />
          <BsThreeDotsVertical className="text-xl cursor-pointer" />
        </div>
      </div>
      <div className="mt-3">0.05 ( $3.65 )</div>

      <div className="flex gap-3 mt-3">
        <button
          className="py-1 rounded-lg cursoer-pointer focus:outline-none"
          onClick={() => setListType(false)}
        >
          Assets
        </button>
        <button
          className="py-1 rounded-lg cursoer-pointer focus:outline-none"
          onClick={() => setListType(true)}
        >
          Lists
        </button>
      </div>
      {!listType ? (
        <>
          <div className="mt-3">LiteMaps</div>

          <div className="rounded-lg bg-primary/20 py-2 px-3 flex justify-between items-center hover:bg-primary/30 transition ease-in-out cursor-pointer mt-2 mb-3">
            <div className="flex gap-2 items-center">
              <Image
                src="/loading.png"
                width={40}
                height={60}
                className="rounded-md"
                alt=""
              />
              <p>LiteMaps</p>
            </div>
            <div className="flex gap-3">
              <p>2</p>
              <FaArrowRight className="text-xl" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-lg bg-primary/20 py-2 px-3 flex justify-between items-center hover:bg-primary/30 transition ease-in-out cursor-pointer mt-2 mb-3">
            <div className="flex gap-2 items-center">
              <Image
                src="/loading.png"
                width={40}
                height={60}
                className="rounded-md"
              />
              <p>LiteMaps</p>
            </div>
            <div className="flex gap-3">
              <p>2</p>
              <FaArrowRight className="text-xl" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
