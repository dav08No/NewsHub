<<<<<<< HEAD
import React from 'react'

const Kontakt: React.FC = () => {
=======
import { useRef, useState } from "react";
import "./Kontakt.css"; // Importing CSS for styling
 
const Contact: React.FC = () => {
  // Reference to the form element for resetting after submission
  const formRef = useRef<HTMLFormElement | null>(null);
 
  // State to manage form input values
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
 
  // State to store email validation error message
  const [emailError, setEmailError] = useState("");
 
  // Function to validate email format (must end with @swisscom.com)
  const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@swisscom\.com$/.test(email);
 
  // Handler for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
 
    // Validate email field and update error state accordingly
    if (name === "email") {
      setEmailError(validateEmail(value) ? "" : "Please enter a valid @swisscom.com email address");
    }
  };
 
  // Form submission handler
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
 
    // Ensure email is valid before proceeding
    if (!validateEmail(formData.email)) {
      return setEmailError("Please enter a valid @swisscom.com email address");
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
 
>>>>>>> 6bbc25baba6fb08503952ab5fcfa654fd325a088
  return (
    <div className="contact-container">
      <h1 className="contact-header">Kontaktieren Sie Uns</h1>
      <form onSubmit={onSubmit} className="contact-form" ref={formRef}>
        {/* Input field for name */}
        <input type="text" name="name" placeholder="Name" className="contact-input" required onChange={handleChange} />
 
        {/* Email input field with validation message */}
        <div style={{ width: "100%" }}>
          <input type="email" name="email" placeholder="E-mail" className="contact-input" required onChange={handleChange} />
          {/* Display the Error */}
          {emailError && <div style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>{emailError}</div>}
        </div>
 
        {/* Textarea for message input */}
        <textarea name="message" placeholder="Schreiben sie hier ihr Nachricht" className="contact-textarea" required onChange={handleChange}></textarea>
 
        {/* Submit button */}
        <button type="submit" className="contact-button">Senden</button>
      </form>
    </div>
  );
};
 
export default Contact; 