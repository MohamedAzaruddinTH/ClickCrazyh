import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import {
  decreaseCartItemQty,
  increaseCartItemQty,
  removeItemFromCart,
} from "../../slices/cartSlice";

export default function Cart() {
  const { items } = useSelector((state) => state.cartState);
  const darkMode = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    const count = item.quantity;
    if (item.stock === 0 || count >= item.stock) return;
    dispatch(increaseCartItemQty(item.product));
  };

  const decreaseQty = (item) => {
    const count = item.quantity;
    if (count === 1) return;
    dispatch(decreaseCartItemQty(item.product));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <div
      className={`${
        darkMode ? "bg-black" : "bg-gray-400"
      } min-h-screen py-6 px-4 font-montserrat overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-12 md:gap-6">
          <div className="md:col-span-12">
            {items.length === 0 ? (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8"
              >
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <img
                    className="w-full rounded-lg p-4 mx-auto"
                    src="images/others/emptyCart.png"
                    alt="emptyCart"
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-2/3 max-w-[500px] p-4 py-8 bg-gray-500 flex flex-col items-center rounded-md shadow-lg">
                  <h1 className="text-xl font-bold uppercase text-center">
                    Your Cart feels lonely.
                  </h1>
                  <p className="text-sm text-center px-10 -mt-2">
                    Your Shopping cart lives to serve. Give it purpose - fill it
                    with books, electronics, videos, etc. and make it happy.
                  </p>
                  <Link to="/shop">
                    <button className="bg-stone-950 rounded-md cursor-pointer hover:bg-stone-800 active:bg-gray-500 px-8 py-2 font-semibold text-gray-300 text-lg hover:text-pale-blue duration-300">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <Fragment>
                <h2
                  className={`mt-5 mb-3 text-center text-${
                    darkMode ? "white" : "pale-blue"
                  } text-2xl`}
                >
                  Your Cart:{" "}
                  <b>
                    {items.length}
                    <span
                      className={`text-${
                        darkMode ? "red-500" : "coral-red"
                      }`}
                    >
                      {" "}
                      items
                    </span>
                  </b>
                </h2>
                <div className="flex flex-wrap justify-between">
                  <div className="w-full md:w-8/12">
                    {items.map((item) => (
                      <Fragment key={item.product}>
                        <hr className="my-2 border-gray-500" />
                        <div className="flex flex-col md:flex-row items-center justify-between">
                          <div className="w-full md:w-1/6 mb-2 md:mb-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-32 w-32 md:h-24 md:w-24 max-sm:h-12 max-sm:w-12 max-lg:h-20 max-lg:w-20 rounded"
                            />
                          </div>
                          <div className="w-full md:w-2/6 ml-0 md:ml-4">
                            <Link
                              to={`/product/${item.product}`}
                              className={`text-${
                                darkMode ? "white" : "pale-blue"
                              } hover:text-${
                                darkMode ? "red-500" : "coral-red"
                              } hover:no-underline font-semibold`}
                            >
                              {item.name}
                            </Link>
                          </div>
                          <div className="w-1/4 md:w-1/6 mt-4 md:mt-0 px-1">
                            <p
                              className={`text-${
                                darkMode ? "white" : "pale-blue"
                              } font-bold`}
                            >
                              ₹
                              <span
                                className={`text-${
                                  darkMode ? "coral-red" : "red-500"
                                }`}
                              >
                                {item.price}
                              </span>
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            {/* Quantity controls */}
                            <button
                              onClick={() => decreaseQty(item)}
                              className={`px-3 py-1 bg-red-600 rounded text-xl text-gray-200 ${
                                item.stock === 0 || item.quantity === 1
                                  ? "cursor-not-allowed"
                                  : "hover:bg-red-700"
                              }`}
                              disabled={item.stock === 0 || item.quantity === 1}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="w-10 mx-2 text-center text-gray-950 bg-gray-100 border border-gray-500 rounded"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              onClick={() => increaseQty(item)}
                              className={`px-3 py-1 bg-green-500 rounded text-xl text-gray-200 ${
                                item.stock === 0 || item.quantity >= item.stock
                                  ? "cursor-not-allowed"
                                  : "hover:bg-green-600"
                              }`}
                              disabled={
                                item.stock === 0 || item.quantity >= item.stock
                              }
                            >
                              +
                            </button>
                          </div>
                          <div className="w-1/4 md:w-1/6 mt-4 md:mt-0">
                            <button
                              onClick={() =>
                                dispatch(removeItemFromCart(item.product))
                              }
                              className={`ml-1 px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700 hover:no-underline hover:font-bold`}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </div>
                      </Fragment>
                    ))}
                    <hr
                      className={`my-4 border-${
                        darkMode ? "gray-700" : "stone-400"
                      }`}
                    />
                  </div>
                  <div className="w-full md:w-4/12 my-4 md:px-4 text-pale-blue ">
                    <div className="bg-gradient-to-tl from-[#000000] to-[#2c3e50] via-[#434343] rounded-lg p-4 text-center ">
                      <h4 className="text-lg  font-semibold">
                        <span
                          className={`text-${
                            darkMode ? "red-500" : "coral-red"
                          }`}
                        >
                          Order
                        </span>{" "}
                        Summary
                      </h4>
                      <hr
                        className={`my-2 border-${
                          darkMode ? "gray-700" : "stone-400"
                        }`}
                      />
                      <p>
                        SubTotal:{" "}
                        <span className="font-semibold">
                          {items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                          (Units)
                        </span>
                      </p>
                      <p>
                        Est. Total: ₹{" "}
                        <span
                          className={`font-semibold text-${
                            darkMode ? "red-500" : "coral-red"
                          }`}
                        >
                          {items
                            .reduce(
                              (acc, item) => acc + item.quantity * item.price,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </p>
                      <hr
                        className={`my-2 border-${
                          darkMode ? "gray-700" : "stone-400"
                        }`}
                      />
                      <button
                        onClick={checkoutHandler}
                        className={`w-2/5 px-2 py-2 text-center bg-gradient-to-bl from-blue-800 to-orange-500 via-stone-900 text-white rounded hover:from-blue-500 focus:outline-none font-bold md:w-4/5`}
                      >
                        Check out
                      </button>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
