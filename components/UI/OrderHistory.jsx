import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
  onValue,
  ref,
  query,
  orderByChild,
  equalTo,
  push,
} from "firebase/database";
import { db } from "@/services/firebase";
import { addressFormat } from "@/utils";
import { useRouter } from "next/router";

export default function OrderHistory() {
  const router = useRouter();
  const [orders, setOrders] = useState();

  const goToPayment = (id) => {
    router.push("/order/" + id);
  };

  useEffect(() => {
    const dbQuery = query(ref(db, "orders"));

    onValue(dbQuery, async (snapshot) => {
      const exist = snapshot.val();
      if (exist) {
        setOrders(exist);
      }
    });
  }, []);

  return (
    <div className="w-full max-w-[600px] rounded-lg shadow-sm shadow-black">
      <div className="grid grid-cols-12 px-3 py-2 dark:bg-primary-dark/20 bg-primary-light/20 rounded-t-lg">
        <div className="col-span-6">Order ID</div>
        <div className="col-span-3">Status</div>
        <div className="col-span-3">Date</div>
      </div>

      {orders ? (
        <div className="bg-primary-dark/10 rounded-b-lg px-1 py-1">
          {Object.keys(orders)
            .reverse()
            .map((key, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-12 px-3 mb-1.5 dark:hover:bg-primary-dark/30 hover:bg-primary-light/30 dark:bg-primary-dark/20 bg-primary-light/20 cursor-pointer items-center gap-2"
                  onClick={() => goToPayment(orders[key].orderId)}
                >
                  <div key={index + "id"} className="my-1 col-span-6 text-sm">
                    {addressFormat(orders[key].charge?.id + 48, 10)}
                  </div>
                  <div key={index + "status"} className="col-span-3">
                    {orders[key]?.paid ? (
                      <>
                        {orders[key]?.paid && orders?.files[0]?.completed ? (
                          <span className="text-sm text-green-500">
                            Completed
                          </span>
                        ) : (
                          <span className="text-sm text-green-500">Minted</span>
                        )}
                      </>
                    ) : (
                      <span className="text-sm text-red-500">No Action</span>
                    )}
                  </div>
                  <div key={index + "Date"} className="col-span-3 text-sm">
                    {new Date(
                      orders[key]?.charge?.created_at * 1000
                    ).toDateString()}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <>
          <div className="col-span-12">No Order Records Found.</div>
        </>
      )}
    </div>
  );
}
