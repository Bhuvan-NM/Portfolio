import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import ContactModal from "./components/ContactModal";
import MobileNavbar from "./components/MobileNavbar";
import MobileProfileModal from "./components/MobileProfileModal";
import History from "./pages/History";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Background from "./assets/Background";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import AnimatedIntro from "./assets/AnimatedIntro";

function App() {
  const [route, setRoute] = useState(() => {
    if (typeof window === "undefined") return "#home";
    return window.location.hash || "#home";
  });

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

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);
  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  const renderPage = () => {
    switch (route) {
      case "#history":
        return <History />;
      case "#portfolio":
        return <Portfolio />;
      case "#contact":
        return <Contact />;
      case "#home":
      default:
        return <Home onOpenContact={openContact} />;
    }
  };

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
    <>
      <ThemeToggle
        classname="theme-toggle desktop-only"
        isDark={theme === "dark"}
        onToggle={toggleTheme}
      />

      <Background />

      <Navbar
        classname="navbar"
        onOpenContact={openContact}
      />

      <MobileNavbar
        classname="mobile-navbar mobile-only"
        onOpenProfile={openProfile}
      />

      <main className="app-content">{renderPage()}</main>

      <ContactModal
        open={isContactOpen}
        title="Let's chat"
        onClose={closeContact}
      >
        <ContactForm />
      </ContactModal>

      <MobileProfileModal
        open={isProfileOpen}
        onClose={closeProfile}
      />
    </>
  );
}

export default App;
