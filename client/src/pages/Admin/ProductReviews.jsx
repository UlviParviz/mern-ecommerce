import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import { MDBDataTable } from "mdbreact";
import { useDeleteReviewMutation, useLazyGetProductReviewsQuery } from "../../redux/api/productsApi";
import toast from "react-hot-toast";
import { FaEye, FaTrash } from "react-icons/fa";
import MetaData from "../../layouts/Site/MetaData";
import { Link } from "react-router-dom";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");
  const [getProductReviews, { data, isLoading, error }] =
    useLazyGetProductReviewsQuery();

   const [deleteReview, {error: deleteError, isLoading: isDeleteLoading, isSuccess}] =  useDeleteReviewMutation()
  const submitHandler = (e) => {
    e.preventDefault();
    getProductReviews(productId);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Review Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteReviewHandler = (id) => {
    deleteReview({productId, id})
  }

  const setReviews = () => {
    const reviews = {
      columns: [
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
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

    data?.reviews?.forEach((review) => {
      reviews.rows.push({
        rating: review?.rating,
        comment: `${review?.comment.substring(0, 5)}...`,

        user: `${
          review?.user?.name?.charAt(0).toUpperCase() +
          review?.user?.name?.slice(1)
        }`,
        actions: (
          <div className="flex justify-center flex-col md:flex-row gap-1">
            <div className="flex justify-center w-full">
              <button
                disabled={isDeleteLoading}
                onClick={() => deleteReviewHandler(review?._id)}
                className="btn btn-outline-danger w-full flex justify-center"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ),
      });
    });

    return reviews;
  };


  return (
    <AdminLayout>
      <MetaData title={"All Reviews"} />
      <div className="row justify-content-center my-5">
        <div className="col-sm-12 col-md-8">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="productId_field" className="form-label">
                Enter Product ID
              </label>
              <input
                type="text"
                id="productId_field"
                className="form-control"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button className="mt-2 rounded-lg relative flex h-[50px] w-full items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-lg before:bg-red-500 before:duration-500 before:ease-out hover:shadow-red-600 hover:before:h-56 hover:before:w-full">
              <span className="relative z-10">Search</span>
            </button>
          </form>
        </div>
      </div>

      {data?.reviews?.length > 0 ? (
        <div className="">
            <MDBDataTable
              data={setReviews()}
              className="px-3"
              busered
              hover
              displayEntries={false}
            />
        </div>
      ) : ( 
        <p className="text-center font-bold text-2xl p-5">No Reviews</p>)}
    </AdminLayout>
  );
};

export default ProductReviews;
