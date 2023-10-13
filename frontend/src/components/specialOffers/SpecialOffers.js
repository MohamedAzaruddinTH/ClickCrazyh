import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SpecialOffers = () => {
  const darkMode = useSelector((state) => state.darkmode);

  const imageFilenames = [
    "spl1.png",
    "spl2.png",
    "spl3.png",
    "spl4.png",
    "spl5.png",
    "spl6.png",
    "spl7.png",
    "spl8.png",
    "spl9.png",
    "spl10.png",
    "spl11.png",
    "spl12.png",
    "spl13.png",
    "spl14.png",
    "spl15.png",
    "spl16.png",
  ]; // Replace with your actual filenames

  return (
    <div className="w-full pb-20">
      <h2
        className={`flex justify-start text-3xl font-semibold font-montserrat text-center px-8 py-2 text-${
          darkMode ? "white" : "stone-900"
        }`}
      >
        Special <span className="text-coral-red "> Offers</span>
      </h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
        {imageFilenames.map((filename, index) => (
          <div key={index} className="px-2">
            <div className="relative group">
              <Link to="/shop">
                <img
                  src={`${process.env.PUBLIC_URL}/images/specialOffers/${filename}`}
                  alt={`Special Offer ${index}`}
                  className="w-full rounded transition-transform transform group-hover:scale-110 duration-300"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
