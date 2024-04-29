import React, { Fragment } from 'react'
import Header from '../../layouts/Site/Header'
import Footer from '../../layouts/Site/Footer'
import {Outlet} from 'react-router-dom'

const SiteRoot = () => {
  return (
    <Fragment>
        <Header/>
        <Outlet/>
        <Footer/>
    </Fragment>
  )
}

export default SiteRoot