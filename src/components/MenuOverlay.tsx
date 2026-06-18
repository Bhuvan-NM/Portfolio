import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

type MenuItem = { label: string; to: string };

const items: MenuItem[] = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
];

const MenuOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const location = useLocation();
  const activeHref = items.some((item) => item.to === location.pathname)
    ? location.pathname
    : items[0]?.to ?? "/";

  //keep the clip origin synced to the button position
  const updateClipOrigin = () => {
    const btn = btnRef.current;
    const overlay = overlayRef.current;
    if (!btn || !overlay) return;

    //compute the button center
    const btnRect = btn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    overlay.style.setProperty("--clip-origin-x", `${btnCenterX}px`);
    overlay.style.setProperty("--clip-origin-y", `${btnCenterY}px`);
  };

  useLayoutEffect(() => {
    updateClipOrigin();
  }, []);

  //update on resize + orientation change
  useEffect(() => {
    const onResize = () => updateClipOrigin();
    window.addEventListener("resize", onResize);

    //incase layout changes after images / font load
    const timeout = window.setTimeout(updateClipOrigin, 100);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    //when opening re-measure right away (button could have moved due to safe areas)
    if (isOpen) updateClipOrigin();
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // IOS-friendly scroll lock
  useEffect(() => {
    const body = document.body;

    if (!isOpen) {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
      btnRef.current?.focus();
      return;
    }

    const scrollY = window.scrollY;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    // focus first link
    const focusTimer = window.setTimeout(
      () => firstLinkRef.current?.focus(),
      60
    );

    return () => {
      window.clearTimeout(focusTimer);
      const y = Math.abs(parseInt(body.style.top || "0", 10)) || 0;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo(0, y);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={btnRef}
        className="menuBtn"
        aria-expanded={isOpen}
        aria-controls="menuOverlay"
        onClick={() => setIsOpen((v) => !v)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <div
        ref={overlayRef}
        id="menuOverlay"
        className={`overlay ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
        onMouseDown={(e) => {
          // Tap/click outside closes
          if (e.target === e.currentTarget) setIsOpen(false);
        }}
      >
        <nav
          className="menu"
          aria-label="Main menu"
        >
          {items.map((it, i) => (
            <NavLink
              key={it.to}
              to={it.to}
              ref={i === 0 ? firstLinkRef : undefined}
              className="menuLink"
              aria-current={activeHref === it.to ? "page" : undefined}
              end={it.to === "/"}
              onClick={() => setIsOpen(false)}
            >
              {it.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MenuOverlay;
