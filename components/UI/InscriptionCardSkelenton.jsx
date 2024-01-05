import Link from "next/link";
import React from "react";

export default function InscriptionCardSkelenton() {
  return (
    <div className="rounded-lg p-3 animate-pulse dark:bg-primary-dark/20 bg-primary-light/20 backdrop-blur-md shadow shadow-black dark:hover:bg-primary-dark/30 hover:bg-primary-light/30 duration-200 w-full">
      <p
        style={{ overflowWrap: "anywhere" }}
        className="bg-primary-dark/20   text-xl text-center  rounded-lg mb-3 flex items-center p-2 justify-center font-semibold w-full h-[180px] lg:h-[200px]"
      ></p>
      <Link
        href={"/"}
        className="text-sm text-center dark:text-gray-300 text-gray-800 flex justify-between"
      >
        <p className="">Seller:</p> <p className=" w-8"></p>
      </Link>
      <hr />
      <p className="text-center dark:text-gray-300 text-gray-800 mb-3 mt-1 text-sm ">0.00</p>
      <div className="grid grid-cols-1 sm:gird-cols-2 gap-2 ">
        <button className="main_btn py-1  rounded-md ">List</button>
      </div>
    </div>
  );
}
