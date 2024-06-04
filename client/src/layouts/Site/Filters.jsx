import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helpers";
import { PRODUCT_CATEGORIES } from "../../constants/constants";
import { Rating } from "@mui/material";

const Filters = () => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("min")) setMin(searchParams.get("min"));
    if (searchParams.has("max")) setMax(searchParams.get("max"));
  }, [searchParams]);

  const handleClick = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (checkbox.checked === false) {
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    } else {
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        searchParams.append(checkbox.name, checkbox.value);
      }
      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  const defaultChecHandler = (checkboxType, checkboxValue) => {
    const value = searchParams.get(checkboxType);

    if (checkboxValue === value) return true;

    return false;
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-3xl font-bold text-center lg:text-left">Filters</h2>
      <hr />
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold">Price</h3>
        <form className="flex gap-3 items-center justify-center" onSubmit={handleButtonClick}>
          <input
            className="w-[85px] rounded-lg"
            type="text"
            placeholder="Min ($)"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            className="w-[85px] rounded-lg"
            type="text"
            placeholder="Max ($)"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />

          <button className="py-2 px-3 border-2 rounded-lg">Go</button>
        </form>
        <hr />
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold">Category</h3>
          <div className="flex flex-wrap gap-3 justify-center lg:block">
            {PRODUCT_CATEGORIES?.map((category, index) => (
              <div key={index} className="flex gap-3 items-center">
                <input
                  defaultChecked={defaultChecHandler("category", category)}
                  name="category"
                  value={category}
                  type="checkbox"
                  onClick={(e) => handleClick(e.target)}
                />
                <label htmlFor="">{category}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold">Ratings</h3>
          <div className="flex flex-wrap gap-3 justify-center lg:block">
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={index} className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  name="ratings"
                  value={rating}
                  onClick={(e) => handleClick(e.target)}
                  defaultChecked={defaultChecHandler("ratings", rating?.toString())}
                />
                <label htmlFor="">
                  <span>
                    <Rating
                      name="half-rating-read"
                      value={rating}
                      precision={0.1}
                      readOnly
                    />
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
