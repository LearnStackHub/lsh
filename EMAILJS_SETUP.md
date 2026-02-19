# EmailJS Setup Guide

This guide will help you set up EmailJS to enable contact form functionality without a backend.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)

## Step 2: Add an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note your **Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use the following template variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Message content
   - `{{to_email}}` - Recipient email (your email)

4. Example template (use this format in your EmailJS template):
   ```
   Name: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   Message: {{message}}
    
   © 2026 learnstackhub— Confidential Contact Notification
   ```
   
   **Note:** Make sure to set the **Subject** field in EmailJS to: `{{subject}}`

5. Set the **To Email** field to your email address (e.g., `dattudattakumar369@gmail.com`)
6. Save the template and note your **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** > **General** in your EmailJS dashboard
2. Find your **Public Key** (also called API Key)
3. Copy this key

## Step 5: Configure the Application

You have two options to configure EmailJS:

### Option A: Environment Variables (Recommended for Production)

1. Create a `.env` file in the root of your project:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

2. Replace the placeholder values with your actual EmailJS credentials

### Option B: Direct Configuration

1. Open `src/config/emailjs.js`
2. Replace the placeholder values:
   ```javascript
   export const emailjsConfig = {
     serviceId: 'your_actual_service_id',
     templateId: 'your_actual_template_id',
     publicKey: 'your_actual_public_key'
   };
   ```

## Step 6: Test the Contact Form

1. Start your development server: `npm run dev`
2. Navigate to the Contact page
3. Fill out and submit the contact form
4. Check your email inbox for the message

## Troubleshooting

- **"EmailJS is not configured" error**: Make sure you've set all three values (Service ID, Template ID, and Public Key)
- **Emails not sending**: Check your EmailJS dashboard for error logs
- **Rate limiting**: Free tier is limited to 200 emails/month. Upgrade if needed.

## Security Notes

- Never commit your `.env` file to version control
- Add `.env` to your `.gitignore` file
- The Public Key is safe to expose in frontend code (it's designed for client-side use)
- For production, always use environment variables

## Support

For EmailJS-specific issues, visit: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)

