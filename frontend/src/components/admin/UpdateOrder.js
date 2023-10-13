import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  orderDetail as orderDetailAction,
  updateOrder,
} from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";
import { Link } from "react-router-dom";

export default function UpdateOrder() {
  const { loading, isOrderUpdated, error, orderDetail } = useSelector(
    (state) => state.orderState
  );
  const darkMode = useSelector((state) => state.darkmode);
  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid = paymentInfo.status === "succeeded" ? true : false;
  const [orderStatus, setOrderStatus] = useState("Processing");
  const { id: orderId } = useParams();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const orderData = {};
    orderData.orderStatus = orderStatus;
    dispatch(updateOrder(orderId, orderData));
  };

  useEffect(() => {
    if (isOrderUpdated) {
      toast("Order Updated Succesfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearOrderUpdated()),
      });

      return;
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }

    dispatch(orderDetailAction(orderId));
  }, [isOrderUpdated, error, dispatch, orderId]);

  useEffect(() => {
    if (orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  return (
    <div
      className={`${
        darkMode
          ? "bg-black"
          : "bg-gray-400"
      } text-${
        darkMode ? "gray-400" : "pale-blue"
      } min-h-screen font-montserrat px-4 py-2 overflow-hidden`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-1 md:col-span-10">
          <Fragment>
            <div className="row justify-around">
              <div className="col-12 col-lg-8 mt-5 order-details">
                <h1
                  className={`text-2xl font-semibold text-${
                    darkMode ? "white" : "pale-blue"
                  } mb-4 text-center`}
                >
                  <span className="text-coral-red">Order #</span>{" "}
                  {orderDetail._id}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
                  <div>
                    <div className="mb-4">
                      <h2
                        className={`text-2xl text-${
                          darkMode ? "yellow-500" : "blue-900"
                        } font-semibold`}
                      >
                        Shipping Info
                      </h2>
                      <p className="mb-1">
                        <b>Name:</b>{" "}
                        <span
                          className={`text-${
                            darkMode ? "pale-blue" : "stone-900"
                          }`}
                        >
                          {user.name}
                        </span>
                      </p>
                      <p className="mb-1">
                        <b>Phone:</b>{" "}
                        <span
                          className={`text-${
                            darkMode ? "pale-blue" : "stone-900"
                          }`}
                        >
                          {shippingInfo.phoneNo}
                        </span>
                      </p>
                      <p className="mb-1">
                        <b>Address:</b>{" "}
                        <span
                          className={`text-${
                            darkMode ? "pale-blue" : "stone-900"
                          }`}
                        >
                          {shippingInfo.address},{shippingInfo.city},
                          {shippingInfo.postalCode},{shippingInfo.state},
                          {shippingInfo.country}
                        </span>
                      </p>
                      <hr className="border-gray-500" />

                      <div className="mt-4">
                        <h2
                          className={`text-2xl text-${
                            darkMode ? "yellow-500" : "blue-900"
                          } font-semibold`}
                        >
                          Payment
                        </h2>
                        <p>
                          <b>Amount:</b> ₹
                          <span className="text-coral-red font-bold">
                            {totalPrice}
                          </span>
                        </p>
                        <p
                          className={isPaid ? "text-green-600" : "text-red-600"}
                        >
                          <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                        </p>
                      </div>
                      <hr className="border-gray-500" />

                      <div className="mt-4">
                        <h2
                          className={`text-2xl text-${
                            darkMode ? "yellow-500" : "blue-900"
                          } font-semibold`}
                        >
                          Order Status:
                        </h2>
                        <p
                          className={
                            orderStatus && orderStatus.includes("Delivered")
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          <b>{orderStatus}</b>
                        </p>
                      </div>
                      <hr className="border-gray-500" />
                    </div>
                    <div className="mt-4">
                      <h4
                        className={`text-xl text-${
                          darkMode ? "yellow-500" : "blue-900"
                        } font-bold mb-1`}
                      >
                        Order Status
                      </h4>
                      <div className="flex text-stone-900 items-center  font-semibold">
                        <select
                          className={`form-select ${
                            darkMode ? "dark-mode-select" : "light-mode-select"
                          } rounded px-4 py-3 `}
                          onChange={(e) => setOrderStatus(e.target.value)}
                          value={orderStatus}
                          name="status"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <button
                          disabled={loading}
                          onClick={submitHandler}
                          className={`w-2/5 mx-auto py-3 ${
                            darkMode
                              ? "bg-gradient-to-tl from-slate-700 to-yellow-500 via-slate-900"
                              : "bg-gradient-to-bl from-amber-500 to-orange-500 via-slate-900"
                          } text-white font-bold rounded hover:to-pale-blue focus:outline-none`}
                        >
                          Update Status
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2
                      className={`text-2xl text-${
                        darkMode ? "yellow-500" : "blue-900"
                      } font-bold mb-1`}
                    >
                      Order Items:
                    </h2>
                    <div>
                      
                    </div>
                    {orderItems.map((item) => (
                      <div className="my-4" key={item._id}>
                        <div className="flex flex-col md:flex-row items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-32 w-32 md:h-40 md:w-40 rounded"
                          />
                          <div className="ml-4">
                            <Link
                              to={`/product/${item.product}`}
                              className={`text-${
                                darkMode ? "pale-blue" : "stone-950"
                              } font-semibold hover:text-yellow-700 no-underline`}
                            >
                              {item.name}
                            </Link>
                            <p>
                              ₹{" "}
                              <span className="text-coral-red font-bold">
                                {item.price}
                              </span>
                            </p>
                            <p>{item.quantity} Piece(s)</p>
                          </div>{" "}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </div>
  );
}
