import FacebookLogo from "../assets/FacebookLogo";
import InstagramLogo from "../assets/InstagramLogo";
import LinkedInLogo from "../assets/LinkedInLogo";
import selfieImage from "../assets/selfie.jpg";
import MobileNavbar from "../components/MobileNavbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

type HomeProps = {
  onOpenContact?: () => void;
};

const Home = ({ onOpenContact }: HomeProps) => {
  return (
    <div className="home-page">
      <div className="right">
        <div className="home-page-content ">
          <h3 className="home-page-content-h3">Hi, I'm Bhuvan NM!</h3>
          <h1 className="home-page-content-h1">
            Web <span>Designer</span>
          </h1>

          <p className="home-page-content-p">
            I’m a web designer who builds clear, responsive websites with a
            strong focus on layout, usability, and visual balance. I take a
            thoughtful approach to turning ideas into well-structured
            interfaces, paying close attention to spacing, hierarchy, and
            consistency across devices. My work prioritises clarity and
            intention, aiming to create designs that feel calm, intuitive, and
            purposeful rather than overworked. Ultimately, I focus on producing
            interfaces that not only look refined but also feel natural and
            reliable to use.
          </p>

          <div className="cta-Section ">
            <button
              className="cta-1"
              onClick={() => {
                window.open("https://github.com/Bhuvan-NM");
              }}
            >
              Projects
              <FontAwesomeIcon icon="code" />
            </button>
            <button
              className="cta-2"
              type="button"
              onClick={onOpenContact}
            >
              Hire me
              <FontAwesomeIcon icon="arrow-up-right-from-square" />
            </button>
          </div>
        </div>

        <div className="social-section desktop-only ">
          <div
            className="facebook"
            onClick={() => {
              window.open("https://www.facebook.com/bhuvan.narasimhamurthy.3/");
            }}
          >
            <FacebookLogo className="socials-icon face" />
          </div>

          <div
            className="instagram"
            onClick={() => {
              window.open("https://www.instagram.com/bhuvan_n_m/");
            }}
          >
            <InstagramLogo className="socials-icon insta" />
          </div>

          <div
            className="linkedIn"
            onClick={() => {
              window.open("https://www.linkedin.com/in/bhuvan-nm/");
            }}
          >
            <LinkedInLogo className="socials-icon link" />
          </div>
        </div>
      </div>

      <div className="img-wrap desktop-only">
        <img
          className="hero-img left"
          src={selfieImage}
          alt="Selfie of Bhuvan Narasimhamurthy"
        />
      </div>

      <MobileNavbar classname="mobile-navbar mobile-only" />
    </div>
  );
};

export default Home;
