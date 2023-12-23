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
import { useEffect } from "react";
import { onValue, ref, query, orderByChild, equalTo } from "firebase/database";
import { db } from "@/services/firebase";
import { useState } from "react";
import BillsOnPayment from "../../components/UI/BillsOnPayment";

const Payment = () => {
  const router = useRouter();
  const [ID, setID] = useState();
  const [data, setData] = useState();

  const goToHome = () => {
    router.push("/inscribe");
  };

  const getData = () => {
    const dbQuery = query(
      ref(db, "orders"),
      orderByChild("orderId"),
      equalTo(ID)
    );

    onValue(dbQuery, async (snapshot) => {
      const exist = snapshot.val();
      if (exist) {
        setData(exist[Object.keys(exist)[0]]);
      }
    });
  };

  useEffect(() => {
    if (router.asPath !== router.route) {
      setID(router?.query?.id);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (ID) {
      getData();
    }
  }, [ID]);

  return (
    <Layout>
      {data ? (
        <div className="py-[70px] flex justify-center relative px-2">
          <div className="px-4 py-16 w-full max-w-[600px] rounded-lg bg-primary/20 relative">
            <button
              className="border rounded-md p-1 px-3 absolute top-3 right-3 focus:outline-none hover:bg-primary/20"
              onClick={goToHome}
            >
              Close Order
            </button>

            <div className="pb-3 w-full">
              <h4 className="text-3xl text-center">Inscribe Order</h4>
              <p className="mt-3 p-2 text-center break-words">Order ID: </p>
              {/* <p className="break-words text-center mb-3">{data?.orderId}</p> */}
              <hr />
            </div>

            <div className="w-full bg-primary/10 rounded-lg p-3">
              <div className="flex flex-col items-center justify-center">
                <p className="text-center text-gray-300 text-sm py-2">
                  Scan the QRCode to pay:
                </p>
                <div className="bg-gray-200 p-2.5 rounded drop-shadow-md shadow-sm shadow-black border-b border-t border-r border-l border-gray-300">
                  <QRCode
                    className="p-2 bg-gray-50"
                    value={data?.order?.payment_address}
                    size={180}
                  />
                </div>
                <div className="pt-3 flex flex-col justify-center">
                  <p className="text-center text-gray-300 text-sm">
                    or Copy address below
                  </p>
                  <p className="text-center flex justify-center">
                    {data?.order?.payment_address}
                  </p>
                </div>

                <hr className="h-full" />

                {data && (
                  <BillsOnPayment
                    length={data?.blocks?.length ? data?.blocks?.length : 0}
                  />
                )}

                <p className="text-center text-gray-300 text-sm mt-4">
                  After payment is made, you will receive the inscription within
                  at least 20 minutes.
                </p>
                <a
                  href="https://bitpay.com/buy-litecoin/"
                  target="_blank"
                  className="underline hover:text-orange-400 transition ease-linear"
                >
                  Need LTC? Click here to buy some LTC!
                </a>
              </div>
            </div>

            <button className="w-full rounded-md py-2 px-3 main_btn my-3">
              Pay With Wallet.
            </button>
            <div className="my-3 flex justify-center">
              <Spinner />
            </div>
            <p className="text-[12px] pt-2 text-center">
              Order created at &nbsp;
              <Moment>
                {new Date(Number(data?.date) - 60000 * 60).toString()}
              </Moment>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-40">
          <Spinner />
        </div>
      )}
    </Layout>
  );
};

export default Payment;
