import clsx from 'clsx'
import Layout from "@/layout/layout";
import Coincard from "@/components/coincard";
import { FaCartShopping } from "react-icons/fa6";
import { FaFilterCircleDollar } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LiaBroomSolid } from "react-icons/lia";
import { TbZoomCancel } from "react-icons/tb";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import BuyModal from "@/components/buyModal";
import ActivityRow from '@/components/activityRow';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FixedBar from '@/components/fixedbar';

export default function Home() {
  const [itemOffset, setItemOffset] = useState(0);
  const [activityItemOffset, setActivityItemOffset] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [buyAmount, setBuyAmount] = useState(0);
  const [isBuyMode, setIsBuyMode] = useState(false);
  const [toBuyLists, setToBuyLists] = useState([]);
  const [showFixedBar, setShowFixedBar] = useState(false);

  const openBuyModal = () => {
    setModalOpen(true);
  };
  const closeBuyModal = () => {
    setModalOpen(false);
  };
  const handleMultiSelect = () => {
    console.log("+++++:")
  }
  const CoinCardArray = [];
  const repeatTime = 300;
  for (let i = 0; i < repeatTime; i++) {
    CoinCardArray.push(<Coincard openModal={openBuyModal} isBuyMode={isBuyMode} idNum={i} />);
  }

  const clickSweepBuyButton = () => {
    setToBuyLists([]);

    const insertElement = (element) => {
      setToBuyLists(prevArray => [...prevArray, element]);
    }

    for (let i = 0; i < buyAmount; i++) {
      console.log(i, ":")
      insertElement(CoinCardArray[i])
    }
    console.log(toBuyLists)

    setModalOpen(true);

  }

  const sweepClick = () => {
    setIsInputVisible(!isInputVisible)
    setBuyAmount(0)
    if (!isBuyMode) setToBuyLists([])
  }

  const CoinCardRepeat = () => {
    const itemsPerPage = 15;

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = CoinCardArray.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(CoinCardArray.length / itemsPerPage);
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % CoinCardArray.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 max-sm:grid-cols-1'>
          {/* {
            currentItems.map((item) => {
              <>{item}</>
            })
          } */}
          {currentItems}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
          className="mx-auto pagination min-w-fit px"
        />
      </>
    )
  };

  const ActivityRowRepeat = () => {
    const repeatTime = 400;
    const components = [];
    for (let i = 0; i < repeatTime; i++) {
      components.push(<ActivityRow />);
    }
    const itemsPerPage = 15;

    const endOffset = activityItemOffset + itemsPerPage;
    const currentItems = components.slice(activityItemOffset, endOffset);
    const pageCount = Math.ceil(components.length / itemsPerPage);
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % components.length;
      setActivityItemOffset(newOffset);
    };

    return (
      <>
        <table className='items-start min-w-[100%]'>
          <thead>
            <tr className='text-lg text-left'>
              <th className="text-gray-400 w-36">Item</th>
              <th className="w-10 ml-2 text-gray-400 ">Action</th>
              <th className="text-center text-gray-400 ">Price</th>
              <th className="text-gray-400 ">Seller</th>
              <th className="text-gray-400 ">Buyer</th>
              <th className="text-gray-400 ">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems}
          </tbody>
        </table>

        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
          className=" pagination"
        />
      </>
    )
  }

  const handleCardButton = () => {
    setIsBuyMode(true);
    setShowFixedBar(true)
  }
  const hideFixedBar = () => {
    setShowFixedBar(false)
    setIsBuyMode(false)
  }
  const searchBarClassName = clsx('flex gap-2', { 'hidden': isBuyMode })


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
          <div className="px-2 py-2 mx-2 mb-12 border rounded-lg bg-main border-blue/30 w-fit">
            🔥 58 buys in last hour
          </div>

          <Tabs className="">
            <TabList className="flex justify-between gap-3 px-2 mt-6 mb-3">
              <div className='flex gap-3'>
                <Tab className="rounded-full border border-blue/30 px-6 py-1.5 hover:border-blue cursor-pointer ">
                  Listing
                </Tab>
                <Tab className="rounded-full border border-blue/30 px-6 py-1.5 hover:border-blue cursor-pointer">
                  Activities
                </Tab>
              </div>
              <div className="flex gap-3 px-2 mb-3">
                <div className={searchBarClassName}>
                  {buyAmount > 0 ? (<button className='px-6 border rounded-full cursor-pointer border-blue/30 hover:border-blue hover:bg-main' onClick={clickSweepBuyButton}>Buy</button>) : (<></>)}
                  {isInputVisible && <input defaultValue={0} max={300} type="number" className='max-w-[130px] px-2 text-lg font-bold text-white rounded outline-none focus-within:bg-slate-600 bg-slate-500 hover:bg-slate-600' onChange={(e) => {
                    if (e.target.value > parseInt(e.target.max)) e.preventDefault();
                    setBuyAmount(e.target.value);
                  }} />}
                  {!isInputVisible ? <LiaBroomSolid className="text-2xl cursor-pointer hover:shadow hover:text-blue/80" onClick={() => { sweepClick() }} /> : (<>
                    <TbZoomCancel className="text-2xl cursor-pointer hover:shadow hover:text-blue/80" onClick={() => { sweepClick() }} />
                  </>)}
                </div>

                <FaCartShopping className="text-2xl cursor-pointer hover:shadow hover:text-blue/80" onClick={() => { handleCardButton() }} />
                <FaFilterCircleDollar className="text-2xl cursor-pointer hover:shadow hover:text-blue/80" />
                <BsThreeDotsVertical className="text-2xl cursor-pointer hover:shadow hover:text-blue/80" />
              </div>
            </TabList>

            <TabPanel>
              {CoinCardRepeat()}
            </TabPanel>
            <TabPanel>
              <div className="" id="activities">
                <div className='flex items-start'>
                  <img
                    className='mx-auto my-4 max-h-[300px]'
                    src="https://img-cdn.magiceden.dev/rs:fit:800:0:0/plain/https://bitmap-img.magiceden.dev/v1/d1ae814fa7c62782bc43968293022854119dd6afa9d886f80c3d407f71652d09i0" alt="" />
                </div>
                {ActivityRowRepeat()}
              </div>
            </TabPanel>
          </Tabs>

        </div>

      </div>
      <FixedBar showFixedBar={showFixedBar} hideFixedBar={hideFixedBar} />
      <BuyModal modalIsOpen={modalOpen} closeModal={closeBuyModal} />

    </Layout>
  );
}
