import React from 'react'
import styles from './Layout.module.css'
import TopNav from  '../TopNav/TopNav'
import SideNav from '../SideNav/SideNav'

export interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({children}:LayoutProps) {
  return (
    <div className = {styles.layoutContainer} >
        <TopNav/>
        <div className =  {styles.fragment}>
            <SideNav />
            <div className =  {styles.pageContainer} >{children}</div>
        </div>
    </div>
  )
}
