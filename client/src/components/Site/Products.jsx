import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import Loader from "../../layouts/Site/Loader";
import toast from "react-hot-toast";
import CustomPagination from "../../layouts/Site/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "../../layouts/Site/Filters";

const Products = () => {
  let [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings")




  const params = { page, keyword };

  min !== null && (params.min = min)
  max !== null && (params.max = max)
  category !== null && (params.category = category)
  ratings !== null && (params.ratings = ratings)




  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-6  ">
      <h2 className={"text-3xl font-bold text-center"}>
        {keyword
          ? `${data?.products?.length} Products found with keyword : ${keyword}`
          : `Products`}
      </h2>
      <div className={keyword ? "lg:flex gap-5 lg:justify-around " : "flex flex-col gap-3 "}>
        {keyword && (
          <div className="lg:w-[30%] w-full rounded-lg p-2">
            <Filters/>
          </div>
        )}
        <div
          className={
            keyword ? "flex flex-col lg:items-start gap-7 w-full lg:w-[80%]" : "flex flex-col gap-7 items-center"
          }
        >
          <div className={keyword ?"flex px-5 flex-wrap m-8 lg:m-0  lg:gap-5  lg:justify-start justify-center gap-10 lg:px-0 ": "flex  flex-wrap justify-center md:gap-8 lg:gap-4 "}>
            {data?.products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
      {keyword ? "" :
        <CustomPagination
          resPerPage={data?.resPerPage}
          filteredProductsCount={data?.filteredProductsCount}
          />
      }
      </div>
    </div>
  );
};

export default Products;
