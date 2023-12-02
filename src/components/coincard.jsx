import { useState } from "react";
import clsx from "clsx";

export default function Coincard({ openModal, isBuyMode, idNum, handleMultiSelect }) {
  const [isActive, setIsActive] = useState(false)
  const handleClick = () => {
    if (isBuyMode) {
      setIsActive(!isActive)
    } else {
      setIsActive(false)
    }
  }
  const className = clsx('p-1 mx-2 my-1 text-white duration-300 border rounded-md  bg-main hover:shadow-md hover:shadow-slate-800 hover:border-blue border-blue/20',
    {
      'scale-95 border-blue/90 border-solid border-2': isActive
    }
  )

  return (
    <div className={className} onClick={handleClick}>
      <img
        src="https://img-cdn.magiceden.dev/rs:fit:800:0:0/plain/https://bitmap-img.magiceden.dev/v1/d1ae814fa7c62782bc43968293022854119dd6afa9d886f80c3d407f71652d09i0"
        className="object-cover p-2 max-h-[160px] mx-auto rounded-t-md"
        alt=""
      />
      <div className="p-3">
        <p className="text-gray-200">545009.litemap:{idNum + 1}</p>
        <div className="flex justify-between mb-2 text-sm ">
          <p>Seller : </p>
          <p className="text-right text-green-500"> DMarM...Z6jWq</p>
        </div>
        <hr className="my-1 border-white/20" />
        <div className="flex justify-between py-2">
          <p className="flex items-center gap-1 font-semibold text-amber-500">
            <img src="/img/lite.svg" className="w-4 h-4" alt="" />
            0.00000025
          </p>
          <p>$80</p>
        </div>
        <div className="flex justify-center">
          <button
            disabled={isBuyMode}
            onClick={openModal}
            className="w-3/4 py-2 my-1 font-semibold duration-300 border rounded-lg bg-blue border-blue hover:bg-black/30 hover:bg-white hover:text-blue"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
