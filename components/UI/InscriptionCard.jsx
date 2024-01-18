import Link from "next/link";
import React, { useContext } from "react";
import openApi from "@/services/openAPI";
import { useState } from "react";
import { useEffect } from "react";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  update,
  remove,
  get,
} from "firebase/database";
import { db } from "@/services/firebase";
import ListModal from "../trade/ListModal";
import TransferModal from "../trade/TransferModal";
import { addressFormat, validateInscription } from "@/utils";
import { toast } from "react-hot-toast";
import { WalletContext } from "../../context/wallet";
import { AiOutlineLoading } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { TbArticleOff } from "react-icons/tb";
import { TbGiftOff } from "react-icons/tb";
import useActivities from "../../hooks/useActivities";
import SpliteModal from "../trade/SpliteModal";

export default function InscriptionCard({
  inscription,
  inscriptionIndex,
  bulkSelect,
  tag,
  setSelectedBlocks,
  selectedBlocks,
}) {
  const wallet = useContext(WalletContext);
  const address = wallet.getAddress();
  const { removeListFromMarket } = useActivities();
  const [content, setContent] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isOpenTransfer, setIsOpenTransfer] = useState(false);
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);

  const [isOpenSplit, setIsOpenSplit] = useState(false);
  const [inscriptionDetails, setInscriptionDetails] = useState();
  const [isNeedToSplit, setIsNeedToSplit] = useState(false);
  const [isMultiStuck, setIsMultiStuck] = useState(false);
  const HIGH_BALANCE = 10000;

  const openListModal = () => {
    if (isNeedToSplit || isMultiStuck) {
      setIsOpenSplit(true);
      return;
    }

    setIsOpen(true);
  };

  const openTransferModal = () => {
    if (isNeedToSplit || isMultiStuck) {
      setIsOpenSplit(true);
      return;
    }

    if (inscription?.listed) {
      toast.error("Please cancel list before transfer");
      return;
    }
    setIsOpenTransfer(true);
  };

  const getContent = async () => {
    if (inscription.inscriptionId)
      try {
        if (inscription?.contentType.indexOf("text") > -1) {
          const url =
            "https://ordinalslite.com/content/" + inscription.inscriptionId;
          const data = await fetch(url);
          const textData = await data.text();
          setContent(textData);
        }

        // const utxo = await openApi.getInscriptionUtxoDetail(inscription.inscriptionId);
        // console.log('Bitcoin project: ', utxo )
        // if (utxo) {
        //   setInscriptionDetails(inscriptionData);
        //   if (utxo.inscriptions.length > 1) {
        //     setInscriptions(utxo.inscriptions);
        //     setIsNeedToSplit(true);
        //     setIsMultiStuck(true);
        //   }
        // }

        // if (inscription.outputValue > HIGH_BALANCE) {
        //   setIsNeedToSplit(true);
        // }
      } catch (error) {
        //  console.log("content fetch", error);
      }
  };

  const handleCancelList = async (tag, inscriptionIndex) => {
    if (!address) {
      toast.error("Please connect your wallet.");
      return;
    }

    let listedInscriptionData;
    const dbRef = ref(db, "market/" + tag);
    const dbQuery = query(
      dbRef,
      orderByChild("data/inscriptionId"),
      equalTo(inscription.inscriptionId)
    );

    const snapshot = await get(dbQuery);
    const exist = snapshot.val();

    if (exist) {
      const key = Object.keys(exist)[0];
      listedInscriptionData = exist[key];

      await remove(ref(db, `market/${tag}/${key}`));
    }

    const dbRefWallet = ref(db, "wallet/" + address);
    const dbQueryForWallet = query(dbRefWallet);

    const walletSnapshot = await get(dbQueryForWallet);
    const walletData = walletSnapshot.val();

    const key = Object.keys(walletData)[0];
    const dbRefUpdate = ref(
      db,
      `wallet/${address}/${key}/inscriptions/${inscriptionIndex}`
    );

    await update(dbRefUpdate, { listed: false, tag: "" });

    const dbRefStatus = ref(db, "status/" + tag);
    const dbQueryForStatus = query(dbRefStatus);

    const statusSnapshot = await get(dbQueryForStatus);
    const statusData = statusSnapshot.val();

    if (statusData) {
      const key = Object.keys(statusData)[0];
      const dbRefUpdate = ref(db, `status/${tag}/${key}`);

      const updates = {};

      updates[`TVL`] =
        Number(statusData[key]?.TVL) - Number(listedInscriptionData?.price) ||
        0;
      updates[`floor`] =
        Number(statusData[key]?.listed) - 1 == 0
          ? 0
          : (Number(statusData[key]?.TVL) -
              Number(listedInscriptionData?.price)) /
              (Number(statusData[key]?.listed) - 1) || 0;
      updates[`listed`] = Number(statusData[key]?.listed) - 1 || 0;

      await update(dbRefUpdate, updates);
    }

    await removeListFromMarket(inscription.inscriptionId);
  };

  const AddList = async () => {
    if (isNeedToSplit || isMultiStuck) {
      toast.error(
        "This inscription is mixed together. Please split them first."
      );
      return;
    }

    if (!content) {
      toast.error("Please wait until feching content");
      return;
    }

    if (!inscription?.inscriptionId) {
      toast.error("Unknown inscription ID");
      return;
    }

    if (tag === "litemap" && content.indexOf(tag) <= -1) {
      toast.error("Invalid Inscription");
      return;
    }

    try {
      setAdding(true);
      if (tag === "litemap") {
        const validation = await validateInscription(
          content,
          inscription.inscriptionId,
          inscription
        );
        if (!validation) {
          toast.error("Invalid Inscription");
          setAdding(false);
          return;
        }
      }

      const newBlock = {
        content: content,
        output: inscription?.outputValue,
        inscription: inscription,
        inscriptionIndex: inscriptionIndex,
        tag: tag,
      };

      const updatedBlocks = [...selectedBlocks, newBlock];

      setSelectedBlocks(updatedBlocks);
      setAdding(false);
    } catch (error) {
      toast.error("When validating:", error);
      //  console.log(error);
      setAdding(true);
    }
  };

  const removeFromList = () => {
    const filter = selectedBlocks.filter(
      (block) => block.inscription.inscriptionId !== inscription.inscriptionId
    );
    setSelectedBlocks(filter);
    setAdded(false);
  };

  useEffect(() => {
    getContent();
  }, [inscription]);

  useEffect(() => {
    const exist = selectedBlocks.filter(
      (block) => block.inscription.inscriptionId == inscription.inscriptionId
    );
    if (exist.length > 0) {
      setAdded(true);
    } else {
      setAdded(false);
    }
  }, [selectedBlocks]);

  if (tag === "litemap" && content.indexOf(".litemap") == -1) {
    return;
  } else {
    return (
      <div className="relative">
        <div className={`${added && "cs-border"} in-card`}>
          <div className="in-content overflow-hidden">
            {inscription?.contentType.indexOf("image") > -1 && (
              <>
                <img
                  src={`https://ordinalslite.com/content/${inscription?.inscriptionId}`}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </>
            )}

            {inscription?.contentType.indexOf("text") > -1 && (
              <>
                {content && (
                  <>
                    {content.indexOf("tick") > -1 ? (
                      <div className="text-lg font-bold px-3">
                        {JSON.parse(content).tick}
                      </div>
                    ) : (
                      <div className="text-lg font-bold px-3">{content}</div>
                    )}
                  </>
                )}
              </>
            )}

            <button
              onClick={() => openTransferModal(true)}
              className="in-transfer"
            >
              Transfer
            </button>
          </div>

          <Link
            href={"/inscription/" + inscription.inscriptionId}
            className="in-link"
          >
            #{addressFormat(inscription?.inscriptionId, 4)}
          </Link>

          <hr className="mb-2" />

          {inscription?.listed ? (
            <>
              <button
                className="main_btn py-1 rounded-md bg-transparent disabled:bg-primary-light/10 w-full flex gap-1 justify-center items-center"
                onClick={() =>
                  handleCancelList(inscription?.tag, inscriptionIndex)
                }
              >
                <TbGiftOff /> Listed
              </button>
            </>
          ) : (
            <>
              {bulkSelect ? (
                <>
                  {added ? (
                    <button
                      className="main_btn cs-border bg-transparent py-1 h-8  rounded-md w-full flex justify-center items-center gap-2"
                      onClick={() => removeFromList()}
                    >
                      <TbArticleOff />
                      Added
                    </button>
                  ) : (
                    <button
                      disabled={adding || added}
                      className="main_btn py-1 h-8  rounded-md w-full flex justify-center items-center gap-2"
                      onClick={() => AddList()}
                    >
                      <>
                        {adding ? (
                          <AiOutlineLoading className="text-lg text-white font-semibold animate-spin" />
                        ) : (
                          <>
                            <FaPlus />
                            Add
                          </>
                        )}
                      </>
                    </button>
                  )}
                </>
              ) : (
                <button
                  className="main_btn py-1 h-8  rounded-md w-full"
                  onClick={openListModal}
                >
                  List
                </button>
              )}
            </>
          )}
        </div>

        <ListModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          tag={tag}
          content={
            inscription?.contentType?.indexOf("image") > -1
              ? inscription?.inscriptionId
              : content
          }
          output={inscription?.outputValue}
          inscription={inscription}
          inscriptionIndex={inscriptionIndex}
        />

        <TransferModal
          modalIsOpen={isOpenTransfer}
          setIsOpen={setIsOpenTransfer}
          content={content}
          id={inscription?.inscriptionId}
          inscription={inscription}
        />

        <SpliteModal
          isNeedToSplit={isNeedToSplit}
          isMultiStuck={isMultiStuck}
          modalIsOpen={isOpenSplit}
          setIsOpen={setIsOpenSplit}
          inscriptionDetails={inscriptionDetails}
          inscription={inscription}
        />
      </div>
    );
  }
}
