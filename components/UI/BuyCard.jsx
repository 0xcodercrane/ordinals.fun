import React from "react";
import { useState } from "react";
import { addressFormat } from "@/utils";
import BuyModal from "../trade/BuyModal";
import { useContext } from "react";
import { WalletContext } from "../../context/wallet";
import { TbArticleOff } from "react-icons/tb";
import Link from "next/link";

export default function BuyCard({
  list,
  price,
  utxos,
  sortedUtxos,
  dummyUTXOs,
  refreshUTXOs,
  selectUtxos,
}) {
  const wallet = useContext(WalletContext);
  const address = wallet.getAddress();
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="in-card">
        <div className="in-content">
          {list?.content}
          <div className="in-transfer">#{list?.data?.inscriptionNumber}</div>
        </div>

        <hr className="mb-2" />

        <div className="flex justify-between gap-1 text-sm">
          <p>Seller:</p>
          <p>{addressFormat(list?.seller, 4)}</p>
        </div>
        <div className="flex justify-between gap-1 mb-2 text-sm">
          <p>Price:</p>
          <p>
            {list?.price}{" "}
            <span className="text-[11px] text-gray-300">
              ~$ {(list?.price * price).toFixed(3)}
            </span>
          </p>
        </div>
        {list.seller === address ? (
          <Link
            href="/wallet"
            className="main_btn py-1 rounded-md bg-transparent disabled:bg-primary-light/10 w-full flex gap-1 justify-center items-center"
          >
            <TbArticleOff /> Listed By You
          </Link>
        ) : (
          <button
            className="main_btn py-1 rounded-md dark:disabled:bg-primary-dark/10 disabled:bg-primary-light/10 w-full"
            onClick={() => setIsOpen(true)}
          >
            Buy
          </button>
        )}
      </div>

      <BuyModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        list={list}
        utxos={utxos}
        sortedUtxos={sortedUtxos}
        dummyUTXOs={dummyUTXOs}
        refreshUTXOs={refreshUTXOs}
        selectUtxos={selectUtxos}
        tag={list?.tag}
      />
    </>
  );
}
