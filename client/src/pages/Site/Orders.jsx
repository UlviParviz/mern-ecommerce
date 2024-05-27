import React, { useEffect } from 'react';
import { useMyOrdersQuery } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import Loader from '../../layouts/Site/Loader';
import { MDBDataTable } from 'mdbreact';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaEye, FaPrint } from "react-icons/fa";
import MetaData from '../../layouts/Site/MetaData';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/cartSlice';

const Orders = () => {
  const { data, isLoading, error } = useMyOrdersQuery();

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderSuccess = searchParams.get("order_success");

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (orderSuccess) {
      dispatch(clearCart());
      navigate("/me/orders");
    }
  }, [error, orderSuccess]);

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },

        {
          label: "Order Status",
          field: "orderStatus",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.orders?.forEach((order) => {
      orders.rows.push({
        amount: `$${order?.totalAmount}`,
        orderStatus: order?.orderStatus,
        actions: (
          <div className='flex justify-center'>
            <div className='flex justify-center'>
            <Link to={`/me/order/${order?._id}`} className="btn btn-primary w-full flex justify-center">
              <FaEye />
            </Link>
            </div>
            <div className='flex justify-center'>
            <Link to={`/invoice/order/${order?._id}`} className="btn btn-success ms-2 w-full flex justify-center">
              <FaPrint />
            </Link>
            </div>
          </div>
        ),
      });
    });

    return orders;
  };


  if (isLoading) return <Loader />;

  return (
    <div className='min-h-screen'>
      <MetaData title={'My Orders'} />
      <h1 className='my-5 text-center'>{data?.orders?.length} Orders</h1>
      <div className='table-responsive lg:w-[90%] mx-auto'>
        <MDBDataTable
          data={setOrders()}
          className='px-3'
          bordered
          hover
          displayEntries={false}
          searching={false}
        />
      </div>
    </div>
  );
};

export default Orders;
