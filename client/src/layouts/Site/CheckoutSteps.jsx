import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className=" flex justify-center mt-4">
      <div className="checkout-progress flex justify-center mt-5 row">
        {shipping ? (
          <Link
            href="/shipping"
            className="mt-2 md:mt-0 col-12 md:col-3 lg:col-2"
          >
            <div className="triangle2-active"></div>
            <div className="step active-step">Shipping</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link
            href="#!"
            className=" mt-2 md:mt-0 col-12 md:col-3 lg:col-2"
            disabled
          >
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Shipping</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {confirmOrder ? (
          <Link
            href="/confirm_order"
            className="mt-2 md:mt-0 col-12 md:col-4 lg:col-3"
          >
            <div className="triangle2-active"></div>
            <div className="step active-step">Confirm Order</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link
            to="#!"
            className="mt-2 md:mt-0 col-12 md:col-4 lg:col-3"
            disabled
          >
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Confirm Order</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {payment ? (
          <Link
            href="/payment_method"
            className="mt-2 md:mt-0 col-12 md:col-3 lg:col-2"
          >
            <div className="triangle2-active"></div>
            <div className="step active-step">Payment</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link
            href="#!"
            className="mt-2 md:mt-0 col-12 md:col-3 lg:col-2"
            disabled
          >
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Payment</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
