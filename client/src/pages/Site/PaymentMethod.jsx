import React, { useEffect, useState } from "react";
import MetaData from "../../layouts/Site/MetaData";
import CheckoutSteps from "../../layouts/Site/CheckoutSteps";
import { useSelector } from "react-redux";
import { calculateOrderCost } from "../../helpers/helpers";
import { useCreateNewOrderMutation } from "../../redux/api/orderApi";
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const [method, setMethod] = useState("");
  const navigate = useNavigate()

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [createNewOrder, {isLoading, error, isSuccess} ] = useCreateNewOrderMutation()

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calculateOrderCost(cartItems);


    console.log(shippingInfo);

   useEffect(() => {
    if(error){
      toast.error(error?.data?.message)
    }

    if(isSuccess){
      navigate('/')
    }
   }, [error, isSuccess]) 

  const submitHandler = (e) => {
    e.preventDefault();

    if (method === "COD") {
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount:taxPrice,
        totalAmount:totalPrice,
        paymentInfo : {
            status: 'Not Paid'
        },
        paymentMethod: "COD"
      };
      createNewOrder(orderData)
    }
    if (method === "Card") {
      alert(method);
    }
  };

  return (
    <>
      <MetaData title={"Payment Method"} />
      <CheckoutSteps shipping confirmOrder payment />

      <div className="flex justify-center min-h-screen">
        <div className="w-full max-w-md mt-10">
          <form
            className="shadow-lg rounded-lg bg-white p-6"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4 text-2xl font-bold">Select Payment Method</h2>

            <div className="mb-4">
              <input
                className="form-check-input mr-2"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={(e) => setMethod("COD")}
              />
              <label className="form-check-label" for="codradio">
                Cash on Delivery
              </label>
            </div>
            <div className="mb-4">
              <input
                className="form-check-input mr-2"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={(e) => setMethod("Card")}
              />
              <label className="form-check-label" for="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>
            <button className="mt-5 relative h-[43px] rounded-md w-full overflow-hidden border border-black bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-black before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-black after:duration-500 hover:text-white hover:shadow-black hover:before:h-2/4 hover:after:h-2/4">
              <span class="relative z-10">Continue</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
