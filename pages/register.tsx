import React , {useState , useEffect ,  RefObject} from 'react'
import styles from '../styles/register.module.css'
import { getProviders , getCsrfToken , getSession  } from 'next-auth/react'
import axios from 'axios'



export interface registerProps {
  session : any ,
  providers : any  ,
  csrfToken : any
}

export default function register({session , providers , csrfToken}:registerProps) {

  console.log('session :'+ session + ' providers :' + providers + 'csrf :' + csrfToken )


  const [ registerInput , setRegisterInput ] = useState({ 
    username : '',
    password : '',
    email : ''
    
  })


  const registerInputChangeHandler = (event:React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault()
    console.log(registerInput)
    const name = event.target.name
    const value = event.target.value
    let updatedInputs :any = {...registerInput}
    updatedInputs[name] = value 
    setRegisterInput(updatedInputs)
  }



  return (
    <div className={styles.loginPageContainer}>

             <div className= {styles.loginBox}>

                 <div className= {styles.loginBoxHeader} >
                    <div className= {styles.loginBoxHeaderContent}>
                    
                    <div className= {styles.loginBoxHeaderContentSpan} >
                        <span className = {styles.loginLink}  >Connectez-vous pour continuer avec <strong>LearninGround</strong></span>
                    </div>


                    </div>         
                 </div>


                <div className= {styles.loginBoxContent}>
                 
                          <>
                          <form name="registerForm" className = {styles.loginForm} method = "POST" action =  '/api/register' >
                          <div className={styles.inputBox}>
                          <label className ={styles.loginLabel} htmlFor="email" >email</label>
                          <input  className={styles.loginInput} name = "email" type ="email" placeholder = "john@doe.com"onChange= {e=>registerInputChangeHandler(e)} required />
                          </div>

                          <div className={styles.inputBox}>
                          <label className ={styles.loginLabel} htmlFor="username" >username</label>
                          <input  className={styles.loginInput} name = "username" type ="text" placeholder = "john"onChange= {e=>registerInputChangeHandler(e)} required />
                          </div>

                          <div className={styles.inputBox}>
                              <label  className={styles.loginLabel} htmlFor="password" >password</label>
                              <input  className={styles.loginInput} name = "password" type ="text" onChange= {e=>registerInputChangeHandler(e)}  required/>
                          </div>


                          
                          <div className={styles.inputBox}>
                                  
                              <input className={styles.loginSignIn} type = "submit" value ="Sign up"/>
                          </div>
                          <input hidden type="text" defaultValue={csrfToken } />
                          </form>
                          </>
                 

                </div>
        

             </div>

        </div>
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