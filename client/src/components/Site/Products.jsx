import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import { useGetProductsQuery } from '../../redux/api/productsApi'
import Loader from '../../layouts/Site/Loader'
import toast from 'react-hot-toast'
import CustomPagination from '../../layouts/Site/CustomPagination'
import { useSearchParams } from 'react-router-dom'

const Products = () => {

    let [searchParams] = useSearchParams()

    const page = searchParams.get("page") || 1

    const params = {page}

    const { data, isLoading, error, isError } = useGetProductsQuery(params)


    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message)
        }
    }, [isError])

    if (isLoading) return <Loader/>

    return (
        <div>
            <div className='flex flex-col gap-7'>
                <h2 className='text-3xl font-bold text-center'>Products</h2>
                <div className='flex justify-center items-center gap-4 flex-wrap'>
                    {data?.products?.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                    ))}
                </div>
            </div>
            <div className='w-[500px] mx-auto'>
                <CustomPagination  resPerPage={data?.resPerPage} filteredProductsCount={data?.filteredProductsCount}/>
            </div>
        </div>
    )
}

export default Products
