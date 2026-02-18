import { useLayoutEffect, useRef } from "react";
import FacebookLogo from "../assets/FacebookLogo";
import InstagramLogo from "../assets/InstagramLogo";
import LinkedInLogo from "../assets/LinkedInLogo";
import selfieImage from "../assets/selfie.jpg";
import TechnicalSkillsCards from "../components/TechnicalSkillsCards";

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
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = contentWrapperRef.current;
    if (!wrapper) return;
    wrapper.scrollTop = 0;
    const raf = window.requestAnimationFrame(() => {
      wrapper.scrollTop = 0;
    });
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="homepage">
      <div
        className="homepage-content-wrapper"
        ref={contentWrapperRef}
      >
        <div className="homepage-content ">
          <h3 className="homepage-content-h3">Hi, I'm Bhuvan NM!</h3>
          <h1 className="homepage-content-h1">
            Software <span>Developer</span>
          </h1>

          <p className="homepage-content-p">
            I’m a fourth year Bachelor of Engineering (Computer and Network
            Engineering) (Honours) and Bachelor of Computer Science student at
            RMIT University, graduating in 2027 with a GPA of 3.0.
          </p>

          <p className="homepage-content-p">
            I work across Python, Java, C++, JavaScript, and TypeScript,
            building software, web applications, and algorithmic solutions with
            a strong focus on clean design and practical performance. My
            background in fast paced operational environments has strengthened
            my leadership, communication, and problem solving skills.
          </p>

          <p className="homepage-content-p">
            I’m currently seeking internship opportunities in network
            engineering, software development, and systems focused roles where I
            can contribute to real world projects and continue developing as an
            engineer.
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

          <div className="social-section desktop-only ">
            <div
              className="facebook"
              onClick={() => {
                window.open(
                  "https://www.facebook.com/bhuvan.narasimhamurthy.3/"
                );
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
      </div>

      <div className="technicalSkills-Section">
        <h2>Technical Skills</h2>
        <TechnicalSkillsCards />
      </div>

      <div className="img-wrap desktop-only">
        <img
          className="hero-img left"
          src={selfieImage}
          alt="Selfie of Bhuvan Narasimhamurthy"
        />
      </div>
    </div>
  );
};

export default Home;
