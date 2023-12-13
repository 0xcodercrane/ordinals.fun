import { Fragment, useContext } from "react";
import { addressFormat } from "@/utils";
import Image from "next/image";
import React from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { BsArrowLeft, BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowRight, FaCopy } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { WalletContext } from "../../context/wallet";
import { useState } from "react";
import { useSelector } from "react-redux";
import { copyToClipboard } from "@/utils";
import { toast } from "react-hot-toast";

export default function WalletOpend() {
  const account = useSelector(
    (state) => state?.persistedReducer?.walletReducer?.value
  );
  const wallet = useContext(WalletContext);
  const [listType, setListType] = useState(true);
  const [pending, setPending] = useState(false);
  const [contentType, setContentType] = useState("main");

  const copied = () => {
    toast.success("copied!");
  };

  const fetchData = () => {
    setPending(true);
    wallet.fetchbalance();
    setTimeout(() => {
      setPending(false);
    }, [1000]);
  };


  if (contentType === "main") {
    return (
      <div className="p-4 rounded-lg bg-white/5 text-white backdrop-blur-xl">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer rounded-lg"
            onClick={() => {
              copyToClipboard(account?.account?.accounts[0]?.address);
              copied();
            }}
          >
            {addressFormat(account?.account?.accounts[0]?.address, 5)}
            <FaCopy />
          </div>
          <div className="flex gap-3">
            {!pending ? (
              <FaArrowsRotate
                className="text-3xl cursor-pointer p-1.5"
                onClick={() => fetchData()}
              />
            ) : (
              <FaArrowsRotate className="text-3xl cursor-pointer p-1.5 animate-spin" />
            )}

            <Menu as="div" className="relative inline-block text-left">
              <div className="flex justify-center items-center">
                <Menu.Button className="text-lg  my-auto text-white cursor-pointer focus:outline-none hover:text-white/90 hover:bg-primary/50 rounded-lg p-1 transition ease-in-out">
                  <BsThreeDotsVertical className="text-xl cursor-pointer" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-20 mt-2 w-[200px!important] p-3 bg-[#102c43] shadow shadow-black  origin-top-right rounded-md focus:outline-none">
                  <button
                    onClick={() => wallet.unlockWallet()}
                    className="hover:bg-primary/30 transition ease-in-out rounded-md focus:outline-none text-left w-full p-1"
                  >
                    Unlock wallet
                  </button>
                  <button
                    onClick={() => setContentType("send")}
                    className="hover:bg-primary/30 transition ease-in-out rounded-md focus:outline-none text-left w-full p-1"
                  >
                    Send LTC
                  </button>
                  <button
                    onClick={() => setContentType("secrets")}
                    className="hover:bg-primary/30 transition ease-in-out rounded-md focus:outline-none text-left w-full p-1"
                  >
                    Show secrets
                  </button>
                  <button
                    onClick={() => wallet.removeWallet()}
                    className="hover:bg-primary/30 transition ease-in-out rounded-md focus:outline-none text-left w-full text-red-600 p-1"
                  >
                    Remove wallet
                  </button>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="mt-3">
          {account?.balance?.amount} ( ${account?.balance?.usd_value} )
        </div>

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
            {account?.balance?.confirm_inscription_amount > 0 ? (
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
                    <p>{account?.balance?.confirm_inscription_amount}</p>
                    <FaArrowRight className="text-xl" />
                  </div>
                </div>
              </>
            ) : (
              <div className="py-8 w-full flex justify-center">
                No inscription.
              </div>
            )}
          </>
        ) : (
          <>
            {account?.balance?.confirm_inscription_amount > 0 ? (
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
            ) : (
              <div className="py-8 w-full flex justify-center">No Lists.</div>
            )}
          </>
        )}
      </div>
    );
  } else if (contentType === "send") {
    return (
      <div className="p-4 rounded-lg bg-white/5 text-white backdrop-blur-xl ">
        <button
          className=" focus:outline-none"
          onClick={() => setContentType("main")}
        >
          <BsArrowLeft className="text-xl" />
        </button>
        <label htmlFor="" className="w-full mt-2">
          Address:
        </label>
        <input
          className="w-full mt-1 rounded-lg py-2 px-2 bg-transparent border border-white/30"
          type="text"
          placeholder="ltc1qdmy...0pqe5mzn"
        />
        <label htmlFor="" className="w-full mt-3 ">
          LTC Amount:
        </label>
        <input
          className="w-full mt-1 rounded-lg py-2 px-2 bg-transparent border border-white/30"
          type="number"
          placeholder="0.00 (LTC)"
        />
        <button className="mt-3 w-full main_btn py-2.5 rounded-lg">Send</button>
      </div>
    );
  } else {
    return (
      <div className="p-4 rounded-lg bg-white/5 text-white backdrop-blur-xl">
        <button
          className=" focus:outline-none"
          onClick={() => setContentType("main")}
        >
          <BsArrowLeft className="text-xl" />
        </button>
        <label htmlFor="" className="w-full mt-2">
          Your secret phrase:
        </label>
        <div className="p-2 rounded-lg bg-primary/20 mt-1">
          QUXQAVmpjpqwZzFpzoYJut5o6 HogqB6y7AW6pHS461nHjAzPqTVJ
        </div>
        <div className="p-2 rounded-lg bg-red-500/20 mt-3">
          Anyone who knows these words can access your funds. Before importing
          to other wallet make sure it supports doginals protocol
        </div>
        <button
          className="main_btn rounded-lg py-2.5 w-full mt-3"
          onClick={() => setContentType("main")}
        >
          Go back
        </button>
      </div>
    );
  }
}
