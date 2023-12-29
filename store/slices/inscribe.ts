import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    selectedBlock: [],
    inscription: [],
    fee: {},
    feeRate: 1,
    receiveAddress: ""
  },
};

export const wallet = createSlice({
  name: "wallet",
  initialState: initialState,
  reducers: {
    selectedBlock: (state, action) => {
      state.value.selectedBlock.push(action.payload);
    },
    cancelBlock: (state, action) => {
      state.value.selectedBlock = state.value.selectedBlock.filter((block) => block.blockNumber !== action.payload);
    },
    initialize: (state, action) => {
      state.value.selectedBlock = [];
    },
    setBulkMintBlocks: (state, action) => {
      state.value.selectedBlock = action.payload;
    },
    updateFee: (state, action) => {
      state.value.fee = action.payload
    },
    updateFeeRate: (state, action) => {
      state.value.feeRate  = action.payload;
    },
    updateReceiveAddress: (state, action) => {
      state.value.receiveAddress  = action.payload;
    }
  },
});

export const { selectedBlock, cancelBlock, initialize, setBulkMintBlocks, updateFee, updateFeeRate, updateReceiveAddress } = wallet.actions;
export default wallet.reducer;
