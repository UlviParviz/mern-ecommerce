import React from 'react';
import MetaData from '../../layouts/Site/MetaData';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { calculateOrderCost } from '../../helpers/helpers';
import CheckoutSteps from '../../layouts/Site/CheckoutSteps';

const ConfirmOrder = () => {

    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateOrderCost(cartItems);

    const proceedToPaymentHandler = () => {
        navigate('/payment_method');
    };


    return (
        <>
            <MetaData title={"Confirm Order"} />
            <CheckoutSteps shipping confirmOrder />
            <div className="flex flex-wrap justify-between min-h-screen px-8 py-4">
                <div className="w-full lg:w-2/3 mt-5 order-confirm">
                    <h4 className="mb-3">Shipping Info</h4>
                    <p className="capitalize"><b>Name:</b> {user?.name}</p>
                    <p><b>Phone:</b> {shippingInfo?.phoneNo}</p>
                    <p className="mb-4 capitalize">
                        <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode}, {shippingInfo?.country}
                    </p>

                    <hr className="my-4" />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {cartItems?.map((item, index) => (
                        <React.Fragment key={index}>
                            <hr className="my-4" />

                            <div className="cart-item my-4">
                                <div className="flex flex-wrap items-center">
                                    <div className="w-1/4 lg:w-1/12">
                                        <img
                                            src={item?.image}
                                            alt={item?.name}
                                            className="w-16 h-16"
                                        />
                                    </div>

                                    <div className="w-1/2 lg:w-1/2 ml-1">
                                        <Link className='hover:text-red-500 transition-all duration-300' to={`/product/${item.product}`}>{item?.name}</Link>
                                    </div>

                                    <div className="w-1/5 lg:w-1/3 mt-4 lg:mt-0">
                                        <p>{item?.quantity} x ${item?.price} = <b>${(item?.quantity * item?.price).toFixed(2)}</b></p>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />
                        </React.Fragment>
                    ))}


                </div>

                <div className="w-full lg:w-1/4 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr className="my-4" />
                        <p>Subtotal: <span className="order-summary-values">${itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax: <span className="order-summary-values">${taxPrice}</span></p>
                        <hr className="my-4" />
                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>
                        <hr className="my-4" />
                        <button onClick={proceedToPaymentHandler} className="relative h-[43px] rounded-md w-full overflow-hidden border border-black bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-black before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-black after:duration-500 hover:text-white hover:shadow-black hover:before:h-2/4 hover:after:h-2/4">
                            <span className="relative z-10">Continue</span>
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ConfirmOrder;
