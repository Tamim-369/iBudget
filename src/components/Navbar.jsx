import React from "react";

const Navbar = () => {
  return (
    <nav className="flex p-5 bg-gray-50 justify-around items-center text-black">
      <div className="logo font-bold ">IBudget</div>
      <ul className="flex justify-center items-center gap-4">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">About</a>
        </li>
        <li>
          <a href="/">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
