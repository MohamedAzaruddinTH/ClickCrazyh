import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import { toast } from "react-toastify";

export const validateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.phoneNo ||
    !shippingInfo.postalCode
  ) {
    toast.error("Please fill the shipping information", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    navigate("/shipping");
  }
};

export default function Shipping() {
  const { shippingInfo = {} } = useSelector((state) => state.cartState);
  const darkMode = useSelector((state) => state.darkmode);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (country !== "India") {
      toast.error("Please Select India as the Country.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, phoneNo, postalCode, country, state })
    );
    navigate("/order/confirm");
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-black"
          : "bg-gray-400"
      } py-2 px-4 font-montserrat min-h-screen overflow-hidden`}
    >
      <div className=" max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-12 md:gap-6">
          <div className="md:col-span-12 ">
            <div className="text-2xl font-bold px-4 py-2">
              <CheckoutSteps shipping />
            </div>
            <div className="md:flex md:justify-center">
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 bg-gradient-to-tl from-[#000000] to-[#2c3e50] via-[#434343] rounded-lg text-pale-blue">
                <form onSubmit={submitHandler} className="shadow-lg p-2">
                  <h1 className="text-3xl mb-1 font-bold text-center">
                    Shipping Info
                  </h1>

                  <div className="mb-3">
                    <label
                      htmlFor="address_field"
                      className="block mb-1 font-medium "
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address_field"
                      className="mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-gray-300"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="city_field"
                      className="block mb-1 font-medium"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city_field"
                      className="mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-gray-300"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="phone_field"
                      className="block mb-1 font-medium"
                    >
                      Phone No
                    </label>
                    <input
                      type="phone"
                      id="phone_field"
                      className="mt-1 p-2 w-full bg-gray-300 text-stone-950 rounded border border-gray-300"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="postal_code_field"
                      className="block mb-1 font-medium"
                    >
                      Postal Code
                    </label>
                    <input
                      type="number"
                      id="postal_code_field"
                      className="mt-1 p-2 w-full bg-gray-300 text-stone-950 rounded border border-gray-300"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="country_field"
                      className="block mb-1 font-medium"
                    >
                      Country
                    </label>
                    <select
                      id="country_field"
                      className="mt-1 p-2 w-full bg-gray-300 text-stone-950 rounded border border-gray-300"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      {countryList.map((country, i) => (
                        <option key={i} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="state_field"
                      className="block mb-1 font-medium"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state_field"
                      className="mt-1 p-2 w-full bg-gray-300 text-stone-950 rounded border border-gray-300"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    id="shipping_btn"
                    type="submit"
                    className="w-full mt-4 py-3 bg-gradient-to-tl from-green-500 to-lime-600 via-green-900 text-white font-bold rounded hover:to-blue-600 focus:outline-none"
                  >
                    CONTINUE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
