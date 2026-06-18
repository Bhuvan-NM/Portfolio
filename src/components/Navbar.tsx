import React from "react";
import { Link, NavLink } from "react-router-dom";

interface NavbarProps {
  classname?: string;
  onOpenContact?: () => void;
}

const items = [
  { label: "Home", to: "/" },
  { label: "History", to: "/history" },
  { label: "Contact", to: "/contact" },
];

const Navbar: React.FC<NavbarProps> = ({ classname = "", onOpenContact }) => {
  return (
    <>
      <header className={classname}>
        <Link
          to="/"
          className="header-logo"
        >
          Bhuvan
          <span
            className="header-logo-dot"
            aria-hidden="true"
          />
        </Link>

        <nav>
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="navbar--component"
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="header-btn"
          type="button"
          onClick={onOpenContact}
        >
          Let's Talk
        </button>
      </header>
    </>
  );
};

export default Navbar;
