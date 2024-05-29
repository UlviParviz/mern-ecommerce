import React, { useEffect, useRef, useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import { useGetProductDetailsQuery, useUploadProductImagesMutation } from "../../redux/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from '../../layouts/Site/MetaData'
import toast from "react-hot-toast";

const UploadImages = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const { data } = useGetProductDetailsQuery(params?.id);
  const [uploadProductImages, {error,isSuccess, isLoading}] = useUploadProductImagesMutation()

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product?.images);
    }
    if (error) {
        toast.error(error?.data?.message);
      }
      if(isSuccess){
        setImagesPreview([])
          toast.success('Uploaded Successfully')
          navigate('/admin/products')
      }
  }, [data, isSuccess, error]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImagePreviewDelete = (image) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img != image);
    setImages(filteredImagesPreview);
    setImagesPreview(filteredImagesPreview);
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submitHandler = (e) => {
    e.preventDefault()
    uploadProductImages({id: params?.id, body: {images}})

  }

  return (
    <AdminLayout>
        <MetaData title={'Upload Product Images'}/>
      <div className="row wrapper">
        <div className="col-12 col-lg-10 mt-5 mt-lg-0">
          <form
            className="shadow rounded bg-body p-3"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4 text-2xl font-bold text-center">
              Upload Product Images
            </h2>

            <div className="mb-3">
              <label htmlFor="customFile" className="form-label">
                Choose Images
              </label>
              <div className="custom-file">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="product_images"
                  className="form-control"
                  id="customFile"
                  multiple
                  onChange={onChange}
                  onClick={handleResetFileInput}
                />
              </div>
              {images?.length > 0 && (
                <div className="new-images my-4">
                  <p className="text-danger">New Images:</p>
                  <div className="row mt-4">
                    {imagesPreview?.map((img,index) => (
                      <div key={index} className="col-md-3 mt-2">
                        <div className="card">
                          <img
                            src={img}
                            alt="Card"
                            className="card-img-top p-2 object-cover"
                            style={{ width: "100%", height: "120px" }}
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            type="button"
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            onClick={() => handleImagePreviewDelete(img)}
                          >
                            <div className="flex justify-center items-center py-1">
                              <FaTimes />
                            </div>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}{" "}
              {uploadedImages?.length > 0 && (
                <div className="uploaded-images my-4">
                  <p className="text-success">Product Uploaded Images:</p>
                  <div className="row mt-1 flex flex-wrap">
                    {uploadedImages?.map((img,index) => (
                      <div key={index} className="col-md-3 mt-2">
                        <div className="card">
                          <img
                            src={img?.url}
                            alt="Card"
                            className="card-img-top p-2 object-cover"
                            style={{ width: "100%", height: "120px" }}
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            className="btn btn-block btn-danger cross-button mt-1 py-0 "
                            disabled={true}
                            type="button"
                          >
                            <div className="flex justify-center items-center py-1">
                              <FaTrash />
                            </div>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button disabled={isLoading}  className="mt-4 rounded-lg relative flex h-[50px] w-full items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-lg before:bg-red-500 before:duration-500 before:ease-out hover:shadow-red-600 hover:before:h-56 hover:before:w-full">
              <span className="relative z-10">{isLoading ? '...' :  'Upload'}</span>

            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UploadImages;
