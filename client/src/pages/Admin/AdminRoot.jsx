import React, { Fragment } from 'react'
import AdminHeader from '../../layouts/Admin/Header'
import { Outlet } from 'react-router-dom'
import AdminFooter from '../../layouts/Admin/Footer'

const AdminRoot = () => {
  return (
    <Fragment>
        <AdminHeader/>
        <Outlet/>
        <AdminFooter/>
    </Fragment>
  )
}

export default AdminRoot