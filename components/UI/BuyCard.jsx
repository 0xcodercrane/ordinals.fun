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
import ListModal from "../trade/ListModal";
import TransferModal from "../trade/TransferModal";
import { addressFormat } from "@/utils";
import BuyModal from "../trade/BuyModal";

export default function BuyCard({
  list,
  price,
  utxos,
  sortedUtxos,
  dummyUTXOs,
  refreshUTXOs,
}) {
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
        <button
          className="main_btn py-1 rounded-md dark:disabled:bg-primary-dark/10 disabled:bg-primary-light/10 w-full"
          onClick={() => setIsOpen(true)}
        >
          Buy
        </button>
      </div>

      <BuyModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        list={list}
        utxos={utxos}
        sortedUtxos={sortedUtxos}
        dummyUTXOs={dummyUTXOs}
        refreshUTXOs={refreshUTXOs}
      />
    </>
  );
}
