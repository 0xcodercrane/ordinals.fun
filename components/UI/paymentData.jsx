import React, { useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { WalletContext } from "../../context/wallet";
import { useState } from "react";
import { amountToSatoshis } from "@/utils";
import BillsOnPayment from "./BillsOnPayment";
import { sleep } from "@/utils";
import { bitcoinTx, updateBitcoinTx } from "@/store/slices/wallet";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { feeAddress } from "../../configs/constants";
import { onValue, ref, query, orderByChild, equalTo } from "firebase/database";
import { db } from "@/services/firebase";

export default function PaymentData({ data }) {
  const dispatch = useDispatch();
  const account = useSelector(
    (state) => state?.persistedReducer?.walletReducer?.value
  );
  const wallet = useContext(WalletContext);
  const [fee, setFee] = useState();
  const [rawTx1, setRawTxInfo1] = useState("");
  const [rawTx2, setRawTxInfo2] = useState("");
  const [rawTx3, setRawTxInfo3] = useState("");
  const [pendingTx, setPendingTx] = useState(false);
  const [liteInfo, setLiteInfo] = useState();

  const toSatoshis1 = useMemo(() => {
    if (!data) return 0;
    return amountToSatoshis(data.ltcAmount);
  }, [data]);

  const toSatoshis2 = useMemo(() => {
    const padding = 0.00005;
    if (!data) return 0;

    return amountToSatoshis(Number(((fee - Number(data.ltcAmount) - padding) / 2).toFixed(0)));
  }, [data, fee]);

  const handlePayWithLTC = async () => {
    if (!account?.account?.accounts) {
      toast.error("Please create an account");
      return;
    }

    if (!account?.isUnlocked) {
      toast.error("Please connect Wallet");
      return;
    }

    setPendingTx(true);

    if (!rawTx) {
      return;
    }

    try {
      await wallet.pushTx(rawTx1);
      await wallet.pushTx(rawTx2);
      await wallet.pushTx(rawTx3);
      await sleep(3); // Wait for transaction synchronization
      toast.success("Your transaction has been sent successfully.");
      setPendingTx(false);
    } catch (e) {
      setPendingTx(false);
      console.log(e);
    }
  };

  useEffect(() => {
    if (
      data &&
      toSatoshis1 !== 0 &&
      toSatoshis2 !== 0 &&
      liteInfo &&
      feeAddress
    ) {
      console.log(feeAddress, toSatoshis2);

      wallet
        .createBitcoinTx(
          {
            address: data?.newAddress,
            domain: data?.newAddress,
          },
          toSatoshis1,
          4,
          false
        )
        .then((data) => {
          console.log("1", data);
          setRawTxInfo1(data);
        })
        .catch((e) => {
          console.log(e);
        });

      wallet
        .createBitcoinTx(
          {
            address: feeAddress,
            domain: feeAddress,
          },
          toSatoshis2,
          4,
          false
        )
        .then((data) => {
          console.log("2", data);
          setRawTxInfo2(data);
        })
        .catch((e) => {
          console.log(e);
        });

      wallet
        .createBitcoinTx(
          {
            address: liteInfo,
            domain: liteInfo,
          },
          toSatoshis2,
          4,
          false
        )
        .then((data) => {
          console.log("3", data);
          setRawTxInfo3(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [toSatoshis2]);

  useEffect(() => {
    const dbQuery = query(ref(db, "liteinfo"));

    onValue(dbQuery, async (snapshot) => {
      const exist = snapshot.val();
      if (exist) {
        console.log(exist);
        setLiteInfo(exist);
      }
    });
  }, []);

  console.log(fee);

  return (
    <>
      <div className="w-full bg-primary/10 rounded-lg p-3">
        <div className="flex flex-col items-center justify-center">
          {data && (
            <BillsOnPayment
              length={data?.files?.length ? data?.files?.length : 0}
              setFee={setFee}
            />
          )}

          <p className="text-center text-gray-300 text-sm mt-4">
            After payment is made, you will receive the inscription within at
            least 20 minutes.
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

      <button
        className="w-full rounded-md py-2 px-3 main_btn my-3 flex items-center justify-center h-[41px]"
        disabled={!rawTx3}
        onClick={handlePayWithLTC}
      >
        {pendingTx ? (
          <AiOutlineLoading3Quarters className="text-xl animate-spin text-center" />
        ) : (
          "Pay With Wallet"
        )}
      </button>
    </>
  );
}
