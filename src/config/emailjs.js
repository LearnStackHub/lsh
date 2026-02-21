// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Get your Public Key from Account > General
// 5. Replace the values below with your actual EmailJS credentials

export const emailjsConfig = {
  // Your EmailJS Service ID (found in Email Services)
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_9jly8v6',
  
  // Your EmailJS Template ID (found in Email Templates)
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_qhtvh1u',
  
  // Your EmailJS Public Key (found in Account > General)
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'oW1iKw8tP4_VthDYL'
};



