import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
