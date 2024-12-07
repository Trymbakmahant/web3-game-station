import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#F7F3E9] text-black shadow-md py-4 px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">WGS</div>
        <ul className="flex space-x-6">
          <li>
            <a
              href="/publicroom"
              className="hover:scale-150 text-xl transition duration-300"
            >
              Gamer
            </a>
          </li>
          <li>
            <a
              href="/createSession"
              className="hover:scale-150 text-xl transition duration-300"
            >
              Organization
            </a>
          </li>
          <appkit-button className="text-black" />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
