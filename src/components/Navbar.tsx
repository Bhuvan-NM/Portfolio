import React from "react";

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
            className="navcomponent"
          >
            Home
          </a>
          <a
            href=""
            className="navcomponent"
          >
            About
          </a>
          <a
            href=""
            className="navcomponent"
          >
            Projects
          </a>
          <a
            href=""
            className="navcomponent"
          >
            Contact
          </a>
        </nav>
        <button className="header-btn">Let's Talk</button>
      </header>
    </>
  );
};

export default Navbar;
