import React, { useEffect, useState } from "react";
import selfieImage from "../assets/selfie.jpg";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface MobileNavbarProps {
  classname?: string;
  onOpenProfile?: () => void;
}

const items: { label: string; href: string; icon: IconProp }[] = [
  { label: "Home", href: "#home", icon: faHouse },
  { label: "History", href: "#history", icon: faClockRotateLeft },
  { label: "Contact", href: "#contact", icon: faAddressCard },
];

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  classname = "",
  onOpenProfile,
}) => {
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
      <div className={classname}>
        <nav className="mobile-nav-component-holder">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobilenavbar--component"
              aria-current={activeHref === item.href ? "page" : undefined}
            >
              <FontAwesomeIcon
                className="mobile-nav-icon"
                icon={item.icon}
              />
              <span className="mobile-nav-label">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="img-wrap-mobile-only">
          <img
            className="hero-img-mobile-only"
            src={selfieImage}
            alt="Selfie of Bhuvan Narasimhamurthy"
            onClick={onOpenProfile}
          />
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
