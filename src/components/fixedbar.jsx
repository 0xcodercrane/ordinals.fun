import { GiCancel } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";
import clsx from "clsx";

export default function FixedBar({ showFixedBar, hideFixedBar }) {

  const className = clsx('flex items-center  max-w-[800px] px-2 py-3 mx-auto  rounded justify-center bg-gray-600 fixed bottom-28 left-0 right-0',
    { 'hidden': !showFixedBar }
  )
  return (
    <>
      <div className={className}>
        <p className="hidden">Click on items to select</p>
        <p className='text-xl'>21 tokens selected</p>
        <p className='flex items-center text-xl'><img src="/img/lite.svg" className="w-4 h-4 ml-4 mr-2" alt="" />27.5  $2.31</p>
        <button className='flex items-center px-3 py-2 mx-3 text-lg rounded-lg bg-sky-500/50 hover:cursor-pointer hover:bg-white/90 hover:text-sky-400'>
          <FaCartShopping className='mx-1' />
          <p className='text-md'>Buy</p>
        </button>
        <button className='flex items-center px-2 py-2 mx-3 text-lg rounded-lg bg-red-500/80 hover:cursor-pointer hover:bg-white hover:text-red-500'
          onClick={hideFixedBar}>
          <GiCancel className='mr-2' />
          <p>Cancel</p>
        </button>
      </div>
    </>
  )
}