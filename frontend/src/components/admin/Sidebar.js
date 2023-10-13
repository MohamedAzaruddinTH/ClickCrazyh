import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function  Sidebar() {
  const darkMode = useSelector((state)=>state.darkmode)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`sidebar-wrapper text-${darkMode ? "pale-blue" : "stone-900"} font-bold`}>
      <nav id="sidebar">
        <ul className="list-none mt-6 p-4 md:p-8">
          <li className="">
            <Link
              to="/admin/dashboard"
              className="block px-2 md:px-4 py-2  hover:text-blue-500 hover:no-underline mt-2"
            >
              <i className="fas fa-tachometer-alt max-sm:ml-0 md:p-2"></i>Dashboard
            </Link>
          </li>

          <li className="mb-1">
            <Link
              to="/admin/orders"
              className="block px-2 md:px-3 py-2  hover:text-coral-red  hover:no-underline"
            >
              <i className="fas fa-shopping-cart md:p-2"></i>Orders
            </Link>
          </li>

          <li className="mb-1">
            <Link
              to="/admin/users"
              className="block px-2 md:px-3 py-2  hover:text-yellow-400 hover:no-underline "
            >
              <i className="fa fa-users md:ml-2 "></i> Users
            </Link>
          </li>

          <li className="mb-1">
            <Link
              to="/admin/reviews"
              className="block px-2 md:px-3 py-2  hover:text-orange-500 hover:no-underline "
            >
              <i className="fa fa-star md:ml-2"></i> Reviews
            </Link>
          </li>

          <li className="mb-1 ">
            <button
              onClick={handleDropdownToggle}
              className="block w-full text-left px-2 md:px-3 py-2  hover:text-purple-400  focus:outline-none"
            >
              <i className="fa fa-cubes  md:ml-2" ></i> Product
            </button>

            {isDropdownOpen && (
              <ul className="absolute mt-2  text-gray-800 font-semibold">
                <li>
                  <Link
                    to="/admin/products"
                    className="block px-2 md:px-2 py-1 md:mr-4 lg:ml-4 bg-yellow-500 hover:bg-yellow-600 hover:text-white  hover:no-underline rounded"
                  >
                    <i className="fas fa-shopping-basket mr-1 md:mr-2"></i> All
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/products/create"
                    className="block px-2 md:px-2 py-1 mt-1 md:mt-2 md:mr-4 lg:ml-4 bg-blue-500 hover:bg-blue-600 hover:text-white  hover:no-underline rounded"
                  >
                    <i className="fa fa-plus mr-1 md:mr-2"></i> Create
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
