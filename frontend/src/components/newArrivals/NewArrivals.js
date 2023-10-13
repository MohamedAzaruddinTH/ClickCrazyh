import React from "react";
import Slider from "react-slick";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const darkMode = useSelector((state) => state.darkmode);

  const breakpoints = [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  const imageFilename = Array.from(
    { length: 20 },
    (_, index) => `nw${index + 1}.png`
  );

  const getImagePath = (filename) => {
    return `${process.env.PUBLIC_URL}/images/newArrivals/${filename}`;
  };

  return (
    <div className="w-full pb-16">
      <h1
        className={`flex justify-start text-3xl font-semibold font-montserrat text-center px-8 py-2 text-${
          darkMode ? "white" : "stone-900"
        }`}
      >
        New <span className="text-coral-red"> Arrivals</span>
      </h1>
      <Slider
        infinite={true}
        speed={800}
        slidesToShow={4}
        slidesToScroll={4}
        nextArrow={<SampleNextArrow />}
        prevArrow={<SamplePrevArrow />}
        responsive={breakpoints}
      >
        {imageFilename.map((filename, index) => (
          <div key={index} className="px-4 lg:px-16 md:px-4 sm:px-2">
            <div className="relative group">
              <Link to="/shop">
                <img
                  src={getImagePath(filename)}
                  alt={`New Arrivals ${index}`}
                  className="w-full sm:w-52 md:w-64 lg:w-72 h-72 md:h-64 lg:h-80 rounded-lg mx-auto transition-transform transform hover:scale-110 duration-300 mt-4 mb-4"
                />
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
