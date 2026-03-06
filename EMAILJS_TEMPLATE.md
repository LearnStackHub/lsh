# EmailJS Template Setup Guide

## Step 1: Get Your EmailJS Credentials

1. Go to https://www.emailjs.com/
2. Sign up or log in
3. Get your **Public Key** from: Account → General → Public Key
4. Create an **Email Service** (Gmail, Outlook, etc.) from: Email Services → Add New Service
5. Get your **Service ID** from the service you created

## Step 2: Create Email Template

Go to: **Email Templates → Create New Template**

### Template Name
`Training Registration Form`

### Template ID
Copy this ID after creating the template

### Email Template Content

**Subject:**
```
New Training Registration - {{course}}
```

**Content (HTML):**
```html
<h2>New Training Registration</h2>

<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Course Interest:</strong> {{course}}</p>
<p><strong>Message:</strong> {{message}}</p>

<hr>
<p><small>This email was sent from LearnStackHub Careers page.</small></p>
```

**Content (Plain Text):**
```
New Training Registration

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Course Interest: {{course}}
Message: {{message}}

---
This email was sent from LearnStackHub Careers page.
```

## Step 3: Update Configuration

Edit `src/config/emailjs.js` and replace:
- `YOUR_PUBLIC_KEY_HERE` with your Public Key
- `YOUR_SERVICE_ID_HERE` with your Service ID
- `YOUR_TEMPLATE_ID_HERE` with your Template ID

## Template Variables Used

- `{{from_name}}` - Student's full name
- `{{from_email}}` - Student's email
- `{{phone}}` - Student's phone number
- `{{course}}` - Selected course (e.g., "Java Full Stack Development")
- `{{message}}` - Optional message from student
- `{{to_email}}` - careers@learnstackhub.com
- `{{subject}}` - Email subject
- `{{reply_to}}` - Reply-to email (student's email)

## Testing

After setup, test the form on the Careers page. The email will be sent to `careers@learnstackhub.com`.

