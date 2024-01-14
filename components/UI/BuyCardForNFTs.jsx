import React from "react";
import { useState, useEffect } from "react";
import { addressFormat } from "@/utils";
import BuyModal from "../trade/BuyModal";
import { useContext } from "react";
import { WalletContext } from "../../context/wallet";
import { TbArticleOff } from "react-icons/tb";
import openAPI from "@/services/openAPI";

export default function BuyCardForNFTs({
  inscription,
  price,
  utxos,
  sortedUtxos,
  dummyUTXOs,
  refreshUTXOs,
  selectUtxos,
  slug,
}) {
  const wallet = useContext(WalletContext);
  const address = wallet.getAddress();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [listed, setListed] = useState(false);
  const [list, setList] = useState();
  const [data, setData] = useState();
  const [fetching, setFetching] = useState(true);

  const getData = async (id) => {
    try {
      const data = await openAPI.getInscriptionUtxoDetail(id);
      setData(data?.inscriptions[0]);
    } catch (error) {}
    setFetching(false);
  };

  useEffect(() => {
    if (inscription?.id) {
      getData(inscription?.id);
    }
  }, [inscription]);

  return (
    <>
      <div className="in-card">
        <div className="in-content p-0">
          <img
            src={`https://ordinalslite.com/content/${inscription.id}`}
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="in-transfer">#{data?.inscriptionNumber}</div>
        </div>

        <hr className="mb-2" />

        <div className="flex justify-between gap-1 text-sm">
          <p>Owner:</p>
          <p>{!fetching && addressFormat(data?.address, 4)}</p>
        </div>
        <div className="flex justify-between gap-1 text-sm">
          <p>name:</p>
          <p>{inscription.meta.name}</p>
        </div>
        {listed && (
          <div className="flex justify-between gap-1 mb-2 text-sm">
            <p>Price:</p>
            <p>
              {list?.price}{" "}
              <span className="text-[11px] text-gray-300">
                ~$ {(list?.price * price).toFixed(3)}
              </span>
            </p>
          </div>
        )}

        {!fetching && data?.address === address && !listed ? (
          <a
            href="/wallet"
            className="main_btn py-1 mt-1 rounded-md bg-transparent disabled:bg-primary-light/10 w-full flex gap-1 justify-center items-center"
          >
            <TbArticleOff /> Listed By You
          </a>
        ) : (
          <button
            disabled={!listed}
            className="main_btn py-1 mt-1 rounded-md dark:disabled:bg-primary-dark/10 disabled:bg-primary-light/10 w-full"
            onClick={() => setIsOpen(true)}
          >
            {!listed ? "Not Listed" : "Buy"}
          </button>
        )}
      </div>
      <BuyModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        list={inscription}
        utxos={utxos}
        sortedUtxos={sortedUtxos}
        dummyUTXOs={dummyUTXOs}
        refreshUTXOs={refreshUTXOs}
        selectUtxos={selectUtxos}
        tag={slug}
      />
    </>
  );
}
