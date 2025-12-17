import Navbar from "./components/Navbar";
import FacebookLogo from "./assets/FacebookLogo";
import InstagramLogo from "./assets/InstagramLogo";
import LinkedInLogo from "./assets/LinkedInLogo";

function App() {
  return (
    <>
      <div className="main">
        <Navbar classname="navbar" />

        <div className="content">
          <h3>Hi, I'm Bhuvan NM!</h3>
          <h1>Web Designer</h1>

          <p>
            {" "}
            I’m a web designer who builds clear, responsive websites with a
            strong focus on layout, usability, and visual balance. I enjoy
            turning ideas into interfaces that feel simple, intentional, and
            good to use.
          </p>

          <div className="cta-Section">
            <button className="cta-1">Projects</button>
            <button className="cta-2">Hire me</button>
          </div>
        </div>

        <div className="social-section">
          <FacebookLogo className="socials-icon" />
          <InstagramLogo className="socials-icon" />
          <LinkedInLogo className="socials-icon" />
        </div>

        <div className="img-wrap">
          <img
            className="hero-img"
            src="src/assets/selfie.jpg"
            alt="Selfie of Bhuvan Narasimhamurthy"
          />
        </div>
      </div>
    </>
  );
}

export default App;
