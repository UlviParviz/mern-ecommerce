import React, { useEffect } from "react";
import pic from "../../assets/images/default_product.png";
import { Rating } from "@mui/material";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import {useParams} from 'react-router-dom'
import toast from "react-hot-toast";
import Loader from "../../layouts/Site/Loader";

const ProductDetails = () => {

  const params = useParams()

  const {data, isLoading, error, isError} = useGetProductDetailsQuery(params?.id)

  const product = data?.product

  useEffect(()=>{
    if(isError){
        toast.error(error?.data?.message)
    }
}, [isError])

if(isLoading) return <Loader/>

  return (
    <div className="flex justify-center items-start gap-10 p-8">
      <div className="flex-col justify-center w-[40%] items-center py-5">
        <div className="border-2 rounded-lg">
          <img className=" rounded-lg w-[100%]" src={product?.images[0].url} alt="" />
        </div>
        <div className="flex items-center justify-center gap-5 py-8">
          {product?.images?.map((img) => (

          <img className="w-[150px] rounded-lg" src={img?.url} alt="" />
          ))}
        </div>
      </div>
      <div className="w-[40%] p-5">
        <div className="flex flex-col gap-4" >
          <h2 className="font-bold text-3xl">{product?.name}</h2>
          <span className="font-extrabold text-gray-600 text-sm">Product # <span>{product?._id}</span>  </span>
          <hr />
          <div className="flex gap-4 justify-between">
            <Rating
              name="half-rating-read"
              value={product?.ratings}
              precision={0.1}
              readOnly
            />
            <span>({product?.numOfReviews} Reviews)</span>
          </div>
          <hr />
          <div className="text-3xl font-bold text-center">${product?.price}</div>
          <div className="flex justify-center gap-5 items-center">
            <div className="flex rounded-lg">
              <div className="bg-red-500 w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer">
                -
              </div>
              <div className="w-8 h-8 flex justify-center items-center">0</div>
              <div className="bg-blue-500 w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer">
                +
              </div>
            </div>
            <div className="py-2 px-5 flex justify-center items-center cursor-pointer rounded-lg bg-red-500 text-white">
              Add to cart
            </div>
          </div>
          <hr />
          <div className="text-xl font-bold">
            Status : <span className={product?.stock > 0 ? "text-green-500" : "text-red-500"}>{product?.stock > 0 ? "InStock" : "Out of the Stock"}</span>
          </div>
          <hr />
          <div className="flex flex-col gap-3">
            <h3 className="font-bold">Description:</h3>
            <p className="text-md font-semibold">
              {product?.description}
            </p>
          </div>
          <hr />
          <div className="font-bold text-xl"><span>{product?.brand}</span> Brand Certificated</div>
          <hr />
        </div>
        <div className="bg-red-500 text-white p-3 flex items-center justify-center rounded-lg">Login to post your review</div>
      </div>
    </div>
  );
};

export default ProductDetails;
