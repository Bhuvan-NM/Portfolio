import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());

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

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const updateIndicator = () => {
      const activeItem =
        itemRefs.current.get(activeHref) ??
        itemRefs.current.get(items[0]?.href ?? "#");
      if (!activeItem) return;

      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const offsetX = itemRect.left - navRect.left;

      nav.style.setProperty("--indicator-x", `${offsetX}px`);
      nav.style.setProperty("--indicator-width", `${itemRect.width}px`);
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeHref]);

  return (
    <>
      <div className={classname}>
        <nav
          ref={navRef}
          className="mobile-nav-component-holder"
        >
          <span className="mobile-nav-indicator" />
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobilenavbar--component"
              aria-current={activeHref === item.href ? "page" : undefined}
              ref={(node) => {
                if (!node) {
                  itemRefs.current.delete(item.href);
                  return;
                }
                itemRefs.current.set(item.href, node);
              }}
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
