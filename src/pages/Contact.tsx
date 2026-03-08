import { ContactIcon } from "../assets/Icons";
import { InfoCard } from "../components/InfoCard";
import ContactForm from "../components/ContactForm";

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
            <ContactForm></ContactForm>
          </div>
          <div className="Contact-page-socials">oiahjfoiahfoiashf</div>
        </div>
      </InfoCard>
    </div>
  );
};

export default Contact;
