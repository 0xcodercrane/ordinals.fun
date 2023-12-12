/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { FaTimes } from "react-icons/fa";

export default function Block(props) {
  if (props.selected && !props.uploaded) {
    return (
      <div className="bg-[#02a8d8] drop-shadow-lg w-100 h-[35px] shadow-black rounded text-sm text-white flex justify-center items-center font-semibold cursor-pointer hover:drop-shadow-2xltransition-all ease-out relative">
        {props.blockNumber}
        <FaTimes
          onClick={(e) => props.cancelBlock(props.index)}
          className="text-red-500 absolute -top-1 -right-1 z-20 text-xl bg-white p-1 rounded-full"
        />
      </div>
    );
  } else if (props.taken) {
    return (
      <div className="bg-[#00bbff0f] drop-shadow-lg w-100 h-[35px] shadow-black rounded text-sm text-white flex justify-center items-center font-semibold cursor-pointer hover:drop-shadow-2xl transition-all ease-out">
        {props.blockNumber}
      </div>
    );
  } else if (props.uploaded) {
    return (
      <div className="bg-[#00bbff0f] group drop-shadow-lg w-100 h-[35px] shadow-black rounded text-sm text-white flex justify-center items-center font-semibold cursor-pointer hover:drop-shadow-2xl hover:bg-[#ffa500cf] transition-all ease-out relative">
        {props.blockNumber}
        <FaTimes
          onClick={(e) => props.cancelBlock(props.index)}
          className="text-red-500 absolute -top-1 -right-1 z-20 text-xl bg-white p-1 rounded-full"
        />
      </div>
    );
  } else {
    return (
      <div
        onClick={(e) => props.selectBlock(props.index)}
        className="bg-[#19659fd1] drop-shadow-lg w-100 h-[35px] shadow-black rounded text-sm text-white flex justify-center items-center font-semibold cursor-pointer hover:drop-shadow-2xl hover:bg-[#00c7ffcf] transition-all ease-out"
      >
        {props.blockNumber}
      </div>
    );
  }
}
