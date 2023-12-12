import React from "react";

export default function WalletUnlock({ setType }) {
  return (
    <div className="p-4 rounded-lg bg-white/5 text-white backdrop-blur-xl">
      <p className="my-8 font-semibold text-center text-2xl">
        Enter your wallet password
      </p>
      <input
        type="password"
        placeholder="Enter password."
        className="mt-3 bg-transparent border border-white/20 rounded-lg w-full py-2 px-3"
      />

      <div className="flex justify-between gap-3 mt-6">
        <button
          className="py-2.5 px-4 rounded-lg main_btn mx-auto w-full mt-6"
          onClick={() => setType(4)}
        >
          Unlock
        </button>
      </div>
    </div>
  );
}
