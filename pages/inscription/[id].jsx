import React, { useEffect } from "react";
import Layout from "@/components/sections/Layout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState } from "react";
import Loading from "@/components/UI/Loading";
import InscriptionPreview from "../../components/UI/InscriptionPreview";

export default function Inscription(props) {
  const router = useRouter();
  const accountInfo = useSelector(
    (state) => state?.persistedReducer?.walletReducer?.value
  );
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [content, setContent] = useState();

  const getContent = async (id) => {
    try {
      const url = "/ordinalslite/content/" + id;
      const data = await fetch(url);
      const textData = await data.text();
      setContent(textData);
      setLoading(false);
    } catch (error) {
      console.log("content fetch", error);
      setLoading(false);
    }
  };

  const getData = (id) => {
    setLoading(true);
    const data = accountInfo?.inscriptions?.list?.filter(
      (items) => items?.inscriptionId === id
    );
    if (data) {
      setData(data[0]);
    } else {
      router.push("/wallet");
    }
    getContent(id);
    setLoading(false);
  };

  useEffect(() => {
    if (router.asPath !== router.route) {
      if (router?.query?.id && accountInfo) {
        setId(router?.query?.id);
        getData(router?.query?.id);
      }
    }
  }, [router.isReady]);

  return (
    <Layout>
      <p className="my-8 text-center text-3xl font-semibold">Inscription Detail</p>
      {!loading ? (
        <div className="my-8 grid lg:grid-cols-2 grid-cols-1 gap-3 w-full">
          <InscriptionPreview id={id} />
          <div className="p-3 bg-primary/10">
            <div className="text-3xl font-bold px-3">{content}</div>
            <div className="rounded-lg p-3 divide-primary/40 divide-y">
              <div className="py-2">
                <p className="text-sm text-gray-300">Inscription ID</p>
                <p className="break-words">{data?.inscriptionId}</p>
              </div>
              <div className="py-2">
                <p className="text-sm text-gray-300">Owner</p>
                <p className="break-words">{data?.address}</p>
              </div>
              <div className="py-2">
                <p className="text-sm text-gray-300">Output value</p>
                <p className="break-words">{data?.outputValue}</p>
              </div>
              <div className="py-2">
                <p className="text-sm text-gray-300">Created</p>
                <p className="break-words">{data?.timestamp}</p>
              </div>
              <div className="py-2">
                <p className="text-sm text-gray-300">Preview</p>
                <a href={data?.preview} target="_blank" className="break-words">
                  {data?.preview}
                </a>
              </div>
              <div className="py-2">
                <p className="text-sm text-gray-300">Indexer</p>
                <a
                  href={
                    "https://ordinalslite.com/inscription/" +
                    data?.inscriptionId
                  }
                  target="_blank"
                  className="break-words"
                >
                  {data?.inscriptionId}
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
