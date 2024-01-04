import Layout from "@/components/sections/Layout";
import InscriptionCard from "../components/UI/InscriptionCard";
import { WalletContext } from "@/context/wallet";
import { useContext, useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import openApi from "@/services/openAPI";
import { useWallet } from "@/store/hooks";
import ReactPaginate from "react-paginate";
import InscriptionCardSkelenton from "../components/UI/InscriptionCardSkelenton";

export default function Inscribe() {
  const wallet = useContext(WalletContext);
  const { inscriptions } = useWallet();
  const address = wallet.getAddress();
  const [fetchingData, setFetchingData] = useState(true);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);

  const getInscriptions = async () => {
    try {
      setFetchingData(true);
      setData([]);
      const data = await openApi.getAddressInscriptions(
        address,
        offset * 10,
        10
      );
      setData(data.list);
      setFetchingData(false);
    } catch (error) {
      setFetchingData(false);
    }
  };

  const handlePageClick = (e) => {
    setOffset(e.selected);
  };

  useEffect(() => {
    if (address) {
      getInscriptions();
    } else {
      setFetchingData(false);
    }
  }, [address, offset]);

  return (
    <Layout>
      {inscriptions.total > 0 && inscriptions?.list ? (
        <>
          <h1 className="text-3xl text-white font-semibold mb-8 my-8 text-center">
            My Inscriptions
          </h1>

          {fetchingData ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-8 w-full">
              {Array.from({ length: 10 }, (_, key) => {
                return <InscriptionCardSkelenton key={key} />;
              })}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-8 w-full">
                {data &&
                  data.map((item, key) => {
                    return <InscriptionCard inscription={item} key={key} />;
                  })}
              </div>
            </>
          )}
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(inscriptions.total / 10)}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        </>
      ) : (
        <div className="my-auto flex flex-col justify-center items-center">
          <h1 className="text-xl text-white font-bold mb-8 animate-pulse text-center">
            You don not have any inscriptions.
          </h1>
          <Link
            href={"/inscribe"}
            className="mx-auto main_btn px-3 py-2 rounded-md"
          >
            Inscribe Now
          </Link>
        </div>
      )}
    </Layout>
  );
}
