import Link from "next/link";
import React from "react";

export default function BuyCardSkelenton() {
  return (
    <div className="in-card">
      <div className="in-content animate-pulse">
        <button disabled className="in-transfer">
          #000000
        </button>
      </div>
      <hr className="mb-2" />
      <div className="flex justify-between gap-1 text-sm">
        <p>Seller:</p>
        <p></p>
      </div>
      <div className="flex justify-between gap-1 mb-2 text-sm">
        <p>Price:</p>
        <p></p>
      </div>
      <button className="main_btn py-1 rounded-md w-full h-8">Buy</button>
    </div>
  );
}
