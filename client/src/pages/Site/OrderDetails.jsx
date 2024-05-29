import React, { useEffect } from "react";
import MetaData from "../../layouts/Site/MetaData";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../layouts/Site/Loader";
import { FaEye, FaPrint } from "react-icons/fa";


const OrderDetails = () => {
  const params = useParams();

  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);

  const order = data?.order || {};

  const {
    shippingInfo,
    paymentInfo,
    orderItems,
    user,
    totalAmount,
    orderStatus,
  } = order;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <MetaData title={"Order Details"} />
      <div className="row d-flex justify-content-center px-2">
        <div className="col-12 col-lg-9 mt-5 order-details">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-5 mb-4">Your Order Details</h3>

          </div>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{order?._id}</td>
              </tr>
              <tr>
                <th scope="row">Status</th>
                <td className={String(orderStatus).includes("Delivered") ? 'text-green-500' : 'text-red-500'}>

                  <b>{orderStatus}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Date</th>
                <td>{new Date(order?.createdAt).toLocaleString("en-US")}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Shipping Info</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td className="capitalize">{user?.name}</td>
              </tr>
              <tr>
                <th scope="row">Phone No</th>
                <td>{shippingInfo?.phoneNo}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>{shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode}, {shippingInfo?.country}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Payment Info</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Status</th>
                <td className="greenColor">
                  <b>{paymentInfo?.status}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Method</th>
                <td>{order?.paymentMethod}</td>
              </tr>
              <tr>
                <th scope="row">Stripe ID</th>
                <td>{paymentInfo.id || 'Null'}</td>
              </tr>
              <tr>
                <th scope="row">Amount Paid</th>
                <td>${totalAmount}</td>
              </tr>
            </tbody>
          </table>
          <Link className="btn btn-success" to={`/invoice/order/${order?._id}`}>
              <FaPrint className="inline mr-1"/> Invoice
            </Link>

          <h3 className="mt-5 my-4">Order Items:</h3>

          <hr />
          <div className="cart-item my-1">
            {orderItems?.map((item) => (

            <div key={item?.product} className="row my-5">
              <div className="col-4 col-lg-2">
                <img
                  src={item?.image}
                  alt={item?.name}
                  height="45"
                  width="65"
                />
              </div>

              <div className="col-5 col-lg-5">
                <Link to={`/product/${item?.product}`}>{item?.name}</Link>
              </div>

              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                <p>${item?.price}</p>
              </div>

              <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                <p>{item?.quantity} Piece(s)</p>
              </div>
            </div>
            ))}
          </div>
          <hr />
        </div>
      </div>

    </div>
  );
};

export default OrderDetails;