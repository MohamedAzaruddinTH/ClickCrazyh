import React from "react";
import { SiShopify } from "react-icons/si";
import { TiShoppingCart } from "react-icons/ti";
import { BiSolidUserAccount } from "react-icons/bi";
import { RiShoppingBasketLine } from "react-icons/ri";

import { useSelector } from "react-redux";

const SocialLinks = () => {
  const darkMode = useSelector((state) => state.darkmode);
  const { items: cartItems } = useSelector((state) => state.cartState);

  const links = [
    {
      id: 1,
      child: (
        <>
          <BiSolidUserAccount size={30} />
          Profile 👈🏻
        </>
      ),
      href: "/myprofile",
    },
    {
      id: 2,
      child: (
        <>
          <SiShopify size={30} />
          Shop 👈🏻
        </>
      ),
      href: "/shop",
    },
    {
      id: 3,
      child: (
        <>
          <TiShoppingCart size={30} />
          <p
            className=" bg-white text-black text-xs w-4 h-4 mr-6 rounded-full flex items-center justify-center font-semibold"
            id="cart_count"
          >
            {cartItems.length}
          </p>
          Cart 👈🏻
        </>
      ),
      href: "/cart",
    },
    {
      id: 4,
      child: (
        <>
          <RiShoppingBasketLine size={30} />
          Orders 👈🏻
        </>
      ),
      href: "/orders",
    },
  ];
  return (
    <div className=" flex-col top-[35%] right-0 fixed lg:flex">
      <ul>
        {links.map((link) => (
          <li
            key={link.id}
            className={
              `flex justify-between items-center w-40 h-14 px-4 mr-[-100px] hover:ml-[-100px] hover:rounded-md duration-300 ${
                darkMode ? "bg-indigo-500" : " bg-stone-950"
              }` +
              " " +
              link.style
            }
          >
            <a
              href={link.href ? link.href : "/"}
              className={`flex justify-between items-center w-full font-semibold text-pale-blue`}
              target="_blank"
              rel="noreferrer"
            >
              {link.child}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;
