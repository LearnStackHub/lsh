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
| **Hibernate** | [Hibernate Introduction](/hibernate/hibernate-introduction) |
| **Spring Framework** | [Spring Introduction](/tutorial/spring-introduction) |
| **Spring Boot** | [Spring Boot Introduction](/tutorial/spring-boot-introduction) |
| **Spring Cloud** | [Spring Cloud & Microservices](/tutorial/spring-cloud-microservices) |
| **HTTP & HTTPS** | [HTTP Introduction](/tutorial/http-introduction) · [HTTPS Security](/tutorial/https-security) |
| **APIs** | [API Introduction](/tutorial/api-introduction) · [REST API Fundamentals](/tutorial/rest-api-fundamentals) |

---

## 10 Important HTML Links & Anchors Interview Questions

1. **What is the \`<a>\` element used for?**  
   **Short Answer:** The anchor element creates hyperlinks that connect users to destinations and actions on the web.  
   **Detailed Explanation:** The anchor tag is the core navigation element of HTML. With a valid href value, it can move users to another page, a section in the same page, a file, or protocol-based actions such as email and phone links. A link is more than clickable text; it is a semantic promise about navigation behavior. Good link labels should clearly describe destination or action so users, including screen reader users, can make confident choices. In interviews, mention that a tag without a meaningful href is not a real navigational link. Clear link semantics improve usability, accessibility, and page architecture across both simple websites and enterprise applications.

2. **What is the difference between absolute and relative URLs?**  
   **Short Answer:** Absolute URLs include full address details, while relative URLs resolve from the current page path.  
   **Detailed Explanation:** Absolute URLs contain protocol, domain, and full path, making them independent of current page location. Relative URLs are shorter and are interpreted based on where the current document exists. Relative links are common for internal navigation because they make environment moves easier when domain names differ between local, staging, and production. Absolute links are useful for external resources and situations where full clarity is needed. Interviewers often ask this to test practical path understanding, since path mistakes cause broken links in deployment. A strong answer includes maintainability and portability benefits, not just syntax differences between the two URL forms.

3. **Why use \`rel="noopener noreferrer"\` with \`target="_blank"\`?**  
   **Short Answer:** It improves security and privacy when opening links in a new tab.  
   **Detailed Explanation:** Opening links in a new tab can create a relationship between the new page and the original page. Without protective rel values, the opened page may gain limited control over the opener context in some scenarios. Adding noopener removes that risky connection and reduces security concerns such as tab hijacking patterns. Adding noreferrer also prevents sending referrer information in many cases, which can support privacy requirements. Even though modern browsers apply safer defaults more often now, explicit rel values remain a clear and recommended practice. Interviewers expect this because secure linking is a small change with high practical impact in production systems.

4. **How do you link to a section on the same page?**  
   **Short Answer:** Add an id to the destination element and reference it in the link with a hash.  
   **Detailed Explanation:** Same-page navigation works through fragment identifiers. You place a unique id on the target section and create a link whose href contains that id prefixed by a hash symbol. When users click, the browser jumps or scrolls to that exact element. This technique is useful for long articles, documentation pages, and table-of-contents navigation. It improves user experience by reducing scrolling effort and helping readers move directly to relevant sections. In interviews, include two key points: ids must be unique and anchor navigation should be meaningful. Well-implemented section links also support better usability for keyboard users and structured content discovery.

5. **What is the \`download\` attribute?**  
   **Short Answer:** It tells the browser to download the linked resource instead of opening it normally.  
   **Detailed Explanation:** The download attribute is useful when you want users to save files such as PDFs, reports, or exported data. Instead of navigating to the file, the browser typically starts a download action. You can optionally provide a suggested filename for better user clarity. In real projects, behavior may still depend on server headers, browser policies, and origin rules, so testing is important. Interviewers ask this to see if you understand practical browser behavior, not just attribute existence. A strong answer explains that download improves user flow for file assets but should be combined with correct server configuration and predictable link labeling.

6. **How do \`mailto:\` and \`tel:\` links work?**  
   **Short Answer:** They use URL schemes to open the user email client or phone dialer with prefilled data.  
   **Detailed Explanation:** Mail and phone links are special protocol links that delegate actions to device applications. A mail link can prefill recipient, subject, and in some cases body text depending on client support. A phone link opens dial functionality on mobile devices and may open calling software on desktops. These links improve user convenience, especially for contact pages and support workflows. However, they are not guaranteed to behave identically on all devices because behavior depends on local app setup. Interviewers expect you to mention this variability and recommend fallback options, such as contact forms, for robust user communication across environments.

7. **What makes good link text for accessibility?**  
   **Short Answer:** Good link text clearly describes destination or action even when read out of context.  
   **Detailed Explanation:** Accessible link text should tell users exactly what will happen after activation. Phrases like click here or read more are vague and force users to scan surrounding text for meaning. Screen readers often provide a list of links, so each label should stand on its own. Strong examples include action plus destination, such as download student guide PDF or view course registration details. Visual styling also matters; links should be recognizable without relying only on color contrast. Interviewers ask this to check whether you build interfaces for all users. Clear labels improve accessibility, usability, SEO context, and overall content quality.

8. **What is the \`title\` attribute on a link?**  
   **Short Answer:** It provides optional tooltip text, but should not hold essential information.  
   **Detailed Explanation:** The title attribute can show extra context when users hover with a mouse, but it is not a reliable communication channel across all devices. Touch users and many keyboard-only users may never see that tooltip, so critical instructions should always remain visible in the page content. In accessibility-focused development, title is considered supplementary metadata rather than primary guidance. Interviewers expect you to know this limitation because many beginners misuse title for mandatory explanations. A better pattern is clear visible text plus accessible helper content where needed. Use title sparingly for minor hints, not for core interaction or compliance requirements.

9. **Can an image be a link?**  
   **Short Answer:** Yes, an image can be wrapped inside a link, with meaningful alternative text for accessibility.  
   **Detailed Explanation:** Image links are common in logos, banners, cards, and icon-based actions. When an image is the clickable element, its alternative text should describe the link purpose, not just the visual content. For example, a company logo linking to the home page should have alt text that communicates home navigation intent. If nearby text already provides the same meaning, avoid redundant announcements by adjusting alternative text strategy thoughtfully. Interviewers use this question to test whether you understand both semantic linking and accessible media usage. A complete answer connects image linking with user clarity, keyboard navigation, and assistive technology behavior in real interfaces.

10. **What is the difference between \`href="#"\` and omitting \`href\`?**  
    **Short Answer:** A hash link triggers navigation behavior, while an anchor without href is usually not a true link.  
    **Detailed Explanation:** Using a hash-only href often causes unwanted page jumps and noisy browser history when used as a fake button. Omitting href removes native link behavior and often removes keyboard focusability, which hurts accessibility. If the action is not navigation, a button element is usually the correct semantic choice. If it is navigation, use a real destination in href. Interviewers ask this to check your semantic decision making, because choosing between link and button is a common frontend quality signal. Correct element usage improves keyboard support, assistive technology interpretation, and maintainability of interaction logic across the application.

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

