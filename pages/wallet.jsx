import Layout from "@/components/sections/Layout";
import { useSelector } from "react-redux";
import InscriptionCard from "../components/UI/InscriptionCard";
import { WalletContext } from "@/context/wallet";
import { useContext } from "react";
import { useEffect } from "react";
import Link from "next/link";

export default function Inscribe() {
  const wallet = useContext(WalletContext);
  const account = useSelector(
    (state) => state?.persistedReducer?.walletReducer?.value
  );

  useEffect(() => {
    wallet.fetchbalance();
  }, []);

  return (
    <Layout>
      {!account?.inscriptions.total > 0  && account?.inscriptions?.list? (
        <>
          <h1 className="text-3xl text-white font-semibold mb-8 my-8 text-center">
            My inscriptions
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gr5id-cols-6 gap-3 mt-8">
            {account?.inscriptions?.list && account?.inscriptions?.list.map((item, key) => {
              return <InscriptionCard inscription={item} key={key} />;
            })}
          </div>
        </>
      ) : (
        <div className="my-auto flex flex-col justify-center items-center">
          <h1 className="text-xl text-white font-bold mb-8 animate-pulse text-center">
            You don not have any inscriptions.
          </h1>
          <Link href={"/inscribe"} className="mx-auto main_btn px-3 py-2 rounded-md">
            Inscribe Now
          </Link>
        </div>
      )}
    </Layout>
  );
}
