import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import PhoneInput from "react-phone-number-input";

type FormStatus = "idle" | "sending" | "sent" | "error";

interface ContactFormProps {
  "contactForm-className"?: string;
  "input-className"?: string;
  "textarea-className"?: string;
  "label-className"?: string;
}

const ContactForm = ({
  "contactForm-className": contactFormClassName,
}: ContactFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [phone, setPhone] = useState<string | undefined>(undefined);

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const canSend = Boolean(serviceId && templateId && publicKey);
  const isSubmitting = status === "sending";

  const statusMessage =
    status === "sending"
      ? "Sending..."
      : status === "sent"
        ? "Message sent. Thanks for reaching out."
        : status === "error"
          ? canSend
            ? "Something went wrong. Please try again."
            : "Email service is not configured yet."
          : "";

  const statusClassName =
    status === "error"
      ? "contactStatus contactStatus--error"
      : status === "sent"
        ? "contactStatus contactStatus--success"
        : "contactStatus";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;

    if (!canSend) {
      setStatus("error");
      return;
    }

    try {
      setStatus("sending");

      const formData = new FormData(formRef.current);
      const userName = String(formData.get("user_name") ?? "").trim();
      const userEmail = String(formData.get("user_email") ?? "").trim();

      const userSubject = String(formData.get("user_subject") ?? "").trim();

      const userPhone = (phone ?? "").trim();
      const userMessage = String(formData.get("message") ?? "").trim();
      const submittedAt = new Date().toLocaleString();

      // Keep `message` compatible with older EmailJS templates while
      // still sending dedicated `subject` and `phone` params for new templates.
      const composedMessage = [
        userSubject ? `Subject: ${userSubject}` : "",
        userPhone ? `Phone: ${userPhone}` : "",
        "",
        userMessage,
      ]
        .filter(Boolean)
        .join("\n");

      const templateParams = {
        user_name: userName,
        user_email: userEmail,
        user_subject: userSubject,
        user_phone: userPhone,
        message: composedMessage,
        raw_message: userMessage,
        subject: userSubject,
        phone: userPhone,
        from_name: userName,
        from_email: userEmail,
        reply_to: userEmail,
        time: submittedAt,
        submitted_at: submittedAt,
      };

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
      });

      setStatus("sent");
      formRef.current.reset();
      setPhone(undefined);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  return (
    <form
      ref={formRef}
      className={`contactForm ${contactFormClassName ?? ""}`}
      onSubmit={handleSubmit}
    >
      <p className="contactIntro">
        Tell me a bit about the opportunity and I will reply soon.
      </p>

      <div className="contactField">
        <label
          className="contactLabel"
          htmlFor="contact-name"
        >
          Name
        </label>
        <input
          className="contactInput"
          id="contact-name"
          name="user_name"
          type="text"
          placeholder="What should i call you?"
          autoComplete="name"
          required
        />
      </div>

      <div className="contactField">
        <label
          className="contactLabel"
          htmlFor="contact-email"
        >
          Email
        </label>
        <input
          className="contactInput"
          id="contact-email"
          name="user_email"
          type="email"
          placeholder="user@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="contactField">
        <label
          className="contactLabel"
          htmlFor="contact-subject"
        >
          Subject
        </label>
        <input
          className="contactInput"
          id="contact-subject"
          name="user_subject"
          type="text"
          placeholder="What is this about?"
          autoComplete="off"
          required
        />
      </div>

      <div className="contactField">
        <label
          className="contactLabel"
          htmlFor="contact-phone"
        >
          Phone Number (optional)
        </label>
        <PhoneInput
          id="contact-phone"
          name="user_phone"
          className="contactPhoneInput"
          placeholder="Enter phone number"
          value={phone}
          onChange={(value) => setPhone(value || undefined)}
          defaultCountry="AU"
          autoComplete="tel"
        />
      </div>

      <div className="contactField">
        <label
          className="contactLabel"
          htmlFor="contact-message"
        >
          Message
        </label>
        <textarea
          className="contactTextarea"
          id="contact-message"
          name="message"
          placeholder="Tell me more..."
          required
        />
      </div>

      <div className="contactActions">
        <button
          className="contactSubmit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>

        {statusMessage ? (
          <span
            className={statusClassName}
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </span>
        ) : null}
      </div>
    </form>
  );
};

export default ContactForm;
