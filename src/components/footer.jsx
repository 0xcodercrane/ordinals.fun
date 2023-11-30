import { FaDiscord, FaMedium, FaTelegram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="h-[90px] flex items-center justify-between container mx-auto">
      <p>@2023 Lite Map ( v1.0 ) All Rights Reserved.</p>
      <div className="flex gap-2">
        <a className="flex justify-center items-center p-2 rounded-full bg-secondary hover:bg-black/30 border border-transparent hover:border-br hover:shadow hover:shadow-black transition ease-in-out duration-300" href="http://">
          <FaDiscord className="text-xl"/>
        </a>
        <a className="flex justify-center items-center p-2 rounded-full bg-secondary hover:bg-black/30 border border-transparent hover:border-br hover:shadow hover:shadow-black transition ease-in-out duration-300" href="http://">
          <FaTelegram className="text-xl"/>
        </a>
        <a className="flex justify-center items-center p-2 rounded-full bg-secondary hover:bg-black/30 border border-transparent hover:border-br hover:shadow hover:shadow-black transition ease-in-out duration-300" href="http://">
          <FaTwitter className="text-xl"/>
        </a>
        <a className="flex justify-center items-center p-2 rounded-full bg-secondary hover:bg-black/30 border border-transparent hover:border-br hover:shadow hover:shadow-black transition ease-in-out duration-300" href="http://">
          <FaMedium className="text-xl"/>
        </a>
        <a className="flex justify-center items-center p-2 rounded-full bg-secondary hover:bg-black/30 border border-transparent hover:border-br hover:shadow hover:shadow-black transition ease-in-out duration-300" href="http://">
          <FaYoutube className="text-xl"/>
        </a>
      </div>
    </div>
  );
}
