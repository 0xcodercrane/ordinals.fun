import React, { useEffect } from "react";
import { useState } from "react";
import { onValue, ref, query, orderByChild, equalTo } from "firebase/database";
import { db } from "@/services/firebase";
import { addressFormat } from "@/utils";
import { useRouter } from "next/router";
import { useContext } from "react";
import { WalletContext } from "@/context/wallet";

export default function History() {
  const router = useRouter();
  const wallet = useContext(WalletContext);
  const address = wallet.getAddress();
  const [orders, setOrders] = useState();
  const [fetchingData, setFetchingData] = useState(true);
  const [trades, setTrades] = useState([]);

  const goToPayment = (id) => {
    router.push("/order/" + id);
  };

  useEffect(() => {
    if (address) {
      setFetchingData(true);
      const dbQuery = query(
        ref(db, "orders"),
        orderByChild("receiveAddress"),
        equalTo(address)
      );

      onValue(dbQuery, async (snapshot) => {
        const exist = snapshot.val();
        if (exist) {
          setOrders(exist);
        }
      });

      const dbQueryForTags = query(ref(db, "tags"));

      onValue(dbQueryForTags, async (snapshot) => {
        const exist = snapshot.val();
        if (exist) {
          Object.keys(exist).map((index) => {
            const tag = exist[index];
            const dbQuery = query(
              ref(db, "market/" + tag),
              orderByChild("seller"),
              equalTo(address)
            );
            onValue(dbQuery, async (snapshot) => {
              const exist = snapshot.val();
              if (exist) {
                setTrades({ [tag]: exist });
              }
              setFetchingData(false);
            });
          });
        }
      });
    }
  }, [address]);

  console.log(trades);

  return (
    <div className="w-full mt-8">
      <div>
        <div className="grid grid-cols-12 px-3 py-2 bg-primary-dark/20 rounded-t-lg">
          <div className="col-span-6">Content</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-3">Date</div>
        </div>
        {trades && !fetchingData ? (
          <div className="bg-[#14496c33] rounded-b-lg px-1 py-1  max-h-[500px] overflow-y-scroll">
            {Object.keys(trades).map((tag, index) => {
              return (
                <div key={index}>
                  <p className="font-semibold text-lg">
                    -{tag}
                  </p>

                  {Object.keys(trades[tag])
                    .reverse()
                    .map((tradekey, index) => {
                      return (
                        <div
                          key={index}
                          className="grid grid-cols-12 px-3 mb-1.5 bg-[#19679d54] hover:bg-[#246da1cb] cursor-pointer items-center gap-2 py-1"
                        >
                          <div className="my-1 col-span-6 text-sm">
                            {trades[tag][tradekey].content}
                          </div>
                          <div className="col-span-3">
                            {trades[tag][tradekey]?.paid == true ? (
                              <>
                                <span className="text-sm text-green-500">
                                  Sold
                                </span>
                              </>
                            ) : (
                              <span className="text-sm text-sky-500">
                                Listed
                              </span>
                            )}
                          </div>
                          <div
                            key={index + "Date"}
                            className="col-span-3 text-sm"
                          >
                            {new Date(
                              trades[tag][tradekey]?.date
                            ).toDateString()}
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {fetchingData ? (
              <div className="col-span-12 text-center py-3 bg-primary-dark/10">
                Fetching order records...
              </div>
            ) : (
              <div className="col-span-12 text-center py-3 bg-primary-dark/10">
                No Order Records are Founded.
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-12 px-3 py-2 bg-primary-dark/20 rounded-t-lg">
          <div className="col-span-6">Order ID</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-3">Date</div>
        </div>
        {orders && !fetchingData ? (
          <div className="bg-[#14496c33] rounded-b-lg px-1 py-1  max-h-[500px] overflow-y-scroll">
            {Object.keys(orders)
              .reverse()
              .map((key, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-12 px-3 mb-1.5 bg-[#19679d54] hover:bg-[#246da1cb] cursor-pointer items-center gap-2 py-1"
                    onClick={() => goToPayment(orders[key].orderId)}
                  >
                    <div key={index + "id"} className="my-1 col-span-6 text-sm">
                      {addressFormat(orders[key].orderId, 10)}
                    </div>
                    <div key={index + "status"} className="col-span-3">
                      {orders[key]?.paid == true ? (
                        <>
                          <span className="text-sm text-green-500">Paid</span>
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
            {fetchingData ? (
              <div className="col-span-12 text-center py-3 bg-primary-dark/10">
                Fetching order records...
              </div>
            ) : (
              <div className="col-span-12 text-center py-3 bg-primary-dark/10">
                No Order Records are Founded.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
