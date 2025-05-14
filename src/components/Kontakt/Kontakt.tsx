import { useRef, useState } from "react";
import './Kontakt.css'; // Importing CSS for styling
import { useTranslation } from "react-i18next";

const Contact: React.FC = () => {
  const { t } = useTranslation();

  // Reference to the form element for resetting after submission
  const formRef = useRef<HTMLFormElement | null>(null);

  // State to manage form input values
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // State to store email validation error message
  const [emailError, setEmailError] = useState<string>("");

  // Function to validate email format (must end with @swisscom.com)
  const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@swisscom\.com$/.test(email);

  // Handler for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate email field and update error state accordingly
    if (name === "email") {
      setEmailError(validateEmail(value) ? "" : t('errors.email'));
    }
  };

  // Form submission handler
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Ensure email is valid before proceeding
    if (!validateEmail(formData.email)) {
      return setEmailError(t('errors.email'));
    }

    // Prepare form data for submission
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, access_key: "73708533-49e0-4eb5-a5b0-d72d37d1cc78" }),
    }).then((res) => res.json());

    // Check if the submission was successful
    if (response.success) {
      console.log("Success", response);
      formRef.current?.reset(); // Reset form fields
      setFormData({ name: "", email: "", message: "" }); // Clear form state
    }
  };
  return (
    <div className="contact-container">
      <h1 className="contact-header">{t('contact.title')}</h1>
      <form onSubmit={onSubmit} className="contact-form" ref={formRef}>
        {/* Input field for name */}
        <input type="text" name="name" placeholder={t('contact.name')} className="contact-input" required onChange={handleChange} />

        {/* Email input field with validation message */}
        <div style={{ width: "100%" }}>
          <input type="email" name="email" placeholder={t('contact.mail')} className="contact-input" required onChange={handleChange} />
          {/* Display the Error */}
          {emailError && <div style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>{emailError}</div>}
        </div>

        {/* Textarea for message input */}
        <textarea name="message" placeholder={t('contact.placeholder')} className="contact-textarea" required onChange={handleChange}></textarea>

        {/* Submit button */}
        <button type="submit" className="contact-button">{t('contact.send')}</button>
      </form>
    </div>
  );
};

export default Contact; 
