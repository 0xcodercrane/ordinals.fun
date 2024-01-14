import {
  ref,
  push,
  query,
  orderByChild,
  equalTo,
  onValue,
  update,
  get,
  remove,
} from "firebase/database";
import { db } from "@/services/firebase";
import { useCallback, useContext } from "react";
import { WalletContext } from "../context/wallet";
import { toast } from "react-hot-toast";

export default function useActivities() {
  const wallet = useContext(WalletContext);
  const address = wallet.getAddress();

  const addListForSale = async (tag, inscriptionId, content, price) => {
    if (!address) {
      toast.error("Please connect your wallet.");
      return;
    }
    const dbRef = ref(db, `wallet/${address}/activities`);
    const newActivity = {
      date: Date.now(),
      tag: tag,
      content: content,
      id: inscriptionId,
      price: price,
      type: "Listed",
    };
    await push(dbRef, newActivity);
  };

  const updateListForSold = async (tag, inscriptionId, content, price) => {
    if (!address) {
      toast.error("Please connect your wallet.");
      return;
    }
    const dbQueryForActivityUpdate = query(
      ref(db, `wallet/${address}/activities`),
      orderByChild("id"),
      equalTo(inscriptionId)
    );

    const activitySnapShot = await get(dbQueryForActivityUpdate);
    const existedActivity = activitySnapShot.val();

    if (existedActivity) {
      const key = Object.keys(existedActivity)[0];
      const dbRefForUpdate = ref(db, `wallet/${address}/activities/${key}`);

      await update(dbRefForUpdate, {
        ...existedActivity[key],
        date: Date.now(),
        tag: tag,
        price: price,
        type: "Sold",
        content: content,
      });
    }
  };

  const addActiviyForBuy = async (tag, inscriptionId, content, price) => {
    if (!address) {
      toast.error("Please connect your wallet.");
      return;
    }
    const dbRef = ref(db, `wallet/${address}/activities`);
    const newActivity = {
      date: Date.now(),
      tag: tag,
      content: content,
      id: inscriptionId,
      price: price,
      type: "Buy",
    };
    push(dbRef, newActivity);
  };

  const removeListFromMarket = async (inscriptionId) => {
    if (!address) {
      toast.error("Please connect your wallet.");
      return;
    }
    const dbQueryForActivityUpdate = query(
      ref(db, `wallet/${address}/activities`),
      orderByChild("id"),
      equalTo(inscriptionId)
    );

    const activitySnapShot = await get(dbQueryForActivityUpdate);
    const existedActivity = activitySnapShot.val();

    if (existedActivity) {
      const key = Object.keys(existedActivity)[0];
      if (existedActivity[key]?.type === "Listed") {
        const dbRefForUpdate = ref(db, `wallet/${address}/activities/${key}`);
        await remove(dbRefForUpdate);
      }
    }
  };

  return {
    addlistForSale: addListForSale,
    updateListForSold: updateListForSold,
    addActiviyForBuy: addActiviyForBuy,
    removeListFromMarket: removeListFromMarket,
  };
}
