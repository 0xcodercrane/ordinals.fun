/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedBlock, cancelBlock } from "@/store/slices/inscribe";

export default function Block(props) {
  const dispatch = useDispatch();
  const inscribe = useSelector(
    (state) => state?.persistedReducer?.inscribeReducer?.value
  );
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (!isSelected) {
      const newBlock = {
        blockNumber: props.blockNumber,
      };
      setIsSelected(true);
      dispatch(selectedBlock(newBlock));
    } else {
      setIsSelected(false);
      dispatch(cancelBlock(props.blockNumber));
    }
  };

  const checkIsSelected = () => {
    const data = inscribe.selectedBlock.filter(
      (item) => item.blockNumber == props.blockNumber
    );
    if (data.length > 0) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };

  useEffect(() => {
    if (inscribe?.selectedBlock.length > 0) {
      checkIsSelected();
    } else {
      setIsSelected(false);
    }
  }, [inscribe, props]);

  if (props.taken) {
    return (
      <div className="bg-[#00bbff0f] drop-shadow-lg w-100 h-[35px] shadow-black rounded text-sm text-white flex justify-center items-center font-extralight  cursor-pointer hover:drop-shadow-2xl transition-all ease-out">
        {props.blockNumber}
      </div>
    );
  } else {
    return (
      <div
        onClick={(e) => handleClick(props.blockNumber)}
        className={` shadow-black rounded text-sm text-white flex justify-center items-center font-extralight  cursor-pointer hover:drop-shadow-2xl hover:bg-[#00c7ffcf] duration-200 mx-auto my-auto ${
          isSelected
            ? "bg-[#00c7ffcf] drop-shadow-2xl border border-[#5ab1ccb0!important] w-[93%] h-[30px]"
            : "bg-[#19659fd1] drop-shadow-lg w-100 h-[35px]"
        }`}
      >
        {props.blockNumber}
      </div>
    );
  }
}
