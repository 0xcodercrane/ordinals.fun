import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import { collectionsData } from "../../configs/constants";
import Layout from "../../components/sections/Layout";
import ReactPaginate from "react-paginate";
import { useWallet } from "../../store/hooks";
import useUTXOs from "../../hooks/useUTXOs";
import BuyCardForNFTs from "../../components/UI/BuyCardForNFTs";
import BuyCardSkelenton from "../../components/UI/BuyCardSkelenton";

export default function Collection() {
  const router = useRouter();
  const { utxos, sortedUtxos, dummyUTXOs, refreshUTXOs, selectUtxos } =
    useUTXOs();
  const { price } = useWallet();

  const [slug, setslug] = useState();
  const [collection, setCollection] = useState();
  const [metaData, setMetaData] = useState();
  const [inscriptions, setInscriptions] = useState();
  const [fetchingData, setFetchingData] = useState(true);
  const [offset, setOffset] = useState(0);

  const handlePageClick = (e) => {
    setOffset(e.selected);
  };

  async function getCollection(collectionSlug) {
    const [meta, inscriptions] = await Promise.all([
      fetch(
        `https://raw.githubusercontent.com/litecoinlabs/collections/main/collections/${collectionSlug}/meta.json`
      ).then((response) => response.json()),
      fetch(
        `https://raw.githubusercontent.com/litecoinlabs/collections/main/collections/${collectionSlug}/inscriptions.json`
      ).then((response) => response.json()),
    ]);
    setMetaData(meta);
    setInscriptions(inscriptions);
    setFetchingData(false);
  }

  useEffect(() => {
    if (router.asPath !== router.route) {
      setslug(router?.query?.symbol);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (slug) {
      const filter = collectionsData.filter((item) => item.slug === slug);
      if (filter.length > 0) {
        setCollection(filter[0]);
      }
      getCollection(slug);
    }
  }, [slug]);

  return (
    <Layout>
      <div className="text-4xl py-4 grid grid-cols-1 sm:grid-cols-12 w-full gap-3 items-center">
        {collection?.inscription_icon ===
        "9278bd914fdc07f866fc4b4e402c87a0aa04666cfc9f0c9dde6ead58b17abcf7i0" ? (
          <img
            src={`/litecoin.png`}
            className="rounded-md w-full col-span-12 sm:col-span-2 mx-auto max-w-[150px]"
            alt="logo"
          />
        ) : (
          <img
            src={`https://ordinalslite.com/content/${collection?.inscription_icon}`}
            className="rounded-md w-full col-span-12 sm:col-span-2 mx-auto max-w-[150px]"
            alt="logo"
          />
        )}
        <div className="col-span-12 sm:col-span-10">
          <h2 className="font-semibold">{collection?.name}</h2>
          <p className="text-sm w-full sm:max-w-[900px] my-3 ">
            {collection?.description}
          </p>
        </div>
      </div>

      {fetchingData ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4 w-full">
          {Array.from({ length: 12 }, (_, index) => {
            return <BuyCardSkelenton key={index} />;
          })}
        </div>
      ) : (
        <>
          {inscriptions.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4 w-full">
                {inscriptions
                  .slice(offset * 12, offset * 12 + 12)
                  .map((inscription, index) => {
                    return (
                      <BuyCardForNFTs
                        key={index}
                        inscription={inscription}
                        price={price}
                        utxos={utxos}
                        sortedUtxos={sortedUtxos}
                        dummyUTXOs={dummyUTXOs}
                        refreshUTXOs={refreshUTXOs}
                        selectUtxos={selectUtxos}
                        slug={slug}
                      />
                    );
                  })}
              </div>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={Math.ceil(inscriptions.length / 12)}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className="pagination"
              />
            </>
          )}
        </>
      )}
    </Layout>
  );
}
