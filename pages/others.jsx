import React from "react";
import Layout from "@/components/sections/Layout";
import {
  onValue,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  update,
} from "firebase/database";
import { db } from "@/services/firebase";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import BuyCardSkelenton from "../components/UI/BuyCardSkelenton";
import BuyCard from "../components/UI/BuyCard";
import { useWallet } from "../store/hooks";
import useUTXOs from "../hooks/useUTXOs";
import Banner from "../components/trade/Banner";
import Head from "next/head";

export default function Home() {

  const { utxos, sortedUtxos, dummyUTXOs, refreshUTXOs, selectUtxos } =
    useUTXOs();
  const { price } = useWallet();
  const [lists, setLists] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [fetchingData, setFetchingData] = useState(true);
  const [offset, setOffset] = useState(0);

  const handlePageClick = (e) => {
    setOffset(e.selected);
  };

  useEffect(() => {
    const fetchTotalItems = async () => {
      const dbQuery = query(
        ref(db, "market/others"),
        orderByChild("paid"),
        equalTo(false)
      );
      onValue(dbQuery, async (snapshot) => {
        const exist = snapshot.val();
        if (exist) {
          setTotalItems(snapshot.size);
          setLists(exist);
        }
        setFetchingData(false);
      });

      const dbQuery2 = query(ref(db, `status/litemap`));

      const snapshot = await get(dbQuery2);
      const exist = snapshot.val();

      if (!exist) {
        const dbRefStatus = ref(db, `/status/litemap`);
        await push(dbRefStatus, {
          TVL: Number(listingPrice),
          floor: Number(listingPrice),
          listed: 1,
        });
      } else {
        const key = Object.keys(exist)[0];
        const url = `/status/others/${key}`;
        const dbRefStatus = ref(db, url);

        const updates = {};

        // updates[`TVL`] = Number(exist[key]?.TVL) + Number(listingPrice);
        // updates[`floor`] =
        //   (Number(exist[key]?.TVL) + Number(listingPrice)) /
        //   (Number(exist[key]?.listed) + 1);
        // updates[`listed`] = Number(exist[key]?.listed) + 1;

        // await update(dbRefStatus, {TVL: 3.5, floor: 0.3, listed: 12 });
      }
    };
    fetchTotalItems();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Litemap - Market For All Ordinals</title>
        <meta name="description" content="Litemap -  Market For All Ordinals" />
      </Head>

      <Banner title="Any Inscriptions" tag="others" />

      {fetchingData ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4 w-full">
          {Array.from({ length: 12 }, (_, index) => {
            return <BuyCardSkelenton key={index} />;
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4 w-full">
          {Object.keys(lists)
            .reverse()
            .slice(offset * 12, offset * 12 + 12)
            .map((index, list) => {
              return (
                <BuyCard
                  key={list}
                  list={lists[index]}
                  price={price}
                  utxos={utxos}
                  sortedUtxos={sortedUtxos}
                  dummyUTXOs={dummyUTXOs}
                  refreshUTXOs={refreshUTXOs}
                  selectUtxos={selectUtxos}
                />
              );
            })}
        </div>
      )}

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={Math.ceil(totalItems / 12)}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </Layout>
  );
}
