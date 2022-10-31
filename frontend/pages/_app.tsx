import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MyHead from './components/Layout/MyHead'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Body from './components/Layout/Body'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MyHead />
      <Header/>
      <Body>
      <Component {...pageProps} />
      </Body>
      <Footer/>
    </>
  )
}
