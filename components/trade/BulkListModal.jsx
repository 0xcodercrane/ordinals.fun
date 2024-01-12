import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import { useWallet } from "../../store/hooks";
import * as bitcoin from "bitcoinjs-lib";
import usePSBT from "../../hooks/usePSBT";
import { getTxHexById, btcTosatoshis, sleep } from "@/utils";
import { toast } from "react-hot-toast";
import ReceiveAddress from "../UI/ReceiveAddress";
import { useContext } from "react";
import { WalletContext } from "../../context/wallet";
import {
  ref,
  push,
  query,
  orderByChild,
  equalTo,
  onValue,
  update,
  get,
} from "firebase/database";
import { db } from "@/services/firebase";
import { AiOutlineLoading } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

export default function BulkListModal({
  modalIsOpen,
  setIsOpen,
  blocks,
  setSelectedBlocks,
  tag = "litemap",
  cancelBlocks,
}) {
  const wallet = useContext(WalletContext);
  const address = wallet.getAddress();
  const { price } = useWallet();
  const { psbt } = usePSBT({ network: "litecoin" });
  const [listingPrice, setListingPrice] = useState("");
  const [toInfo, setToInfo] = useState();
  const [pendingTx, setPendingTx] = useState(false);

  function closeModal() {
    setIsOpen(false);
    cancelBlocks();
  }

  const removeFromList = (id) => {
    console.log(id);
    const filter = blocks.filter(
      (block) => block.inscription.inscriptionId !== id
    );
    setSelectedBlocks(filter);
  };

  const handleUpdateStatus = async (inscriptionIndex) => {
    const dbQuery = query(ref(db, `status/${tag}`));

    const snapshot = await get(dbQuery);
    const exist = snapshot.val();

    if (!exist) {
      const dbRefStatus = ref(db, `/status/${tag}`);
      await push(dbRefStatus, {
        TVL: Number(listingPrice),
        floor: Number(listingPrice),
        listed: 1,
      });
    } else {
      const key = Object.keys(exist)[0];
      const url = `/status/${tag}/${key}`;
      const dbRefStatus = ref(db, url);

      const updates = {};

      updates[`TVL`] = Number(exist[key]?.TVL) + Number(listingPrice);
      updates[`floor`] =
        (Number(exist[key]?.TVL) + Number(listingPrice)) /
        (Number(exist[key]?.listed) + 1);
      updates[`listed`] = Number(exist[key]?.listed) + 1;

      await update(dbRefStatus, updates);
    }

    const dbQueryForWallet = query(ref(db, `wallet/${address}`));

    const walletSnapshot = await get(dbQueryForWallet);
    const walletExist = walletSnapshot.val();

    if (walletExist) {
      const key = Object.keys(walletExist)[0];
      const dbQueryForWallet = ref(
        db,
        `wallet/${address}/${key}/inscriptions/${inscriptionIndex}`
      );

      await update(dbQueryForWallet, {
        ...walletExist[key]["inscriptions"][inscriptionIndex],
        listed: true,
        tag: tag,
      });
    }
  };

  async function generatePSBTListingInscriptionForSale(
    inscription,
    content,
    listingPrice,
    toInfoAddress,
    inscriptionIndex
  ) {
    let listed = false;
    const dbQuery = query(
      ref(db, "market/" + tag),
      orderByChild("data/inscriptionId"),
      equalTo(inscription?.inscriptionId)
    );

    onValue(dbQuery, async (snapshot) => {
      const exist = snapshot.val();
      if (exist) {
        listed = true;
      }
    });

    if (listed) {
      toast.error("Already listed");
      return;
    }

    if (!inscription?.output) {
      toast.error("Unkown ordinal output ");
      return;
    }

    try {
      setPendingTx(true);
      const [ordinalUtxoTxId, ordinalUtxoVout] = inscription?.output.split(":");
      const tx = bitcoin.Transaction.fromHex(
        await getTxHexById(ordinalUtxoTxId)
      );

      const input = {
        hash: ordinalUtxoTxId,
        index: parseInt(ordinalUtxoVout),
        nonWitnessUtxo: tx.toBuffer(),
        witnessUtxo: tx.outs[ordinalUtxoVout],
        sighashType:
          bitcoin.Transaction.SIGHASH_SINGLE |
          bitcoin.Transaction.SIGHASH_ANYONECANPAY,
      };
      psbt.addInput(input);

      psbt.addOutput({
        address: toInfoAddress,
        value: btcTosatoshis(listingPrice),
      });

      const singedPSBT = await wallet.signPsbt(psbt, {});

      if (singedPSBT) {
        const dbRef = ref(db, "/market/" + tag);
        push(dbRef, {
          psbt: singedPSBT.toBase64(),
          data: inscription,
          date: Date.now(),
          price: listingPrice,
          seller: toInfoAddress,
          content: content,
          paid: false,
          txId: "",
        }).then(async () => {
          toast.success("Successfully listed");
        });
        await handleUpdateStatus(inscriptionIndex);
      }
      setPendingTx(false);
    } catch (error) {
      setPendingTx(false);
      console.log(error);
      toast.error(
        "Something went wrong when creating PSBT. Please try again after some mins."
      );
    }
  }

  async function generatePSBTsListingInscriptionForSale() {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!psbt) {
      toast.error("PSBT is not generated yet.");
      return;
    }

    if (listingPrice <= 0) {
      toast.error("Please input price to list");
      return;
    }

    if (!toInfo?.address) {
      toast.error("Please input receive address.");
      return;
    }

    try {
      await Promise.all(
        blocks.map(async (block) => {
          await generatePSBTListingInscriptionForSale(
            block.inscription,
            block.content,
            listingPrice,
            toInfo.address,
            block.inscriptionIndex
          );
          await sleep(0.1);
        })
      );
      closeModal();
    } catch (error) {}
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="cs-modal relative"
    >
      <div className="text-center text-2xl font-semibold">
        List litemap for sale
      </div>

      <div className="mx-auto  grid grid-cols-3 gap-1">
        {blocks.map((block, key) => {
          return (
            <div
              key={key}
              className="w-full h-24 rounded-md bg-primary-contentDark text-lg flex justify-center items-center my-3 relative"
              style={{ overflowWrap: "anywhere" }}
            >
              {block.content}
              <button
                className="absolute rounded-full p-1 top-1 right-1"
                onClick={() => removeFromList(block.inscription.inscriptionId)}
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-1">
        <div className="mb-1 w-fit">Input Price:</div>
        <div className="flex gap-1">
          <input
            onChange={(e) => setListingPrice(e.target.value)}
            type="number"
            className="py-1 rounded-md bg-primary-light/10 dark:bg-primary-dark/10 cs-border px-2 w-full"
            placeholder="Input Price"
          />
          <div className="px-2 py-1 bg-primary-contentDark rounded-md text-sm flex justify-center items-center w-36 cs-border overflow-hidden ">
            {listingPrice ? (
              <>~$ {(listingPrice * price).toFixed(1)}</>
            ) : (
              "~$ 0.00"
            )}
          </div>
        </div>
      </div>

      <ReceiveAddress
        onChange={(val) => {
          setToInfo(val);
        }}
      />

      <div className="flex gap-2">
        <button
          className="main_btn w-full py-2 px-3 rounded-md mt-3"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
        <button
          className="main_btn w-full py-2 px-3 rounded-md mt-3 bg-sky-600"
          onClick={generatePSBTsListingInscriptionForSale}
        >
          Sign & Create PSBT Listing
        </button>
      </div>

      {pendingTx && (
        <div className="absolute top-0 left-0 w-full h-full bg-primary-light/60 dark:bg-primary-dark/60 flex justify-center items-center">
          <AiOutlineLoading className="text-3xl font-semibold animate-spin" />
        </div>
      )}
    </Modal>
  );
}
