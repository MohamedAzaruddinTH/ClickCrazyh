import MetaData from "../layouts/MetaData";
import { Fragment, useEffect } from "react";
import { validateShipping } from "./Shipping";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";

export default function ConfirmOrder() {
  const { shippingInfo, items: cartItems } = useSelector(
    (state) => state.cartState
  );
  const { user } = useSelector((state) => state.authState);
  const darkMode = useSelector((state) => state.darkmode);
  const navigate = useNavigate();
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  let taxPrice = Number(0.05 * itemsPrice);
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  taxPrice = Number(taxPrice).toFixed(2);

  const processPayment = () => {
    const data = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  }, [navigate,shippingInfo]);

  return (
    <div
      className={`${
        darkMode
          ? "bg-black"
          : "bg-gray-400"
      } min-h-screen px-4 py-2 text-${
        darkMode ? "gray-400" : "pale-blue"
      } font-montserrat`}
    >
      <MetaData title={"Confirm Order"} />
      <div className="text-2xl font-bold px-4 py-2">
        <CheckoutSteps shipping confirmOrder />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="order-confirm">
          <h4
            className={`mb-2 p-2 text-3xl text-${
              darkMode ? "yellow-500" : "blue-900"
            } font-bold`}
          >
            Shipping Info
          </h4>
          <p className="px-2">
            <b>Name:</b>{" "}
            <span className={`text-${darkMode ? "pale-blue" : "stone-900"}`}>
              {user.name}
            </span>
          </p>
          <p className="px-2">
            <b>Phone:</b>{" "}
            <span className={`text-${darkMode ? "pale-blue" : "stone-900"}`}>
              {shippingInfo.phoneNo}
            </span>
          </p>
          <p className="mb-4 px-2">
            <b>Address:</b>{" "}
            <span className={`text-${darkMode ? "pale-blue" : "stone-900"}`}>
              {shippingInfo.address}, {shippingInfo.city},
              {shippingInfo.postalCode}, {shippingInfo.state},
              {shippingInfo.country}
            </span>
          </p>

          <hr className=" border-gray-500" />

          <h4
            className={`mt-4 text-3xl text-${
              darkMode ? "yellow-500" : "blue-900"
            } font-bold mb-1`}
          >
            Your Cart Items:
          </h4>

          {cartItems.map((item) => (
            <Fragment key={item.product}>
              <div className="cart-item my-1">
                <div className="flex items-center ">
                  <div className="mr-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-32 w-32 rounded"
                    />
                  </div>

                  <div className="flex-1 text-pale-blue font-semibold">
                    <Link
                      to={`/product/${item.product}`}
                      className="hover:no-underline hover:text-blue-500"
                    >
                      {item.name}
                    </Link>
                  </div>

                  <div className="text-right">
                    <p>
                      {item.quantity} x ₹{item.price} ={" "}
                      <b>
                        ₹
                        <span className="text-coral-red">
                          {item.quantity * item.price}
                        </span>
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            <hr className=" border-gray-500" />
            </Fragment>
          ))}
        </div>

        <div className="px-4">
          <div id="order_summary">
            <h4
              className={`font-bold text-3xl text-${
                darkMode ? "yellow-500" : "blue-900"
              }`}
            >
              Order Summary
            </h4>

            <p className="px-2 mt-1 ">
              <b>Subtotal:</b> ₹
              <span className="text-red-500">{itemsPrice.toFixed(2)}</span>
            </p>
            <p className="px-2">
              <b>Shipping:</b> ₹
              <span className="text-red-500">{shippingPrice}</span>
            </p>
            <p className="px-2">
              <b>Tax:</b> ₹<span className="text-red-500">{taxPrice}</span>
            </p>

            <hr className=" border-gray-500" />

            <p className="px-2">
              <b>Total:</b> ₹
              <span className="text-blue-900 font-bold">{totalPrice}</span>
            </p>

            <hr className=" border-gray-500" />
            <button
              id="checkout_btn"
              onClick={processPayment}
              className="px-4 py-3 text-white bg-gradient-to-tl from-yellow-700 to-yellow-700 via-slate-800 rounded mt-5 font-bold hover:to-lime-400 md:w-4/5 lg:w-2/5 focus:outline-none"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 