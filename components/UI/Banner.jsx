import React from "react";
import { useMintedBlocksFromAPI, useWallet } from "../../store/hooks";

export default function Banner({ lastBlock }) {
  const { price } = useWallet();
  const { mintedBlockNumber } = useMintedBlocksFromAPI();

  return (
    <div className="text-4xl text-center py-4">
      <h2>Inscribe LiteMap</h2>
      <p className="text-sm text-center w-full max-w-[900px] my-3 mx-auto lg:px-[150px]">
        Inscribe litemaps & list them to market. LGH!
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-lg">
        <div>
          <p className="font-semibold">{lastBlock}</p>
          <p className="text-sm text-gray-300 ">
            Lastest Block
          </p>
        </div>
        <div>
          <p className="font-semibold">{lastBlock - mintedBlockNumber}</p>
          <p className="text-sm text-gray-300 ">
            Available Blocks
          </p>
        </div>
        <div>
          <p className="font-semibold">{mintedBlockNumber}</p>
          <p className="text-sm text-gray-300 ">Minted</p>
        </div>
        <div>
          <p className="font-semibold"> ~$ {Number(price).toFixed(2)}</p>
          <p className="text-sm text-gray-300 ">LTC Price</p>
        </div>
      </div>
    </div>
  );
}
