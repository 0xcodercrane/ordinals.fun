import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/test'
import inscribe from './slices/inscribe'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    inscribe: inscribe
  },
})