import React, { useEffect, useState } from "react";
import MetaData from "../../layouts/Site/MetaData";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateProductMutation, useGetProductDetailsQuery, useUpdateProductMutation } from "../../redux/api/productsApi";
import toast from "react-hot-toast";
import { PRODUCT_CATEGORIES } from "../../constants/constants";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    brand: "",
  });

  const {data} = useGetProductDetailsQuery(params?.id)

  const { name, description, price, category, stock, brand } = product;

  const [updateProduct, { isLoading, error, isSuccess }] =
    useUpdateProductMutation();

    useEffect(() => {
        if(data?.product){
            setProduct({
                name: data?.product?.name,
                description: data?.product?.description,
                price: data?.product?.price,
                category: data?.product?.category,
                stock: data?.product?.stock,
                brand: data?.product?.brand

            })
        }
        if (error) {
          toast.error(error?.data?.message);
        }
        if(isSuccess){
            toast.success('Product Updated')
            navigate('/admin/products')
        }
    
      
      }, [error, isSuccess, data]);


  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct({id: params?.id, body: product})
  };

  return (
    <AdminLayout>
      <MetaData title={"Update Product"} />
      <div className="row p-3 w-full">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0 w-full">
          <form className="shadow rounded bg-body w-full p-2" onSubmit={submitHandler}>
            <h2 className="mb-4 font-bold text-2xl text-center">Update Product</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                {" "}
                Name{" "}
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description_field" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description_field"
                rows="8"
                name="description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="price_field" className="form-label">
                  {" "}
                  Price{" "}
                </label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3 col">
                <label htmlFor="stock_field" className="form-label">
                  {" "}
                  Stock{" "}
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  name="stock"
                  value={stock}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="category_field" className="form-label">
                  {" "}
                  Category{" "}
                </label>
                <select
                  className="form-select"
                  id="category_field"
                  name="category"
                  value={category}
                  onChange={onChange}
                >
                  {PRODUCT_CATEGORIES?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 col">
                <label htmlFor="brand_field" className="form-label">
                  {" "}
                  Brand Name{" "}
                </label>
                <input
                  type="text"
                  id="brand_field"
                  className="form-control"
                  name="brand"
                  value={brand}
                  onChange={onChange}
                />
              </div>
            </div>
            <button disabled={isLoading} className="mt-2 rounded-lg relative flex h-[50px] w-full items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-lg before:bg-red-500 before:duration-500 before:ease-out hover:shadow-red-600 hover:before:h-56 hover:before:w-full">
              <span className="relative z-10">{isLoading ? '...' : "Update"}</span>
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;
