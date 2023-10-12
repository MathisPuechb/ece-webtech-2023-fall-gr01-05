import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'


export default function Layout({children}) {
    return (
      <div>
      <Header/>
        {children}
      <Nav/>
      <Footer/>
      </div>
    );
  }