import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from '../../layouts/Site/Header'
import Footer from '../../layouts/Site/Footer'
import ScrollToTop from '../../components/Site/ScrollToTop'


const AdminRoot = () => {
  return (
    <Fragment>
      <ScrollToTop/>
            <Toaster position='top-center'/>
        <Header/>
        <Outlet/>
        <Footer/>
    </Fragment>
  )
}

export default AdminRoot