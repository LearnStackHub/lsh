const htmlIntroduction = {
  id: 'html-introduction',
  title: 'HTML Introduction - What is HTML?',
  description: 'Learn what HTML is, why it exists, and how it forms the foundation of every web page',
  content: `
# HTML Introduction — The Foundation of the Web

HTML (HyperText Markup Language) is the standard markup language for creating web pages. Every website you visit is built with HTML. It's the skeleton that gives structure to web content.

---

## What is HTML?

**HTML** stands for **HyperText Markup Language**:
- **HyperText**: Text that contains links to other texts (hyperlinks)
- **Markup**: Tags that describe the structure and meaning of content
- **Language**: A way to communicate with browsers

Think of HTML as the **blueprint** of a web page. Just like a blueprint shows where walls, doors, and windows go in a building, HTML shows where headings, paragraphs, images, and links go on a web page.

---

## Why HTML Exists

Before HTML, there was no standard way to create web pages. HTML was created to:
1. **Structure content** - Organize text, images, and other elements
2. **Create links** - Connect web pages together (the "web" in World Wide Web)
3. **Display information** - Show content in a readable format
4. **Enable accessibility** - Help screen readers understand page structure

---

## How HTML Works

HTML uses **tags** (also called elements) to mark up content:

\`\`\`html
<h1>This is a heading</h1>
<p>This is a paragraph.</p>
\`\`\`

The browser reads these tags and displays the content accordingly:
- \`<h1>\` tells the browser: "This is an important heading"
- \`<p>\` tells the browser: "This is a paragraph"

---

## Basic HTML Document Structure

Every HTML document follows this structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is my first web page.</p>
</body>
</html>
\`\`\`

### Breaking Down the Structure:

1. **\`<!DOCTYPE html>\`** - Tells the browser this is an HTML5 document
2. **\`<html>\`** - Root element that wraps all content
3. **\`<head>\`** - Contains metadata (information about the page)
   - \`<meta charset="UTF-8">\` - Sets character encoding
   - \`<title>\` - Page title (shown in browser tab)
4. **\`<body>\`** - Contains visible content (what users see)

---

## HTML Tags - The Building Blocks

HTML tags come in pairs: opening tag and closing tag:

\`\`\`html
<tag>Content goes here</tag>
\`\`\`

**Example:**
\`\`\`html
<p>This is a paragraph.</p>
\`\`\`

- \`<p>\` - Opening tag
- \`</p>\` - Closing tag (note the forward slash)
- Text between tags - Content

Some tags are **self-closing** (no closing tag needed):
\`\`\`html
<img src="image.jpg" alt="Description">
<br>
<hr>
\`\`\`

---

## Real-Time Scenarios: HTML in Daily Life

### Scenario 1: Reading News Articles

**Daily Life:** When you read news on BBC, CNN, or any news website:

- **Headlines** are created with \`<h1>\`, \`<h2>\` tags
- **Article text** is in \`<p>\` (paragraph) tags
- **Images** use \`<img>\` tags
- **Links** to related articles use \`<a>\` tags

**Without HTML:** All text would look the same - no structure, no formatting, no links.

**With HTML:** Content is organized, readable, and interactive.

### Scenario 2: Online Shopping (Amazon, Flipkart)

**Daily Life:** When you browse products online:

- **Product names** are headings (\`<h1>\`, \`<h2>\`)
- **Product descriptions** are paragraphs (\`<p>\`)
- **Product images** use \`<img>\` tags
- **"Add to Cart" buttons** are created with HTML forms
- **Navigation menu** uses HTML lists (\`<ul>\`, \`<li>\`)

### Scenario 3: Social Media (Facebook, Instagram)

**Daily Life:** Every post, comment, and profile uses HTML:

- **Post content** is in \`<p>\` tags
- **User names** might be in \`<strong>\` or \`<span>\` tags
- **Images and videos** use \`<img>\` and \`<video>\` tags
- **Links** to profiles use \`<a>\` tags
- **Like/Share buttons** are HTML elements

---

## HTML Versions

HTML has evolved over time:

- **HTML 1.0** (1993) - First version, very basic
- **HTML 2.0** (1995) - Added forms and tables
- **HTML 3.2** (1997) - Added more formatting options
- **HTML 4.01** (1999) - Major update, widely used
- **XHTML** (2000) - Stricter version of HTML
- **HTML5** (2014) - Current standard, modern features

**We use HTML5** - the latest and most powerful version!

---

## Key Features of HTML5

1. **Semantic Elements** - Tags that describe meaning (\`<header>\`, \`<nav>\`, \`<article>\`)
2. **Media Support** - Built-in \`<audio>\` and \`<video>\` tags
3. **Canvas** - For drawing graphics
4. **Better Forms** - New input types (email, date, color, etc.)
5. **Offline Support** - Web apps can work offline

---

## HTML vs Other Technologies

### HTML vs CSS
- **HTML**: Structure and content (what's on the page)
- **CSS**: Styling and appearance (how it looks)

### HTML vs JavaScript
- **HTML**: Static content (doesn't change)
- **JavaScript**: Dynamic behavior (interactivity, animations)

### HTML vs Backend Languages
- **HTML**: Frontend (what users see)
- **Backend (Java, Python)**: Server-side logic (processing data)

**They work together!** HTML provides structure, CSS makes it beautiful, JavaScript makes it interactive, and backend handles data.

---

## Creating Your First HTML Page

### Step 1: Create a File

Create a file named \`index.html\` (you can use any text editor)

### Step 2: Write HTML Code

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>
\`\`\`

### Step 3: Open in Browser

Double-click the file or right-click → Open with → Browser

**Result:** You'll see "Hello, World!" as a heading and the paragraph text below it!

---

## Common HTML Tags You'll Use

| Tag | Purpose | Example |
|-----|---------|---------|
| \`<h1>\` to \`<h6>\` | Headings | \`<h1>Main Title</h1>\` |
| \`<p>\` | Paragraph | \`<p>Some text</p>\` |
| \`<a>\` | Link | \`<a href="page.html">Click me</a>\` |
| \`<img>\` | Image | \`<img src="photo.jpg">\` |
| \`<ul>\` | Unordered list | \`<ul><li>Item</li></ul>\` |
| \`<ol>\` | Ordered list | \`<ol><li>Item</li></ol>\` |
| \`<div>\` | Container | \`<div>Content</div>\` |
| \`<span>\` | Inline container | \`<span>Text</span>\` |

---

## HTML Best Practices

1. **Always close tags** - \`<p>Text</p>\` not \`<p>Text\`
2. **Use lowercase** - \`<p>\` not \`<P>\`
3. **Nest properly** - Close inner tags before outer tags
4. **Use semantic tags** - \`<header>\` instead of \`<div id="header">\`
5. **Add alt text to images** - For accessibility
6. **Validate your HTML** - Use W3C validator

---

## Summary

**HTML** stands for HyperText Markup Language. Its main purpose is to structure and organize web content. HTML uses tags as building blocks, written as \`<tag>content</tag>\`. Every HTML document has a basic structure with \`<!DOCTYPE>\`, \`<html>\`, \`<head>\`, and \`<body>\` elements. HTML5 is the current standard with modern features. HTML works together with CSS for styling and JavaScript for interactivity.

HTML is the foundation of every website. Once you understand HTML, you can create web pages and move on to styling them with CSS and making them interactive with JavaScript.

---

## Industry Applications and Use Cases

### Enterprise Web Development

HTML serves as the foundation for enterprise applications across industries:

**E-Commerce Platforms:**
- Amazon, Flipkart, and eBay utilize semantic HTML5 elements for product listings, shopping carts, and checkout processes
- Structured data markup (Schema.org) enables rich snippets in search results
- Accessibility features ensure compliance with WCAG 2.1 standards

**Financial Services:**
- Banking applications use HTML forms for secure transactions
- HTML5 validation ensures data integrity before submission
- Semantic markup improves screen reader compatibility for regulatory compliance

**Content Management Systems:**
- WordPress, Drupal, and Joomla generate HTML dynamically
- Template systems rely on HTML structure for consistent rendering
- SEO optimization depends on proper HTML semantic structure

**Progressive Web Applications (PWAs):**
- HTML5 provides offline capabilities through service workers
- App-like experiences using HTML5 APIs (geolocation, camera, storage)
- Cross-platform deployment reduces development costs

---

## HTML5 Advanced Features

### Semantic HTML5 Elements

Modern HTML5 introduces semantic elements that improve SEO and accessibility:

\`\`\`html
<header>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h1>Article Title</h1>
        <section>
            <h2>Section Heading</h2>
            <p>Content here...</p>
        </section>
    </article>
    
    <aside>
        <h2>Related Content</h2>
        <p>Sidebar information...</p>
    </aside>
</main>

<footer>
    <p>&copy; 2026 Company Name</p>
</footer>
\`\`\`

**Benefits:**
- Better SEO: Search engines understand content structure
- Improved accessibility: Screen readers navigate more efficiently
- Cleaner code: Semantic meaning replaces generic divs
- Future-proof: Standards-based approach

### HTML5 APIs for Modern Web Applications

**Geolocation API:**
\`\`\`html
<script>
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude: " + position.coords.latitude);
        console.log("Longitude: " + position.coords.longitude);
    });
</script>
\`\`\`

**Local Storage:**
\`\`\`html
<script>
    localStorage.setItem('userPreference', 'darkMode');
    const preference = localStorage.getItem('userPreference');
</script>
\`\`\`

**Canvas API:**
\`\`\`html
<canvas id="myCanvas" width="500" height="500"></canvas>
<script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, 150, 75);
</script>
\`\`\`

---

## Performance Optimization Best Practices

### Minimize HTML Size

**Techniques:**
- Remove unnecessary whitespace and comments in production
- Use minification tools (HTMLMinifier)
- Eliminate redundant attributes
- Compress HTML responses with gzip/brotli

**Impact:**
- Faster page load times
- Reduced bandwidth usage
- Improved Core Web Vitals scores
- Better mobile experience

### Efficient DOM Structure

**Best Practices:**
- Limit nesting depth (recommended: 3-4 levels maximum)
- Use semantic elements instead of div soup
- Avoid inline styles (use external CSS)
- Minimize DOM nodes for better rendering performance

**Example - Optimized Structure:**
\`\`\`html
<!-- Good: Semantic and shallow -->
<article>
    <header>
        <h1>Title</h1>
    </header>
    <p>Content</p>
</article>

<!-- Bad: Deep nesting with generic divs -->
<div>
    <div>
        <div>
            <div>
                <div>Content</div>
            </div>
        </div>
    </div>
</div>
\`\`\`

---

## Accessibility (A11y) Considerations

### WCAG 2.1 Compliance

HTML structure directly impacts accessibility:

**Semantic HTML:**
- Use proper heading hierarchy (h1 → h2 → h3)
- Include alt text for all images
- Provide form labels
- Use ARIA attributes when necessary

**Example:**
\`\`\`html
<!-- Accessible form -->
<form>
    <label for="email">Email Address</label>
    <input type="email" id="email" name="email" required aria-describedby="email-help">
    <small id="email-help">We'll never share your email.</small>
    
    <button type="submit">Subscribe</button>
</form>
\`\`\`

**Benefits:**
- Legal compliance (ADA, Section 508)
- Expanded user base (15% of population has disabilities)
- Better SEO (search engines favor accessible sites)
- Improved user experience for all users

---

## SEO Optimization with HTML

### Semantic Markup for Search Engines

**Structured Data:**
\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "HTML Introduction",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2026-01-01"
}
</script>
\`\`\`

**Meta Tags:**
\`\`\`html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Comprehensive HTML tutorial covering HTML5, semantic markup, and best practices">
    <meta name="keywords" content="HTML, HTML5, web development, markup language">
    <meta name="author" content="Author Name">
    <meta property="og:title" content="HTML Introduction - Complete Guide">
    <meta property="og:description" content="Learn HTML from scratch">
    <meta property="og:image" content="/images/html-tutorial.jpg">
    <title>HTML Introduction - Complete Guide 2026</title>
</head>
\`\`\`

---

## Security Best Practices

### Preventing XSS (Cross-Site Scripting)

**Sanitize User Input:**
- Never trust user-generated content
- Escape special characters
- Use Content Security Policy (CSP)

**Example:**
\`\`\`html
<!-- Dangerous: Direct user input -->
<div><%= userInput %></div>

<!-- Safe: Escaped output -->
<div><%= escapeHtml(userInput) %></div>
\`\`\`

### Content Security Policy

\`\`\`html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
\`\`\`

---

## Common Pitfalls and How to Avoid Them

### 1. Missing DOCTYPE Declaration

**Problem:**
\`\`\`html
<!-- Missing DOCTYPE triggers quirks mode -->
<html>
\`\`\`

**Solution:**
\`\`\`html
<!DOCTYPE html>
<html>
\`\`\`

### 2. Improper Heading Hierarchy

**Problem:**
\`\`\`html
<h1>Main Title</h1>
<h3>Subtitle</h3> <!-- Skipped h2 -->
\`\`\`

**Solution:**
\`\`\`html
<h1>Main Title</h1>
<h2>Subtitle</h2>
\`\`\`

### 3. Missing Alt Attributes

**Problem:**
\`\`\`html
<img src="photo.jpg"> <!-- No alt text -->
\`\`\`

**Solution:**
\`\`\`html
<img src="photo.jpg" alt="Description of the image">
\`\`\`

### 4. Using Deprecated Tags

**Problem:**
\`\`\`html
<center>Text</center> <!-- Deprecated -->
<font color="red">Text</font> <!-- Deprecated -->
\`\`\`

**Solution:**
\`\`\`html
<div style="text-align: center;">Text</div> <!-- Use CSS -->
<span style="color: red;">Text</span> <!-- Use CSS -->
\`\`\`

---

## HTML Validation and Testing

### W3C Validator

Always validate HTML using the [W3C Markup Validation Service](https://validator.w3.org/):

**Benefits:**
- Identifies syntax errors
- Ensures cross-browser compatibility
- Improves accessibility
- Catches deprecated elements

### Browser Testing

Test HTML in multiple browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

### Tools for HTML Development

**Recommended Tools:**
- **VS Code**: HTML validation extension
- **HTMLHint**: Linting tool
- **Prettier**: Code formatting
- **Browser DevTools**: Inspect and debug HTML

---

## Frequently Asked Questions (FAQs)

### Q1: What is the difference between HTML and XHTML?

**A:** XHTML (eXtensible HyperText Markup Language) is a stricter version of HTML that follows XML rules. HTML5 is more forgiving and doesn't require strict XML syntax. Modern web development uses HTML5, which combines the best of both HTML and XHTML while maintaining backward compatibility.

**Key Differences:**
- XHTML requires all tags to be closed
- XHTML is case-sensitive
- XHTML requires quotes around attributes
- HTML5 is more flexible and widely adopted

### Q2: Can I use HTML without CSS and JavaScript?

**A:** Yes, HTML can function independently. HTML provides structure and basic content. However, for modern web development, CSS (for styling) and JavaScript (for interactivity) are essential. HTML alone creates functional but unstyled, static pages. Most professional websites use all three technologies together. Learn more about [CSS Introduction](/tutorial/css-introduction) and how it complements HTML.

### Q3: What are semantic HTML elements and why are they important?

**A:** Semantic HTML elements (like \`<header>\`, \`<nav>\`, \`<article>\`, \`<section>\`, \`<footer>\`) describe the meaning and purpose of content, not just its appearance. They improve SEO, accessibility, and code maintainability. Search engines better understand page structure, screen readers navigate more efficiently, and developers write cleaner, more maintainable code.

### Q4: How does HTML relate to web frameworks like React or Angular?

**A:** Modern frameworks like React and Angular use HTML as a foundation but extend it with component-based architectures. React uses JSX (JavaScript XML), which looks like HTML but compiles to JavaScript. Angular uses HTML templates. Both ultimately render standard HTML to the browser. Understanding HTML is fundamental before learning these frameworks.

### Q5: What is the difference between block-level and inline elements?

**A:** Block-level elements (like \`<div>\`, \`<p>\`, \`<h1>\`) take full width and start on a new line. Inline elements (like \`<span>\`, \`<a>\`, \`<strong>\`) only take necessary width and stay on the same line. Understanding this distinction is crucial for layout and styling with CSS. Learn more about [CSS Display and Positioning](/tutorial/css-display-positioning).

### Q6: How important is HTML validation?

**A:** HTML validation is crucial for ensuring cross-browser compatibility, accessibility, and SEO. Invalid HTML can cause rendering issues, accessibility problems, and poor search engine rankings. Use the W3C Validator to check your HTML before deploying to production.

### Q7: What is the role of HTML in responsive web design?

**A:** HTML provides the structure that CSS makes responsive. HTML5 introduced the viewport meta tag (\`<meta name="viewport">\`), which is essential for responsive design. Semantic HTML elements also make it easier to create responsive layouts. However, actual responsive behavior is achieved through CSS media queries. Learn more about [CSS Responsive Design](/tutorial/css-responsive).

### Q8: Can HTML be used for mobile app development?

**A:** Yes, through Progressive Web Apps (PWAs) and hybrid mobile frameworks. HTML, combined with CSS and JavaScript, can create mobile applications using frameworks like Ionic, Cordova, or Capacitor. These apps run in a WebView and can access native device features. HTML5 APIs enable offline functionality, geolocation, and camera access.

### Q9: What are HTML entities and when should I use them?

**A:** HTML entities are special codes for characters that have special meaning in HTML or aren't easily typed. Common examples: \`&lt;\` for <, \`&gt;\` for >, \`&amp;\` for &, \`&nbsp;\` for non-breaking space. Use them when you need to display characters that HTML interprets as code, or for special symbols and international characters.

### Q10: How does HTML5 differ from previous HTML versions?

**A:** HTML5 introduced semantic elements, native media support (\`<audio>\`, \`<video>\`), canvas for graphics, improved form inputs, offline storage (localStorage, sessionStorage), and new APIs (geolocation, drag-and-drop). It's more forgiving than XHTML, supports modern web applications, and is the current standard. HTML5 is backward compatible, so older HTML still works.

---

## Key Takeaways

- **HTML (HyperText Markup Language)** is the standard markup language for creating web pages and serves as the foundation of all web content
- **HTML5** is the current standard, offering semantic elements, native media support, and modern APIs
- **Semantic HTML** improves SEO, accessibility, and code maintainability
- **Proper HTML structure** is essential for performance, accessibility, and cross-browser compatibility
- **HTML works with CSS and JavaScript** to create modern, interactive web applications
- **Validation and testing** ensure quality and compatibility across browsers and devices
- **Industry best practices** include semantic markup, accessibility compliance, and performance optimization

---

## HTML vs Other Technologies - Comparison Table

Understanding how HTML compares to other web technologies helps clarify its role in web development:

| Feature | HTML | CSS | JavaScript | Backend (Java/Python) |
|---------|------|-----|------------|---------------------|
| **Purpose** | Structure & content | Styling & layout | Interactivity & behavior | Server-side logic |
| **Runs On** | Browser | Browser | Browser | Server |
| **Type** | Markup language | Style sheet language | Programming language | Programming language |
| **Can Create** | Static pages | Visual design | Dynamic features | APIs, databases |
| **Required For** | All web pages | Visual appearance | Interactive features | Data processing |
| **File Extension** | .html | .css | .js | .java, .py, etc. |
| **Learning Curve** | Easy | Moderate | Moderate-Hard | Hard |
| **Example** | \`<h1>Title</h1>\` | \`color: blue;\` | \`alert('Hello');\` | \`@RestController\` |

**Key Takeaway:** HTML provides structure, CSS adds styling, JavaScript enables interactivity, and backend languages handle server-side processing. All four work together to create modern web applications.

---

## HTML Document Structure Diagram

Understanding the hierarchical structure of HTML documents:

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    HTML DOCUMENT STRUCTURE                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  <!DOCTYPE html>                                      │  │
│  │  (Document Type Declaration)                         │  │
│  └─────────────────────────────────────────────────────┘  │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  <html lang="en">                                    │  │
│  │  (Root Element)                                      │  │
│  │    │                                                  │  │
│  │    ├──────────────────────────────────────────────┐  │  │
│  │    │  <head>                                      │  │  │
│  │    │  (Metadata - Not Visible)                   │  │  │
│  │    │    ├─ <meta charset="UTF-8">                │  │  │
│  │    │    ├─ <meta name="viewport" ...>            │  │  │
│  │    │    ├─ <title>Page Title</title>             │  │  │
│  │    │    ├─ <link rel="stylesheet" ...>          │  │  │
│  │    │    └─ <script src="..."></script>           │  │  │
│  │    └──────────────────────────────────────────────┘  │  │
│  │                                                      │  │
│  │    ├──────────────────────────────────────────────┐  │  │
│  │    │  <body>                                      │  │  │
│  │    │  (Visible Content)                          │  │  │
│  │    │    ├─ <header>                              │  │  │
│  │    │    │    ├─ <nav>                            │  │  │
│  │    │    │    └─ <h1>Main Heading</h1>            │  │  │
│  │    │    ├─ <main>                                │  │  │
│  │    │    │    ├─ <article>                        │  │  │
│  │    │    │    │    ├─ <h2>Section</h2>            │  │  │
│  │    │    │    │    ├─ <p>Paragraph</p>            │  │  │
│  │    │    │    │    └─ <img src="..." alt="...">   │  │  │
│  │    │    │    └─ <section>                        │  │  │
│  │    │    ├─ <aside>                                │  │  │
│  │    │    └─ <footer>                              │  │  │
│  │    └──────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## Real-World Use Cases and Applications

### Use Case 1: E-Commerce Product Page

**Scenario:** Building a product detail page for an online store.

**HTML Structure:**
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Name - Online Store</title>
    <meta name="description" content="Buy Product Name - Best price, fast delivery">
</head>
<body>
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/cart">Cart</a>
        </nav>
    </header>
    
    <main>
        <article itemscope itemtype="https://schema.org/Product">
            <h1 itemprop="name">Product Name</h1>
            <img src="product.jpg" alt="Product Name" itemprop="image">
            
            <section>
                <h2>Product Details</h2>
                <p itemprop="description">Product description here...</p>
                <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                    <span itemprop="price">$99.99</span>
                    <span itemprop="availability">In Stock</span>
                </div>
            </section>
            
            <section>
                <h2>Customer Reviews</h2>
                <div itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
                    <span itemprop="ratingValue">4.5</span> / 5
                    <span itemprop="reviewCount">120</span> reviews
                </div>
            </section>
            
            <form action="/cart/add" method="POST">
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" value="1" min="1">
                <button type="submit">Add to Cart</button>
            </form>
        </article>
    </main>
    
    <footer>
        <p>&copy; 2026 Online Store. All rights reserved.</p>
    </footer>
</body>
</html>
\`\`\`

**Explanation:**
- \`<article>\` with \`itemscope\` enables structured data for SEO
- \`itemprop\` attributes provide semantic meaning for search engines
- Schema.org markup enables rich snippets in search results
- Form enables user interaction (adding to cart)
- Semantic HTML5 elements (\`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<footer>\`) improve SEO and accessibility

**Benefits:**
- Better search engine visibility
- Rich snippets in Google search results
- Improved accessibility for screen readers
- Cleaner, more maintainable code

---

### Use Case 2: Blog Post with Comments

**Scenario:** Creating a blog post page with comment section.

**HTML Structure:**
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Blog Post Title - LearnStackHub</title>
    <meta name="author" content="Author Name">
    <meta property="og:type" content="article">
</head>
<body>
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/blog">Blog</a>
        </nav>
    </header>
    
    <main>
        <article itemscope itemtype="https://schema.org/BlogPosting">
            <header>
                <h1 itemprop="headline">Blog Post Title</h1>
                <time datetime="2026-01-15" itemprop="datePublished">January 15, 2026</time>
                <span itemprop="author" itemscope itemtype="https://schema.org/Person">
                    <span itemprop="name">Author Name</span>
                </span>
            </header>
            
            <div itemprop="articleBody">
                <p>Introduction paragraph...</p>
                <h2>Main Section</h2>
                <p>Content paragraph...</p>
                <pre><code>Code example here</code></pre>
                <h2>Conclusion</h2>
                <p>Conclusion paragraph...</p>
            </div>
            
            <footer>
                <div>
                    <span>Tags: </span>
                    <a href="/tag/html">HTML</a>,
                    <a href="/tag/web-development">Web Development</a>
                </div>
            </footer>
        </article>
        
        <aside>
            <h2>Related Posts</h2>
            <ul>
                <li><a href="/post/related-1">Related Post 1</a></li>
                <li><a href="/post/related-2">Related Post 2</a></li>
            </ul>
        </aside>
        
        <section>
            <h2>Comments</h2>
            <form action="/comments" method="POST">
                <label for="comment">Add Comment:</label>
                <textarea id="comment" name="comment" rows="4" required></textarea>
                <button type="submit">Submit Comment</button>
            </form>
            
            <div class="comments">
                <article>
                    <h3>John Doe</h3>
                    <time datetime="2026-01-14">January 14, 2026</time>
                    <p>Great article! Very helpful.</p>
                </article>
            </div>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2026 LearnStackHub</p>
    </footer>
</body>
</html>
\`\`\`

**Explanation:**
- \`<article>\` wraps the blog post content
- \`itemscope\` and \`itemtype\` enable structured data
- \`<time>\` element with \`datetime\` attribute provides machine-readable dates
- \`<aside>\` contains related content (sidebar)
- Nested \`<article>\` elements for comments maintain semantic structure
- Form enables user interaction (comment submission)

---

### Use Case 3: Responsive Navigation Menu

**Scenario:** Building a responsive navigation menu that works on mobile and desktop.

**HTML Structure:**
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Navigation Example</title>
</head>
<body>
    <header>
        <nav role="navigation" aria-label="Main navigation">
            <div class="nav-brand">
                <a href="/">LearnStackHub</a>
            </div>
            
            <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <ul class="nav-menu">
                <li><a href="/">Home</a></li>
                <li><a href="/tutorials">Tutorials</a></li>
                <li class="dropdown">
                    <a href="/courses" aria-haspopup="true" aria-expanded="false">Courses</a>
                    <ul class="dropdown-menu" role="menu">
                        <li role="menuitem"><a href="/courses/java">Java</a></li>
                        <li role="menuitem"><a href="/courses/spring">Spring</a></li>
                        <li role="menuitem"><a href="/courses/mysql">MySQL</a></li>
                    </ul>
                </li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <h1>Page Content</h1>
        <p>Main content goes here...</p>
    </main>
</body>
</html>
\`\`\`

**Explanation:**
- \`role="navigation"\` and \`aria-label\` improve accessibility
- \`aria-expanded\` indicates dropdown state for screen readers
- \`role="menu"\` and \`role="menuitem"\` provide semantic meaning for dropdown menus
- \`aria-haspopup\` indicates elements with popup menus
- Mobile menu toggle button with accessible label
- Semantic \`<ul>\` and \`<li>\` structure for navigation items

**Accessibility Benefits:**
- Screen readers can navigate menus effectively
- Keyboard navigation support
- Clear focus indicators
- ARIA attributes provide context

---

## HTML Version Comparison Table

Understanding HTML evolution helps developers choose appropriate features:

| Version | Year | Key Features | Browser Support | Current Status |
|---------|------|-------------|-----------------|----------------|
| **HTML 1.0** | 1993 | Basic text formatting, links | None (obsolete) | Deprecated |
| **HTML 2.0** | 1995 | Forms, tables | None (obsolete) | Deprecated |
| **HTML 3.2** | 1997 | Applets, text flow | None (obsolete) | Deprecated |
| **HTML 4.01** | 1999 | CSS support, scripting | Legacy browsers | Legacy |
| **XHTML 1.0** | 2000 | XML-based, stricter | Legacy browsers | Legacy |
| **HTML5** | 2014 | Semantic elements, APIs, media | All modern browsers | **Current Standard** ✅ |
| **HTML5.1** | 2016 | Minor updates | All modern browsers | Current |
| **HTML5.2** | 2017 | Security improvements | All modern browsers | Current |
| **HTML5.3** | 2018+ | Ongoing improvements | All modern browsers | Current |

**Recommendation:** Use HTML5 (or latest HTML5.x) for all new projects. It provides the best features, browser support, and future compatibility.

---

## HTML Element Categories Diagram

Understanding HTML element types helps structure content effectively:

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                  HTML ELEMENT CATEGORIES                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  BLOCK-LEVEL ELEMENTS                                │  │
│  │  (Take full width, start on new line)               │  │
│  │  ────────────────────────────────────────────────    │  │
│  │  <div>, <p>, <h1>-<h6>, <ul>, <ol>, <li>,          │  │
│  │  <section>, <article>, <header>, <footer>,          │  │
│  │  <nav>, <main>, <aside>, <table>, <form>            │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                  │
│                          ▼                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  INLINE ELEMENTS                                     │  │
│  │  (Take only needed width, stay on same line)        │  │
│  │  ────────────────────────────────────────────────    │  │
│  │  <span>, <a>, <strong>, <em>, <img>, <input>,      │  │
│  │  <button>, <label>, <code>, <small>, <time>         │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                  │
│                          ▼                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  SEMANTIC ELEMENTS (HTML5)                          │  │
│  │  (Describe meaning, not just appearance)            │  │
│  │  ────────────────────────────────────────────────    │  │
│  │  <header>, <nav>, <main>, <article>, <section>,    │  │
│  │  <aside>, <footer>, <figure>, <figcaption>,        │  │
│  │  <time>, <mark>, <progress>, <meter>                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## Code Example: Complete E-Commerce Product Card

**Real-World Implementation:** Building a product card component used in e-commerce platforms.

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Card Example</title>
</head>
<body>
    <!-- Product Card Component -->
    <article class="product-card" itemscope itemtype="https://schema.org/Product">
        <!-- Product Image -->
        <div class="product-image">
            <img 
                src="product-image.jpg" 
                alt="Product Name - High quality image"
                itemprop="image"
                loading="lazy"
                width="300"
                height="300"
            >
            <span class="badge">Sale</span>
        </div>
        
        <!-- Product Information -->
        <div class="product-info">
            <h2 itemprop="name">Product Name</h2>
            <div class="product-rating" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
                <span class="stars">★★★★☆</span>
                <span itemprop="ratingValue">4.5</span>
                <span itemprop="reviewCount">(120 reviews)</span>
            </div>
            
            <div class="product-price">
                <span class="current-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                    <span itemprop="price">$99.99</span>
                </span>
                <span class="original-price">$149.99</span>
            </div>
            
            <p class="product-description" itemprop="description">
                High-quality product description that explains features and benefits...
            </p>
            
            <!-- Product Actions -->
            <div class="product-actions">
                <button class="btn-add-cart" aria-label="Add Product Name to cart">
                    Add to Cart
                </button>
                <button class="btn-wishlist" aria-label="Add Product Name to wishlist">
                    ♡ Wishlist
                </button>
            </div>
            
            <!-- Product Features -->
            <ul class="product-features">
                <li>✓ Free Shipping</li>
                <li>✓ 30-Day Returns</li>
                <li>✓ 2-Year Warranty</li>
            </ul>
        </div>
    </article>
</body>
</html>
\`\`\`

**Detailed Explanation:**

1. **Semantic Structure:**
   - \`<article>\` element indicates standalone content (product card)
   - \`itemscope\` and \`itemtype\` enable structured data for SEO

2. **Image Optimization:**
   - \`loading="lazy"\` defers image loading until needed (performance)
   - \`width\` and \`height\` attributes prevent layout shift
   - Descriptive \`alt\` text improves accessibility

3. **Structured Data:**
   - \`itemprop="name"\` identifies product name for search engines
   - \`itemprop="aggregateRating"\` enables star ratings in search results
   - \`itemprop="offers"\` provides pricing information

4. **Accessibility:**
   - \`aria-label\` attributes provide context for screen readers
   - Semantic HTML structure improves screen reader navigation
   - Clear button labels indicate actions

5. **User Experience:**
   - Clear visual hierarchy (image → name → rating → price → description)
   - Multiple call-to-action buttons (cart, wishlist)
   - Trust signals (free shipping, returns, warranty)

**Benefits:**
- Better SEO through structured data
- Improved accessibility
- Enhanced user experience
- Rich snippets in search results

---

## Conclusion and Summary

HTML (HyperText Markup Language) serves as the foundational technology for all web development. Understanding HTML is essential for anyone entering web development, as it provides the structure upon which all other web technologies build.

### Key Takeaways:

1. **HTML is the Foundation:** Every web page uses HTML to structure content. Without HTML, there would be no web as we know it.

2. **Semantic HTML5 is Essential:** Modern HTML5 semantic elements (\`<header>\`, \`<nav>\`, \`<article>\`, \`<section>\`, \`<footer>\`) improve SEO, accessibility, and code maintainability.

3. **Accessibility Matters:** Proper HTML structure, alt attributes, ARIA labels, and semantic elements ensure websites are accessible to all users, including those using assistive technologies.

4. **SEO Optimization:** Semantic HTML, structured data (Schema.org), proper heading hierarchy, and meta tags significantly impact search engine rankings.

5. **Performance Considerations:** Optimized HTML structure, lazy loading, proper image attributes, and minimal DOM depth improve page load times and user experience.

6. **Security Best Practices:** Content Security Policy, input sanitization, and secure form handling protect against XSS attacks and other security vulnerabilities.

7. **Industry Standards:** HTML5 is the current standard, supported by all modern browsers. Understanding HTML5 features enables developers to build modern, responsive web applications.

8. **Real-World Applications:** HTML powers e-commerce platforms, content management systems, progressive web applications, and enterprise web systems across industries.

### Your Next Steps:

**Immediate Actions:**
- Practice creating HTML documents with semantic structure
- Experiment with HTML5 semantic elements
- Build simple web pages (blog post, product card, contact form)
- Validate HTML using W3C Validator

**Continue Learning:**
- **CSS Introduction**: Learn to style your HTML with Cascading Style Sheets
- **HTML Structure & Basic Tags**: Master document structure and essential HTML elements
- **HTML Forms**: Create interactive forms for user input
- **HTML Tables**: Structure tabular data effectively
- **JavaScript Basics**: Add interactivity and dynamic behavior

**Advanced Topics:**
- HTML5 APIs (Geolocation, Local Storage, Canvas)
- Progressive Web Applications (PWAs)
- Web Components and Custom Elements
- HTML5 Media (Audio, Video)

### Final Thoughts:

HTML is more than just markup—it's the language that structures the web. Mastering HTML fundamentals provides the foundation for understanding CSS, JavaScript, and modern web frameworks. Whether you're building simple static pages or complex web applications, HTML knowledge is indispensable.

The web development industry values developers who understand HTML deeply, write semantic code, and prioritize accessibility and SEO. By mastering HTML, you're not just learning a markup language—you're learning the foundation of modern web development.

**Remember:** Good HTML structure makes everything else easier. Take time to learn HTML properly, and you'll find CSS, JavaScript, and frameworks much more intuitive.

---

## What's Next?

Now that you understand HTML fundamentals, continue your web development journey:

- **HTML Structure & Basic Tags**: Learn about document structure, headings, paragraphs, and essential HTML elements
- **HTML Links & Images**: Master hyperlinks, image optimization, and media embedding
- **HTML Forms**: Create interactive forms for user input and data collection
- **HTML Tables**: Structure tabular data effectively
- **CSS Introduction**: Learn how to style your HTML with Cascading Style Sheets
- **JavaScript Basics**: Add interactivity and dynamic behavior to your web pages

Understanding HTML is the first step in becoming a web developer. Master HTML, then move on to CSS for styling and JavaScript for interactivity to build complete web applications.
`,
  code: `// HTML Introduction - What is HTML?

/*
 * HTML = HyperText Markup Language
 * =================================
 * 
 * HTML is the standard markup language for creating web pages.
 * Every website uses HTML to structure content.
 */

// ============================================
// 1. BASIC HTML DOCUMENT STRUCTURE
// ============================================
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is my first web page.</p>
</body>
</html>
*/

// ============================================
// 2. HTML TAGS - OPENING AND CLOSING
// ============================================
/*
Opening Tag:  <tag>
Closing Tag:  </tag>
Content:     Text between tags

Example:
  <p>This is a paragraph.</p>
  ^^                    ^^
  Opening              Closing
*/

// ============================================
// 3. SELF-CLOSING TAGS
// ============================================
/*
Some tags don't need closing tags:
  <img src="image.jpg">
  <br>
  <hr>
  <input type="text">
*/

// ============================================
// 4. HTML DOCUMENT PARTS
// ============================================
/*
<!DOCTYPE html>  → Declares HTML5 document
<html>           → Root element
<head>           → Metadata (not visible)
  - <title>      → Page title (browser tab)
  - <meta>       → Character encoding, viewport
<body>           → Visible content
  - <h1>         → Main heading
  - <p>          → Paragraph
  - <img>        → Image
  - <a>          → Link
*/

// ============================================
// 5. COMMON HTML TAGS
// ============================================
/*
<h1> to <h6>     → Headings (h1 = largest)
<p>              → Paragraph
<a>              → Link/Anchor
<img>            → Image
<ul>             → Unordered list
<ol>             → Ordered list
<li>             → List item
<div>            → Container/Division
<span>           → Inline container
<br>             → Line break
<hr>             → Horizontal rule
*/

// ============================================
// 6. HTML VERSIONS
// ============================================
/*
HTML 1.0 (1993)  → First version
HTML 4.01 (1999) → Widely used
XHTML (2000)     → Stricter version
HTML5 (2014)     → Current standard ✅
*/

// ============================================
// 7. HTML vs OTHER TECHNOLOGIES
// ============================================
/*
HTML  → Structure and content (what's on page)
CSS   → Styling and appearance (how it looks)
JS    → Interactivity and behavior (what it does)
*/

// ============================================
// 8. REAL-WORLD USAGE
// ============================================
/*
Every website uses HTML:
  - News websites (headlines, articles)
  - E-commerce (product pages, forms)
  - Social media (posts, profiles)
  - Blogs (content, images)
  - All web applications
*/

// ============================================
// 9. BEST PRACTICES
// ============================================
/*
Always close tags: <p>Text</p>
Use lowercase: <p> not <P>
Nest properly: <div><p>Text</p></div>
Use semantic tags: <header>, <nav>, <article>
Add alt text to images: <img alt="description">
Validate HTML: Use W3C validator
*/
`
};

export default htmlIntroduction;

