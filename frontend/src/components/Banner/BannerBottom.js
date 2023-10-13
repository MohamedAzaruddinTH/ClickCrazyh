import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { CgRedo } from "react-icons/cg";

const BannerBottom = () => {
  return (
    <div className="px-4">
      <div className="w-full bg-gray-300 border-b-[1px] py-8 border-b-gray-500 px-4 font-montserrat font-semibold text-stone-900 mt-8 rounded">
        <div className="max-w-container mx-auto h-20 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center justify-center gap-2 w-64 shadow-xl py-2 space-x-2 rounded">
            <span className="text-sm w-6 text-center">2</span>
            <p className="text-sm ">Two years warranty</p>
          </div>

          <div className="flex items-center justify-center gap-2 w-64 shadow-xl py-2 space-x-2 rounded">
            <span className=" text-center text-coral-red">
              <MdLocalShipping size={20} />
            </span>
            <p className="text-sm">Free shipping</p>
          </div>

          <div className="flex md:w-auto items-center justify-center gap-2 w-72 shadow-xl py-2 space-x-2 rounded">
            <span className="text-center text-indigo-500">
              <CgRedo size={20} />
            </span>
            <p className="text-sm">Return policy in 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;
