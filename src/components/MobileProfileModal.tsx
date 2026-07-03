import { useEffect } from "react";
import { createPortal } from "react-dom";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../hooks/useTheme";
import profileCardImage from "../assets/profilecardImg.jpg";

type MobileProfileModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileProfileModal({
  open,
  onClose,
}: MobileProfileModalProps) {
  const { theme, toggleTheme } = useTheme();
  const profileDetails = [
    {
      label: "Phone",
      value: "+61 405 235 933",
      href: "tel:+61 405 235 933",
    },
    {
      label: "Email",
      value: "bhuvanarasimha29@gmail.com",
      href: "mailto:bhuvanarasimha29@gmail.com",
    },
    {
      label: "Location",
      value: "Melbourne, Australia",
    },
    {
      label: "Availability",
      value: "Open for internships",
    },
  ];

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="mobile-profile-modal-backdrop"
      role="presentation"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="mobile-profile-modal-content"
        role="dialog"
        aria-modal="true"
        aria-label="Profile information"
      >
        <section
          className="mobile-profile-card"
          aria-label="Profile information"
        >
          <div className="mobile-profile-header">
            <div className="profileCard-img-container">
              <img
                src={profileCardImage}
                alt="Profile"
                className="profileCard-img"
              />
            </div>
          </div>
          <ul className="mobile-profile-list">
            {profileDetails.map((item) => (
              <li
                key={item.label}
                className="mobile-profile-row"
              >
                <span className="mobile-profile-label">{item.label}</span>
                {item.href ? (
                  <a
                    className="mobile-profile-value"
                    href={item.href}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="mobile-profile-value">{item.value}</span>
                )}
              </li>
            ))}
          </ul>
          <div className="mobile-profile-toggle">
            <ThemeToggle
              classname="theme-toggle--profile"
              isDark={theme === "dark"}
              onToggle={toggleTheme}
            />
          </div>
        </section>

      </div>
    </div>,
    document.body
  );
}
