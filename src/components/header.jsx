import { IoSearch } from "react-icons/io5";
import { FaWallet } from "react-icons/fa";

export default function Header() {
  return (
    <div className="h-[100px] container mx-auto flex items-center justify-between px-2">
      <p className=" text-4xl font-bold">LiteMAP</p>
      <div className="flex gap-4">
        <ul className="flex gap-4 items-center">
          <li className="cursor-pointer">Market</li>
          <li className="cursor-pointer">Inscribe</li>
          <li className="cursor-pointer">Wallet</li>
        </ul>
        <div className="sm:flex hidden  gap-2 hover:shadow hover:bg-white/30 px-3 py-1 hover:shadow-black backdrop-filter rounded-xl bg-main border border-transparent">
          <IoSearch className="text-2xl my-auto" />
          <input
            type="text"
            className="focus-visible:outline-none transition ease-in-out bg-transparent text-white hover:border-secondary"
          />
        </div>

        <button className="rounded-lg bg-main px-3 py-2 font-semibold flex gap-2 items-center hover:shadow hover:shadow-black hover:bg-white/30 transition ease-in-out duration-300">
          <FaWallet className="text-2xl my-auto" /> Connect Wallet
        </button>
      </div>
    </div>
  );
}
