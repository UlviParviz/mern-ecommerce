import React, { Fragment } from 'react'
import AdminHeader from '../../layouts/Admin/Header'
import { Outlet } from 'react-router-dom'
import AdminFooter from '../../layouts/Admin/Footer'
import { Toaster } from 'react-hot-toast'

const AdminRoot = () => {
  return (
    <Fragment>
            <Toaster position='top-center'/>
        <AdminHeader/>
        <Outlet/>
        <AdminFooter/>
    </Fragment>
  )
}

export default AdminRoot