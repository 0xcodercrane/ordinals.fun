/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { WalletContext } from "@/context/wallet";

export default function Navigation() {
  return (
    <Nav className="links-block">
      <div className="lg:flex lg:justify-center lg:items-center hidden">
        <Link className="font-semibold text-white" href="/">
          Bitmap
        </Link>
      </div>
      <div className="lg:flex lg:justify-center lg:items-center hidden">
        <Link className="font-semibold text-white" href="/market">
          Market
        </Link>
      </div>
      <div className="lg:flex lg:justify-center lg:items-center hidden">
        <Link className="font-semibold text-white" href="/inscribe">
          Inscribe
        </Link>
      </div>
      <div className="lg:flex lg:justify-center lg:items-center hidden">
        <Link className="font-semibold text-white" href="/wallet">
          Wallet
        </Link>
      </div>

      <div className="cs-dropdown group relative inline-block lg:hidden">
        <a
          href="#"
          className="bg-transparent rounded text-white shadow-sm  flex justify-center items-center hover:bg-[#b1630a] cursor-pointer transition ease-out h-full p-0"
        >
          <GiHamburgerMenu className="text-3xl p-0 m-0" />
        </a>
        <div className="pt-2 group-hover:block hidden transition ease-in-out absolute top-[50px] right-[-90px] sm:right-0 w-[180px] z-[1000!important]">
          <ul className="bg-white border border-gray-500 rounded drop-shadow-md shadow-black py-1">
            <li className="py-2 px-3 flex hover:bg-gray-400  hover:text-white transition ease-out cursor-pointer">
              <Link
                className="font-semibold text-white hover:text-white "
                href="/"
              >
                Bitmap
              </Link>
            </li>
            <li className="py-2 px-3 flex hover:bg-gray-400  hover:text-white transition ease-out cursor-pointer">
              <Link
                className="font-semibold text-white hover:text-white "
                href="/market"
              >
                Market
              </Link>
            </li>
            <li className="py-2 px-3 flex hover:bg-gray-400  hover:text-white transition ease-out cursor-pointer">
              <Link
                className="font-semibold text-white hover:text-white "
                href="/inscribe"
              >
                Inscribe
              </Link>
            </li>
            <li className="py-2 px-3 flex hover:bg-gray-400  hover:text-white transition ease-out cursor-pointer">
              <Link
                className="font-semibold text-white hover:text-white "
                href="/wallet"
              >
                Wallet
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Nav>
  );
}
