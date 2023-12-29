import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Moment from "react-moment";
import Layout from "@/components/sections/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { onValue, ref, query, orderByChild, equalTo } from "firebase/database";
import { db } from "@/services/firebase";
import { useState } from "react";
import LongSentence from "../../components/UI/LongSentence";
import PaymentData from "../../components/UI/paymentData";

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
              <LongSentence text={data?.orderId} />
              <hr />
            </div>

            <PaymentData data={data}/>

            <div className="my-3 flex justify-center">
              <Spinner />
            </div>
            <p className="text-[12px] pt-2 text-center">
              Order created at &nbsp;
              <Moment>
                {new Date(Number(data?.createdAt) - 60000 * 60).toString()}
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
