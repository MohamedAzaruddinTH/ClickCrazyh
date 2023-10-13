import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import DarkModeButton from "../outer/DarkModeButton";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logout);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-black font-montserrat">
      <nav className="max-container p-2 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="w-[180px] h-[120px] max-sm:w-20 max-sm:h-16 max-lg:w-30 max-lg:h-20 transform transition-transform hover:-scale-x-105"
              alt="NextCart Logo"
              src="/images/others/16.png"
            />
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-white"
              >
                <img
                  src={user.avatar ?? "./images/default_avatar.png"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded object-cover"
                />

                <span className="ml-2 max-lg:hidden ">{user.name}</span>
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 w-34 mt-2 bg-white rounded shadow-lg z-10">
                  {user.role === "admin" && (
                    <li>
                      <button
                        onClick={() => {
                          navigate("admin/dashboard");
                          toggleDropdown();
                        }}
                        className="block px-6 py-2 font-semibold text-stone-900 hover:bg-blue-500 hover:rounded focus:outline-none"
                      >
                        Dashboard
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        logoutHandler();
                        toggleDropdown(); // Close dropdown after logout
                      }}
                      className="block px-6 py-2 font-semibold text-stone-900 hover:bg-red-500 hover:rounded focus:outline-none"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-block px-8 py-3 font-semibold text-pale-blue bg-gradient-to-tr from-blue-500 to-blue-900 via-slate-900 rounded hover:to-pale-blue hover:no-underline focus:outline-none"
              id="login_btn"
            >
              Log<span className="text-coral-red">in</span>
            </Link>
          )}
          <DarkModeButton />
        </div>
      </nav>
    </header>
  );
}
