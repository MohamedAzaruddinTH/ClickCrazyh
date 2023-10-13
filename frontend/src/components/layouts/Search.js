import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {BiSearchAlt2} from "react-icons/bi"

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const darkMode = useSelector((state) => state.darkmode);

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };

  const clearKeyword = () => {
    setKeyword("");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      clearKeyword();
    }
  }, [location]);

  return (
    <div
      className={`${
        darkMode ? "bg-black" : "bg-gray-400"
      } font-montserrat text-stone-900  p-2`}
    >
      <div className="flex items-center justify-center">
        <form onSubmit={searchHandler} className="flex items-center">
          <input
            type="text"
            id="search_field"
            className="font-montserrat  w-full md:w-64 px-4 py-2.5 border rounded-l-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter Product Name ..."
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            value={keyword}
          />
          <button
            id="search_btn"
            className={`w-12 h-12 ${darkMode ? "bg-gray-800" : "bg-black"}  hover:bg-coral-red text-white flex items-center justify-center rounded-r-lg ml-1 focus:outline-none`}
            disabled={!keyword}
          >
            <BiSearchAlt2 size={25}/>
          </button>
        </form>
      </div>
    </div>
  );
}
