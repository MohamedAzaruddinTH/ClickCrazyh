import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const Banner = () => {
  const darkMode = useSelector((state) => state.darkmode);

  const settings = {
    Infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div
      className={`w-full ${darkMode ? "bg-black" : "bg-gray-400"} px-4 mt-2`}
    >
      <Slider {...settings}>
        <Link to="/shop">
          <div>
            <img src="/images/banner/bannerImgOne.webp" alt="Banner 1" />
          </div>
        </Link>
        <Link to="/shop">
          <div>
            <img src="/images/banner/bannerImgTwo.webp" alt="Banner 2" />
          </div>
        </Link>
        <Link to="/shop">
          <div>
            <img src="/images/banner/bannerImgThree.webp" alt="Banner 3" />
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default Banner;
