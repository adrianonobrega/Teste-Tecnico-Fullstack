import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Providers from '../providers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Providers>
      <ToastContainer/>
      <Component {...pageProps} />
  </Providers>
    </>
  )
 
  
}
