import React from "react";

export default function Tabs({ type, setType, loading }) {
  return (
    <div className="flex items-center cs-border rounded-t-md divide-x divide-gray-500/80">
      <button
        disabled={loading}
        className={`py-2 sm:px-2.5 lg:w-24 h-full w-[63px] text-sm rounded-none rounded-tl-md ${
          type == "litemap" ? "main_btn" : ""
        }`}
        onClick={() => {
          setType("litemap");
        }}
      >
        LiteMaps
      </button>
      <button
        disabled={loading}
        className={`py-2 sm:px-2.5 lg:w-24 h-full w-[63px] text-sm  rounded-none ${
          type == "ltc20" ? "main_btn" : ""
        }`}
        onClick={() => {
          setType("ltc20");
        }}
      >
        LTC-20
      </button>
      <button
        disabled={loading}
        className={`py-2 sm:px-2.5 lg:w-24 h-full w-[63px] text-sm rounded-none ${
          type == "nfts" ? "main_btn" : ""
        }`}
        onClick={() => {
          setType("nfts");
        }}
      >
        NFTs
      </button>
      <button
        disabled={loading}
        className={`py-2 sm:px-2.5 lg:w-24 h-full w-[63px] text-sm rounded-none  rounded-tr-md ${
          type == "history" ? "main_btn" : ""
        }`}
        onClick={() => {
          setType("history");
        }}
      >
        History
      </button>
    </div>
  );
}
