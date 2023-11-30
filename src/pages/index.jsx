import Layout from "@/layout/layout";
import Coincard from "@/components/coincard";
import Pagination from "@/components/pagination";

const  CoinCardRepeat = () => {
  const repeatTime = 10;
  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < repeatTime; i++) {
      components.push(<Coincard />);
    }
    return components;
  };

  return renderComponents();
};

export default function Home() {
  
  return (
    <Layout>
      <div className="py-6">
        <div className="flex gap-2">
          <img src="/img/basedOwl.png" alt="" className="w-12 h-12" />
          <p className="my-auto text-2xl font-semibold">Litemap</p>
        </div>
        <div className="grid grid-cols-9 gap-3 px-2 my-4 max-sm:grid-cols-3 md:grid-cols-9">
          <div className="px-2 py-1 rounded-lg bg-secondary backdrop-blur-md bg-secondary/80">
            <p className="flex items-center gap-1 font-semibold">
              <img src="/img/lite.svg" className="w-4 h-4" alt="" />
              0.0000000025
            </p>
            <p className="text-gray-400">Price</p>
          </div>
          <div className="px-2 py-1 rounded-lg bg-secondary backdrop-blur-md bg-secondary/80">
            <p className="flex items-center gap-1 font-semibold text-green-600">
              177.78%
            </p>
            <p className="text-gray-400">24h %</p>
          </div>
          <div className="px-2 py-1 rounded-lg bg-secondary backdrop-blur-md bg-secondary/80">
            <p className="flex items-center gap-1 font-semibold">
              <img src="/img/lite.svg" className="w-4 h-4" alt="" />
              865,560
            </p>
            <p className="text-gray-400">Volume (24h)</p>
          </div>
          <div className="px-2 py-1 rounded-lg bg-secondary backdrop-blur-md bg-secondary/80">
            <p className="flex items-center gap-1 font-semibold">
              <img src="/img/lite.svg" className="w-4 h-4" alt="" />
              1,216,495
            </p>
            <p className="text-gray-400">Total volume</p>
          </div>
          <div className="px-2 py-1 rounded-lg bg-secondary backdrop-blur-md bg-secondary/80">
            <p className="flex items-center gap-1 font-semibold">
              <img src="/img/lite.svg" className="w-4 h-4" alt="" />
              25e-12
            </p>
            <p className="text-gray-400">Price</p>
          </div>
          <div className="px-2 py-1 rounded-lg bg-secondary backdrop-blur-md bg-secondary/80">
            <p className="flex items-center gap-1 font-semibold">$819.7k</p>
            <p className="text-gray-400">Market Cap</p>
          </div>
          <div className="px-2 py-1 rounded-lg bg-secondary backdrop-blur-md bg-secondary/80">
            <p className="flex items-center gap-1 font-semibold">4200 B</p>
            <p className="text-gray-400">Total supply</p>
          </div>
          <div className="px-2 py-1 rounded-lg bg-secondary backdrop-blur-md bg-secondary/80">
            <p className="flex items-center gap-1 font-semibold">100%</p>
            <p>Minted</p>
          </div>
          <div className="px-2 py-1 rounded-lg bg-secondary backdrop-blur-md bg-secondary/80">
            <p className="flex items-center gap-1 font-semibold">17,340%</p>
            <p>Holders</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3 mt-8 lg:grid-cols-5 md:grid-cols-3 max-sm:grid-cols-1">
          {CoinCardRepeat()}
        </div>
        <Pagination/>
      </div>
    </Layout>
  );
}
