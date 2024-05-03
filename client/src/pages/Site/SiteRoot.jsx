import React, { Fragment } from 'react'
import Header from '../../layouts/Site/Header'
import Footer from '../../layouts/Site/Footer'
import {Outlet} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const SiteRoot = () => {
  return (
    <Fragment>
      <Toaster position='top-center'/>
        <Header/>
        <Outlet/>
        <Footer/>
    </Fragment>
  )
}

export default SiteRoot