import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import MetaData from "../../layouts/Site/MetaData";
import DatePicker from "react-datepicker";
import SalesChart from "../../components/Admin/SalesChart";
import "react-datepicker/dist/react-datepicker.css";
import { useLazyGetDashboardSalesQuery } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import Loader from '../../layouts/Site/Loader'

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());

  const [getDashboardSales, { error, isLoading, data }] =
    useLazyGetDashboardSalesQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if(startDate && endDate && !data){
      getDashboardSales({
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      });
    }
  }, [error]);


  const submitHandler = () => {
    getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    });
  };

  if(isLoading) return <Loader/>



  return (
    <AdminLayout>
      <MetaData title={"Dashboard"} />
      <div className="d-flex justify-content-start align-items-center">
        <div className="mb-3 me-4">
          <label className="form-label d-block">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label d-block">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>
        <button onClick={submitHandler} className="rounded-sm group relative min-h-[35px] ml-5 w-[120px] overflow-hidden border border-red-500 bg-white text-red-500 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
          <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
          <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">
            Fetch
          </span>
        </button>
      </div>

      <div className="row pr-4 my-5">
        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white bg-success o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Sales
                <br />
                <b>${data?.totalSales?.toFixed(2)}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white bg-danger o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Orders
                <br />
                <b>{data?.totalNumOrders}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SalesChart salesData={data?.sales} />


      <div className="mb-5"></div>
    </AdminLayout>
  );
};

export default Dashboard;
