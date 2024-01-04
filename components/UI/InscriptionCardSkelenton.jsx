import Link from "next/link";
import React from "react";

export default function InscriptionCardSkelenton() {
  return (
    <div className="rounded-lg p-3 animate-pulse bg-primary/20 backdrop-blur-md shadow shadow-black hover:bg-primary/30 duration-200 w-full">
      <p
        style={{ overflowWrap: "anywhere" }}
        className="bg-primary/20   text-xl text-center  rounded-lg mb-3 flex items-center p-2 justify-center font-semibold w-full h-[180px] lg:h-[200px]"
      ></p>
      <Link
        href={"/"}
        className="text-sm text-center text-gray-300 flex justify-between"
      >
        <p className="">Seller:</p> <p className=" w-8"></p>
      </Link>
      <hr />
      <p className="text-center text-gray-300 mb-3 mt-1 text-sm ">0.00</p>
      <div className="grid grid-cols-1 sm:gird-cols-2 gap-2 ">
        <button className="main_btn py-1  rounded-md ">List</button>
      </div>
    </div>
  );
}
