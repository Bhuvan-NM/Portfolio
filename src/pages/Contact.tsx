import { ContactIcon } from "../assets/Icons";
import { InfoCard } from "../components/InfoCard";
import ContactForm from "../components/ContactForm";
import {
  LinkedInIcon,
  GithubIcon,
  FacebookIcon,
  InstagramIcon,
  EmailIcon,
} from "../assets/Icons";

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/bhuvan-narasimhamurthy/",
    icon: LinkedInIcon,
  },
  {
    name: "GitHub",
    url: "https://github.com/bhuvan_nm",
    icon: GithubIcon,
  },
  {
    name: "Email",
    url: "mailto:bhuvan.narasimhamurthy@gmail.com",
    icon: EmailIcon,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/bhuvan.narasimhamurthy",
    icon: FacebookIcon,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/bhuvan.narasimhamurthy/",
    icon: InstagramIcon,
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
                  <span>{social.name}</span>
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
