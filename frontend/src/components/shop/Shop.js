import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProducts } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import Product from "../product/Product";
import Pagination from "react-js-pagination";

export const Shop = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const colPerScreenSize = { sm: 1, md: 2, lg: 3 };
  const [currentPage, setCurrentPage] = useState(1);
  const darkMode = useSelector((state) => state.darkmode);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };
  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }

    dispatch(getProducts(null, null, null, null, currentPage));
  }, [error, dispatch, currentPage]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`${
            darkMode ? "bg-black" : "bg-gray-400"
          } overflow-hidden transition-colors duration-300`}
        >
          <h1
            className={`text-4xl font-semibold font-palanquin text-center px-4 py-2 text-${
              darkMode ? "white" : "pale-blue"
            }`}
          >
            Latest
            <span className={`text-${darkMode ? "red-500" : "coral-red"}`}>
              {" "}
              Products
            </span>
          </h1>
          <section
            id="products"
            className={`max-container${
              darkMode ? "text-white" : ""
            } max-sm:mt-12`}
          >
            <div
              className={`mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14 hover:no-underline`}
            >
              {products &&
                products.map((product) => (
                  <Product
                    key={product._id}
                    product={product}
                    col={colPerScreenSize.md}
                    darkMode={darkMode}
                  />
                ))}
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="flex justify-center mt-5 mb-2 font-montserrat ">
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
        </div>
      )}
    </Fragment>
  );
};
