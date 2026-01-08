import React from "react";
import MenuOverlay from "./MenuOverlay";

interface NavbarProps {
  classname?: string;
}

const Navbar: React.FC<NavbarProps> = ({ classname = "" }) => {
  return (
    <>
      <header className={classname}>
        <a
          href=""
          className="header-logo"
        >
          Bhuvan<span>.</span>
        </a>

        <nav>
          <a
            href=""
            className="navbar--component"
          >
            Home
          </a>
          <a
            href=""
            className="navbar--component"
          >
            About
          </a>
          <a
            href=""
            className="navbar--component"
          >
            Projects
          </a>
          <a
            href=""
            className="navbar--component"
          >
            Contact
          </a>
        </nav>
        <button className="header-btn">Let's Talk</button>
      </header>
      <MenuOverlay />
    </>
  );
};

export default Navbar;
