import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Rating } from "@mui/material";

const ProductCard = ({product}) => {

  const navigate = useNavigate()
  return (
    <div className='w-[72%]  md:w-[400px] lg:w-[300px] border-2 p-5 flex flex-col gap-2 justify-center'>
        <img className='w-[100%] h-[320px]' src={product?.images[0]?.url} alt="" />
        <div onClick={() => navigate(`/product/${product?._id}`)} className='text-xl h-[100px] flex items-center justify-center hover:text-red-500 font-semibold cursor-pointer'>{product?.name}</div>
        <div className=' flex gap-2 justify-center items-center text-xl'>
          <div className='flex'>
          <Rating name="half-rating-read" value={product?.ratings} precision={0.1} readOnly />
          </div>
          <span>({product?.numOfReviews})</span>
        </div>
        <div className='text-center text-xl font-bold'>{product?.price}$</div>
        <div onClick={() => navigate(`/product/${product?._id}`)} className='p-3 flex justify-center items-center bg-red-500 text-white rounded-lg font-bold hover:bg-red-400 cursor-pointer'>View details</div>
    </div>
  )
}

export default ProductCard