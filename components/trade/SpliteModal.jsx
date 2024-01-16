import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import FeeRecommend from "../UI/FeeRecommend";

export default function SpliteModal({
  modalIsOpen,
  setIsOpen,
  content,
  inscription,
}) {
  const [feeRate, setFeeRate] = useState("economy");

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    setTx("");
  }

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

      <div className="my-1 text-sm text-center text-yellow-500">
        Please split inscription if you got the error{" "}
        <span className="text-red-500">( Multiple inscriptions are
        mixed together) </span>{" "}
        when you are transfering or listing.
      </div>

      <div
        className="mx-auto w-full h-32 rounded-md bg-primary-contentDark text-xl flex justify-center items-center my-3 p-2"
        style={{ overflowWrap: "anywhere" }}
      >
        {inscription?.contentType.indexOf("image") > -1 && (
          <>
            <img
              src={`https://ordinalslite.com/content/${inscription?.inscriptionId}`}
              className="w-full h-full object-contain mx-auto max-w-[300px]"
              alt=""
            />
          </>
        )}

        {inscription?.contentType.indexOf("text") > -1 && (
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

      <FeeRecommend feeOption={feeRate} setFeeOption={setFeeRate} />
      <div className="flex gap-2">
        <button
          className="main_btn w-full py-2 px-3 rounded-md mt-3"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        <button className="main_btn w-full py-2 px-3 rounded-md mt-3 bg-sky-600">
          Splite
        </button>
      </div>
    </Modal>
  );
}
