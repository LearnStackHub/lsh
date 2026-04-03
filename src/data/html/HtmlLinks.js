const htmlLinks = {
  id: 'html-links',
  title: 'HTML Links & Anchors',
  description: 'Learn how to create hyperlinks, link to other pages, emails, and sections',
  content: `
# HTML Links & Anchors - Connecting the Web

HTML links (hyperlinks) are fundamental elements that connect web pages, enabling navigation between documents, sections within pages, external resources, and various protocols. Links are created using the anchor (\`<a>\`) element and are essential for web navigation, user experience, and information architecture. Understanding links is fundamental to web development, as they form the foundation of web navigation and connectivity.

Enterprise web applications extensively use links for navigation menus, content linking, external resource references, and user interactions. Links enable users to navigate websites, access external resources, download files, send emails, and interact with web applications. Proper link implementation improves SEO, accessibility, and user experience. Mastery of links is essential for building functional, navigable web applications.

**Link Types:**
- **External Links**: Connect to other websites
- **Internal Links**: Connect pages within the same website
- **Anchor Links**: Link to sections within the same page
- **Email Links**: Open email clients with pre-filled addresses
- **Download Links**: Trigger file downloads

---

## Basic Link Syntax

\`\`\`html
<a href="url">Link Text</a>
\`\`\`

**Components:**
- \`<a>\` - Anchor tag (creates a link)
- \`href\` - Hypertext Reference (destination URL)
- Link Text - What users see and click

---

## Types of Links

### 1. External Links (Other Websites)

\`\`\`html
<a href="https://www.google.com">Visit Google</a>
<a href="https://www.github.com">GitHub</a>
\`\`\`

**Best Practice:** Always include \`https://\` for external links

---

### 2. Internal Links (Same Website)

\`\`\`html
<!-- Link to another page in same folder -->
<a href="about.html">About Us</a>

<!-- Link to page in subfolder -->
<a href="pages/contact.html">Contact</a>

<!-- Link to page in parent folder -->
<a href="../index.html">Home</a>
\`\`\`

---

### 3. Anchor Links (Same Page Sections)

\`\`\`html
<!-- Create anchor point -->
<h2 id="section1">Section 1</h2>
<p>Content here...</p>

<!-- Link to anchor -->
<a href="#section1">Go to Section 1</a>

<!-- Link to top of page -->
<a href="#top">Back to Top</a>
\`\`\`

**Complete Example:**
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Page with Sections</title>
</head>
<body>
    <nav>
        <a href="#intro">Introduction</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
    </nav>
    
    <section id="intro">
        <h2>Introduction</h2>
        <p>Content...</p>
    </section>
    
    <section id="features">
        <h2>Features</h2>
        <p>Content...</p>
    </section>
    
    <section id="contact">
        <h2>Contact</h2>
        <p>Content...</p>
    </section>
</body>
</html>
\`\`\`

---

### 4. Email Links

\`\`\`html
<a href="mailto:contact@example.com">Send Email</a>

<!-- With subject and body -->
<a href="mailto:contact@example.com?subject=Hello&body=Hi there">
    Contact Us
</a>
\`\`\`

**Opens:** User's default email client

---

### 5. Phone Links

\`\`\`html
<a href="tel:+1234567890">Call Us</a>
<a href="tel:+91-9876543210">+91-9876543210</a>
\`\`\`

**Opens:** Phone dialer (on mobile devices)

---

### 6. Download Links

\`\`\`html
<a href="document.pdf" download>Download PDF</a>
<a href="file.zip" download="myfile.zip">Download File</a>
\`\`\`

**Purpose:** Forces download instead of opening in browser

---

## Link Attributes

### Target Attribute

\`\`\`html
<!-- Open in same tab (default) -->
<a href="page.html">Same Tab</a>

<!-- Open in new tab -->
<a href="page.html" target="_blank">New Tab</a>

<!-- Open in new tab (secure) -->
<a href="page.html" target="_blank" rel="noopener noreferrer">
    Secure New Tab
</a>
\`\`\`

**Why \`rel="noopener noreferrer"\`?**
- Prevents security vulnerabilities
- Hides referrer information
- **Always use with \`target="_blank"\`**

---

### Title Attribute (Tooltip)

\`\`\`html
<a href="page.html" title="Click to learn more about HTML">
    Learn HTML
</a>
\`\`\`

**Shows:** Tooltip when user hovers over link

---

### Link Styling with Class/ID

\`\`\`html
<a href="page.html" class="button">Click Me</a>
<a href="page.html" id="main-link">Main Link</a>
\`\`\`

**Purpose:** For CSS styling

---

## Link States

Links have different states (can be styled with CSS):

1. **Normal** - Default state
2. **Hover** - Mouse over link
3. **Active** - Being clicked
4. **Visited** - Already visited

**CSS Example:**
\`\`\`css
a:link { color: blue; }        /* Normal */
a:visited { color: purple; }   /* Visited */
a:hover { color: red; }         /* Hover */
a:active { color: green; }      /* Active */
\`\`\`

---

## Navigation Menu Example

\`\`\`html
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
\`\`\`

---

## Breadcrumb Navigation

\`\`\`html
<nav aria-label="Breadcrumb">
    <a href="index.html">Home</a> > 
    <a href="products.html">Products</a> > 
    <a href="laptops.html">Laptops</a> > 
    <span>Gaming Laptop</span>
</nav>
\`\`\`

---

## Button-Style Links

\`\`\`html
<!-- Using CSS class -->
<a href="signup.html" class="button">Sign Up</a>

<!-- Using button inside link (not recommended) -->
<a href="signup.html">
    <button>Sign Up</button>
</a>
\`\`\`

**Better approach:** Style \`<a>\` tag to look like a button with CSS

---

## Real-Time Scenarios

### Scenario 1: E-commerce Product Links

\`\`\`html
<div class="product">
    <h3>Gaming Laptop</h3>
    <p>High-performance laptop for gaming</p>
    <a href="product-details.html?id=123" class="view-details">
        View Details
    </a>
    <a href="cart.html?add=123" class="add-to-cart">
        Add to Cart
    </a>
</div>
\`\`\`

### Scenario 2: Social Media Links

\`\`\`html
<div class="social-links">
    <a href="https://facebook.com/yourpage" target="_blank" 
       rel="noopener noreferrer">
        Facebook
    </a>
    <a href="https://twitter.com/yourhandle" target="_blank"
       rel="noopener noreferrer">
        Twitter
    </a>
    <a href="https://linkedin.com/in/yourprofile" target="_blank"
       rel="noopener noreferrer">
        LinkedIn
    </a>
</div>
\`\`\`

### Scenario 3: Table of Contents

\`\`\`html
<nav>
    <h3>Table of Contents</h3>
    <ul>
        <li><a href="#chapter1">Chapter 1: Introduction</a></li>
        <li><a href="#chapter2">Chapter 2: Basics</a></li>
        <li><a href="#chapter3">Chapter 3: Advanced</a></li>
    </ul>
</nav>

<article id="chapter1">
    <h2>Chapter 1: Introduction</h2>
    <p>Content...</p>
</article>
\`\`\`

---

## Best Practices

1. **Use descriptive link text**
   - ❌ Bad: \`<a href="page.html">Click here</a>\`
   - ✅ Good: \`<a href="page.html">Learn about HTML</a>\`

2. **Always use \`rel="noopener noreferrer"\` with \`target="_blank"\`**
   - Prevents security issues

3. **Make links accessible**
   - Use clear, descriptive text
   - Don't use "click here" or "read more"

4. **Test all links**
   - Ensure they work
   - Check external links regularly

5. **Use relative paths for internal links**
   - \`href="about.html"\` not \`href="https://yoursite.com/about.html"\`

---

## Common Mistakes

### Mistake 1: Missing href

\`\`\`html
❌ <a>Click me</a>  <!-- Not a link, just text -->
✅ <a href="page.html">Click me</a>
\`\`\`

### Mistake 2: Broken Links

\`\`\`html
❌ <a href="pag.html">Link</a>  <!-- Typo: pag.html -->
✅ <a href="page.html">Link</a>
\`\`\`

### Mistake 3: Opening Too Many New Tabs

\`\`\`html
❌ Every link with target="_blank"  <!-- Annoying -->
✅ Only external links in new tabs
\`\`\`

---

## Summary

**Link Types:**
- ✅ External: \`href="https://example.com"\`
- ✅ Internal: \`href="page.html"\`
- ✅ Anchor: \`href="#section"\`
- ✅ Email: \`href="mailto:email@example.com"\`
- ✅ Phone: \`href="tel:+1234567890"\`
- ✅ Download: \`href="file.pdf" download\`

**Key Attributes:**
- ✅ \`href\` - Destination URL
- ✅ \`target="_blank"\` - Open in new tab
- ✅ \`rel="noopener noreferrer"\` - Security (use with target="_blank")
- ✅ \`title\` - Tooltip text
- ✅ \`id\` - For anchor links

Links are the foundation of web navigation!

---

## Full-stack Java tutorials — quick links

Use these tutorials as you build the full stack after HTML: styling, backend, data, and APIs.

| Topic | Tutorial link |
|-------|----------------|
| **Core Java** | [Java Introduction](/tutorial/java-introduction) |
| **HTML** | [HTML Introduction](/tutorial/html-introduction) |
| **CSS** | [CSS Introduction](/tutorial/css-introduction) |
| **MySQL** | [MySQL Introduction](/tutorial/mysql-introduction) |
| **JDBC** | [JDBC Introduction](/tutorial/jdbc-introduction) |
| **Servlets** | [Servlet Introduction](/tutorial/servlet-introduction) |
| **JSP** | [JSP Introduction](/tutorial/jsp-introduction) |
| **Hibernate** | [Hibernate Introduction](/tutorial/hibernate-introduction) |
| **Spring Framework** | [Spring Introduction](/tutorial/spring-introduction) |
| **Spring Boot** | [Spring Boot Introduction](/tutorial/spring-boot-introduction) |
| **Spring Cloud** | [Spring Cloud & Microservices](/tutorial/spring-cloud-microservices) |
| **HTTP & HTTPS** | [HTTP Introduction](/tutorial/http-introduction) · [HTTPS Security](/tutorial/https-security) |
| **APIs** | [API Introduction](/tutorial/api-introduction) · [REST API Fundamentals](/tutorial/rest-api-fundamentals) |

---

## 10 Important HTML Links & Anchors Interview Questions

1. **What is the \`<a>\` element used for?**  
   The **anchor** element creates **hyperlinks**. With \`href\`, it navigates to another **URL**, **path**, **fragment** on the page, or special schemes like \`mailto:\` or \`tel:\`. Without a valid \`href\` (or with \`href\` removed in JS), it behaves like a **placeholder** and is not a proper link. The **visible text** (or image inside the anchor) should describe the destination for **accessibility**.

2. **What is the difference between absolute and relative URLs?**  
   An **absolute URL** includes **scheme + authority + path** (e.g. \`https://example.com/docs/page\`). A **relative URL** is resolved against the **current document** (e.g. \`./contact.html\`, \`../assets/logo.png\`, \`/site-wide/path\` from site root). Relative links are easier to move between **environments** (dev/staging/prod) if paths stay consistent. **Protocol-relative** URLs (\`//cdn.example.com\`) are less common now—prefer **explicit https**.

3. **Why use \`rel="noopener noreferrer"\` with \`target="_blank"\`?**  
   \`target="_blank"\` opens a **new browsing context**. The opened page can access \`window.opener\` in older patterns (**reverse tabnabbing**). **\`noopener\`** severs that relationship for security. **\`noreferrer\`** also omits the **Referer** header (privacy). Modern browsers often imply \`noopener\` for \`target="_blank"\`, but **explicit** \`rel\` is still recommended and clear in code review.

4. **How do you link to a section on the same page?**  
   Put an **\`id\`** on the target element (e.g. \`<h2 id="pricing">Pricing</h2>\`) and link with \`href="#pricing"\`. The browser **scrolls** to that element. For long pages, consider **smooth scrolling** via CSS \`scroll-behavior\` or JS. **IDs must be unique** in the document. You can also use **named anchors** historically, but **id** on any element is the modern approach.

5. **What is the \`download\` attribute?**  
   On a **same-origin** link (or when CORS allows), \`download\` suggests the browser **download** the resource instead of navigating. An optional value sets a **default filename**. It does **not** bypass server **Content-Disposition** in all cases, and **cross-origin** downloads may still open in a new tab depending on policy. Use for **export** links when appropriate.

6. **How do \`mailto:\` and \`tel:\` links work?**  
   \`mailto:user@example.com?subject=Hi&body=...\` asks the OS to open the **default mail client** with optional query parameters (support varies). \`tel:+15551234567\` triggers **dialer** on phones; on desktop it may open **softphone** apps. Always use **international** format with \`+\` for \`tel:\` when possible. These are **convenience** links, not a replacement for server-side contact forms.

7. **What makes good link text for accessibility?**  
   Link text should **stand alone** out of context (screen readers can list all links). Avoid **“click here”** and **“read more”** without saying **what** happens. Prefer **“Download the 2025 annual report (PDF)”** over **“click here”**. If you use an **icon-only** link, provide **\`aria-label\`** or visually hidden text. **Color alone** must not be the only cue that text is a link—use underline or other indicators.

8. **What is the \`title\` attribute on a link?**  
   It shows a **native tooltip** on hover. It is **supplementary**: many **touch** users never see it, and **keyboard** users may not. **Do not** put critical instructions only in \`title\`. Some accessibility guidelines discourage relying on \`title\` for essential info. Prefer visible text or **aria-describedby** when you need robust help.

9. **Can an image be a link?**  
   Yes: \`<a href="..."><img src="..." alt="Describe destination"></a>\`. The **\`alt\`** on the image should describe the **purpose** of the link (e.g. “Company home”), not only what the picture looks like, if the image is the whole control. If text and image are **redundant**, adjust \`alt\` to avoid **stuttering** for screen readers.

10. **What is the difference between \`href="#"\` and omitting \`href\`?**  
    \`href="#"\` jumps to the **top** of the page and is often used as a **hack** for JS-driven actions—this is **bad for accessibility** and **history**. For buttons, use \`<button type="button">\` or \`<a role="button">\` with **keyboard** support and **focus** styles. A **\`<a>\` without \`href\`** is not focusable by default and is not a link until you add **tabindex** and semantics—usually the wrong pattern.

`,
  code: `// HTML Links & Anchors

/*
 * LINKS CONNECT THE WEB
 * =====================
 * 
 * Links allow users to navigate between pages
 * and sections.
 */

// ============================================
// 1. BASIC LINK SYNTAX
// ============================================
/*
<a href="url">Link Text</a>

Components:
  <a>           → Anchor tag
  href          → Destination URL
  Link Text     → What user sees
*/

// ============================================
// 2. TYPES OF LINKS
// ============================================
/*
EXTERNAL (Other websites):
  <a href="https://www.google.com">Google</a>

INTERNAL (Same website):
  <a href="about.html">About</a>
  <a href="pages/contact.html">Contact</a>
  <a href="../index.html">Home</a>

ANCHOR (Same page):
  <a href="#section1">Go to Section</a>
  <h2 id="section1">Section 1</h2>

EMAIL:
  <a href="mailto:email@example.com">Email</a>

PHONE:
  <a href="tel:+1234567890">Call</a>

DOWNLOAD:
  <a href="file.pdf" download>Download</a>
*/

// ============================================
// 3. LINK ATTRIBUTES
// ============================================
/*
TARGET (where to open):
  <a href="page.html">Same Tab</a>
  <a href="page.html" target="_blank">New Tab</a>
  <a href="page.html" target="_blank" rel="noopener noreferrer">
    Secure New Tab
  </a>

TITLE (tooltip):
  <a href="page.html" title="Tooltip text">Link</a>

CLASS/ID (for styling):
  <a href="page.html" class="button">Button Link</a>
*/

// ============================================
// 4. ANCHOR LINKS (SAME PAGE)
// ============================================
/*
Step 1: Create anchor point
  <h2 id="section1">Section 1</h2>

Step 2: Link to anchor
  <a href="#section1">Go to Section 1</a>

Step 3: Link to top
  <a href="#top">Back to Top</a>
*/

// ============================================
// 5. NAVIGATION MENU
// ============================================
/*
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
*/

// ============================================
// 6. LINK STATES (CSS)
// ============================================
/*
a:link { color: blue; }        → Normal
a:visited { color: purple; }   → Visited
a:hover { color: red; }        → Hover
a:active { color: green; }     → Active
*/

// ============================================
// 7. BEST PRACTICES
// ============================================
/*
✅ Use descriptive link text
✅ Always use rel="noopener noreferrer" with target="_blank"
✅ Use relative paths for internal links
✅ Test all links
✅ Make links accessible
*/
`
};

export default htmlLinks;

