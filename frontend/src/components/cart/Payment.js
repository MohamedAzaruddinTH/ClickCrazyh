import { useElements, useStripe } from "@stripe/react-stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { validateShipping } from "../cart/Shipping";
import { createOrder } from "../../actions/orderActions";
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const darkMode = useSelector((state) => state.darkmode);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { error: orderError } = useSelector((state) => state.orderState);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if (orderError) {
      toast(orderError, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }
  }, [dispatch,navigate,orderError,shippingInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
    try {
      const { data } = await axios.post("/api/v1/payment/process", paymentData);
      const clientSecret = data.client_secret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast(result.error.message, {
          type: "error",
          position: toast.POSITION.BOTTOM_CENTER,
        });
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if ((await result).paymentIntent.status === "succeeded") {
          toast("Payment Success!", {
            type: "success",
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(orderCompleted());
          dispatch(createOrder(order));

          navigate("/order/success");
        } else {
          toast("Please Try again!", {
            type: "warning",
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      }
    } catch (error) {}
  };

  return (
    <div
      className={`px-4 ${
        darkMode
          ? "bg-black"
          : "bg-gray-400"
      } text-pale-blue font-montserrat`}
    >
      <div className="flex justify-center items-center  min-h-screen">
        <div
          className={`w-full max-w-md px-4 py-2 ${
            darkMode
              ? "bg-gradient-to-bl from-blue-950 to-cyan-700 via-stone-800"
              : "bg-gradient-to-tl from-gray-900 to-gray-700 via-gray-600"
          } rounded-lg mb-2`}
        >
          <form onSubmit={submitHandler} className="w-full max-w-md px-4 py-2">
            <h1 className="mb-4 font-bold text-3xl text-center">Card Info</h1>
            <div className="">
              <label
                htmlFor="card_num_field"
                className="block mb-1 font-medium"
              >
                Card Number
              </label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="card_exp_field"
                className="block mb-1 font-medium mt-2"
              >
                Card Expiry
              </label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950 "
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="card_cvc_field"
                className="block mb-1 font-medium "
              >
                Card CVC
              </label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950 "
                value=""
              />
            </div>

            <button
              id="pay_btn"
              type="submit"
              className={`w-full py-3 mb-4 mt-4  ${
                darkMode
                  ? "bg-gradient-to-bl from-cyan-500 to-amber-500 via-stone-900"
                  : "bg-gradient-to-tl from-amber-500 to-cyan-800 via-slate-950"
              }  text-white font-bold rounded hover:to-white focus: outline-none`}
            >
              Pay - {` ₹${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
