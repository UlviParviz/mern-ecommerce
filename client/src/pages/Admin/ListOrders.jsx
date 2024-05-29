import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../../layouts/Site/Loader";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { FaImage, FaPencil, FaTrash } from "react-icons/fa6";
import MetaData from "../../layouts/Site/MetaData";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import { useGetAdminOrdersQuery } from "../../redux/api/orderApi";

const ListOrders = () => {
  const { data, isLoading, error } = useGetAdminOrdersQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    // if (deleteError) {
    //   toast.error(deleteError?.data?.message);
    // }
    // if(isSuccess){
    //   toast.success('Product Deleted')
    // }
  }, [error]);

  //   const deleteProductHandler = (id) => {
  //     deleteProduct(id)
  //   }

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Payment Status",
          field: "paymentStatus",
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
      orders?.rows.push({
        id: `${order?._id?.substring(0, 4)}...`,
        paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
          <div className="flex justify-center flex-col md:flex-row gap-1">
            <div className="flex justify-center w-full">
              <Link
                to={`/admin/orders/${order?._id}`}
                className="btn btn-outline-primary w-full flex justify-center"
              >
                <FaPencil />
              </Link>
            </div>
            <div className="flex justify-center w-full">
              <button
              // disabled={isDeleteLoading}
              className="btn btn-outline-danger w-full flex justify-center"
              // onClick={() => deleteProductHandler(product?._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ),
      });
    });

    return orders;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"All Orders"} />
      <h1 className="my-5 text-center font-bold text-2xl">{data?.orders?.length} Orders</h1>
      <div className="table-responsive">
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          hover
          displayEntries={false}
        />
      </div>
    </AdminLayout>
  );
};

export default ListOrders;
