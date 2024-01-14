import React from "react";
import { CgWebsite } from "react-icons/cg";
import { FaTwitter } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { useRouter } from "next/router";

export default function CollectionTr({ index, collection }) {
  const router = useRouter();

  const goToNFTPage = () => {
    router.push(`/collection/${collection.slug}`);
  };

  return (
    <tr
      className="transition-all ease-in-out hover:bg-primary-dark/30 cursor-pointer px-[6px!important] my-[4px!important]"
      onClick={goToNFTPage}
    >
      <td className="py-2 pl-3 pr-2">{index + 1}</td>
      <td className="py-2">
        {collection?.inscription_icon ===
        "9278bd914fdc07f866fc4b4e402c87a0aa04666cfc9f0c9dde6ead58b17abcf7i0" ? (
          <img
            src={`/litecoin.png`}
            className="rounded-md h-[60px] w-[60px]"
            alt="logo"
          />
        ) : (
          <img
            src={`https://ordinalslite.com/content/${collection?.inscription_icon}`}
            className="rounded-md h-[60px] w-[60px]"
            alt="logo"
          />
        )}
      </td>
      <td className="py-2 text-sm sm:text-lg">{collection?.name}</td>
      <td className="py-2 hidden lg:flex items-center h-[68px]">
        <p> {collection?.description.slice(0, 30)}...</p>
      </td>
      <td className="py-2">
        {
          <div className="flex gap-2">
            <a
              className="p-1.5 rounded-full main_btn"
              target="_blank"
              href={collection?.website_link}
            >
              <CgWebsite />
            </a>
            <a
              className="p-1.5 rounded-full main_btn"
              target="_blank"
              href={collection?.twitter_link}
            >
              <FaTwitter />
            </a>
            <a
              className="p-1.5 rounded-full main_btn"
              target="_blank"
              href={collection?.discord_link}
            >
              <BsDiscord />
            </a>
          </div>
        }
      </td>
      <td className="py-2 hidden lg:flex items-center h-[68px]">
        <p>{collection?.supply} </p>
      </td>
    </tr>
  );
}
