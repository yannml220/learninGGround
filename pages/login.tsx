import React , {useState , useEffect ,  RefObject} from 'react'
import styles from '../styles/register.module.css'
import { getProviders , getCsrfToken , getSession  } from 'next-auth/react'
import axios from 'axios'







export interface loginProps {
    session : any ,
    providers : any  ,
    csrfToken : any
  }

  


export default function login({session , providers , csrfToken}:loginProps) {


    console.log('session :'+ session + ' providers :' + providers + 'csrf :' + csrfToken )


    const [ loginInput , setLoginInput ] = useState({ 
      username : '',
      password : '',
      email : ''
      
    })
  
  
    const loginInputChangeHandler = (event:React.ChangeEvent<HTMLInputElement>)=>{
      event.preventDefault()
      console.log(loginInput)
      const name = event.target.name
      const value = event.target.value
      let updatedInputs :any = {...loginInput}
      updatedInputs[name] = value 
      setLoginInput(updatedInputs)
    }
  

  return (
    <>
    <form  name="loginForm" className = {styles.loginForm} method = "POST" action =  '/api/auth/signin/credentials' >
    <div className={styles.inputBox}>
        <label className ={styles.loginLabel} htmlFor="username" >email</label>
        <input  className={styles.loginInput} name = "username" type ="email" placeholder = "john@doe.com"onChange= {e=>loginInputChangeHandler(e)} required />
    </div>
    

    <div className={styles.inputBox}>
        <label  className={styles.loginLabel} htmlFor="password" >password</label>
        <input  className={styles.loginInput} name = "password" type ="text" onChange= {e=>loginInputChangeHandler(e)}  required/>
    </div>


    
    <div className={styles.inputBox}>
            
        <input className={styles.loginSignIn} type = "submit" value ="Sign in"/>
    </div>
    <input hidden type="text" defaultValue={csrfToken } />
    </form>
 </>
  )
}



export const getServerSideProps = async (context:any) =>{
    const { req , res } = context
    const session = await getSession()

    if(session && res ){
      res.writeHead(302, {
        location : '/'
      })
    }

    else { 
      return {
        props : { 
          session : null ,
          providers : await getProviders() ,
          csrfToken : await getCsrfToken()
        }
    }
  }

}