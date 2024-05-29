import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5 flex-col md:flex-row px-4">
      {shipping ? (

      <Link
        to="/shipping"
        className="float-right mt-2 mt-md-0 "
      >
        <div className="triangle2-active"></div>
        <div className="step active-step">Shipping</div>
        <div className="triangle-active"></div>
      </Link>
      ) : (

      <Link
        to="#!"
        className="float-right mt-2 mt-md-0 "
        disabled
      >
        <div className="triangle2-incomplete"></div>
        <div className="step incomplete">Shipping</div>
        <div className="triangle-incomplete"></div>
      </Link>
      )}

{confirmOrder ? (

      <Link
        to="/confirm_order"
        className="float-right mt-2 mt-md-0 "
      >
        <div className="triangle2-active"></div>
        <div className="step active-step">Confirm Order</div>
        <div className="triangle-active"></div>
      </Link>
) : (

      <Link
        to="#!"
        className="float-right mt-2 mt-md-0 "
        disabled
      >
        <div className="triangle2-incomplete"></div>
        <div className="step incomplete">Confirm Order</div>
        <div className="triangle-incomplete"></div>
      </Link>
)}

{payment ? (

      <Link
        to="/payment_method"
        className="float-right mt-2 mt-md-0 "
      >
        <div className="triangle2-active"></div>
        <div className="step active-step">Payment</div>
        <div className="triangle-active"></div>
      </Link>
) : (

      <Link
        to="#!"
        className="float-right mt-2 mt-md-0 "
        disabled
      >
        <div className="triangle2-incomplete"></div>
        <div className="step incomplete">Payment</div>
        <div className="triangle-incomplete"></div>
      </Link>
)}

    </div>
  );
};

export default CheckoutSteps;
