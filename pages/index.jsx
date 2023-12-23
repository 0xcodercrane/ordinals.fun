import React from "react";
import Layout from "@/components/sections/Layout";
import InscriptionCard from "../components/UI/InscriptionCard";
import { FaFilter } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaBroom } from "react-icons/fa";
import { useState } from "react";

export default function Home() {
  const [buyTip, setBuyTip] = useState(false);

  return (
    <Layout>
      <div className="text-4xl font-bold my-16 text-center sm:text-left">
        Litemaps
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        <div>
          <p> 34 LTC</p> <p className="text-sm text-gray-300">Floor price</p>
        </div>
        <div>
          <p> 6,763,242 LTC</p>{" "}
          <p className="text-sm text-gray-300">Total volume</p>
        </div>
        <div>
          <p> 924,901 LTC</p>{" "}
          <p className="text-sm text-gray-300">Volume (24h)</p>
        </div>
        <div>
          <p> 41,930</p> <p className="text-sm text-gray-300">Trades (24h)</p>
        </div>
        <div>
          <p> 20,274</p> <p className="text-sm text-gray-300">Owners</p>
        </div>
        <div>
          <p> 5,014,267</p> <p className="text-sm text-gray-300">Suppl</p>
        </div>
        <div>
          <p> 102,200</p> <p className="text-sm text-gray-300">Listed</p>
        </div>
      </div>

      <div className="w-full my-8">
        <div className="main_btn px-3 py-2 rounded-md w-fit">
          🔥 3737 buys in last hour
        </div>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-2 gap-3 justify-between mb-6">
        <div className="flex gap-2">
          <button className="main_btn rounded-lg px-4 py-2 bg-primary">
            Listings
          </button>
          <button className="main_btn rounded-lg px-4 py-2">Activity</button>
        </div>

        <div className="flex gap-2 justify-end">
          <button className=" focus:outline-none">
            <FaBroom
              onClick={() => setBuyTip(true)}
              className="sm:text-2xl text-xl cursor-pointer"
            />
          </button>
          <button className=" focus:outline-none">
            <FaShoppingCart
              onClick={() => setBuyTip(true)}
              className="sm:text-2xl text-xl cursor-pointer"
            />
          </button>
          <button className=" focus:outline-none">
            <FaFilter className="sm:text-2xl text-xl cursor-pointer" />
          </button>
          <button className=" focus:outline-none">
            <BsThreeDotsVertical className="sm:text-2xl text-xl cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4 w-full">
        {Array.from({ length: 18 }, (_, index) => {
          return (
            <InscriptionCard
              inscription={{
                inscriptionID:
                  "062f32e21aa04246b8873b5d9a929576addd0339881e1ea478b406795d6b6c47i0",
              }}
              key={index}
              index={index}
            />
          );
        })}
      </div>
      {/* <div className="my-auto flex flex-col justify-center items-center">
        <h1 className="text-5xl text-white font-bold mb-8 animate-pulse">
          Coming Soon
        </h1>
        <p className="text-white text-lg mb-8 text-center">
          We are working hard to give you something cool. <br /> Please wait a
          little bit.
        </p>
      </div> */}

      {buyTip && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 p-3 px-6 rounded-lg bg-white/10 backdrop-blur-3xl items-center  gap-2 grid sm:grid-cols-2 grid-cols-1">
          <p>2 litemap selected. 1864786 LTC</p>
          <div className="flex gap-3 sm:justify-end justify-center">
            <button className="main_btn py-2 px-3 rounded-lg flex items-center gap-2">
              <FaShoppingCart /> Buy
            </button>
            <button
              className="main_btn py-2 px-3 rounded-lg flex items-center gap-2"
              onClick={() => setBuyTip(false)}
            >
              <MdCancel /> Cancel
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
