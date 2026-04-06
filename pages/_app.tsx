import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { JSX } from "react";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return <>
        <Head>
            <title>MyTop - our best top</title>
            <link key={1} rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </Head>
        <Component {...pageProps} />
    </> 
  
}