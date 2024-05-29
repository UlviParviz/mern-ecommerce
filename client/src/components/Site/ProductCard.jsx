import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Rating } from "@mui/material";

const ProductCard = ({product}) => {

  const navigate = useNavigate()
  return (
    <div className='md:w-[280px] lg:w-[280px] shadow-md rounded-lg flex flex-col gap-2 justify-between'>
      <div className='h-[200px] md:h-[250px] px-1 py-1 flex items-center overflow-hidden'>
        <img className='w-[100%] object-cover overflow-hidden' src={product?.images[0]?.url} alt="" />
      </div>
        <div onClick={() => navigate(`/product/${product?._id}`)} className='text-xl mt-3 px-2 text-center capitalize flex items-center justify-center transition-all duration-500 hover:text-red-600 font-semibold cursor-pointer'>{product?.name}</div>
        <div className=' flex gap-2 justify-center items-center text-xl'>
          <div className='flex'>
          <Rating name="half-rating-read" value={product?.ratings} precision={0.1} readOnly />
          </div>
          <span>({product?.numOfReviews})</span>
        </div>
        <div className='text-center text-xl font-bold'>{product?.price}$</div>
        
        <button onClick={() => navigate(`/product/${product?._id}`)}  className="rounded-lg relative flex h-[50px] w-full items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-lg before:bg-red-500 before:duration-500 before:ease-out hover:shadow-red-600 hover:before:h-56 hover:before:w-full">
      <span className="relative z-10">View Details</span>
    </button>
    </div>
  )
}

export default ProductCard