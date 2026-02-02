import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import ContactModal from "./components/ContactModal";
import MobileNavbar from "./components/MobileNavbar";
import History from "./pages/History";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Background from "./assets/Background";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [route, setRoute] = useState(() => {
    if (typeof window === "undefined") return "#home";
    return window.location.hash || "#home";
  });

  const { theme, toggleTheme } = useTheme();

  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash || "#home";
      setRoute(hash);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

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
      <MobileNavbar classname="mobile-navbar mobile-only" />
      {renderPage()}
      <ContactModal
        open={isContactOpen}
        title="Let's chat"
        onClose={closeContact}
      >
        <ContactForm />
      </ContactModal>
    </>
  );
}

export default App;
