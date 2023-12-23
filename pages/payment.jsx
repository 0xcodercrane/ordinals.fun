import React from "react";
import styles from "@/styles/inscribe.module.css";
import QRCode from "react-qr-code";
import { FaCopy, FaCheck } from "react-icons/fa";
import Countdown from "react-countdown";
import Spinner from "react-bootstrap/Spinner";
import Moment from "react-moment";
import { feeAmount } from "@/configs/constants";
import Layout from "@/components/sections/Layout";
import { useRouter } from "next/router";

const Payment = () => {
  const router = useRouter();
  const goToHome = () => {
    router.push("/inscribe");
  };

  return (
    <Layout>
      <div className="py-24 flex justify-center relative">
        <div className="px-4 py-16 w-full max-w-[600px] rounded-lg bg-primary/20 relative">
          <button
            className="border rounded-md p-1 px-3 absolute top-3 right-3 focus:outline-none hover:bg-primary/20"
            onClick={goToHome}
          >
            Close Order
          </button>

          <div className="pb-3 w-full">
            <h4 className="text-3xl text-center">Inscribe Order</h4>
            <div className="my-2 p-2 text-center  border-b border-gray-500 overflow-x-hidden">
              Order ID: 7316f211d38dc44a242884eb561631d6968a351d
            </div>
          </div>

          <div className="w-full bg-primary/10 rounded-lg p-3">
            <div className="flex gap-1 justify-between">
              <div>Service Fee : </div>
              <div>234</div>
            </div>

            <div className="flex gap-1 justify-between">
              <div>Network Fee : </div>
              <div>234</div>
            </div>

            <div className="flex gap-1 justify-between">
              <div>Overhead : </div>
              <div>234</div>
            </div>

            <div className="flex gap-1 justify-between">
              <div>Total Amount : </div>
              <div className="flex items-center">
                <span className="text-lg ml-1">234 LTC</span> 234234 sats
              </div>
            </div>

            <div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-center text-gray-300 text-sm py-2">
                  Scan the QRCode to pay:
                </p>
                <div className="bg-gray-200 p-2.5 rounded drop-shadow-md shadow-sm shadow-black border-b border-t border-r border-l border-gray-300">
                  <QRCode
                    className="p-2 bg-gray-50"
                    value={"345345345"}
                    size={180}
                  />
                </div>
                <div className="pt-3 flex flex-col justify-center">
                  <p className="text-center text-gray-300 text-sm">
                    or Copy address below
                  </p>
                  <p className="text-center flex justify-center">
                    sdfgsdgf ... edfgsdfg
                    <span></span>
                  </p>
                </div>
                <p className="text-center text-gray-300 text-sm mt-4">
                  After payment is made, you will receive the inscription within
                  at least 20 minutes.
                </p>
                <a
                  href="https://bitcoin.org/en/buy"
                  target="_blank"
                  className="underline hover:text-orange-400 transition ease-linear"
                >
                  Need LTC? Click here to buy some LTC!
                </a>
              </div>
            </div>
          </div>

          <button className="w-full rounded-md py-2 px-3 main_btn my-3">
            Pay With Wallet.
          </button>
          {/* <div className="my-3 flex justify-center">
            <Spinner />
          </div> */}
          <p className="text-[12px] pt-2 text-center">
            Order created at &nbsp;
            <Moment>
              {new Date(Number(1703175931525) - 60000 * 60).toString()}
            </Moment>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
