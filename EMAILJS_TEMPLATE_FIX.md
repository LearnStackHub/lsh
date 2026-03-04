# EmailJS Template Fix - Correct Template Configuration

## Problem
The error "One or more dynamic variables are corrupted" occurs because EmailJS doesn't support Handlebars conditionals like `{{#if}}`. We need to use simple variable syntax.

## Correct Template Configuration

### Go to EmailJS Dashboard
1. Go to https://dashboard.emailjs.com/admin/integration
2. Click on your template: `template_9ql8g2i`
3. Edit the template

### Template Settings

**Template Name:** `LearnStackHub Form Submission`

**Subject Line:**
```
{{form_type}} - {{subject}}
```

**Content (HTML):**
```html
<h2>{{form_type}}</h2>

<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Reply To:</strong> {{reply_to}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Course Interest:</strong> {{course}}</p>
<p><strong>Subject:</strong> {{subject}}</p>

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
Phone: {{phone}}
Course Interest: {{course}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from LearnStackHub {{form_type}}.
```

## Important Notes

1. **NO Conditional Logic**: EmailJS doesn't support `{{#if}}` statements. Include all variables even if empty.

2. **All Variables Must Be Present**: Make sure all these variables are in your template:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{reply_to}}`
   - `{{phone}}`
   - `{{course}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{form_type}}`

3. **Variable Names Must Match Exactly**: The variable names in the template must match exactly what we send in the code (case-sensitive).

4. **Save the Template**: After updating, click "Save" in EmailJS dashboard.

5. **Test Again**: Try submitting the form again after updating the template.

## What We Send

**Contact Form sends:**
- from_name
- from_email
- subject
- message
- to_email (not used in template, used by EmailJS service)
- form_type
- reply_to

**Registration Form sends:**
- from_name
- from_email
- phone
- course
- message
- to_email (not used in template, used by EmailJS service)
- form_type
- subject
- reply_to

All these variables should be in your template, even if some will be empty for certain forms.

