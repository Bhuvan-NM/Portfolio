import heroImage from "../assets/heroImage-transparent.png";
import { DownArrow, OutwardArrow } from "../assets/Icons";

import resume from "../assets/resume.pdf";

type HomeProps = {
  onOpenContact?: () => void;
};

const handleDownloadCV = () => {
  const link = document.createElement("a");
  link.href = resume;
  link.download = "Bhuvan_NM_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Home = ({ onOpenContact: _onOpenContact }: HomeProps) => {
  return (
    <div className="homeContainer">
      <div className="homeMain">
        <div className="homeTextContent">
          <div className="homeIntroConatiner">
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
          </div>
          <div className="homeMainBTN">
            <button className="viewWorkBtn">
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
          </div>
        </div>
        <div className="heroImgContainer">
          <img
            src={heroImage}
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
