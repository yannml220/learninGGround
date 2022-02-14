import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps: { session, ...pageProps }}: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
    <Layout>
       <Component {...pageProps} />
    </Layout>
    </SessionProvider>

  ) 
        
}

export default MyApp
