import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { signIn , useSession , signOut } from 'next-auth/react'

const Home : NextPage = () => {
  const { data: session, status } = useSession()
  return (
   
    <div className={styles.container}>
      <h1>{status}</h1>
     { 
       !session?.user ?
          ( <div>
            <button onClick = { ()=> signIn() } >Sign in</button>
            <button onClick = { ()=> signOut() } >Sign out</button>
            </div> ) :

            ( <div>
              <button onClick = { ()=> signOut() } >Sign out</button>
              </div> )

     }
    </div>
  )
}

export default Home
