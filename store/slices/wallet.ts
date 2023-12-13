import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    booted: {},
    isUnlocked: false,
    keyrings: {},
    vault: {},
    preVault: {},
    account: {},
    balance: {
      amount: 0.0,
      btc_amount: 0.0,
      confirm_amount: 0.0,
      confirm_btc_amount: "0.000",
      confirm_inscription_amount: 0,
      inscription_amount: 0,
      pending_amount: 0,
      pending_btc_amount: "0.00",
      pending_inscription_amount: 0,
      usd_value: 0,
    },
  },
};

export const wallet = createSlice({
  name: "wallet",
  initialState: initialState,
  reducers: {
    booted: (state, action) => {
      state.value.booted = action.payload;
    },
    isUnlocked: (state, action) => {
      state.value.isUnlocked = action.payload;
    },
    vault: (state, action) => {
      state.value.vault = action.payload;
    },
    preVault: (state, action) => {
      state.value.preVault = action.payload;
    },
    account: (state, action) => {
      state.value.account = action.payload;
    },
    balance: (state, action) => {
      state.value.balance = action.payload;
    },
  },
});

export const { booted, isUnlocked, vault, preVault, account, balance } = wallet.actions;
export default wallet.reducer;
