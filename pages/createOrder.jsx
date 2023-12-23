import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FeeRecommend from "@/components/UI/FeeRecommend";
import InscriptionList from "@/components/InscriptionList";
import Layout from "@/components/sections/Layout";
import Bills from "@/components/UI/Bills";
import { useRouter } from "next/router";
import InputAddress from "../components/UI/InputAddress";
import { useDispatch, useSelector } from "react-redux";
import { updateFeeRate } from "@/store/slices/inscribe";
import { useContext } from "react";
import WalletContext from "../context/wallet";
import { toast } from "react-hot-toast";
import openApi from "@/services/openAPI";
import { currentPrice } from "@/utils";
import { v4 as uuidv4 } from "uuid";
import {
  onValue,
  ref,
  query,
  orderByChild,
  equalTo,
  push,
} from "firebase/database";
import { db } from "@/services/firebase";
import OrderHistory from "../components/UI/OrderHistory";

const CreateOrder = () => {
  const router = useRouter();
  // const account = useSelector(
  //   (state) => state?.persistedReducer?.walletReducer?.value
  // );
  // const wallet = useContext(WalletContext);
  const inscribe = useSelector(
    (state) => state?.persistedReducer?.inscribeReducer?.value
  );
  const dispatch = useDispatch();
  const [feeOption, setFeeOption] = useState("economy");
  const [price, setprice] = useState(71);

  currentPrice().then((val) => {
    setprice(val);
  });

  const calculateFee = () => {
    const length = inscribe.selectedBlock.length;
    const inFee = length * 12000;
    const seFee = Number(length * (610000 + 10 ** 8 / price).toFixed(0));
    const siFee = length * 19;
    const toFee = Number((inFee + seFee + siFee).toFixed(0));

    return {
      inscribeFee: inFee,
      serviceFee: seFee,
      sizeFee: siFee,
      totalFee: toFee - (toFee % 1000),
    };
  };

  const placeOrder = async () => {
    if (inscribe.selectedBlock <= 0) {
      toast.error("Please select blocks to inscribe");
      return;
    }

    const fee = calculateFee();
    // const createOrder = await openApi.createOrder();
    const order = {
      order: "QYk8ro",
      amount_to_pay: "1010000",
      payment_address: "Lc5bWY7WtVXX7HuAURJdQgfqXzbohnVQgh",
    };
    const newOrderId = uuidv4();

    const data = {
      fee: fee,
      order: order,
      orderId: newOrderId,
      date: Date.now(),
      blocks: inscribe.selectedBlock,
      minted: false,
      maker: "",
    };

    const dbRef = ref(db, "/orders");
    push(dbRef, data)
      .then(() => {
        router.push("/order/" + newOrderId);
      })
      .catch((error) => {
        console.error("Error saving transaction:", error);
      });
  };

  const backToInscribe = () => {
    router.push("/inscribe");
  };

  const handleChangeFeeOption = (e) => {
    dispatch(updateFeeRate(e));
  };

  return (
    <Layout>
      <div className="py-16 flex justify-center relative">
        <div className="w-full max-w-[600px] bg-primary/20 px-4 py-8 rounded-lg relative">
          <div
            className="absolute px-2 py-1 rounded top-2 left-2 z-10 text-sm cursor-pointer"
            onClick={backToInscribe}
          >
            <FaArrowLeft className="text-lg mt-3" />
          </div>
          <div className="py-2">
            <h2 className="text-center text-2xl mb-3">Inscribe LiteMap</h2>
          </div>
          <InscriptionList />
          <InputAddress />
          <FeeRecommend
            feeOption={feeOption}
            setFeeOption={setFeeOption}
            onChange={handleChangeFeeOption}
          />
          <Bills />
          <button
            className="main_btn py-2 px-3 w-full mt-6 rounded-md"
            onClick={placeOrder}
          >
            Submit & Pay Invoice
          </button>
        </div>
      </div>

      <OrderHistory />
    </Layout>
  );
};

export default CreateOrder;
