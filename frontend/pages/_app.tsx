import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MyHead from './components/Layout/MyHead'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Body from './components/Layout/Body'
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <MyHead />
        <Header />
        <Body>
          <Component {...pageProps} />
        </Body>
        <Footer />
      </Provider>
    </>
  )
}
