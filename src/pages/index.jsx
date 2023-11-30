import Layout from "@/layout/layout";
import Coincard from "@/components/coincard";
import { FaCartShopping } from "react-icons/fa6";
import { FaFilterCircleDollar } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LiaBroomSolid } from "react-icons/lia";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import BuyModal from "@/components/buyModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(true);

  const openBuyModal = () => {
    setModalOpen(true);
  };

  const closeBuyModal = () => {
    setModalOpen(false);
  };

  const handlePageClick = (e) => {
    console.log(e)
  };

  const CoinCardRepeat = () => {
    const repeatTime = 30;
    const renderComponents = () => {
      const components = [];
      for (let i = 0; i < repeatTime; i++) {
        components.push(<Coincard openModal={openBuyModal} />);
      }
      return components;
    };

    return renderComponents();
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="flex gap-2 px-2 mt-12">
          <img src="/img/basedOwl.png" alt="" className="w-8 h-8" />
          <p className="my-auto text-2xl font-semibold">Litemap</p>
        </div>

        <div className="grid grid-cols-2 gap-3 px-2 my-8 sm:grid-cols-4 lg:grid-cols-8">
          <div>
            <p className="flex items-center gap-1 font-semibold">
              <img src="/img/lite.svg" className="w-4 h-4" alt="" />
              0.0000000025
            </p>
            <p className="text-gray-400">Price</p>
          </div>
          <div>
            <p className="flex items-center gap-1 font-semibold text-green-600">
              177.78%
            </p>
            <p className="text-gray-400">24h %</p>
          </div>
          <div>
            <p className="flex items-center gap-1 font-semibold">
              <img src="/img/lite.svg" className="w-4 h-4" alt="" />
              865,560
            </p>
            <p className="text-gray-400">Volume (24h)</p>
          </div>
          <div>
            <p className="flex items-center gap-1 font-semibold">
              <img src="/img/lite.svg" className="w-4 h-4" alt="" />
              1,216,495
            </p>
            <p className="text-gray-400">Total volume</p>
          </div>
          <div>
            <p className="flex items-center gap-1 font-semibold">
              <img src="/img/lite.svg" className="w-4 h-4" alt="" />
              25e-12
            </p>
            <p className="text-gray-400">Price</p>
          </div>
          <div>
            <p className="flex items-center gap-1 font-semibold">$819.7k</p>
            <p className="text-gray-400">Market Cap</p>
          </div>
          <div>
            <p className="flex items-center gap-1 font-semibold">4200 B</p>
            <p className="text-gray-400">Total supply</p>
          </div>
          <div>
            <p className="flex items-center gap-1 font-semibold">17,340%</p>
            <p>Holders</p>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-main rounded-lg border border-blue/30 mx-2 py-2 px-2 w-fit mb-12">
            🔥 58 buys in last hour
          </div>
          <div className="flex justify-between mt-6 mb-3 px-2 gap-3">
            <div className="flex gap-3">
              <div className="bg-main rounded-full border border-blue/30 px-6 py-1.5 hover:border-blue cursor-pointer">
                Listings
              </div>
              <div className=" rounded-full border border-blue/30 px-6 py-1.5 hover:border-blue cursor-pointer">
                Activities
              </div>
            </div>
            <div className="flex mb-3 px-2 gap-3">
              <LiaBroomSolid className="text-2xl cursor-pointer hover:shadow hover:shadow-black hover:text-balck" />
              <FaCartShopping className="text-2xl cursor-pointer hover:shadow hover:shadow-black hover:text-balck" />
              <FaFilterCircleDollar className="text-2xl cursor-pointer hover:shadow hover:shadow-black hover:text-balck" />
              <BsThreeDotsVertical className="text-2xl cursor-pointer hover:shadow hover:shadow-black hover:text-balck" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 max-sm:grid-cols-1">
            {CoinCardRepeat()}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={2}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        </div>
      </div>

      <BuyModal modalIsOpen={modalOpen} closeModal={closeBuyModal} />
    </Layout>
  );
}
