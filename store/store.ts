import { combineReducers, configureStore } from "@reduxjs/toolkit";
import walletReducer from "./slices/wallet";
import openAPIReducer from "./slices/openApi";
import inscribeReducer from "./slices/inscribe";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";

const persisConfig = {
  key: "litemap",
  storage,
};

const rootReducer = combineReducers({
  walletReducer,
  openAPIReducer,
  inscribeReducer
});

const persistedReducer = persistReducer(persisConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: {
      persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export const store = makeStore();

setupListeners(store.dispatch);
