import { IoSearch } from "react-icons/io5";
import { FaWallet } from "react-icons/fa";

export default function Header() {
  return (
    <div className="h-[90px] container mx-auto flex items-center justify-between">
      <p className="text-primary text-3xl font-bold">LiTEMAP</p>
      <div className="flex gap-4">
        <div className="flex gap-2 hover:shadow px-3 py-1 hover:shadow-black backdrop-filter rounded-xl backdrop-blur-lg bg-secondary/80 border border-transparent">
          <IoSearch className="text-3xl my-auto" />
          <input
            type="text"
            className="focus-visible:outline-none transition ease-in-out bg-transparent text-white hover:border-secondary"
          />
        </div>
        <button className="rounded-lg bg-secondary px-3 py-2 font-semibold flex gap-2 items-center hover:shadow hover:shadow-black hover:bg-black/30 transition ease-in-out duration-300">
          <FaWallet className="text-2xl my-auto" /> Connect Wallet
        </button>
      </div>
    </div>
  );
}
