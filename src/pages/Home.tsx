import selfieImage from "../assets/selfie.jpg";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "../assets/Icons";
import {
  WrenchIcon,
  ReactIcon,
  TypeScriptIcon,
  SassIcon,
  GithubIcon,
  PythonIcon,
  CSSIcon,
  HTMLIcon,
  CodeIcon,
  SkillsIcon,
  LightBulbIcon,
} from "../assets/Icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { InfoCard } from "../components/InfoCard";

library.add(fas, far, fab);

type HomeProps = {
  onOpenContact?: () => void;
};

const Home = ({ onOpenContact }: HomeProps) => {
  const TechnicalSkills = [
    {
      name: "React",
      icon: <ReactIcon className="technicalSkills-card-icon" />,
    },
    {
      name: "TypeScript",
      icon: <TypeScriptIcon className="technicalSkills-card-icon" />,
    },
    {
      name: "Python",
      icon: <PythonIcon className="technicalSkills-card-icon" />,
    },
    {
      name: "GitHub",
      icon: <GithubIcon className="technicalSkills-card-icon" />,
    },
    { name: "Sass", icon: <SassIcon className="technicalSkills-card-icon" /> },
    { name: "CSS", icon: <CSSIcon className="technicalSkills-card-icon" /> },
    { name: "HTML", icon: <HTMLIcon className="technicalSkills-card-icon" /> },
  ];

  const SoftSkills = [
    { name: "Communication" },
    { name: "Leadership" },
    { name: "Problem Solving" },
    { name: "Teamwork" },
    { name: "Adaptability" },
    { name: "Time Management" },
    { name: "Critical Thinking" },
    { name: "Reliable" },
  ];

  const Interests = [
    { name: "Software Development" },
    { name: "Network Engineering" },
    { name: "Systems Design" },
    { name: "Algorithmic Problem Solving" },
    { name: "Open Source Contribution" },
    { name: "Cloud Computing / Architecture" },
    { name: "AI / Machine Learning" },
    { name: "Fullstack Development" },
  ];

  return (
    <div className="homepage">
      <InfoCard className=" homepage-content">
        <div className="homepage-content">
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

          <div className="cta-Section">
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

          <div className="social-section desktop-only">
            <div
              className="facebook"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/bhuvan.narasimhamurthy.3/",
                )
              }
            >
              <FacebookIcon className="socials-icon face" />
            </div>

            <div
              className="instagram"
              onClick={() =>
                window.open("https://www.instagram.com/bhuvan_n_m/")
              }
            >
              <InstagramIcon className="socials-icon insta" />
            </div>

            <div
              className="linkedIn"
              onClick={() =>
                window.open("https://www.linkedin.com/in/bhuvan-nm/")
              }
            >
              <LinkedInIcon className="socials-icon link" />
            </div>
          </div>
        </div>
      </InfoCard>

      <div className="technicalSkills-Section">
        <h2 className="technicalSkills-Heading">
          <span>
            <WrenchIcon className="wrench-icon" />
          </span>
          Skills and Interests
        </h2>
        <div className="technicalSkills-card-holder">
          <InfoCard className="technicalSkills-card technical">
            <h3>
              <span>
                <CodeIcon className="technicalSkills-card-HeadingIcon" />
              </span>
              Technical
            </h3>
            <div className="technicalSkills-row">
              {TechnicalSkills.map((TechincalSkills) => (
                <div
                  key={TechincalSkills.name}
                  className="technicalSkills-card-element"
                >
                  {TechincalSkills.icon}
                  <span>{TechincalSkills.name}</span>
                </div>
              ))}
            </div>
          </InfoCard>
          <InfoCard className="technicalSkills-card softSkills">
            <h3>
              <span>
                <SkillsIcon className="technicalSkills-card-HeadingIcon" />
              </span>
              Soft Skills
            </h3>
            <div className="technicalSkills-row">
              {SoftSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="technicalSkills-card-element"
                >
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </InfoCard>
          <InfoCard className="technicalSkills-card interests">
            <h3>
              <span>
                <LightBulbIcon className="technicalSkills-card-HeadingIcon" />
              </span>
              Interests
            </h3>
            <div className="technicalSkills-row">
              {Interests.map((interest) => (
                <div
                  key={interest.name}
                  className="technicalSkills-card-element"
                >
                  <span>{interest.name}</span>
                </div>
              ))}
            </div>
          </InfoCard>
        </div>
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
