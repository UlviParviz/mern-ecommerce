import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import { useGetProductsQuery } from '../../redux/api/productsApi'
import Loader from '../../layouts/Site/Loader'
import toast from 'react-hot-toast'

const Products = () => {

    const {data, isLoading, error, isError} =  useGetProductsQuery()

    useEffect(()=>{
        if(isError){
            toast.error(error?.data?.message)
        }
    }, [isError])

    if(isLoading) return <Loader/>


  return (
    <div className='flex flex-col gap-7'>
        <h2 className='text-3xl font-bold text-center'>Latest Products</h2>
        <div className='flex justify-center items-center flex-wrap gap-4'>
            {data?.products?.map((product, key) => (
                <ProductCard key={product._id} product={product}/>
            ))}
        </div>

    </div>
  )
}

export default Products