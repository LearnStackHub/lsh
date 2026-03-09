const htmlForms = {
  id: 'html-forms',
  title: 'HTML Forms - Input Elements & Form Handling',
  description: 'Learn how to create forms with various input types, validation, and form submission',
  content: `
# HTML Forms — Collecting User Input

Forms are essential for collecting user data - login, registration, search, contact, and more. Understanding forms is crucial for web development.

---

## Basic Form Structure

\`\`\`html
<form action="submit.php" method="POST">
    <!-- Form elements go here -->
    <input type="text" name="username">
    <button type="submit">Submit</button>
</form>
\`\`\`

**Components:**
- \`<form>\` - Form container
- \`action\` - Where to send form data
- \`method\` - GET or POST
- Form elements - Inputs, buttons, etc.

---

## Form Attributes

### Action

\`\`\`html
<form action="process.php">
<!-- Sends data to process.php -->
</form>

<form action="https://example.com/submit">
<!-- Sends to external URL -->
</form>
\`\`\`

### Method

\`\`\`html
<form method="GET">
<!-- Data in URL: page.html?name= Dattu -->
</form>

<form method="POST">
<!-- Data in request body (more secure) -->
</form>
\`\`\`

**When to use:**
- **GET**: Search, filters (data visible in URL)
- **POST**: Login, registration, sensitive data (hidden)

### Enctype (For File Uploads)

\`\`\`html
<form enctype="multipart/form-data" method="POST">
    <input type="file" name="photo">
    <button type="submit">Upload</button>
</form>
\`\`\`

**Required** when uploading files.

---

## Input Types

### Text Input

\`\`\`html
<input type="text" name="username" placeholder="Enter username">
\`\`\`

**Attributes:**
- \`name\` - Parameter name (required for submission)
- \`placeholder\` - Hint text
- \`value\` - Default value
- \`maxlength\` - Maximum characters
- \`required\` - Must be filled

---

### Email Input

\`\`\`html
<input type="email" name="email" placeholder="your@email.com" required>
\`\`\`

**Features:**
- Validates email format
- Mobile shows email keyboard

---

### Password Input

\`\`\`html
<input type="password" name="password" placeholder="Enter password" required>
\`\`\`

**Features:**
- Hides text as user types
- Use for sensitive data

---

### Number Input

\`\`\`html
<input type="number" name="age" min="18" max="100" step="1">
\`\`\`

**Attributes:**
- \`min\` - Minimum value
- \`max\` - Maximum value
- \`step\` - Increment value

---

### Date Input

\`\`\`html
<input type="date" name="birthdate">
<input type="datetime-local" name="appointment">
<input type="time" name="meeting-time">
<input type="month" name="month">
<input type="week" name="week">
\`\`\`

---

### Checkbox

\`\`\`html
<input type="checkbox" name="hobbies" value="reading" id="reading">
<label for="reading">Reading</label>

<input type="checkbox" name="hobbies" value="sports" id="sports" checked>
<label for="sports">Sports</label>
\`\`\`

**Features:**
- Multiple selections allowed
- \`checked\` - Pre-selected
- Use \`<label>\` for better UX

---

### Radio Buttons

\`\`\`html
<input type="radio" name="gender" value="male" id="male">
<label for="male">Male</label>

<input type="radio" name="gender" value="female" id="female">
<label for="female">Female</label>
\`\`\`

**Features:**
- Only one selection per group
- Same \`name\` = same group
- \`value\` - What gets submitted

---

### Select Dropdown

\`\`\`html
<select name="country" required>
    <option value="">Select Country</option>
    <option value="india">India</option>
    <option value="usa">USA</option>
    <option value="uk">UK</option>
</select>
\`\`\`

**Multiple Selection:**
\`\`\`html
<select name="languages" multiple>
    <option value="java">Java</option>
    <option value="python">Python</option>
    <option value="javascript">JavaScript</option>
</select>
\`\`\`

---

### Textarea

\`\`\`html
<textarea name="message" rows="5" cols="40" placeholder="Enter your message"></textarea>
\`\`\`

**Attributes:**
- \`rows\` - Number of visible rows
- \`cols\` - Number of visible columns
- Better use CSS for sizing

---

### File Input

\`\`\`html
<input type="file" name="photo" accept="image/*">
<input type="file" name="document" accept=".pdf,.doc">
\`\`\`

**Attributes:**
- \`accept\` - Allowed file types
- Requires \`enctype="multipart/form-data"\` in form

---

### Hidden Input

\`\`\`html
<input type="hidden" name="user_id" value="123">
\`\`\`

**Purpose:** Store data not visible to user

---

### Range Input

\`\`\`html
<input type="range" name="volume" min="0" max="100" value="50">
\`\`\`

**Shows:** Slider control

---

### Color Input

\`\`\`html
<input type="color" name="favcolor" value="#ff0000">
\`\`\`

**Shows:** Color picker

---

### URL Input

\`\`\`html
<input type="url" name="website" placeholder="https://example.com">
\`\`\`

**Features:** Validates URL format

---

### Tel Input

\`\`\`html
<input type="tel" name="phone" placeholder="+91-9876543210">
\`\`\`

**Features:** Mobile shows numeric keypad

---

### Search Input

\`\`\`html
<input type="search" name="query" placeholder="Search...">
\`\`\`

**Features:** Some browsers add clear button

---

## Form Elements

### Label

\`\`\`html
<label for="username">Username:</label>
<input type="text" id="username" name="username">
\`\`\`

**Benefits:**
- Clicking label focuses input
- Better accessibility
- Screen reader friendly

---

### Fieldset and Legend

\`\`\`html
<fieldset>
    <legend>Personal Information</legend>
    <input type="text" name="name" placeholder="Name">
    <input type="email" name="email" placeholder="Email">
</fieldset>

<fieldset>
    <legend>Address</legend>
    <input type="text" name="address" placeholder="Address">
    <input type="text" name="city" placeholder="City">
</fieldset>
\`\`\`

**Purpose:** Groups related form fields

---

### Buttons

\`\`\`html
<!-- Submit button -->
<button type="submit">Submit Form</button>
<input type="submit" value="Submit">

<!-- Reset button -->
<button type="reset">Reset</button>
<input type="reset" value="Reset">

<!-- Regular button -->
<button type="button" onclick="doSomething()">Click Me</button>
\`\`\`

---

## Complete Form Example

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Registration Form</title>
    <style>
        form {
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, select, textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <form action="register.php" method="POST">
        <fieldset>
            <legend>Personal Information</legend>
            
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" 
                       placeholder="Enter username" required>
            </div>
            
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" 
                       placeholder="your@email.com" required>
            </div>
            
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" 
                       placeholder="Enter password" required minlength="8">
            </div>
            
            <div class="form-group">
                <label for="age">Age:</label>
                <input type="number" id="age" name="age" 
                       min="18" max="100" required>
            </div>
            
            <div class="form-group">
                <label>Gender:</label>
                <input type="radio" id="male" name="gender" value="male" required>
                <label for="male">Male</label>
                
                <input type="radio" id="female" name="gender" value="female">
                <label for="female">Female</label>
            </div>
        </fieldset>
        
        <fieldset>
            <legend>Preferences</legend>
            
            <div class="form-group">
                <label>Hobbies:</label>
                <input type="checkbox" id="reading" name="hobbies" value="reading">
                <label for="reading">Reading</label>
                
                <input type="checkbox" id="sports" name="hobbies" value="sports">
                <label for="sports">Sports</label>
                
                <input type="checkbox" id="music" name="hobbies" value="music">
                <label for="music">Music</label>
            </div>
            
            <div class="form-group">
                <label for="country">Country:</label>
                <select id="country" name="country" required>
                    <option value="">Select Country</option>
                    <option value="india">India</option>
                    <option value="usa">USA</option>
                    <option value="uk">UK</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="bio">Bio:</label>
                <textarea id="bio" name="bio" rows="4" 
                          placeholder="Tell us about yourself"></textarea>
            </div>
        </fieldset>
        
        <div class="form-group">
            <input type="checkbox" id="terms" name="terms" required>
            <label for="terms">I agree to the Terms and Conditions</label>
        </div>
        
        <button type="submit">Register</button>
        <button type="reset">Reset</button>
    </form>
</body>
</html>
\`\`\`

---

## Form Validation

### HTML5 Validation

\`\`\`html
<!-- Required field -->
<input type="text" name="name" required>

<!-- Pattern matching (regex) -->
<input type="text" name="phone" 
       pattern="[0-9]{10}" 
       title="10 digit phone number">

<!-- Min/Max length -->
<input type="password" name="password" 
       minlength="8" maxlength="20">

<!-- Min/Max value -->
<input type="number" name="age" min="18" max="100">

<!-- Email validation -->
<input type="email" name="email" required>

<!-- URL validation -->
<input type="url" name="website">
\`\`\`

### Custom Validation Message

\`\`\`html
<input type="text" name="username" 
       pattern="[a-zA-Z0-9]{5,}" 
       title="Username must be at least 5 characters, letters and numbers only"
       required>
\`\`\`

---

## Real-Time Scenarios

### Scenario 1: Login Form

\`\`\`html
<form action="login.php" method="POST">
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
    </div>
    <button type="submit">Login</button>
</form>
\`\`\`

### Scenario 2: Contact Form

\`\`\`html
<form action="contact.php" method="POST">
    <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
    </div>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
    </div>
    <div>
        <label for="subject">Subject:</label>
        <input type="text" id="subject" name="subject" required>
    </div>
    <div>
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="5" required></textarea>
    </div>
    <button type="submit">Send Message</button>
</form>
\`\`\`

### Scenario 3: Search Form

\`\`\`html
<form action="search.php" method="GET">
    <input type="search" name="q" placeholder="Search..." required>
    <button type="submit">Search</button>
</form>
\`\`\`

---

## Best Practices

1. **Always use labels**
   - Better accessibility
   - Better UX

2. **Use appropriate input types**
   - \`type="email"\` for emails
   - \`type="tel"\` for phone numbers
   - Mobile shows correct keyboard

3. **Validate on client and server**
   - HTML5 validation is client-side
   - Always validate on server too

4. **Group related fields**
   - Use \`<fieldset>\` and \`<legend>\`

5. **Provide helpful placeholders**
   - Guide users on what to enter

6. **Use required attribute**
   - Mark mandatory fields

---

## Summary

**Form Elements:**
- ✅ \`<form>\` - Form container
- ✅ \`<input>\` - Various input types
- ✅ \`<textarea>\` - Multi-line text
- ✅ \`<select>\` - Dropdown
- ✅ \`<button>\` - Submit/reset buttons
- ✅ \`<label>\` - Label for inputs
- ✅ \`<fieldset>\` - Group fields
- ✅ \`<legend>\` - Fieldset title

**Input Types:**
- ✅ text, email, password, number, date
- ✅ checkbox, radio, file, hidden
- ✅ range, color, url, tel, search

**Form Attributes:**
- ✅ \`action\` - Where to send data
- ✅ \`method\` - GET or POST
- ✅ \`enctype\` - For file uploads
- ✅ \`required\` - Validation
- ✅ \`pattern\` - Regex validation

Forms are essential for interactive web applications, enabling user input, data collection, and interaction with web services. Mastering HTML forms is fundamental for building functional web applications.

---

## Real-World Applications

### E-Commerce Platforms
E-commerce websites extensively use forms for user registration, login, checkout processes, product search, and customer feedback. Forms collect shipping information, payment details, and user preferences.

**Implementation Example:**
- User registration and login forms
- Product search and filter forms
- Shopping cart checkout forms
- Customer review and rating forms
- Newsletter subscription forms

### Content Management Systems
CMS platforms use forms for content creation, user management, and administrative tasks. Forms enable content editors to create articles, upload media, and manage site settings.

**Implementation Example:**
- Article creation and editing forms
- Media upload forms
- User profile management forms
- Site configuration forms
- Comment submission forms

### Business Applications
Enterprise applications rely on forms for data entry, reporting, and workflow management. Forms collect employee information, process requests, and manage business operations.

**Implementation Example:**
- Employee onboarding forms
- Expense report submission
- Leave request forms
- Customer support ticket forms
- Survey and feedback forms

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Not Using Labels
**Problem:** Inputs without labels are inaccessible and provide poor user experience.

**Solution:** Always associate labels with inputs:

\`\`\`html
<!-- GOOD -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- BAD -->
<input type="email" name="email" placeholder="Email">
\`\`\`

### Mistake 2: Using GET for Sensitive Data
**Problem:** GET method exposes data in URL, which is visible in browser history and server logs.

**Solution:** Always use POST for sensitive data:

\`\`\`html
<!-- GOOD - Sensitive data -->
<form method="POST" action="login.php">

<!-- BAD - Data in URL -->
<form method="GET" action="login.php">
\`\`\`

### Mistake 3: Missing Client-Side Validation
**Problem:** Relying only on server-side validation provides poor user experience.

**Solution:** Use HTML5 validation attributes:

\`\`\`html
<input type="email" name="email" required>
<input type="password" name="password" minlength="8" required>
\`\`\`

### Mistake 4: Not Using Appropriate Input Types
**Problem:** Using type="text" for all inputs misses browser optimizations and validation.

**Solution:** Use specific input types:

\`\`\`html
<!-- GOOD - Shows email keyboard on mobile -->
<input type="email" name="email">

<!-- BAD - Generic text input -->
<input type="text" name="email">
\`\`\`

### Mistake 5: Forgetting enctype for File Uploads
**Problem:** File uploads fail without proper enctype attribute.

**Solution:** Always use multipart/form-data for file uploads:

\`\`\`html
<form method="POST" enctype="multipart/form-data">
    <input type="file" name="photo">
</form>
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is an HTML form and why is it important?

An HTML form is a section of a web page that contains input elements for collecting user data. Forms are essential for interactive web applications, enabling user registration, login, search, data submission, and various user interactions. Without forms, websites would be static and non-interactive.

### What's the difference between GET and POST methods?

GET sends form data in the URL as query parameters, making it visible and suitable for search and filtering. POST sends data in the request body, keeping it hidden and suitable for sensitive data like passwords and personal information. Use GET for idempotent operations (search, filtering) and POST for operations that modify data (registration, login, submission).

### Do I need to validate forms on both client and server?

Yes, always validate on both sides. Client-side validation (HTML5 attributes, JavaScript) provides immediate feedback and better user experience. Server-side validation is essential for security, as client-side validation can be bypassed. Never trust client-side validation alone for security-critical operations.

### What input types are available in HTML5?

HTML5 provides many input types: text, email, password, number, date, datetime-local, time, month, week, tel, url, search, color, range, file, checkbox, radio, hidden, submit, reset, button, and image. Each type provides appropriate validation and user interface elements (like date pickers for date inputs).

### How do I make a form field required?

Use the \`required\` attribute on input, select, or textarea elements:

\`\`\`html
<input type="text" name="username" required>
<select name="country" required>
<textarea name="message" required></textarea>
\`\`\`

### What is the purpose of the name attribute?

The \`name\` attribute identifies form data when the form is submitted. It's used as the parameter name in the submitted data. Without the \`name\` attribute, form data won't be sent to the server. The \`name\` attribute is different from the \`id\` attribute, which is used for CSS and JavaScript targeting.

### How do I create a dropdown/select menu?

Use the \`<select>\` element with \`<option>\` elements:

\`\`\`html
<select name="country">
    <option value="">Select Country</option>
    <option value="usa">USA</option>
    <option value="uk">UK</option>
</select>
\`\`\`

### What's the difference between checkbox and radio buttons?

Checkboxes allow multiple selections from a group, while radio buttons allow only one selection. Use checkboxes when users can select multiple options (hobbies, interests). Use radio buttons when only one option should be selected (gender, payment method). Radio buttons with the same name attribute form a group.

### How do I upload files in a form?

Use \`type="file"\` input and set \`enctype="multipart/form-data"\` on the form:

\`\`\`html
<form method="POST" enctype="multipart/form-data">
    <input type="file" name="photo" accept="image/*">
    <button type="submit">Upload</button>
</form>
\`\`\`

### Can I style HTML forms with CSS?

Yes, all form elements can be styled with CSS. You can style inputs, selects, textareas, buttons, labels, and fieldsets. Modern CSS provides extensive styling capabilities for creating attractive, user-friendly forms. Learn about [CSS Introduction](/tutorial/css-introduction) for form styling.

---

## Key Takeaways

Before proceeding to advanced HTML topics, ensure you understand these form fundamentals:

- **Forms collect user input** through various input elements
- **GET method** sends data in URL (visible), POST sends in body (hidden)
- **Labels improve accessibility** and user experience
- **HTML5 input types** provide validation and better mobile experience
- **Required attribute** enforces mandatory fields
- **enctype="multipart/form-data"** is required for file uploads
- **Client and server validation** are both essential
- **Fieldset and legend** organize related form fields
- **Appropriate input types** improve usability and validation

---

## What's Next?

Now that you understand HTML forms, you're ready to enhance your web development skills:

### Immediate Next Steps

1. **[CSS Introduction](/tutorial/css-introduction)**: Style your forms for better appearance
2. **[HTML Structure](/tutorial/html-structure)**: Understand complete HTML document structure
3. **[HTML Best Practices](/tutorial/html-best-practices)**: Learn form best practices
4. **[JavaScript Basics](/tutorial/javascript-introduction)**: Add form validation and interactivity

### Advanced Topics

- **Form Validation**: Learn advanced validation techniques
- **AJAX Form Submission**: Submit forms without page reload
- **Form Libraries**: Explore form frameworks and libraries
- **Accessibility**: Ensure forms are accessible to all users

### Related Tutorials

- **[HTML Introduction](/tutorial/html-introduction)**: Review HTML fundamentals
- **[HTML Input Types](/tutorial/html-input-types)**: Deep dive into all input types
- **[Servlets Introduction](/tutorial/servlet-introduction)**: Process forms on the server
- **[Spring Boot REST API](/tutorial/spring-boot-rest-api)**: Build APIs that handle form data

HTML forms are the foundation of interactive web applications. Continue learning about [CSS Introduction](/tutorial/css-introduction) to style your forms and create professional-looking user interfaces.
`,
  code: `// HTML Forms

/*
 * FORMS COLLECT USER INPUT
 * ========================
 * 
 * Essential for login, registration, search, contact
 */

// ============================================
// 1. BASIC FORM STRUCTURE
// ============================================
/*
<form action="submit.php" method="POST">
    <input type="text" name="username">
    <button type="submit">Submit</button>
</form>

Components:
  <form>     → Form container
  action     → Where to send data
  method     → GET or POST
*/

// ============================================
// 2. FORM ATTRIBUTES
// ============================================
/*
ACTION (where to send):
  <form action="process.php">
  <form action="https://example.com/submit">

METHOD (how to send):
  <form method="GET">   → Data in URL
  <form method="POST">  → Data in body (secure)

ENCTYPE (for file uploads):
  <form enctype="multipart/form-data">
*/

// ============================================
// 3. INPUT TYPES
// ============================================
/*
TEXT:
  <input type="text" name="username" placeholder="Enter username">

EMAIL:
  <input type="email" name="email" required>

PASSWORD:
  <input type="password" name="password">

NUMBER:
  <input type="number" name="age" min="18" max="100">

DATE:
  <input type="date" name="birthdate">

CHECKBOX:
  <input type="checkbox" name="hobby" value="reading" id="reading">
  <label for="reading">Reading</label>

RADIO:
  <input type="radio" name="gender" value="male" id="male">
  <label for="male">Male</label>

FILE:
  <input type="file" name="photo" accept="image/*">

HIDDEN:
  <input type="hidden" name="user_id" value="123">
*/

// ============================================
// 4. SELECT DROPDOWN
// ============================================
/*
<select name="country">
    <option value="">Select Country</option>
    <option value="india">India</option>
    <option value="usa">USA</option>
</select>

MULTIPLE SELECTION:
  <select name="languages" multiple>
*/

// ============================================
// 5. TEXTAREA
// ============================================
/*
<textarea name="message" rows="5" cols="40" 
          placeholder="Enter message"></textarea>
*/

// ============================================
// 6. LABELS
// ============================================
/*
<label for="username">Username:</label>
<input type="text" id="username" name="username">
  → Clicking label focuses input
  → Better accessibility
*/

// ============================================
// 7. FIELDSET & LEGEND
// ============================================
/*
<fieldset>
    <legend>Personal Information</legend>
    <input type="text" name="name">
    <input type="email" name="email">
</fieldset>
  → Groups related fields
*/

// ============================================
// 8. BUTTONS
// ============================================
/*
<button type="submit">Submit</button>
<button type="reset">Reset</button>
<button type="button">Click Me</button>
*/

// ============================================
// 9. VALIDATION
// ============================================
/*
REQUIRED:
  <input type="text" name="name" required>

PATTERN (regex):
  <input type="text" name="phone" pattern="[0-9]{10}">

MIN/MAX LENGTH:
  <input type="password" minlength="8" maxlength="20">

MIN/MAX VALUE:
  <input type="number" min="18" max="100">
*/

// ============================================
// 10. BEST PRACTICES
// ============================================
/*
✅ Always use labels
✅ Use appropriate input types
✅ Validate on client and server
✅ Group related fields (fieldset)
✅ Provide helpful placeholders
✅ Use required for mandatory fields
*/
`
};

export default htmlForms;


