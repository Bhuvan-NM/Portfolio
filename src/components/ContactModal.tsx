import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ContactModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export default function ContactModal({
  open,
  title,
  onClose,
  children,
}: ContactModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // iOS-friendly scroll lock
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);

      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;

      window.scrollTo(0, scrollY);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="modalBackdrop"
      role="presentation"
      onMouseDown={(e) => {
        // click outside closes
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Dialog"}
      >
        <div className="modalHeader">
          {title && <h3 className="modalTitle">{title}</h3>}
          <button
            className="modalClose"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="modalBody">{children}</div>
      </div>
    </div>,
    document.body
  );
}
