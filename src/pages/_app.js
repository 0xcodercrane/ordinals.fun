import '@/styles/globals.css'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { store } from '@/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={store}> */}
        <Component {...pageProps} />
      {/* </PersistGate> */}
    </Provider>
  )

}
