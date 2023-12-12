/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState } from "react";
import React, { useContext } from "react";
import { addressFormat } from "@/utils";
import { WalletContext } from "@/context/wallet";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  FaArrowRight,
  FaCommentDots,
  FaCopy,
  FaTruckLoading,
  FaWallet,
} from "react-icons/fa";
import { SiFarfetch } from "react-icons/si";
import { FaArrowsRotate } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import WalletWelcome from "./WalletWelcome";
import WalletCreate from "./WalletCreate";
import WalletOpend from "./WalletOpend";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WalletConnect() {
  const walletcontext = useContext(WalletContext);
  const [type, setType] = useState(0);

  function walletState(type) {
    if (type === 0) {
      return <WalletWelcome setType={setType} />;
    }

    if (type === 1) {
      return <WalletCreate setType={setType} />;
    }

    if (type === 2) {
      return <WalletImport setType={setType} />;
    }

    if (type === 3) {
      return <WalletUnlock setType={setType} />;
    }

    if (type === 4) {
      return <WalletOpend setType={setType} />;
    }
  }
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex justify-center items-center">
          <Menu.Button className="lg:px-8 px-4 text-sm lg:text-lg py-2 border border-yellow-700/30 rounded-full text-white my-auto flex mt-2 items-center gap-3">
            <FaWallet
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Connect Wallet
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
          <Menu.Items className="absolute right-0 z-20 mt-2 lg:w-[400px] w-[300px]  origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {walletState(type)}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
