import { useSelector } from "react-redux";
import { runFireWorks } from "../outer/confetti";
import { useEffect } from "react";

export default function OrderSuccess() {
  const darkMode = useSelector((state) => state.darkmode);

  useEffect(() => {
    runFireWorks();
  });
  return (
    <div
      className={`bg-${
        darkMode ? "black" : "gray-600"
      } h-full py-2 px-4 font-montserrat`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <img
            className="my-5 mx-auto h-54 w-64 rounded-lg"
            src="/images/others/success3.jpg"
            alt="Order Success"
          />

          <h2 className="text-2xl font-semibold mb-3 text-pale-blue">
            Your Order has been placed successfully.
          </h2>

          <a
            href="/orders"
            className={`text-${
              darkMode ? "yellow-500" : "blue-950"
            } text-xl font-bold  hover:no-underline hover:text-3xl`}
          >
            Go to Orders
          </a>
        </div>
      </div>
    </div>
  );
}
