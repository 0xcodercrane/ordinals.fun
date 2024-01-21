import React from "react";
import Layout from "@/components/sections/Layout";
import {
  onValue,
  ref,
  query,
  orderByChild,
  equalTo,
  limitToLast,
  limitToFirst,
  endAt,
  startAt,
  startAfter,
  endBefore,
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
  const [lists, setLists] = useState();
  const [fetchingData, setFetchingData] = useState(true);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [listedNumber, setListedNumber] = useState(0);

  const handlePageClick = (e) => {
    setOffset(e.selected);
  };

  const fetchTotalItems = async () => {
    const dbQuery = query(
      ref(db, "market/others"),
      orderByChild("paid"),
      equalTo(false)
    );

    onValue(dbQuery, async (snapshot) => {
      const exist = snapshot.val();
      if (exist) {
        setLists(exist);
      }
      setFetchingData(false);
    });
  };

  useEffect(() => {
    if (listedNumber) {
      fetchTotalItems();
    }
  }, [offset, listedNumber]);

  return (
    <Layout>
      <Head>
        <title>Litemap - Market For All Ordinals</title>
        <meta name="description" content="Litemap -  Market For All Ordinals" />
      </Head>

      <Banner
        title="Any Inscriptions"
        tag="others"
        setListedNumber={setListedNumber}
      />

      {fetchingData ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4 w-full">
          {Array.from({ length: pageSize }, (_, index) => {
            return <BuyCardSkelenton key={index} />;
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4 w-full">
          {Object.keys(lists)
            .reverse()
            .slice(offset * pageSize, offset * pageSize + pageSize)
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
        pageCount={Math.ceil(listedNumber / pageSize)}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </Layout>
  );
}
