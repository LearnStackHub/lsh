import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_9jly8v6';
const EMAILJS_TEMPLATE_ID = 'template_9ql8g2i';
const EMAILJS_PUBLIC_KEY = 'oW1iKw8tP4_VthDYL';

// Initialize EmailJS with public key
// EmailJS requires initialization before sending emails
emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Send email using EmailJS
 * @param {Object} templateParams - Email template parameters
 * @returns {Promise<Object>} - Result object with success status
 */
export const sendEmail = async (templateParams) => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    return {
      success: true,
      message: 'Email sent successfully!',
      response
    };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      error: error.text || error.message || 'Failed to send email'
    };
  }
};

/**
 * Send contact form email
 * @param {Object} formData - Contact form data
 * @returns {Promise<Object>} - Result object
 */
export const sendContactEmail = async (formData) => {
  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_email: 'dattudattakumar369@gmail.com',
    form_type: 'Contact Form',
    reply_to: formData.email
  };

  return await sendEmail(templateParams);
};

/**
 * Send registration form email
 * @param {Object} formData - Registration form data
 * @returns {Promise<Object>} - Result object
 */
export const sendRegistrationEmail = async (formData) => {
  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone || 'Not provided',
    course: formData.course || 'Not specified',
    message: formData.message || 'No additional message',
    to_email: 'dattudattakumar369@gmail.com',
    form_type: 'Training Registration',
    subject: `Training Registration - ${formData.course || 'General Inquiry'}`,
    reply_to: formData.email
  };

  return await sendEmail(templateParams);
};

export default {
  sendEmail,
  sendContactEmail,
  sendRegistrationEmail
};

