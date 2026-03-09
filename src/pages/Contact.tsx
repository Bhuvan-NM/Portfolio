import { ContactIcon } from "../assets/Icons";
import { InfoCard } from "../components/InfoCard";
import ContactForm from "../components/ContactForm";
import {
  LinkedInIcon,
  GithubIcon,
  LocationIcon,
  PhoneIcon,
  EmailIcon,
} from "../assets/Icons";

const socials = [
  {
    name: "Email",
    url: "mailto:bhuvanarasimha29@gmail.com",
    description: "bhuvanarasimha29@gmail.com",
    icon: EmailIcon,
  },

  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/bhuvan-narasimhamurthy/",
    description: "bhuvan-nm",
    icon: LinkedInIcon,
  },
  {
    name: "GitHub",
    url: "https://github.com/bhuvan_nm",
    description: "Bhuvan-NM",
    icon: GithubIcon,
  },

  {
    name: "Location",
    description: "Melbourne, Victoria",
    icon: LocationIcon,
  },
  {
    name: "Mobile",
    description: "+61 405 235 933",
    icon: PhoneIcon,
  },
];

const Contact = () => {
  return (
    <div className="contact-page-container">
      <InfoCard className="contact-page">
        <div className="contact-page-header">
          <h3>Get In Touch</h3>
          <h1 className="contact-page-heading">
            <span>
              <ContactIcon className="contact-icon" />
            </span>
            Contact Me
          </h1>
          <p>Every great project begins with a conversation. Let’s start one</p>
        </div>

        <div className="FormandSocials">
          <div className="ContactForm-Container">
            <ContactForm />
          </div>

          <div className="Contact-page-socials">
            {socials.map((social, index) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.name === "Email" ? undefined : "_blank"}
                  rel={social.name === "Email" ? undefined : "noreferrer"}
                  className="Contact-page-socials-element"
                  style={{ animationDelay: `${index * 0.12}s` }}
                >
                  <Icon className="contact-socials-icon" />
                  <div className="Contact-page-socials-content">
                    <span className="Contact-page-socials-title">
                      {social.name}
                    </span>
                    <p className="Contact-page-socials-description">
                      {social.description ?? ""}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </InfoCard>
    </div>
  );
};

export default Contact;
