import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import Loader from '../../layouts/Site/Loader';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import { FaImage, FaPencil, FaTrash } from "react-icons/fa6";
import MetaData from '../../layouts/Site/MetaData';
import { useDeleteProductMutation, useGetAdminProductsQuery } from '../../redux/api/productsApi';
import AdminLayout from '../../layouts/Admin/AdminLayout'

const ListProducts = () => {
  const { data, isLoading, error } = useGetAdminProductsQuery();
  const [deleteProduct, {isLoading: isDeleteLoading, error: deleteError, isSuccess}] = useDeleteProductMutation()

 
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if(isSuccess){
      toast.success('Product Deleted')
    }

  
  }, [error, deleteError, isSuccess]);

  const deleteProductHandler = (id) => {
    deleteProduct(id)
  }

  const setProducts = () => {
    const products = {
      columns: [
        {
            label: "Name",
            field: "name",
            sort: "asc",

        },
        {
          label: "Stock",
          field: "stock",
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

    data?.products?.forEach((product) => {
      products?.rows.push({
        name: `${(product?.name?.substring(0, 20)+'...').toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}`,
        stock: product?.stock,
        actions: (
          <div className='flex justify-center flex-col md:flex-row gap-1'>
            <div className='flex justify-center w-full'>
            <Link to={`/admin/products/${product?._id}`} className="btn btn-outline-primary w-full flex justify-center">
              <FaPencil />
            </Link>
            </div>
            <div className='flex justify-center w-full'>
            <Link to={`/admin/products/${product?._id}/upload_images`} className="btn btn-outline-success w-full flex justify-center">
              <FaImage />
            </Link>
            </div>
            <div className='flex justify-center w-full'>
            <button disabled={isDeleteLoading}  className="btn btn-outline-danger w-full flex justify-center" onClick={() => deleteProductHandler(product?._id)}>
              <FaTrash />
            </button>
            </div>
          </div>
        ),
      });
    });

    return products;
  };


  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={'All Products'} />
      <h1 className='my-5 text-center font-bold text-2xl'>{data?.products?.length} Products</h1>
      <div className='table-responsive'>
        <MDBDataTable
          data={setProducts()}
          className='px-3'
          bordered
          hover
          displayEntries={false}
        />
      </div>
    </AdminLayout>
  );
};

export default ListProducts;
