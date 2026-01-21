import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

type FormStatus = "idle" | "sending" | "sent" | "error";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

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
      const templateParams = {
        user_name: String(formData.get("user_name") ?? "").trim(),
        user_email: String(formData.get("user_email") ?? "").trim(),
        message: String(formData.get("message") ?? "").trim(),
        time: new Date().toLocaleString(),
      };

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
      });
      setStatus("sent");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  return (
    <form
      ref={formRef}
      className="contactForm"
      onSubmit={handleSubmit}
    >
      <p className="contactIntro">
        Tell me a bit about your project and I will reply soon.
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
          autoComplete="email"
          required
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
