import React from 'react'
import styles from './TopNav.module.css'

export default function TopNav() {
  return (
    <div className ={styles.topNavContainer}>

        <div className = {styles.topNavWrapperLeft} >
            
        </div>
        <div className ={styles.topNavWrapperMiddle}>
            <ul className = {styles.topNavLinkList}>
                <li className = {styles.topNavLink} >home</li>
                <li className = {styles.topNavLink} >about</li>
                <li className = {styles.topNavLink} >services</li>
            </ul>

        </div>
        <div className ={styles.topNavWrapperRight}>

        </div>

    </div>
  )
}
