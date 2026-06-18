import React, { useEffect, useRef } from "react";
import selfieImage from "../assets/selfie.jpg";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { NavLink, useLocation } from "react-router-dom";

interface MobileNavbarProps {
  classname?: string;
  onOpenProfile?: () => void;
}

const items: { label: string; href: string; icon: IconProp }[] = [
  { label: "Home", href: "/", icon: faHouse },
  { label: "History", href: "/history", icon: faClockRotateLeft },
  { label: "Contact", href: "/contact", icon: faAddressCard },
];

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  classname = "",
  onOpenProfile,
}) => {
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());
  const prevIndexRef = useRef(0);
  const activeHref = items.some((item) => item.href === location.pathname)
    ? location.pathname
    : items[0]?.href ?? "/";

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const updateIndicator = () => {
      const activeIndex = items.findIndex((item) => item.href === activeHref);
      const activeItem =
        itemRefs.current.get(activeHref) ??
        itemRefs.current.get(items[0]?.href ?? "#");
      if (!activeItem) return;

      const offsetX = activeItem.offsetLeft;
      const direction = activeIndex >= prevIndexRef.current ? 1 : -1;
      const tailOffset = direction > 0 ? -4 : 4;

      nav.style.setProperty("--indicator-tail-x", `${tailOffset}px`);

      const currentX = nav.style.getPropertyValue("--indicator-x") || "0px";
      nav.style.setProperty("--indicator-x", currentX);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          nav.style.setProperty("--indicator-x", `${offsetX}px`);
        });
      });

      if (activeIndex !== -1) {
        prevIndexRef.current = activeIndex;
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeHref]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const raf = window.requestAnimationFrame(() => {
      nav.classList.add("is-ready");
    });
    return () => {
      window.cancelAnimationFrame(raf);
      nav.classList.remove("is-ready");
    };
  }, []);

  return (
    <>
      <div className={classname}>
        <nav
          ref={navRef}
          className="mobile-nav-component-holder"
        >
          <span className="mobile-nav-indicator" />
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className="mobilenavbar--component"
              end={item.href === "/"}
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
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="img-wrap-mobile-only"
          onClick={onOpenProfile}
          aria-label="Open profile"
        >
          <img
            className="hero-img-mobile-only"
            src={selfieImage}
            alt="Selfie of Bhuvan Narasimhamurthy"
          />
        </button>
      </div>
    </>
  );
};

export default MobileNavbar;
