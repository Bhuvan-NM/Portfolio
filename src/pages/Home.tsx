import heroImage from "../assets/heroImage-transparent.png";
import {
  CSSIcon,
  DownArrow,
  GithubIcon,
  HTMLIcon,
  ReactIcon,
  SassIcon,
  TypeScriptIcon,
  OutwardArrow,
} from "../assets/Icons";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import resume from "../assets/resume.pdf";
import TechnicalSkillscard, {
  type TechnicalSkill,
  type TechnicalSkillIcon,
} from "../assets/TechnicalSkillscard";

type HomeProps = {
  onOpenContact?: () => void;
};

const initialFrameworks: string[] = [
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "GraphQL",
  "Apollo",
  "Framer-Motion",
  "MSSQL",
  "SASS",
  "TypeORM",
  "TypeScript",
];

const frontendSkills: Record<string, TechnicalSkillIcon> = {
  React: ReactIcon,
  TypeScript: TypeScriptIcon,
  HTML: HTMLIcon,
  CSS: CSSIcon,
  Sass: SassIcon,
  GitHub: GithubIcon,
};

const backendSkills: Record<string, TechnicalSkillIcon> = {
  NodeJS: ReactIcon,
  ExpressJS: ReactIcon,
  MongoDB: ReactIcon,
  GraphQL: ReactIcon,
  MSSQL: ReactIcon,
  TypeORM: ReactIcon,
};

const testingSkills: Record<string, TechnicalSkillIcon> = {
  Jest: ReactIcon,
  Postman: ReactIcon,
  Selenium: ReactIcon,
};

const cICDSkills: Record<string, TechnicalSkillIcon> = {
  GitHubActions: ReactIcon,
  Docker: ReactIcon,
  Jenkins: ReactIcon,
  TravisCI: ReactIcon,
  CircleCI: ReactIcon,
};

const getSkillItems = (
  skills: Record<string, TechnicalSkillIcon>,
): TechnicalSkill[] => {
  return Object.entries(skills).map(([skillName, skillIcon]) => ({
    skillName,
    skillIcon,
  }));
};

const ribbonItems = [...initialFrameworks, ...initialFrameworks];

const handleDownloadCV = () => {
  const link = document.createElement("a");
  link.href = resume;
  link.download = "Bhuvan_NM_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Home = ({ onOpenContact: _onOpenContact }: HomeProps) => {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const ribbonRef = useRef<HTMLDivElement | null>(null);
  const ribbonGroupRef = useRef<HTMLDivElement | null>(null);
  const speed = 150; // pixels per second

  const handleViewWork = () => {
    navigate("/history");
  };

  useAnimationFrame((_, delta) => {
    const moveBy = (speed * delta) / 1000;
    const groupWidth = ribbonGroupRef.current?.scrollWidth ?? 0;
    const ribbonStyles = ribbonRef.current
      ? window.getComputedStyle(ribbonRef.current)
      : null;
    const groupGap = ribbonStyles
      ? Number.parseFloat(ribbonStyles.columnGap || ribbonStyles.gap || "0")
      : 0;
    const loopDistance = groupWidth + groupGap;

    if (!loopDistance) return;

    const nextX = x.get() - moveBy;
    x.set(nextX <= -loopDistance ? nextX + loopDistance : nextX);
  });

  return (
    <div className="homeContainer">
      <div className="ribbon-wrapper">
        <motion.div
          ref={ribbonRef}
          className="tech-ribbon"
          style={{ x }}
        >
          <div
            ref={ribbonGroupRef}
            className="tech-ribbon__group"
          >
            {ribbonItems.map((framework, index) => (
              <span
                key={`${framework}-${index}`}
                className="tech-pill"
              >
                {framework}
              </span>
            ))}
          </div>

          <div
            className="tech-ribbon__group"
            aria-hidden="true"
          >
            {ribbonItems.map((item, index) => (
              <span
                key={`${item}-copy-${index}`}
                className="tech-pill"
              >
                {item}
              </span>
            ))}
          </div>
          <div
            className="tech-ribbon__group"
            aria-hidden="true"
          >
            {ribbonItems.map((item, index) => (
              <span
                key={`${item}-copy-${index}`}
                className="tech-pill"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="homeMain">
        <div className="homeTextContent">
          <motion.div
            animate={{ opacity: [0, 1], y: [50, 0] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="homeIntroConatiner"
          >
            <div className="homeStatus">
              <h3 className="homeStatus--heading">
                <span></span>Available for new opportunities
              </h3>
            </div>
            <h1 className="homeIntro--heading">
              {" "}
              Creative Developer &amp; <span>UI Designer</span>{" "}
            </h1>
            <p className="homeIntro--content">
              Crafting immersive digital experiences through clean code and
              sophisticated design. Specializing in high-performance web
              applications with a focus on intuitive user interfaces and
              seamless interactions.
            </p>
          </motion.div>
          <motion.div
            animate={{ opacity: [0, 1], y: [50, 0] }}
            transition={{ duration: 1.25, ease: "easeInOut" }}
            className="homeMainBTN"
          >
            <button
              className="viewWorkBtn"
              onClick={handleViewWork}
            >
              View Work
              <OutwardArrow className="homeBtnIcon homeBtnIcon--outward" />
            </button>
            <button
              className="downloadCV"
              onClick={handleDownloadCV}
            >
              Download CV
              <DownArrow className="homeBtnIcon homeBtnIcon--down" />
            </button>
          </motion.div>
        </div>
        <motion.div
          animate={{ opacity: [0, 1], y: [50, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="heroImgContainer"
        >
          <img
            src={heroImage}
            alt="Hero"
          />
        </motion.div>
      </div>

      <section className="technicalSkills">
        <h2 className="technicalSkills--heading">Technical Expertise</h2>
        <p className="technicalSkills--description">
          A curated stack for building robust, beautiful and resposive
          interfaces.
        </p>
        <div className="technicalSkills--container">
          <TechnicalSkillscard
            cardHeading="Frontend Skills"
            cardDescription="Crafting responsive, accessible, and engaging interfaces with modern web technologies and polished interaction patterns."
            skills={getSkillItems(frontendSkills)}
          />
          <TechnicalSkillscard
            cardHeading="Backend Skills"
            cardDescription="Building scalable, secure server applications with reliable data flows, efficient processing, and maintainable API design."
            skills={getSkillItems(backendSkills)}
          />
          <TechnicalSkillscard
            cardHeading="CI/CD Skills"
            cardDescription="Streamlining deployment pipelines, infrastructure workflows, and release automation for fast, reliable software delivery."
            skills={getSkillItems(cICDSkills)}
          />

          <TechnicalSkillscard
            cardHeading="Testing"
            cardDescription="Ensuring product reliability with practical test coverage, API validation, browser checks, and repeatable quality gates."
            skills={getSkillItems(testingSkills)}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
