import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { LuArchiveRestore } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { MdChecklistRtl } from "react-icons/md";

import { Link } from "react-scroll";

const Header = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="fixed top-0 w-full h-[80px] bg-[#EEF5DB] px-4 flex justify-between items-center select-none">
      <div>
        <h1 className="md:hidden flex items-center text-3xl font-medium text-[#7E9E9F]">
          <FaClipboardList className="mr-2" />
          TO-DO
        </h1>
        <div className="hidden md:flex absolute top-0 left-0 w-[300px] h-screen bg-[#7A9E9F] text-[#EEF5DB] flex-col transition-opacity duration-300 ease-in-out">
          <h1 className="flex justify-items-start items-center py-6 px-2 text-3xl font-medium text-[#EEF5DB]">
            <FaClipboardList className="mx-2" />
            TO-DO
          </h1>
          <ul className="w-full">
            <Link to="add-tab" smooth={true} duration={500}>
              <li className="flex items-center py-2 rounded-md mb-[10px] bg-[#EEF5DB] text-[#7E9E9F] w-full text-xl font-medium hover:bg-[#D9D9D9] cursor-pointer">
                <LuArchiveRestore className="mr-4 ml-4" /> tasks
              </li>
            </Link>
            <Link to="important-tab" smooth={true} duration={500}>
              <li className="flex items-center py-2 rounded-md mb-[10px] bg-[#EEF5DB] text-[#7E9E9F] w-full text-xl font-medium hover:bg-[#D9D9D9] cursor-pointer">
                <FaRegStar className="mr-4 ml-4" />
                important
              </li>
            </Link>
            <Link to="archive-tab" smooth={true} duration={500}>
              <li className="flex items-center py-2 rounded-md mb-[10px] bg-[#EEF5DB] text-[#7E9E9F] w-full text-xl font-medium hover:bg-[#D9D9D9] cursor-pointer">
                <MdChecklistRtl className="mr-4 ml-4" /> archive
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div onClick={handleClick} className="md:hidden z-10 text-[#7E9E9F]">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>
      <div
        className={`md:hidden absolute top-0 left-0 w-[200px] h-screen bg-[#7A9E9F] text-[#EEF5DB] flex flex-col transition-opacity duration-300 ease-in-out ${
          nav ? "" : "opacity-0 pointer-events-none"
        }`}
      >
        <h1 className="flex justify-items-start items-center py-6 px-2 text-3xl font-medium text-[#EEF5DB]">
          <FaClipboardList className="mx-2" />
          TO-DO
        </h1>
        <ul className="w-full">
          <Link onClick={handleClick} to="add-tab" smooth={true} duration={500}>
            <li className="flex items-center py-2 rounded-md mb-[10px] bg-[#EEF5DB] text-[#7E9E9F] w-full text-xl font-medium hover:bg-[#D9D9D9] cursor-pointer">
              <LuArchiveRestore className="mr-4 ml-2" /> tasks
            </li>
          </Link>
          <Link onClick={handleClick} to="important-tab" smooth={true} duration={500}>
            <li className="flex items-center py-2 rounded-md mb-[10px] bg-[#EEF5DB] text-[#7E9E9F] w-full text-xl font-medium hover:bg-[#D9D9D9] cursor-pointer">
              <FaRegStar className="mr-4 ml-2" /> important
            </li>
          </Link>
          <Link onClick={handleClick} to="archive-tab" smooth={true} duration={500}>
            <li className="flex items-center py-2 rounded-md mb-[10px] bg-[#EEF5DB] text-[#7E9E9F] w-full text-xl font-medium hover:bg-[#D9D9D9] cursor-pointer">
              <MdChecklistRtl className="mr-4 ml-2" /> archive
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
