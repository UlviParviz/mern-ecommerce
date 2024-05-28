import React, { Fragment } from 'react'
import Header from '../../layouts/Site/Header'
import Footer from '../../layouts/Site/Footer'
import {Outlet} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from '../../components/Site/ScrollToTop'

const SiteRoot = () => {
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

export default SiteRoot