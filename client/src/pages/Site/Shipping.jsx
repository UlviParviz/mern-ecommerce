import React, { useEffect, useState } from 'react'
import {  countries } from 'countries-list'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../redux/features/cartSlice'
const Shipping = () => {

    const dispatch = useDispatch() 

    const countriesList = Object.values(countries)

    const [adress, setAdress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [country, setCountry] = useState('')


    const {shippingInfo} = useSelector((state) => state.cart)

    useEffect(() => {

        if(shippingInfo){
            setAdress(shippingInfo?.adress)
            setCity(shippingInfo?.city)
            setCountry(shippingInfo?.country)
            setZipCode(shippingInfo?.zipCode)
            setPhoneNo(shippingInfo?.phoneNo)
        }

    }, [shippingInfo])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({adress, city, phoneNo, zipCode, country}))
    }



  return (
    <div className="flex justify-center min-h-screen items-center">
  <div className="w-full max-w-lg">
    <form
      className="shadow-lg rounded-lg bg-white p-8"
      onSubmit={submitHandler}
    >
      <h2 className="text-2xl font-bold mb-6">Shipping Info</h2>
      <div className="mb-4">
        <label htmlFor="address_field" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          id="address_field"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="address"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="city_field" className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          id="city_field"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone_field" className="block text-sm font-medium text-gray-700">Phone No</label>
        <input
          type="tel"
          id="phone_field"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="phoneNo"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="zip_code_field" className="block text-sm font-medium text-gray-700">Zip Code</label>
        <input
          type="number"
          id="zip_code_field"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="zipCode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="country_field" className="block text-sm font-medium text-gray-700">Country</label>
        <select
          id="country_field"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >

            {countriesList?.map((country) => (
          <option key={country?.name} value={country?.name}>{country?.name}</option>

            ))}

        </select>
      </div>
      <button  className="relative h-[43px] rounded-md w-full overflow-hidden border border-black bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-black before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-black after:duration-500 hover:text-white hover:shadow-black hover:before:h-2/4 hover:after:h-2/4">
                  <span class="relative z-10">Continue</span>
                </button>
    </form>
  </div>
</div>

  )
}

export default Shipping