import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import FeeRecommend from "../UI/FeeRecommend";
import { FaScissors } from "react-icons/fa6";
import { useContext } from "react";
import { WalletContext } from "../../context/wallet";
import { toast } from "react-hot-toast";
import { AiFillCheckCircle, AiOutlineLoading } from "react-icons/ai";
import { useEffect } from "react";
import OutputValueBar from "../UI/OutputValueBar";

export default function SpliteModal({
  isNeedToSplit,
  isMultiStuck,
  modalIsOpen,
  setIsOpen,
  inscriptionDetails,
  inscription,
}) {
  const defaultOutputValue = inscription ? inscription.outputValue : 10000;
  const minOutputValue = 546;
  const wallet = useContext(WalletContext);
  const [feeRate, setFeeRate] = useState("economy");
  const [disabled, setDisabled] = useState(true);
  const [splitedCount, setSplitedCount] = useState(0);
  const [rawTxInfo, setRawTxInfo] = useState();
  const [outputValue, setOutputValue] = useState(defaultOutputValue);
  const [error, setError] = useState("");
  const [succeed, setSucceed] = useState(false);
  const [txId, setTxId] = useState("");
  const [pendingTx, setPendingTx] = useState(false);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const Split = async () => {
    if (!rawTxInfo) {
      toast.error("Please create raw tx befoe spliting");
      return;
    }

    try {
      setPendingTx(true);
      const txId = await wallet.pushTx(rawTxInfo);

      if (txId) {
        setSucceed(true);
        setTxId(txId);
        toast.success("Splited Successfully. Please check tx.");
      }
    } catch (error) {
      toast.error(`Spliting ERROR: ${error}`);
    }
    pendingTx(false);
  };

  useEffect(() => {
    if (!isNeedToSplit && !isMultiStuck) return;

    setDisabled(true);
    setError("");
    setSplitedCount(0);

    if (feeRate <= 0) {
      setError("Invalid fee rate");
      return;
    }

    if (!outputValue) {
      return;
    }

    if (outputValue < minOutputValue) {
      setError(`OutputValue must be at least ${minOutputValue}`);
      return;
    }

    wallet
      .createSplitTx(inscription.inscriptionId, feeRate, outputValue)
      .then((data) => {
        console.log(data);
        setRawTxInfo(data.rawTxInfo);
        setSplitedCount(data.splitedCount);
        setDisabled(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  }, [feeRate, outputValue]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="cs-modal relative"
    >
      <div className="text-center text-2xl font-semibold">
        Splite Inscriptoin.
      </div>

      <div className="my-1 text-sm text-center text-red-500">
        Multiple inscriptions are mixed mixed together. Please split them first.
      </div>

      <div className="grid grid-cols-4 gap-2">
        {inscriptionDetails &&
          inscriptionDetails?.inscriptions.map((splitIterm, key) => {
            return (
              <div
                key={key + "spliteIterm"}
                className="mx-auto w-full rounded-md bg-primary-contentDark text-sm flex justify-center items-center p-2"
                style={{ overflowWrap: "anywhere" }}
              >
                {splitIterm?.contentType.indexOf("image") > -1 && (
                  <>
                    <img
                      src={`https://ordinalslite.com/content/${splitIterm?.inscriptionId}`}
                      className="w-full h-full object-contain mx-auto max-w-[300px]"
                      alt=""
                    />
                  </>
                )}

                {splitIterm?.contentType.indexOf("text") > -1 && (
                  <>
                    {content.indexOf("tick") > -1 ? (
                      <div className="text-3xl font-bold px-3">
                        {JSON.parse(content).tick}
                      </div>
                    ) : (
                      <div className="text-3xl font-bold px-3">{content}</div>
                    )}
                  </>
                )}
              </div>
            );
          })}
      </div>

      <OutputValueBar
        defaultValue={minOutputValue}
        onChange={(val) => {
          setOutputValue(val);
        }}
      />

      <FeeRecommend feeOption={feeRate} setFeeOption={setFeeRate} />

      {error && <p className="my-2 text-red-500 text-center">{error}</p>}

      {inscriptionDetails &&
        inscriptionDetails.inscriptions.length > 1 &&
        splitedCount > 0 && (
          <p className="mb-2"> {`Spliting to ${splitedCount} UTXO`} </p>
        )}

      <div className="flex gap-2">
        <button
          className="main_btn w-full py-2 px-3 rounded-md mt-3"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          disabled={disabled || !rawTxInfo}
          className="main_btn w-full py-2 px-3 rounded-md mt-3 bg-sky-600 flex justify-center gap-2 items-center"
          onClick={Split}
        >
          <FaScissors className="text-lg" /> Split
        </button>
      </div>

      {pendingTx && (
        <div className="absolute top-0 left-0 w-full h-full bg-primary-light/60 dark:bg-primary-dark/60 flex justify-center items-center">
          <AiOutlineLoading className="text-3xl font-semibold animate-spin" />
        </div>
      )}

      {succeed && (
        <div className="absolute top-0 left-0 w-full h-full bg-primary-light dark:bg-primary-dark flex justify-center items-center">
          <div>
            <AiFillCheckCircle className="text-6xl font-semibold mx-auto text-green-600" />
            <a
              href={"https://litecoinspace.org/tx/" + txId}
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
