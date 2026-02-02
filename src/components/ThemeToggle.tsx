import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

type Props = {
  isDark: boolean;
  onToggle: () => void;
};

export default function ThemeToggle({ isDark, onToggle }: Props) {
  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? "is-on" : ""}`}
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
    >
      <span
        className="theme-toggle__thumb"
        aria-hidden="true"
      />
      <span
        className="theme-toggle__icon theme-toggle__icon--sun"
        aria-hidden="true"
      >
        <FontAwesomeIcon icon={faSun} />
      </span>
      <span
        className="theme-toggle__icon theme-toggle__icon--moon"
        aria-hidden="true"
      >
        <FontAwesomeIcon icon={faMoon} />
      </span>
    </button>
  );
}
