import { useState } from "react";
import { Link } from "react-router-dom";
import {BiSolidStar} from "react-icons/bi"
import {BiStar} from "react-icons/bi"
import { useSelector } from "react-redux";

export default function Product({ product}) {
  const [isCartVisible,setIsCartVisible] = useState(false);
  const darkMode = useSelector((state) => state.darkmode);

  const toggleCartVisibility = ()=> {
    setIsCartVisible(!isCartVisible)
  }
  return (
    <div className="flex flex-1 w-full max-sm:w-full mx-auto px-4 mb-4 "
    onMouseEnter={toggleCartVisibility}
    onMouseLeave={toggleCartVisibility}
    >
      <div className={`${darkMode ? "bg-gray-700" : "bg-gray-900"} p-3 rounded shadow-lg flex flex-col w-72 h-full`}>
        <Link 
        to={`/product/${product._id}`} 
        className="hover:no-underline hover:font-bold"
        >
          {product.images.length > 0 && (
            <img
              className="mx-auto w-[282px] h-[262px] max-lg:h-[150px] max-sm:h-[262px] rounded"
              src={product.images[0].image}
              alt={product.name}
            />
          )}
        </Link>
        <div className="mt-2 flex flex-1 flex-col w-full max-sm:w-full justify-between text-center">
          <h5 className="text-xl font-semibold text-pale-blue ">
            <Link
              to={`/product/${product._id}`}
              className="font-montserrat "
            >
              {product.name}
            </Link>
          </h5>
          <div className="flex flex-1 w-full max-sm:w-full text-center justify-center">
            <div className="flex justify-start">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`text-yellow-500 font-bold text-xl ${
                    index < Math.floor(product.ratings)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  {index < Math.floor(product.ratings) ? <BiSolidStar/> : <BiStar/>}
                </span>
              ))}
               <span className="font-montserrat text-pale-blue text-md max-lg:text-sm  leading-normal">
              ({product.numOfReviews} Reviews)
              </span>
            </div>
          </div>
          <p className=" text-lg text-pale-blue font-semibold px-4 mb-2">
            ₹ <span className="font-montserrat text-coral-red">{product.price}</span>
          </p>
          <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="w-full py-2 text-center bg-gradient-to-tl from-stone-500 to-pale-blue via-stone-950 text-pale-blue hover:text-yellow-500 font-bold font-montserrat hover:no-underline hover:to-blue-500 rounded "
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
