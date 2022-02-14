import React from 'react'
import styles from './SideNav.module.css'

export default function SideNav() {
  return (
    <div className= {styles.sideNavContainer}>
        <div >
        <h3 className= {styles.sideNavMenuTitle} >Quick menu</h3>
            <ul className= {styles.sideNavMenu}>
                <li className= {styles.sideNavMenuItem}>Home</li>
                <li className= {styles.sideNavMenuItem}>Profil</li>
                <li className= {styles.sideNavMenuItem}>Settings</li>
                <li className= {styles.sideNavMenuItem}>Log out</li>
            </ul>
        </div>

        <div>
            <h3 className= {styles.sideNavMenuTitle} >My App</h3>
            <ul className= {styles.sideNavMenu}>
                <li className= {styles.sideNavMenuItem}>Categories</li>
                <li className= {styles.sideNavMenuItem}>Decks</li>
                <li className= {styles.sideNavMenuItem}></li>
            </ul>
        </div>


        <div >
            <h3 className= {styles.sideNavMenuTitle} >Learn</h3>
            <ul className= {styles.sideNavMenu}>
                <li className= {styles.sideNavMenuItem}>Flashcards</li>
                <li className= {styles.sideNavMenuItem}>Association game</li>
                <li className= {styles.sideNavMenuItem}>Notes</li>
            </ul>
        </div>
    
    </div>
  )
}
