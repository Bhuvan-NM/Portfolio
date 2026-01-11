import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";

function App() {
  const [route, setRoute] = useState(
    typeof window !== "undefined" && window.location.hash
      ? window.location.hash
      : "#home"
  );

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash || "#home";
      setRoute(hash);
    };

    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

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
        return <Home />;
    }
  };

  return (
    <>
      <Navbar classname="navbar" />
      {renderPage()}
    </>
  );
}

export default App;
