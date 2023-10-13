import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import { orderDetail as orderDetailAction } from "../../actions/orderActions";

export default function OrderDetail() {
  const { orderDetail, loading } = useSelector((state) => state.orderState);

  const darkMode = useSelector((state) => state.darkmode);
  const {
    shippingInfo = {},
    user = {},
    orderStatus = "Processing",
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [id,dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`${darkMode ? "bg-black" : "bg-gray-400"} text-${
            darkMode ? "gray-400" : "pale-blue"
          } min-h-screen font-montserrat px-4 py-2 overflow-x-auto`}
        >
          <h1
            className={`text-2xl font-semibold text-${
              darkMode ? "white" : "pale-blue"
            } mb-4 text-center`}
          >
            <span className="text-coral-red">Order #</span> {orderDetail._id}
          </h1>
          {/* Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className={`text-${darkMode ? "pale-blue" : "stone-900"}`}
                  >
                    {user.name}
                  </span>
                </p>
                <p className="mb-1">
                  <b>Phone:</b>{" "}
                  <span
                    className={`text-${darkMode ? "pale-blue" : "stone-900"}`}
                  >
                    {shippingInfo.phoneNo}
                  </span>
                </p>
                <p className="mb-1">
                  <b>Address:</b>{" "}
                  <span
                    className={`text-${darkMode ? "pale-blue" : "stone-900"}`}
                  >
                    {shippingInfo.address},{shippingInfo.city},
                    {shippingInfo.postalCode},{shippingInfo.state},
                    {shippingInfo.country}
                  </span>
                </p>
                <hr className=" border-gray-500" />

                <div className="mt-4">
                  <h2
                    className={`text-2xl text-${
                      darkMode ? "yellow-500" : "blue-900"
                    } font-semibold mb-1`}
                  >
                    Payment
                  </h2>
                  <p>
                    <b>Amount:</b> ₹
                    <span className="text-coral-red font-bold">
                      {totalPrice}
                    </span>
                  </p>
                  <p className={isPaid ? "text-green-600" : "text-red-600"}>
                    <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                  </p>
                </div>
                <hr className=" border-gray-500" />

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
                <hr className=" border-gray-500" />
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h2
                className={`text-2xl text-${
                  darkMode ? "yellow-500" : "blue-900"
                } font-bold mb-1`}
              >
                Order Items:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 ">
                {orderItems.map((item) => (
                  <div className="my-4" key={item._id}>
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-32 w-32 rounded"
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
