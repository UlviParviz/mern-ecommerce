import React from 'react'
import Products from '../../components/Site/Products'
import MetaData from '../../layouts/Site/MetaData'

const Home = () => {
  return (
    <>
    <MetaData title = {'Home'}/>
    <div className='p-5'>
      <Products/>
    </div>
    </>
  )
}

export default Home