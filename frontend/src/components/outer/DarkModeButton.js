import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../slices/darkModeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const DarkModeButton = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkmode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="inline-block px-4 py-3 mt-2 md:mt-0 font-montserrat text-pale-blue bg-gradient-to-r from-blue-500 to-blue-900 via-slate-900 rounded hover:scale-110 duration-300  hover:no-underline focus:outline-none"
    >
      {darkMode ? (
        <FontAwesomeIcon icon={faSun} />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </button>
  );
};

export default DarkModeButton;
