import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";
import { getUsers } from "../../actions/userActions";
import { adminOrders as adminOrdersAction } from "../../actions/orderActions";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { products = [] } = useSelector((state) => state.productsState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState);
  const darkMode = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();
  let outOfStock = 0;

  if (products.length > 0) {
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });
  }

  let totalAmount = 0;
  if (adminOrders.length > 0) {
    adminOrders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  }

  totalAmount = totalAmount.toFixed(2);

  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(getUsers);
    dispatch(adminOrdersAction);
  }, [dispatch]);

  return (
    <div
      className={`${
        darkMode
          ? "bg-black"
          : "bg-gradient-to-tl from-gray-500 to-gray-700 via-gray-500"
      } font-montserrat text-pale-blue px-4 min-h-screen`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-1 md:col-span-10">
          <h1 className="text-4xl text-center font-bold mb-4">
            Dash<span className="text-coral-red">board</span>
          </h1>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-2">
              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <div className="bg-gradient-to-tl from-blue-600 to-blue-500 via-stone-950 text-pale-blue p-4 h-40 rounded">
                  <div className="text-center text-xl font-semibold">
                    Total Amount
                  </div>
                  <div className="text-center text-3xl mt-4">
                    ₹ <span className="text-coral-red">{totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <div className="bg-gradient-to-bl from-lime-600 to-lime-500 via-stone-950 text-pale-blue p-4  h-40 rounded">
                  <div className="text-center font-semibold text-xl">
                    Products
                  </div>
                  <div className="text-center text-3xl mt-2">
                    {products.length}
                  </div>
                  <Link
                    className="block mt-2 text-center text-white bg-cyan-900 hover:no-underline rounded py-2"
                    to="/admin/products"
                  >
                    View Details<i className="fa fa-angle-right ml-1"></i>
                  </Link>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <div className="bg-gradient-to-r from-coral-red to-red-500 via-stone-950 text-pale-blue p-4 h-40 rounded">
                  <div className="text-center font-semibold text-xl">
                    Orders
                  </div>
                  <div className="text-3xl font-semibold text-center mt-2">
                    {adminOrders.length}
                  </div>
                  <Link
                    className="block mt-2 text-center text-white bg-red-900 py-2 hover:no-underline rounded"
                    to="/admin/orders"
                  >
                    View Details<i className=" fa fa-angle-right ml-1"></i>
                  </Link>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <div className="bg-gradient-to-bl from-yellow-400 to-yellow-500 via-stone-950 text-pale-blue p-4 h-40 rounded">
                  <div className="text-center font-semibold text-xl">Users</div>
                  <div className="text-center text-3xl mt-2">
                    {users.length}
                  </div>
                  <Link
                    className="block mt-2 text-center text-white bg-slate-800 py-2 hover:no-underline rounded"
                    to="/admin/users"
                  >
                    View Details<i className="fa fa-angle-right ml-1"></i>
                  </Link>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <div className="bg-gradient-to-tl from-gray-300 to-stone-700 via-slate-950 text-pale-blue p-4 h-40 rounded">
                  <div className="text-center font-semibold text-xl">
                    Out of Stock
                  </div>
                  <div className="text-center text-3xl mt-4">{outOfStock}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
