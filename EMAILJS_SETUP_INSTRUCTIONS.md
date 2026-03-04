# EmailJS Setup Instructions

## Quick Setup Guide

### Step 1: Get Your EmailJS Credentials

1. Go to https://www.emailjs.com/ and sign up/login
2. Get your **Public Key**: Account → General → Public Key
3. Create an **Email Service**: Email Services → Add New Service (Gmail, Outlook, etc.)
4. Get your **Service ID** from the service you created
5. Create an **Email Template**: Email Templates → Create New Template

### Step 2: Create Email Template

**Template Name:** `LearnStackHub Form Submission`

**Subject:**
```
{{form_type}} - {{subject}}
```

**Content (HTML):**
```html
<h2>{{form_type}}</h2>

<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Reply To:</strong> {{reply_to}}</p>

{{#if phone}}
<p><strong>Phone:</strong> {{phone}}</p>
{{/if}}

{{#if course}}
<p><strong>Course Interest:</strong> {{course}}</p>
{{/if}}

{{#if subject}}
<p><strong>Subject:</strong> {{subject}}</p>
{{/if}}

<p><strong>Message:</strong></p>
<p>{{message}}</p>

<hr>
<p><small>This email was sent from LearnStackHub {{form_type}}.</small></p>
```

**Content (Plain Text):**
```
{{form_type}}

Name: {{from_name}}
Email: {{from_email}}
Reply To: {{reply_to}}

{{#if phone}}
Phone: {{phone}}
{{/if}}

{{#if course}}
Course Interest: {{course}}
{{/if}}

{{#if subject}}
Subject: {{subject}}
{{/if}}

Message:
{{message}}

---
This email was sent from LearnStackHub {{form_type}}.
```

### Step 3: Update Configuration

Edit `src/config/emailjs.js` and replace:
- `YOUR_SERVICE_ID` with your Service ID
- `YOUR_TEMPLATE_ID` with your Template ID  
- `YOUR_PUBLIC_KEY` with your Public Key

### Template Variables Used

**For Contact Form:**
- `{{from_name}}` - User's name
- `{{from_email}}` - User's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{form_type}}` - "Contact Form"
- `{{reply_to}}` - User's email (for reply)

**For Registration Form:**
- `{{from_name}}` - Student's name
- `{{from_email}}` - Student's email
- `{{phone}}` - Student's phone number
- `{{course}}` - Selected course
- `{{message}}` - Optional message
- `{{form_type}}` - "Training Registration"
- `{{subject}}` - Auto-generated subject
- `{{reply_to}}` - Student's email (for reply)

### Step 4: Test

1. Test the Contact form on `/contact`
2. Test the Registration form on `/careers`
3. Check your email inbox for the submissions

### Notes

- Both forms use the **same template** but with different data
- The `form_type` variable helps identify which form was submitted
- All emails are sent to the configured email addresses in the code
- Make sure your EmailJS service is properly connected to your email account

