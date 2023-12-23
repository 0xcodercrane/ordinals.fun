import React from "react";
import { AiFillWarning } from "react-icons/ai";
import { currentPrice } from "@/utils";
import { useState } from "react";

export default function BillsOnPayment({ length }) {
  const [price, setprice] = useState(71);

  const inscribeFee = length * 12000;
  const serviceFee = Number((length * (610000 + 10 ** 8 / price)).toFixed(0));
  const sizeFee = length * 19;
  const totalFee = Number((inscribeFee + serviceFee + sizeFee).toFixed(0));

  currentPrice().then((val) => {
    setprice(val);
  });

  return (
    <>
      <hr className="w-[90%] mt-3" />
      <div className="mt-2">
        <div className="grid grid-cols-2 font-light py-1 text-sm">
          <p className="text-right pr-2 ">Sats In Inscription:</p>
          <p className="text-left pl-2 ">
            {length} * 12000 sats
            <span className="text-[11px] text-gray-300">
              &nbsp; ~$&nbsp;
              {((inscribeFee / 10 ** 8) * price).toFixed(2)}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 font-light py-1  text-sm">
          <p className="text-right pr-2">Service Fee:</p>
          <p className="text-left pl-2">
            {serviceFee} sats
            <span className=" text-[11px] text-gray-300">
              {" "}
              &nbsp;~$ {((serviceFee / 10 ** 8) * price).toFixed(2)}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 font-light py-1  text-sm">
          <p className="text-right pr-2">Size Fee:</p>
          <p className="text-left pl-2">
            {sizeFee} sats
            <span className=" text-[11px] text-gray-300">
              {" "}
              &nbsp;~$ {((sizeFee / 10 ** 8) * price).toFixed(2)}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 font-light py-1  text-sm">
          <p className="text-right pr-2">=</p>
          <p className="text-left pl-2">
            <span className="line-through"> {totalFee}</span> sats
            <span className=" text-[11px] text-gray-300">
              {" "}
              &nbsp;~$ {((totalFee / 10 ** 8) * price).toFixed(2)}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 font-light py-1 mt-3  text-sm">
          <p className="text-right pr-2">Total Amount To Pay:</p>
          <p className="text-left pl-2">
            {totalFee - (totalFee % 1000)} sats
            <span className=" text-[11px] text-gray-300">
              {" "}
              &nbsp;~${" "}
              {(((totalFee - (totalFee % 1000)) / 10 ** 8) * price).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
