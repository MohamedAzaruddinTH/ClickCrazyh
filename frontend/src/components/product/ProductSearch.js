import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import Product from "../product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "rc-slider/assets/index.css";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const darkMode = useSelector((state)=>state.darkmode)
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);
  const colPerScreenSize = { sm: 1, md: 2, lg: 3 };

  const { keyword } = useParams();
  console.log('keyword',keyword);
  
  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes",
    "Beauty/Health",
    "Shoes",
  ];

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProducts(keyword, priceChanged, category, rating, currentPage));
  }, [error, dispatch, currentPage, keyword, priceChanged, category, rating]);

  return (
    <div
      className={`${
        darkMode
          ? "bg-black"
          : "bg-gray-400"
      } font-montserrat text-pale-blue px-4 `}
    >
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <h1
            id="products_heading"
            className="text-4xl font-bold text-center"
          >
            Search <span className="text-coral-red">Products</span>
          </h1>
          <section className="max-container mx-auto mt-5">
            <div className="flex flex-wrap">
              <div className="w-2/5 md:w-1/4 p-5">
                {/* Price Filter */}
                <div
                  className="px-2 md:w-32"
                  onMouseUp={() => setPriceChanged(price)}
                >
                  <Slider
                    className="font-bold font-montserrat "
                    range={true}
                    marks={{
                      1:<span className="text-red-500">{"₹1"}</span>,
                      1000:<span className="text-red-500">{"₹1000"}</span>,
                    }}
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(price) => {
                      setPrice(price);
                    }}
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={`₹${renderProps.props["aria-valuenow"]}`}
                        >
                          <div {...renderProps.props}></div>
                        </Tooltip>
                      );
                    }}
                  />
                </div>
                <hr className="mt-10 border-gray-400 " />
                {/* Category Filter */}
                <div className="mt-5">
                  <h3 className="mb-3 font-semibold text-2xl">
                    Categories
                  </h3>
                  <ul className="pl-0">
                    {categories.map((categoryName) => (
                      <li
                        key={categoryName}
                        className={`cursor-pointer list-none mb-2 ${
                          category === categoryName
                            ? "text-amber-800 font-semibold"
                            : ""
                        }`}
                        onClick={() => {
                          setCategory(categoryName);
                        }}
                      >
                        {categoryName}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="my-5 border-gray-400" />
                {/* Ratings Filter */}
                <div className="mt-5">
                  <h4 className="mb-3 font-semibold text-2xl">
                    Ratings
                  </h4>
                  <ul className="pl-0">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li
                        key={star}
                        className={`cursor-pointer list-none mb-2 ${
                          rating === star
                            ? "text-yellow-500"
                            : "text-gray-500 hover:text-yellow-500"
                        }`}
                        onClick={() => {
                          setRating(rating === star ? 0 : star);
                        }}
                      >
                        <div className="flex items-center">
                          <div className="mr-2">
                            {[...Array(5)].map((_, index) => (
                              <span
                                key={index}
                                className={`text-2xl ${
                                  index < star
                                    ? "text-yellow-400"
                                    : "text-pale-blue"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{
                              width: `${star * 20}%`,
                            }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-3/4">
              <div
              className={`mt-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-6 gap-14 hover:no-underline`}
            >
              {products &&
                products.map((product) => (
                  <Product
                    key={product._id}
                    product={product}
                    col={colPerScreenSize.m}
                    darkMode={darkMode}
                  />
                ))}
            </div>
              </div>
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="flex justify-center mt-5 p-2">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"inline-block m-1"}
                linkClass={`px-2 py-2 font-bold ${darkMode ? "bg-gray-800" : "bg-black"}  text-${
                  darkMode ? "gray-300" : "yellow-500"
                } rounded hover:bg-yellow-500 hover:text-black hover:no-underline`}
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </div>
  );
}
