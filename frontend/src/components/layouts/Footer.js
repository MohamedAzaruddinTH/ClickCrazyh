import { AiOutlineInstagram } from "react-icons/ai";
import { RiFacebookFill } from "react-icons/ri";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function Footer() {
  const darkMode = useSelector((state) => state.darkmode);
  return (
    <footer
      className={`${
        darkMode ? "bg-gray-800" : " bg-black"
      } text-gray-200 py-8 font-montserrat`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center space-y-4 md:space-y-0">
        <div className="mb-6 md:mb-0 flex items-center ">
          <a href="#">
            <img
              className="w-[80px] h-[80px] max-sm:w-20 max-sm:h-16 max-lg:w-30 max-lg:h-20 rounded"
              alt="NextCart Logo"
              src="/images/others/logo01.png"
            />
          </a>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <AiOutlineInstagram className="text-3xl" />
          <RiFacebookFill className="text-3xl" />
          <AiOutlineTwitter className="text-3xl" />
          <BsYoutube className="text-3xl" />
        </div>

        <div className="flex justify-between md:justify-start space-x-8">
          <div>
            <h3 className="text-lg font-semibold">My Account</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/myprofile" className="hover:text-yellow-500">
                  Account
                </a>
              </li>
              <li>
                <a href="/orders" className="hover:text-yellow-500">
                  Order
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-yellow-500">
                  Cart
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Pages</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/" className="hover:text-yellow-500">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-yellow-500">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-4 text-xl text-center">
        Click_Crazy &copy; 2022-2023. All Rights Reserved
      </p>
    </footer>
  );
}
