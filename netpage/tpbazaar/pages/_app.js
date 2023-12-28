import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

axios.defaults.withCredentials= true;  ///importent for cookies

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}