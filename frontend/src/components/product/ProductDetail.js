import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import {BiSolidStar} from "react-icons/bi"
import {BiStar} from "react-icons/bi"
import { createReview, getProduct } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import {
  clearReviewSubmitted,
  clearError,
  clearProduct,
} from "../../slices/productSlice";
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";

export default function ProductDetail() {
  const {
    loading,
    product = {},
    isReviewSubmitted,
    error,
  } = useSelector((state) => state.productState);
  const { user } = useSelector((state) => state.authState);
  const darkMode = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    if (product.stock === 0 || quantity >= product.stock) return;
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
 
  const settings = {
    Infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const reviewHandler = () => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("productId", id);
    dispatch(createReview(formData));
  };

  useEffect(() => {
    if (isReviewSubmitted) {
      handleCloseModal();
      toast("Review Submitted successfully", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearReviewSubmitted()),
      });
    }
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (!product._id || isReviewSubmitted) {
      dispatch(getProduct(id));
    }

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id, isReviewSubmitted, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`${
            darkMode
              ? "bg-black"
              : "bg-gray-400"
          } text-${darkMode ? "gray-400" : "pale-blue"} min-h-screen px-4 py-2`}
        >
          <MetaData title={product.name} />
          <div className="flex flex-col md:flex-row justify-center md:justify-between gap-2">
            <div className="md:w-1/2 mt-5">
              <div >
                {
                  product.images && 
                  product.images.length > 0 && (
                    <Slider {...settings}>
                      {product.images.map((image)=> (
                        <div key={image._id} className="relative group">
                          <img
                          className="h-62 w-full md:w-64 items-center rounded-lg  mx-auto transition-transform transform group-hover:scale-105 mt-4 "
                          src={image.image}
                          alt={product.name}
                          />
                        </div>
                      ))}
                    </Slider>
                  )
                }
              </div>
            </div>
            <div className="md:w-1/2 mt-5 font-montserrat">
              <h3 className="text-2xl font-semibold">{product.name}</h3>
              <p className={`mt-2 font-sm`}>Product # {product._id}</p>
              <hr className="my-2 border-x-8 border-gray-500" />
              <div className="flex items-center mt-2">
                <div className="flex mr-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={`text-yellow-500 text-xl font-semibold ${
                        index < Math.floor(product.ratings)
                          ? "text-yellow-500"
                          : "text-gray-900"
                      }`}
                    >
                      {index < Math.floor(product.ratings)
                        ? <BiSolidStar/>
                        : <BiStar/> }
                    </span>
                  ))}
                </div>
                <span
                  className={`ml-2 text-md text-${
                    darkMode ? "gray-400" : "gray-950"
                  }`}
                >
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <hr className="my-2 border-x-8 border-gray-500" />
              <p className="text-xl text-pale-blue font-semibold">
                ₹ <span className="text-red-500">{product.price}</span>
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={decreaseQty}
                  className={`px-3 py-1 bg-red-600 rounded text-xl text-gray-200 ${
                    product.stock === 0 || quantity === 1
                      ? "cursor-not-allowed"
                      : "hover:bg-red-700"
                  }`}
                  disabled={product.stock === 0 || quantity === 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-10 mx-2 text-center text-gray-950 bg-gray-100 border border-gray-500 rounded"
                  value={quantity}
                  readOnly
                />
                <button
                  onClick={increaseQty}
                  className={`px-3 py-1 bg-green-500 rounded text-xl text-gray-200 ${
                    product.stock === 0 || quantity >= product.stock
                      ? "cursor-not-allowed"
                      : "hover:bg-green-600"
                  } `}
                  disabled={product.stock === 0 || quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                id="cart_btn"
                disabled={product.stock === 0}
                onClick={() => {
                  dispatch(addCartItem(product._id, quantity));
                  toast("Cart Item Added!", {
                    type: "success",
                    position: toast.POSITION.BOTTOM_CENTER,
                  });
                }}
                className={` mt-2 px-6 py-3 mb-1 ${
                  product.stock === 0
                    ? "bg-gray-400  cursor-not-allowed"
                    : "font-palanquin bg-gradient-to-br from-blue-600 to-blue-500 via-blue-700 hover:to-cyan-500 font-semibold"
                } text-white rounded focus:outline-none`}
              >
                Add to Cart
              </button>
              <hr className="my-2 border-x-8 border-gray-500" />
              <p>
                Status:{" "}
                <span
                  className={`text-sm font-bold ${
                    product.stock > 0 ? "text-green-700" : "text-red-500"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <hr className="my-2 border-x-8 border-gray-500" />
              <h4 className="mt-2 text-md font-semibold">Description:</h4>
              <p
                className={`text-${
                  darkMode ? "gray-400" : "gray-950"
                } text-xl font-montserrat`}
              >
                {product.description}
              </p>
              <hr className="my-2 border-x-8 border-gray-500" />
              <p className="mt-2 text-sm">
                Sold by:{" "}
                <strong className="text-blue-500">{product.seller}</strong>
              </p>
              {user ? (
                <div>
                  <button
                    onClick={handleShowModal}
                    id="review_btn"
                    type="button"
                    className={`mt-4 px-4 py-3 ${
                      showModal
                        ? "bg-yellow-400 text-stone-900"
                        : "bg-gradient-to-br from-cyan-600 to-cyan-500 via-cyan-700 text-white hover:to-blue-500"
                    } font-semibold rounded focus:outline-none`}
                  >
                    Submit Your Review
                  </button>

                  <div
                    className={`fixed inset-0 flex items-center justify-center  ${
                      showModal ? "visible" : "invisible"
                    }`}
                  >
                    <div className="bg-gradient-to-tl from-[#434343] to-[#2c3e50] via-[#434343] p-6 text-pale-blue rounded-lg shadow-lg max-w-sm w-full">
                      <div className="flex mb-3 space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            onClick={() => setRating(star)}
                            className={`text-2xl cursor-pointer ${
                              star <= rating
                                ? "text-yellow-400"
                                : "text-gray-300 hover:text-yellow-400"
                            }`}
                          >
                            <BiSolidStar/>
                          </div>
                        ))}
                      </div>
                      <textarea
                        onChange={(e) => setComment(e.target.value)}
                        name="review"
                        id="review"
                        className="w-full p-2 bg-gray-100 border text-stone-900 text-xl border-gray-500 rounded"
                      ></textarea>
                      <button
                        disabled={loading}
                        onClick={reviewHandler}
                        aria-label="Close"
                        className={`mt-3 px-6 py-2 text-gray-950 ${
                          loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-br from-blue-500 to-stone-800 via-yellow-400 hover:to-cyan-700"
                        } font-semibold rounded`}
                      >
                        Submit
                      </button>
                      <button
                        onClick={handleCloseModal}
                        className="mt-3 ml-2 px-6 py-2 bg-red-500 text-white font-semibold rounded"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-5 text-red-600">Login to Post Review</p>
              )}

              <div className="mt-2">
                <div className="rating"></div>
              </div>
            </div>
          </div>

          {product.reviews && product.reviews.length > 0 ? (
            <ProductReview reviews={product.reviews} />
          ) : null}
        </div>
      )}
    </Fragment>
  );
}
