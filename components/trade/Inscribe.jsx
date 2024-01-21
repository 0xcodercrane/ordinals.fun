import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import { AiOutlineLoading } from "react-icons/ai";
import FeeRecommend from "../UI/FeeRecommend";
import { useContext } from "react";
import { WalletContext } from "../../context/wallet";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { LuPenLine } from "react-icons/lu";

export default function InscribeModal({
  modalIsOpen,
  setIsOpen,
  ticker,
  tokenSummary,
}) {
  const wallet = useContext(WalletContext);
  const address = wallet.getAddress();
  const [pendingTx, setPendingTx] = useState(false);
  const [inputAmount, setAmount] = useState();
  const [feeRate, setFeeRate] = useState("economy");
  const [rawTx, setRawTx] = useState();
  const [error, setError] = useState("");
  const [succeed, setSucceed] = useState(false);
  const [tx, setTx] = useState();
  const [disabled, setDisabled] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setError("");
    setDisabled(true);

    const amount = parseInt(inputAmount);
    if (!amount) {
      return;
    }

    if (!tokenSummary.tokenBalance) {
      return;
    }

    if (amount <= 0) {
      return;
    }

    if (amount > parseInt(tokenSummary.tokenBalance.availableBalanceSafe)) {
      setError("Insufficient Balance");
      return;
    }

    if (feeRate <= 0) {
      return;
    }

    if (address && ticker && amount.toString() && feeRate) {
      try {
        wallet
          .inscribeBRC20Transfer(
            "ltc1qlj5ey57k3x0h5hxvfxcny4h6sa468ac7f7mpru",
            ticker,
            amount.toString(),
            feeRate
          )
          .then((order) => {
            wallet
              .createBitcoinTx(
                { address: order.payAddress, domain: "" },
                order.totalFee,
                feeRate
              )
              .then((rawTxInfo) => {
                setRawTx(rawTxInfo);
                setDisabled(false);
              });
          });
      } catch (error) {
        toast.error(`${erro}r`);
      }
    }
  }, [inputAmount, feeRate, tokenSummary.tokenBalance, address, ticker]);

  const handleInscribe = async () => {
    setPendingTx(true);
    if (!rawTx) {
      return;
    }

    try {
      const txid = await wallet.pushTx(rawTx);
      await sleep(1); // Wait for transaction synchronization

      if (txid) {
        setSucceed(true);
        setTx(txid);
        toast.success("Your transaction has been sent successfully.");
      }
      setPendingTx(false);
    } catch (e) {
      setPendingTx(false);
      setSucceed(false);
      toast.error(`${e}`);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="cs-modal relative"
    >
      <div className="text-center text-2xl font-semibold">
        Inscribe {ticker}
      </div>

      <div className="mt-1">
        <div className="mb-1 w-full flex justify-between">
          <p className="text-gray-300"> Available:</p>{" "}
          <span
            className="cursor-pointer"
            onClick={() =>
              setAmount(tokenSummary.tokenBalance.availableBalance)
            }
          >
            {tokenSummary.tokenBalance.availableBalance} {ticker}
          </span>
        </div>
        <div className="flex gap-1">
          <input
            value={inputAmount}
            onChange={(e) => setAmount(e.target.value)}
            min={1}
            max={tokenSummary.tokenBalance.availableBalance}
            type="number"
            className="py-1 rounded-md bg-primary-dark/10 cs-border px-2 w-full"
            placeholder="Input Price"
          />
        </div>
        {error && <p className="text-red-400">{error}</p>}
      </div>

      <FeeRecommend feeOption={feeRate} setFeeOption={setFeeRate} />

      <div className="flex gap-2">
        <button
          className="main_btn w-full py-2 px-3 rounded-md mt-3"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
        <button
          disabled={disabled}
          className="main_btn w-full py-2 px-3 rounded-md mt-3 bg-sky-600 flex justify-center items-center gap-2"
          onClick={handleInscribe}
        >
          <LuPenLine /> Inscribe
        </button>
      </div>

      {pendingTx && (
        <div className="absolute top-0 left-0 w-full h-full bg-primary-dark/60 flex justify-center items-center">
          <AiOutlineLoading className="text-3xl font-semibold animate-spin" />
        </div>
      )}

      {succeed && (
        <div className="absolute top-0 left-0 w-full h-full bg-primary-dark  flex justify-center items-center">
          <div>
            <AiFillCheckCircle className="text-6xl font-semibold mx-auto text-green-600" />
            <a
              href={"https://litecoinspace.org/tx/" + tx}
              className="underline"
              target="_blank"
            >
              View Transaction
            </a>
          </div>
        </div>
      )}
    </Modal>
  );
}
