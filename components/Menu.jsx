/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Link from "next/link";
import Navigation from "./Navigation";
import WalletConnect from "./WalletConnect";

export default function MenuBar() {
  return (
    <div className="flex justify-between absolute top-1 left-0 w-full px-2">
      <Link href="/" className="hidden sm:inline-block">
        <div className="main-logo text-3xl font-extrabold p-3 hover:text-[#FB923C]">
          BitMap
        </div>
      </Link>
      <Navigation />
      <WalletConnect />
    </div>
  );
}
