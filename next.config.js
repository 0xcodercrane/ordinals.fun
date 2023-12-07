/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/blocks/:slug*",
        destination: "https://blockchain.info/:slug*",
      },
      {
        source: "/mempool/:slug*",
        destination: "https://mempool.space/:slug*",
      },
      {
        source: "/ipfs/:slug*",
        destination: "https://ipfs.io/ipfs/:slug*",
      },
      {
        source: "/unisat/:slug*",
        destination: "https://api.unisat.io/basic-v4/:slug*",
      },
      {
        source: "/apirone/:slug*",
        destination: "https://apirone.com/api/v2/:slug*",
      },
      {
        source: "/bitcoin/:slug*",
        destination: "https://blockchain.info/:slug*",
      },
      {
        source: "/ordinal/:slug*",
        destination: "https://api2.ordinalsbot.com/:slug*",
      },
      {
        source: "/ord/:slug*",
        destination: "https://www.ord.io/api/:slug*",
      },
      {
        source: "/dexscreener",
        destination:
          "https://io.dexscreener.com/dex/log/amm/uniswap/all/base/0xeAA13b4f85A98E6CcaF65606361BD590e98DE2Cb?q=0x4200000000000000000000000000000000000006",
      },
    ];
  },
};

module.exports = nextConfig;
