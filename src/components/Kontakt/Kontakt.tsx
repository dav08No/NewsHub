import React from 'react'

const Kontakt: React.FC = () => {
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