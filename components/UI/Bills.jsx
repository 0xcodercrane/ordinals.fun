import React from "react";
import { AiFillWarning } from "react-icons/ai";
import { currentPrice } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { updateFee } from "@/store/slices/inscribe";

export default function Bills() {
  const dispatch = useDispatch();
  const inscribe = useSelector(
    (state) => state?.persistedReducer?.inscribeReducer?.value
  );
  const [price, setprice] = useState(71);
  const [inscribeFee, setInscribeFee] = useState(0);
  const [serviceFee, setServceFee] = useState(0);
  const [sizeFee, setSizeFee] = useState(0);
  const [totalFee, setToTalFee] = useState(0);

  useEffect(() => {
    const length = inscribe.selectedBlock.length;
    const inFee = length * 12000;
    const seFee = length * (610000 + 10 ** 8 / price);
    const siFee = length * 19;
    const toFee = inFee + seFee + siFee;

    setInscribeFee(inFee);
    setServceFee(Number(seFee.toFixed(0)));
    setSizeFee(siFee);
    setToTalFee(Number(toFee.toFixed(0)));
  }, [price, inscribe]);

  useEffect(() => {
    currentPrice().then((val) => {
      setprice(val);
    });
  }, []);

  return (
    <>
      <hr className="w-[80%] mt-3 mx-auto" />
      <div className="pt-2">
        <div className="grid grid-cols-2 font-light py-1 text-sm">
          <p className="text-right pr-2 ">Sats In Inscription:</p>
          <p className="text-left pl-2 ">
            {inscribe.selectedBlock.length} * 12000 sats
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
          <p className="text-right pr-2">Total Fee:</p>
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

      <div className="text-sm font-extralight flex justify-center w-full mt-3">
        <p className="flex gap-1">
          <AiFillWarning className="text-lg ml-auto" />
          Please note the inscribing transaction delivers the inscription to the
          receiving address directly.
        </p>
      </div>
    </>
  );
}
