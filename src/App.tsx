import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import ContactModal from "./components/ContactModal";
import MobileNavbar from "./components/MobileNavbar";
import MobileProfileModal from "./components/MobileProfileModal";
import History from "./pages/History";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";

import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import AnimatedIntro from "./assets/AnimatedIntro";

function App() {
  const { theme, toggleTheme } = useTheme();

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("hasVisited") !== "true";
  });

  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (showIntro) {
      sessionStorage.setItem("hasVisited", "true");
    }
  }, [showIntro]);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);
  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  if (showIntro) {
    return (
      <AnimatedIntro
        text="Welcome!"
        exiting={isExiting}
        onLettersDone={() => setIsExiting(true)}
        onExitDone={() => setShowIntro(false)}
      />
    );
  }

  return (
    <div className="appContainer">
      <ThemeToggle
        classname="theme-toggle desktop-only"
        isDark={theme === "dark"}
        onToggle={toggleTheme}
      />

      <Navbar
        classname="navbar"
        onOpenContact={openContact}
      />

      <MobileNavbar
        classname="mobile-navbar mobile-only"
        onOpenProfile={openProfile}
      />

      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/history"
            element={<History />}
          />
          <Route
            path="/portfolio"
            element={<Portfolio />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>
      </main>

      <ContactModal
        open={isContactOpen}
        title="Let's Talk"
        onClose={closeContact}
      >
        <ContactForm />
      </ContactModal>

      <MobileProfileModal
        open={isProfileOpen}
        onClose={closeProfile}
      />
    </div>
  );
}

export default App;
