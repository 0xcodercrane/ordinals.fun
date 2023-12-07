/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import styles from "@/styles/inscribe.module.css";
import { addressFormat } from "@/utils";
import { WalletContext } from "@/context/wallet";
import okx from "@/assets/okx.jpg";
import unisat from "@/assets/unisat.jpg";
import xverse from "@/assets/xverse.jpg";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";

export default function WalletConnect() {
  const walletcontext = useContext(WalletContext);

  return (
    <>
      <div className="cs-dropdown relative flex items-center">
        {walletcontext.state.isConnected && walletcontext.account ? (
          <a
            href="#"
            className="lg:px-8 px-4 text-sm lg:text-lg py-2 border border-yellow-700/30 rounded-full text-white my-auto"
            onClick={(e) => walletcontext.copyAddress(e)}
          >
            {addressFormat(walletcontext.account, 5)}
            <span
              className={styles.copiedWallet}
              style={{ opacity: walletcontext.copied }}
            >
              Copied
            </span>
          </a>
        ) : (
          <a
            href="#"
            className="lg:px-8 px-4 text-sm lg:text-lg py-2 border border-yellow-700/30 rounded-full text-white my-auto"
            onClick={() => walletcontext.setModal(true)}
          >
            Connect Wallet
          </a>
        )}

        {walletcontext.state.isConnected && walletcontext.account && (
          <div className="pt-2 group-hover:block hidden transition ease-in-out absolute top-[50px] right-0 w-[190px]">
            <ul className="bg-white border border-gray-500 rounded py-1">
              <>
                <li
                  className="py-2 px-3 flex hover:bg-gray-400 transition ease-out cursor-pointer"
                  onClick={(e) => walletcontext.disconnect(e)}
                >
                  Disconnect
                </li>
              </>
            </ul>
          </div>
        )}
      </div>

      {walletcontext.modal && (
      <div className="fixed h-full w-full bg-black/70 top-0 left-0 bg-opacity-40 flex justify-center items-center z-[1000]">
        <div className="px-3">
          <div className="bg-white p-8 rounded-lg relative">
            <div
              onClick={(e) => walletcontext.connectwallet("Unisat")}
              className="flex items-center cursor-pointer gap-4 my-2 border border-gray-300 hover:border-[#FB923Cimportant] transition ease-out p-3 rounded hover:bg-slate-100"
            >
              <Image
                className="rounded-lg"
                src={unisat}
                alt="unisat"
                width={40}
                height={40}
              />
              <span className="text-black">Connect Unisat Wallet</span>
            </div>

            <div
              onClick={(e) => walletcontext.connectwallet("Okx")}
              className="flex items-center cursor-pointer gap-4 my-2 border border-gray-300 hover:border-[#FB923Cimportant] transition ease-out p-3 rounded hover:bg-slate-100"
            >
              <Image
                className="rounded-lg"
                src={okx}
                alt="unisat"
                width={40}
                height={40}
              />
              <span className="text-black">Connect Okx Wallet</span>
            </div>

            <div
              onClick={(e) => walletcontext.connectwallet("Xverse")}
              className="flex items-center cursor-pointer gap-4 my-2 border border-gray-300 hover:border-[#FB923Cimportant] transition ease-out p-3 rounded hover:bg-slate-100"
            >
              <Image
                className="rounded-lg"
                src={xverse}
                alt="unisat"
                width={40}
                height={40}
              />
              <span className="text-black">Connect Xverse Wallet</span>
            </div>
            <span
              className="absolute -top-[30px] -right-[30px] p-2.5 rounded-full bg-white cursor-pointer"
              onClick={() => walletcontext.setModal(false)}
            >
              <FaTimes className="hover:rotate-180 transition ease-in text-black" />
            </span>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
