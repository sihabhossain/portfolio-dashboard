"use client";

import { useEffect, useRef, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

// icons
import { CiLogout } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import useLogout from "@/utils/useLogout";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const logout = useLogout(); // Initialize the useLogout hook

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null); // For managing the delay

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // Close the dropdown after a delay (only on mobile)
  const closeDropdownWithDelay = () => {
    closeTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // Adjust the delay as needed
  };

  // Clear the timeout if the dropdown is manually closed
  const clearCloseTimeout = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  return (
    <div className="relative">
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex cursor-pointer items-center gap-4"
      >
        {/* <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            Sihab Hossain
          </span>
          <span className="block text-xs">Software Developer</span>
        </span> */}

        <div className="flex items-center">
          <FaRegCircleUser size={30} />
          <RiArrowDropDownLine size={30} />
        </div>
      </div>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => closeDropdownWithDelay()} // Use the closeDropdownWithDelay function
        onMouseEnter={clearCloseTimeout} // Clear the timeout on mouse enter
        onMouseLeave={closeDropdownWithDelay} // Close the dropdown with delay on mouse leave
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        {/* Add onClick handler to the logout button */}
        <button
          onClick={() => {
            logout(); // Call the logout function when the logout button is clicked
            setDropdownOpen(false); // Close the dropdown after logout
          }}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <div>
            <CiLogout size={25} />
          </div>
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
