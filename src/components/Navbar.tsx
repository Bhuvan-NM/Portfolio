import React, { useEffect, useState } from "react";
import MenuOverlay from "./MenuOverlay";

interface NavbarProps {
  classname?: string;
  onOpenContact?: () => void;
}

const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC<NavbarProps> = ({ classname = "", onOpenContact }) => {
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "#");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncActiveHref = () => {
      const hash = window.location.hash;
      const match = items.some((item) => item.href === hash);
      setActiveHref(match ? hash : items[0]?.href ?? "#");
    };

    syncActiveHref();
    window.addEventListener("hashchange", syncActiveHref);
    return () => window.removeEventListener("hashchange", syncActiveHref);
  }, []);

  return (
    <>
      <header className={classname}>
        <a
          href="#home"
          className="header-logo"
        >
          Bhuvan
          <span
            className="header-logo-dot"
            aria-hidden="true"
          />
        </a>

        <nav>
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="navbar--component"
              aria-current={activeHref === item.href ? "page" : undefined}
            >
              {item.label}
            </a>
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
      <MenuOverlay />
    </>
  );
};

export default Navbar;
