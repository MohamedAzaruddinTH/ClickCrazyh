import React from "react";
import { Link } from "react-router-dom";

const Sale = () => {
  return (
    <div className="py-20 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10 px-4 ">
      <div className="w-full md:w-2/3 lg:w-1/2 h-full hover:scale-90 duration-300">
        <Link to="/shop">
          <img
            className="rounded"
            src="images/sale/saleImgOne.webp"
            alt="sale 1"
          />
        </Link>
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10 ">
        <div className="h-1/2 w-full hover:scale-90 duration-300">
          <Link to="/shop">
            <img
              className="rounded"
              src="images/sale/saleImgTwo.webp"
              alt="sale 2"
            />
          </Link>
        </div>
        <div className="h-1/2 w-full hover:scale-90 duration-300">
          <Link to="/shop">
            <img
              className="rounded"
              src="images/sale/saleImgThree.webp"
              alt="sale 3"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sale;
