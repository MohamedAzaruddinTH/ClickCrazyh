import { Link } from "react-router-dom";
import { TbArrowBadgeRight } from "react-icons/tb";

export default function CheckoutSteps({ shipping, confirmOrder, payment }) {

  return (
    <div className="checkout-progress flex justify-center mt-5 ">
      <Link
        to="/shipping"
        className={`${
          shipping ? "text-pale-blue" : "text-blue-900"
        } flex items-center text-3xl max-sm:text-xl hover:no-underline 
        }`}
      >
        <div
          className={`${
            shipping ? "triangle2-active" : "triangle2-incomplete"
          } mr-1`}
        ></div>
        <div
          className={`${
            shipping ? "step active-step" : "step incomplete"
          } mr-1`}
        >
          Shipping Info
        </div>
        <div
          className={`${
            shipping ? "triangle-active" : "triangle-incomplete"
          } mr-1`}
        ></div>
      </Link>
      <div>
        <span>
          <TbArrowBadgeRight size={35} className=" mt-2 text-pale-blue" />
        </span>
      </div>
      <Link
        to="/order/confirm"
        className={`${
          confirmOrder ? "text-pale-blue" : "text-blue-900"
        } flex items-center text-3xl max-sm:text-xl hover:no-underline
        }`}
      >
        <div
          className={`${
            confirmOrder ? "triangle2-active" : "triangle2-incomplete"
          } mr-1`}
        ></div>
        <div
          className={`${
            confirmOrder ? "step active-step" : "step incomplete"
          } mr-1`}
        >
          Confirm Order
        </div>
        <div
          className={`${
            confirmOrder ? "triangle-active" : "triangle-incomplete"
          } mr-1`}
        ></div>
      </Link>
      <div>
        <span>
          <TbArrowBadgeRight size={35} className=" mt-2 text-pale-blue" />
        </span>
      </div>
      <Link
        to="/payment"
        className={`${
          payment ? "text-pale-blue" : "text-blue-900"
        } flex items-center  text-3xl max-sm:text-xl hover:no-underline
        }`}
      >
        <div
          className={`${
            payment ? "triangle2-active" : "triangle2-incomplete"
          } mr-1`}
        ></div>
        <div
          className={`${payment ? "step active-step" : "step incomplete"} mr-1`}
        >
          Payment{" "}
        </div>
        <div
          className={`${
            payment ? "triangle-active" : "triangle-incomplete"
          } mr-1`}
        ></div>
      </Link>
    </div>
  );
}
