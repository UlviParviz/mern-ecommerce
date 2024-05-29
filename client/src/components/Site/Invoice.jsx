import React, { useEffect } from 'react'
import MetaData from '../../layouts/Site/MetaData'
import logo from '../../assets/images/auditore-high-resolution-logo.png'
import { useParams } from 'react-router-dom';
import { useOrderDetailsQuery } from '../../redux/api/orderApi';
import Loader from '../../layouts/Site/Loader';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas'
import {jsPDF} from 'jspdf'
import { FaEye, FaPrint } from "react-icons/fa";


const Invoice = () => {
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


      const handleDownload = () => {
        const input = document.getElementById("order_invoice")
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png")
            const pdf = new jsPDF()
            const pdfWidth = pdf.internal.pageSize.getWidth()
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0)
            pdf.save(`invoice_${order?._id}.pdf`)
        })
        
      }

  if (isLoading) return <Loader />;

  return (
    <div className=' px-3 min-h-screen py-6'>
        <MetaData title={"Invoice"}/>
    <div className="order-invoice mt-5 border-0">
    <div className="row d-flex justify-content-center mb-5 px-5">
      <button className="btn btn-success col-md-5 flex justify-center gap-2 items-center" onClick={handleDownload}>
        <FaPrint/> <span>Download Invoice</span>
      </button>
    </div>
    <div id="order_invoice" className="pb-3 lg:w-[88%] lg:mx-auto">
      <header className="clearfix">
        <div id="logo" className='flex justify-center'>
          <img src={logo} alt="Company Logo" />
        </div>
        <h1 className='py-3 text-sm'>INVOICE {order?._id}</h1>
        <div className='flex flex-col gap-5 md:flex-row md:justify-between'>

        <div id="project">
          <div className='capitalize'><span>Name</span> {user?.name}</div>
          <div><span>EMAIL</span> {user?.email}</div>
          <div><span>PHONE</span> {shippingInfo?.phoneNo}</div>
          <div className='capitalize'>
            <span>ADDRESS</span> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode}, {shippingInfo?.country}
          </div>
          <div><span>DATE</span> {new Date(order?.createdAt).toLocaleString("en-US")}</div>
          <div><span>Status</span> {paymentInfo?.status}</div>
        </div>
        <div id="company" className="clearfix">
          <div>Auditore</div>
          <div>
            455 Foggy Heights,
            <br />
            AZ 85004, US
          </div>
          <div>(602) 519-0450</div>
          <div>
            <a href="mailto:info@auditore.com">info@auditore.com</a>
          </div>
        </div>
        </div>
      </header>
      <main>
        <table className="mt-5">
          <thead>
            <tr>
              <th className="desc">NAME</th>
              <th>PRICE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {orderItems?.map((item) => (
            <tr key={item?.product}>
              <td className="desc capitalize">{item?.name}</td>
              <td className="unit">${item?.price} ({item?.quantity})</td>
              <td className="total">${item.price * item?.quantity}</td>
            </tr>
            ))}
            <tr>
              <td colSpan="2">
                <b>SUBTOTAL</b>
              </td>
              <td className="total">${order?.itemsPrice}</td>
            </tr>

            <tr>
              <td colSpan="2">
                <b>TAX 15%</b>
              </td>
              <td className="total">${order?.taxAmount}</td>
            </tr>

            <tr>
              <td colSpan="2">
                <b>SHIPPING</b>
              </td>
              <td className="total">${order?.shippingAmount}</td>
            </tr>

            <tr>
              <td colSpan="2" className="grand total">
                <b>GRAND TOTAL</b>
              </td>
              <td className="grand total">${order?.totalAmount}</td>
            </tr>
          </tbody>
        </table>
        <div id="notices">
          <div>NOTICE:</div>
          <div className="notice">
            A finance charge of 1.5% will be made on unpaid balances after 30
            days.
          </div>
        </div>
      </main>
      <footer className='py-3 mt-4'>
        Invoice was created on a computer and is valid without the signature.
      </footer>
    </div>
  </div>
    </div>
  )
}

export default Invoice