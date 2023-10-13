import React from "react";
import { Link } from "react-router-dom";

const YearProduct = () => {
  return (
    <Link to="/shop">
      <div className="w-full h-80 mb-20 bg-gray-400 md:bg-transparent relative font-montserrat">
        <img
          className="w-full h-full object-cover hidden md:inline-block "
          src="images/others/productOfTheYear.webp"
          alt="Product of the Year"
        />
        <div className="w-full md:w-2/3 xl:w-1/2 h-80 absolute px-4 md:px-0 top-0 right-0 flex flex-col items-start gap-6 justify-center">
          <h1 className="text-3xl font-semibold ">Product of The year</h1>
          <p className="text-sm font-normal text-gray-500 max-w-[600px] mr-4">
            Introducing our award-winning product that has taken the market by
            storm. Our <strong>Product of the Year</strong> combines
            cutting-edge technology with stylish design to deliver an
            exceptional user experience.
          </p>
          <p className="mt-4">
            Discover why our <strong>Product of the Year</strong> is the top
            choice for customers worldwide. Upgrade your lifestyle today!
          </p>
        </div>
      </div>
    </Link>
  );
};

export default YearProduct;
