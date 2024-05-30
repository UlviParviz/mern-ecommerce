import React, { useEffect, useState } from "react";
import pic from "../../assets/images/default_product.png";
import { Rating } from "@mui/material";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../layouts/Site/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";
import MetaData from "../../layouts/Site/MetaData";
import NewReview from "../../components/Site/NewReview";
import ListReviews from "../../components/Site/ListReviews";
import NotFound from "../../layouts/Site/NotFound";

const ProductDetails = () => {
  const params = useParams();

  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  );

  const product = data?.product;

  const [activeImg, setActiveImg] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    setActiveImg(product?.images[0] ? product?.images[0]?.url : pic);
  }, [product]);

  const decreaseQuantity = () => {
    if(quantity > 1){
      setQuantity(quantity-1)
    }
  };

  const increaseQuantity = () => {
    if(quantity < product?.stock){
      setQuantity(quantity+1)
    }
  };



  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity


    }

    dispatch(setCartItem(cartItem))
    toast.success("Item added to your cart")
  }



  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if(error && error?.status == 404){
    return <NotFound/>
  }

  if (isLoading) return <Loader />;

  return (
    <div>

      <div className="lg:flex justify-center items-start gap-10 p-8">
        <MetaData title={product?.name}/>
        <div className="flex-col justify-center lg:w-[40%] items-center py-5">
          <div className="rounded-lg">
            <img className=" rounded-lg w-[100%]" src={activeImg} alt="" />
          </div>
          <div className="flex items-center justify-center lg:justify-center flex-wrap gap-5 py-8">
            {product?.images?.map((img, index) => (
              <img
                onClick={() => setActiveImg(img.url)}
                key={index}
                className={`w-[150px] p-2 rounded-lg cursor-pointer ${
                  img?.url === activeImg ? "border-2 border-red-500" : ""
                } `}
                src={img?.url}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="lg:w-[40%] p-5">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-3xl capitalize">{product?.name}</h2>
            <span className="font-extrabold text-gray-600 text-sm">
              Product # <span>{product?._id}</span>{" "}
            </span>
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
            <div className="text-3xl font-bold text-center">
              ${product?.price}
            </div>
            <div className="flex justify-center gap-4 items-center">
              <div className="flex rounded-lg">
                <div
                  onClick={decreaseQuantity}
                  className="bg-black text-white w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer"
                >
                  -
                </div>
                <div className="w-8 h-8 flex justify-center items-center count">
                  {quantity}
                </div>
                <div
                  onClick={increaseQuantity}
                  className="bg-black text-white w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer"
                >
                  +
                </div>
              </div>
              <button disabled={product?.stock <= 0} onClick={setItemToCart} className="disabled:bg-gray-300 text-sm p-2 flex justify-center items-center cursor-pointer rounded-lg bg-red-500 text-white">
                Add to cart
              </button>
            </div>
            <hr />
            <div className="text-xl font-bold">
              Status :{" "}
              <span
                className={product?.stock > 0 ? "text-green-500" : "text-red-500"}
              >
                {product?.stock > 0 ? "InStock" : "Out of the Stock"}
              </span>
            </div>
            <hr />
            <div className="flex flex-col gap-3">
              <h3 className="font-bold">Description:</h3>
              <p className="text-md font-semibold">{product?.description}</p>
            </div>
            <hr />
            <div className="font-bold text-xl">
              <span>{product?.brand}</span> Brand Certificated
            </div>
            <hr />
          </div>
          {isAuthenticated ? <NewReview productId = {product?._id}/> : (
          <div className="bg-red-500 text-white p-3 flex items-center justify-center rounded-lg">
            Login to post your review
          </div>
          )}
        </div>
      </div>
        {product?.reviews?.length > 0 && <ListReviews reviews = {product?.reviews}/> }
    </div>
  );
};

export default ProductDetails;
