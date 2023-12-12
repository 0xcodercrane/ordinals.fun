import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booted: {},
  isUnlocked: false,
  account: {}
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // booted: (state, action) => {
    //   state.booted = action.payload;
    // },
    isUnlocked: (state, action) => {
      state.isUnlocked = action.payload;
    },
    account: (state,  action) =>  {
      console.log('running');
      state.account = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { booted, isUnlocked, account } = accountSlice.actions;

export default accountSlice.reducer;
