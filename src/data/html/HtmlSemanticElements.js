const htmlSemanticElements = {
  id: 'html-semantic-elements',
  title: 'HTML5 Semantic Elements',
  description: 'Learn about semantic HTML5 elements like header, nav, article, section, footer for better structure',
  content: `
# HTML5 Semantic Elements - Meaningful Structure

HTML5 semantic elements provide meaningful structure to web documents by clearly describing the purpose and meaning of content sections. Unlike generic elements like \`<div>\` and \`<span>\`, semantic elements convey their meaning to browsers, search engines, screen readers, and developers. Understanding semantic HTML is essential for building accessible, SEO-friendly, and maintainable web applications.

Enterprise web applications extensively use semantic elements for improved SEO, better accessibility, clearer code structure, and enhanced maintainability. Semantic elements enable search engines to better understand content, assistive technologies to navigate pages effectively, and developers to write self-documenting code. Modern web development standards emphasize semantic HTML for professional, standards-compliant applications.

**Semantic Element Benefits:**
- **SEO Improvement**: Search engines understand content structure
- **Accessibility**: Screen readers navigate semantic structure better
- **Maintainability**: Self-documenting, meaningful code
- **Standards Compliance**: Modern HTML5 best practices

---

## What are Semantic Elements?

**Semantic** = Having meaning

Semantic elements clearly describe their purpose:
- \`<header>\` - Clearly a header
- \`<nav>\` - Clearly navigation
- \`<article>\` - Clearly an article

**Non-semantic** elements don't convey meaning:
- \`<div>\` - Just a container
- \`<span>\` - Just inline container

---

## Why Use Semantic Elements?

1. **Better SEO** - Search engines understand content structure
2. **Accessibility** - Screen readers navigate better
3. **Maintainability** - Code is self-documenting
4. **Future-proof** - Standards-based approach

---

## Main Semantic Elements

### Header

\`\`\`html
<header>
    <h1>Website Title</h1>
    <p>Tagline or description</p>
</header>
\`\`\`

**Purpose:** Top section of page or article

**Can contain:**
- Logo
- Site title
- Navigation
- Search bar

---

### Nav (Navigation)

\`\`\`html
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
\`\`\`

**Purpose:** Navigation links

**Note:** Not all links need to be in \`<nav>\` - only main navigation

---

### Main

\`\`\`html
<main>
    <h1>Main Content Title</h1>
    <p>Main content goes here...</p>
</main>
\`\`\`

**Purpose:** Main content of the page

**Rules:**
- Only ONE \`<main>\` per page
- Should not be inside \`<article>\`, \`<aside>\`, \`<header>\`, \`<footer>\`, or \`<nav>\`

---

### Article

\`\`\`html
<article>
    <header>
        <h2>Article Title</h2>
        <p>Published on <time datetime="2024-01-15">Jan 15, 2024</time></p>
    </header>
    <p>Article content...</p>
    <footer>
        <p>Author: John Doe</p>
    </footer>
</article>
\`\`\`

**Purpose:** Independent, self-contained content

**Use for:**
- Blog posts
- News articles
- Forum posts
- Comments

---

### Section

\`\`\`html
<section>
    <h2>Section Title</h2>
    <p>Section content...</p>
</section>
\`\`\`

**Purpose:** Thematic grouping of content

**Use for:**
- Chapters
- Grouped content
- Page sections

**Note:** Should have a heading

---

### Aside

\`\`\`html
<aside>
    <h3>Related Articles</h3>
    <ul>
        <li><a href="article1.html">Article 1</a></li>
        <li><a href="article2.html">Article 2</a></li>
    </ul>
</aside>
\`\`\`

**Purpose:** Sidebar content, related but not main

**Use for:**
- Sidebars
- Advertisements
- Related links
- Author info

---

### Footer

\`\`\`html
<footer>
    <p>&copy; 2024 My Website</p>
    <p>Contact: email@example.com</p>
    <nav>
        <a href="privacy.html">Privacy</a>
        <a href="terms.html">Terms</a>
    </nav>
</footer>
\`\`\`

**Purpose:** Footer of page or section

**Can contain:**
- Copyright
- Contact info
- Links
- Social media

---

## Complete Page Structure

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Website</title>
</head>
<body>
    <header>
        <h1>My Website</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article>
            <header>
                <h2>Article Title</h2>
                <p>Published: <time datetime="2024-01-15">Jan 15, 2024</time></p>
            </header>
            
            <section>
                <h3>Introduction</h3>
                <p>Content...</p>
            </section>
            
            <section>
                <h3>Main Content</h3>
                <p>Content...</p>
            </section>
            
            <footer>
                <p>Author: John Doe</p>
            </footer>
        </article>
        
        <aside>
            <h3>Related Articles</h3>
            <ul>
                <li><a href="article1.html">Article 1</a></li>
                <li><a href="article2.html">Article 2</a></li>
            </ul>
        </aside>
    </main>
    
    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
        <nav>
            <a href="privacy.html">Privacy Policy</a>
            <a href="terms.html">Terms of Service</a>
        </nav>
    </footer>
</body>
</html>
\`\`\`

---

## Other Semantic Elements

### Figure and Figcaption

\`\`\`html
<figure>
    <img src="diagram.jpg" alt="System architecture">
    <figcaption>Figure 1: System Architecture Diagram</figcaption>
</figure>
\`\`\`

**Purpose:** Self-contained content with caption

---

### Mark

\`\`\`html
<p>This is <mark>highlighted</mark> text.</p>
\`\`\`

**Purpose:** Highlighted text (like a marker)

---

### Time

\`\`\`html
<p>Published on <time datetime="2024-01-15">January 15, 2024</time></p>
<p>Meeting at <time datetime="2024-01-15T14:30">2:30 PM</time></p>
\`\`\`

**Purpose:** Machine-readable date/time

**Benefits:**
- Search engines understand dates
- Can be styled differently
- Better for accessibility

---

### Address

\`\`\`html
<address>
    Written by <a href="mailto:john@example.com">John Doe</a>.<br>
    Visit us at:<br>
    123 Main St<br>
    City, State 12345
</address>
\`\`\`

**Purpose:** Contact information

---

## Semantic vs Non-Semantic

### Non-Semantic (Old Way)

\`\`\`html
<div id="header">
    <div id="nav">
        <!-- navigation -->
    </div>
</div>
<div id="main">
    <div class="article">
        <!-- content -->
    </div>
</div>
<div id="footer">
    <!-- footer -->
</div>
\`\`\`

### Semantic (Modern Way)

\`\`\`html
<header>
    <nav>
        <!-- navigation -->
    </nav>
</header>
<main>
    <article>
        <!-- content -->
    </article>
</main>
<footer>
    <!-- footer -->
</footer>
\`\`\`

**Benefits:**
- More readable
- Better SEO
- Better accessibility
- Self-documenting code

---

## Real-Time Scenarios

### Scenario 1: Blog Post

\`\`\`html
<article>
    <header>
        <h1>10 Tips for Learning HTML</h1>
        <p>Published: <time datetime="2024-01-15">Jan 15, 2024</time></p>
    </header>
    
    <section>
        <h2>Introduction</h2>
        <p>Content...</p>
    </section>
    
    <section>
        <h2>Tips</h2>
        <ol>
            <li>Practice daily</li>
            <li>Build projects</li>
        </ol>
    </section>
    
    <footer>
        <address>
            Author: <a href="mailto:author@example.com">John Doe</a>
        </address>
    </footer>
</article>
\`\`\`

### Scenario 2: E-commerce Product Page

\`\`\`html
<main>
    <article>
        <header>
            <h1>Gaming Laptop</h1>
        </header>
        
        <figure>
            <img src="laptop.jpg" alt="Gaming Laptop">
            <figcaption>High-performance gaming laptop</figcaption>
        </figure>
        
        <section>
            <h2>Specifications</h2>
            <ul>
                <li>Processor: Intel i7</li>
                <li>RAM: 16GB</li>
            </ul>
        </section>
        
        <section>
            <h2>Reviews</h2>
            <!-- reviews -->
        </section>
    </article>
    
    <aside>
        <h3>Related Products</h3>
        <!-- related products -->
    </aside>
</main>
\`\`\`

---

## Best Practices

1. **Use semantic elements when possible**
   - \`<header>\` instead of \`<div id="header">\`
   - \`<nav>\` instead of \`<div class="nav">\`

2. **Don't overuse**
   - Not every \`<div>\` needs to be semantic
   - Use \`<div>\` for styling/layout when no semantic element fits

3. **One main per page**
   - Only one \`<main>\` element

4. **Nest properly**
   - \`<header>\` can be inside \`<article>\`
   - \`<footer>\` can be inside \`<section>\`

5. **Always include headings**
   - \`<section>\` should have a heading
   - Improves accessibility

---

## Summary

**Main Semantic Elements:**
- ✅ \`<header>\` - Page or section header
- ✅ \`<nav>\` - Navigation links
- ✅ \`<main>\` - Main content (one per page)
- ✅ \`<article>\` - Independent content
- ✅ \`<section>\` - Thematic grouping
- ✅ \`<aside>\` - Sidebar content
- ✅ \`<footer>\` - Page or section footer

**Other Semantic Elements:**
- ✅ \`<figure>\` - Self-contained content
- ✅ \`<figcaption>\` - Figure caption
- ✅ \`<mark>\` - Highlighted text
- ✅ \`<time>\` - Date/time
- ✅ \`<address>\` - Contact information

**Benefits:**
- ✅ Better SEO
- ✅ Better accessibility
- ✅ More maintainable code
- ✅ Self-documenting

Semantic HTML makes your code meaningful and accessible!
`,
  code: `// HTML5 Semantic Elements

/*
 * SEMANTIC ELEMENTS HAVE MEANING
 * ===============================
 * 
 * They clearly describe their purpose
 */

// ============================================
// 1. MAIN SEMANTIC ELEMENTS
// ============================================
/*
<header>  → Page or section header
<nav>     → Navigation links
<main>    → Main content (one per page)
<article> → Independent content (blog post, news)
<section> → Thematic grouping
<aside>   → Sidebar content
<footer>  → Page or section footer
*/

// ============================================
// 2. COMPLETE PAGE STRUCTURE
// ============================================
/*
<body>
    <header>
        <h1>Website Title</h1>
        <nav>...</nav>
    </header>
    
    <main>
        <article>
            <header>
                <h2>Article Title</h2>
            </header>
            <section>...</section>
            <footer>...</footer>
        </article>
        <aside>...</aside>
    </main>
    
    <footer>...</footer>
</body>
*/

// ============================================
// 3. OTHER SEMANTIC ELEMENTS
// ============================================
/*
<figure>
    <img src="image.jpg" alt="Description">
    <figcaption>Caption</figcaption>
</figure>

<mark>Highlighted text</mark>

<time datetime="2024-01-15">Jan 15, 2024</time>

<address>
    Contact information
</address>
*/

// ============================================
// 4. BENEFITS
// ============================================
/*
✅ Better SEO (search engines understand structure)
✅ Better accessibility (screen readers)
✅ More maintainable code
✅ Self-documenting
*/

// ============================================
// 5. BEST PRACTICES
// ============================================
/*
✅ Use semantic elements when possible
✅ One <main> per page
✅ Always include headings in <section>
✅ Nest properly
✅ Don't overuse (use <div> when needed)
*/
`
};

export default htmlSemanticElements;


