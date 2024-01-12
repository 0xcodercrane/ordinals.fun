import { onValue, orderByChild, query, ref, startAt } from "firebase/database";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "@/services/firebase";
import { useLastBlock, useMintedBlocksFromAPI } from "../../store/hooks";
import NumberFormat from "../UI/NumberFormatter";

export default function Banner({ title, tag }) {
  const { mintedBlockNumber } = useMintedBlocksFromAPI();
  const { lastBlock } = useLastBlock();
  const [status, setStatus] = useState(0);
  const [volume24, setVolume24] = useState(0);
  const [volumeh, setVolumeh] = useState(0);
  const [trade24, setTrades24] = useState(0);

  useEffect(() => {
    async function fetchStatus() {
      const dbQuery = query(ref(db, "status/" + tag));
      onValue(dbQuery, async (snapshot) => {
        const exist = snapshot.val();
        if (exist) {
          const data = exist[Object.keys(exist)[0]];
          setStatus(data);
        }
      });

      const dbTradesQuery = query(
        ref(db, "market/" + tag),
        orderByChild("date"),
        startAt(Date.now() - 86400000)
      );

      onValue(dbTradesQuery, async (snapshot) => {
        const exist = snapshot.val();
        if (exist) {
          setTrades24(exist);
          let TVL24 = 0;
          Object.keys(exist).map((index) => {
            TVL24 += Number(exist[index].price);
          });
          setVolume24(TVL24);
        }
      });

      const dbTradesh = query(
        ref(db, "market/" + tag),
        orderByChild("date"),
        startAt(Date.now() - 3600000)
      );

      onValue(dbTradesh, async (snapshot) => {
        const exist = snapshot.val();
        if (exist) {
          let TVLh = 0;
          Object.keys(exist).map((index) => {
            if (exist.paid) {
              TVLh += Number(exist[index].price);
            }
          });
          setVolumeh(TVLh);
        }
      });
    }
    fetchStatus();
  }, []);

  return (
    <>
      <div className="text-4xl font-bold my-16 text-center sm:text-left">
        {title}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        <div>
          <p className="font-semibold">
            {status ? (
              <NumberFormat number={status?.floor?.toFixed(2)} />
            ) : (
              "0.00"
            )}{" "}
            LTC
          </p>
          <p className="text-sm dark:text-gray-300 text-gray-800">
            Floor price
          </p>
        </div>
        <div>
          <p className="font-semibold">
            {status ? <NumberFormat number={status?.TVL?.toFixed(2)} /> : 0.0}{" "}
            LTC
          </p>
          <p className="text-sm dark:text-gray-300 text-gray-800">
            Total volume
          </p>
        </div>
        <div>
          <p className="font-semibold">
            {volume24 ? <NumberFormat number={volume24?.toFixed(2)} /> : "0.00"}{" "}
            LTC
          </p>
          <p className="text-sm dark:text-gray-300 text-gray-800">
            Volume (24h)
          </p>
        </div>
        <div>
          <p className="font-semibold">
            {trade24 ? (
              <NumberFormat number={Object.keys(trade24)?.length} />
            ) : (
              0
            )}
          </p>
          <p className="text-sm dark:text-gray-300 text-gray-800">
            Trades (24h)
          </p>
        </div>
        <div>
          <p className="font-semibold">
            {mintedBlockNumber ? (
              <NumberFormat number={mintedBlockNumber} />
            ) : (
              0
            )}
          </p>
          <p className="text-sm dark:text-gray-300 text-gray-800">Owners</p>
        </div>
        <div>
          <p className="font-semibold">
            {lastBlock ? <NumberFormat number={lastBlock} /> : 0}
          </p>
          <p className="text-sm dark:text-gray-300 text-gray-800">
            Latest Block
          </p>
        </div>
        <div>
          <p className="font-semibold">
            {status?.listed ? <NumberFormat number={status?.listed} /> : 0}
          </p>
          <p className="text-sm dark:text-gray-300 text-gray-800">Listed</p>
        </div>
      </div>

      <div className="w-full my-8 flex justify-between">
        <div className="main_btn px-3 py-2 rounded-md w-fit">
          🔥 {volumeh} buys in last hour
        </div>
        <div className="main_btn px-3 py-2 rounded-md w-fit">
          Create Listing
        </div>
      </div>
    </>
  );
}
