import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import ContactModal from "./components/ContactModal";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Background from "./assets/background";

function App() {
  const [route, setRoute] = useState(() => {
    if (typeof window === "undefined") return "#home";
    return window.location.hash || "#home";
  });
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
      case "#about":
        return <About />;
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
      <Background />
      <Navbar
        classname="navbar"
        onOpenContact={openContact}
      />
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
