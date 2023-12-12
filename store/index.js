import inscribe from "./slices/inscribe";
import account from "./slices/inscribe";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    inscribe: inscribe,
    account: account,
  },
  rializableCheck: false
});
