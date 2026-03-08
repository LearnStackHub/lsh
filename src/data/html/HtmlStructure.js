const htmlStructure = {
  id: 'html-structure',
  title: 'HTML Document Structure & Basic Tags',
  description: 'Understand the complete structure of an HTML document and essential tags',
  content: `
# HTML Document Structure & Basic Tags

HTML (HyperText Markup Language) documents follow a standardized structure that defines the document type, metadata, and content organization. Understanding HTML document structure is fundamental to web development, as it provides the foundation for all web pages. Every valid HTML document must include essential elements that browsers use to interpret and render content correctly.

Enterprise web applications rely on proper HTML structure for SEO optimization, accessibility compliance, cross-browser compatibility, and maintainability. The HTML document structure includes the DOCTYPE declaration, root element, head section for metadata, and body section for visible content. Mastering HTML structure is essential for building professional, standards-compliant web applications.

**HTML Document Components:**
- **DOCTYPE Declaration**: Defines HTML version and document type
- **HTML Root Element**: Container for entire document
- **Head Section**: Metadata, title, stylesheets, scripts
- **Body Section**: Visible content and structure

---

## Complete HTML Document Structure

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Page description">
    <title>Page Title</title>
</head>
<body>
    <!-- Visible content goes here -->
</body>
</html>
\`\`\`

---

## Breaking Down Each Part

### 1. DOCTYPE Declaration

\`\`\`html
<!DOCTYPE html>
\`\`\`

**Purpose:** Tells the browser this is an HTML5 document

**Why it matters:** Without it, browsers might render your page in "quirks mode" (old, buggy behavior)

**Note:** This is the ONLY tag that doesn't need a closing tag and uses uppercase.

---

### 2. HTML Root Element

\`\`\`html
<html lang="en">
\`\`\`

**Purpose:** Root element that wraps all HTML content

**Attributes:**
- \`lang="en"\` - Specifies the language (en = English, hi = Hindi, etc.)
- Helps screen readers and search engines

**Example:**
\`\`\`html
<html lang="hi">  <!-- Hindi -->
<html lang="fr">  <!-- French -->
<html lang="es">  <!-- Spanish -->
\`\`\`

---

### 3. HEAD Section

\`\`\`html
<head>
    <!-- Metadata goes here -->
</head>
\`\`\`

**Purpose:** Contains metadata (information about the page)

**Important:** Content in \`<head>\` is NOT visible to users (except \`<title>\`)

**Common elements in <head>:**

#### Meta Tags

\`\`\`html
<!-- Character encoding -->
<meta charset="UTF-8">

<!-- Viewport for responsive design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Page description (for SEO) -->
<meta name="description" content="Learn HTML from scratch">

<!-- Keywords (for SEO) -->
<meta name="keywords" content="HTML, web development, tutorial">

<!-- Author -->
<meta name="author" content="Your Name">
\`\`\`

#### Title Tag

\`\`\`html
<title>My Web Page</title>
\`\`\`

**Purpose:** Sets the page title (shown in browser tab)

**Best practices:**
- Keep it under 60 characters
- Make it descriptive
- Include keywords

#### Linking External Resources

\`\`\`html
<!-- CSS file -->
<link rel="stylesheet" href="style.css">

<!-- Favicon (browser tab icon) -->
<link rel="icon" href="favicon.ico">

<!-- External stylesheet -->
<link rel="stylesheet" href="https://cdn.example.com/style.css">
\`\`\`

---

### 4. BODY Section

\`\`\`html
<body>
    <!-- All visible content goes here -->
</body>
\`\`\`

**Purpose:** Contains all visible content that users see

**Everything visible** (text, images, links, etc.) goes inside \`<body>\`.

---

## Essential Basic Tags

### Headings: h1 to h6

\`\`\`html
<h1>Main Heading (Largest)</h1>
<h2>Subheading</h2>
<h3>Section Heading</h3>
<h4>Subsection</h4>
<h5>Minor Heading</h5>
<h6>Smallest Heading</h6>
\`\`\`

**Best practices:**
- Use only ONE \`<h1>\` per page (main title)
- Use headings in order (don't skip from h2 to h4)
- Use for structure, not just styling

**Example:**
\`\`\`html
<h1>Learn HTML</h1>
<h2>Introduction</h2>
<h3>What is HTML?</h3>
<h2>Basic Tags</h2>
<h3>Headings</h3>
<h3>Paragraphs</h3>
\`\`\`

---

### Paragraphs

\`\`\`html
<p>This is a paragraph. It contains multiple sentences and automatically wraps to new lines.</p>

<p>This is another paragraph. Paragraphs have spacing between them.</p>
\`\`\`

**Purpose:** For blocks of text

**Note:** Browsers automatically add spacing before and after paragraphs.

---

### Line Breaks

\`\`\`html
<p>First line<br>Second line<br>Third line</p>
\`\`\`

**Purpose:** Force a line break within text

**Note:** \`<br>\` is self-closing (no closing tag needed)

---

### Horizontal Rule

\`\`\`html
<p>Content above</p>
<hr>
<p>Content below</p>
\`\`\`

**Purpose:** Creates a horizontal line (visual separator)

---

### Strong and Emphasis

\`\`\`html
<p>This is <strong>important</strong> text.</p>
<p>This is <em>emphasized</em> text.</p>
\`\`\`

- \`<strong>\` - Makes text **bold** (semantic: important)
- \`<em>\` - Makes text *italic* (semantic: emphasis)

**Note:** \`<b>\` and \`<i>\` exist but are not semantic (use for styling only, not meaning).

---

### Container Tags: div and span

#### DIV (Block-level container)

\`\`\`html
<div>
    <h2>Section Title</h2>
    <p>Some content</p>
</div>
\`\`\`

**Purpose:** Generic container for grouping elements

**Characteristics:**
- Block-level (takes full width, starts on new line)
- Used for layout and structure

#### SPAN (Inline container)

\`\`\`html
<p>This is <span style="color: red;">red text</span> in a paragraph.</p>
\`\`\`

**Purpose:** Generic inline container for styling small parts of text

**Characteristics:**
- Inline (doesn't break line)
- Used for styling specific text

---

## Complete Example

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Learn HTML structure and basic tags">
    <title>HTML Structure Tutorial</title>
</head>
<body>
    <h1>Welcome to HTML</h1>
    
    <div>
        <h2>Introduction</h2>
        <p>This is a paragraph explaining HTML structure.</p>
        <p>This is another paragraph with <strong>important</strong> text 
           and <em>emphasized</em> content.</p>
    </div>
    
    <hr>
    
    <div>
        <h2>Basic Tags</h2>
        <p>HTML uses tags to structure content.</p>
        <p>Line breaks can be added<br>like this.</p>
    </div>
</body>
</html>
\`\`\`

---

## HTML Comments

\`\`\`html
<!-- This is a comment. It won't be displayed in the browser. -->

<!-- 
    Multi-line
    comment
-->

<p>Visible content</p> <!-- Comment after code -->
\`\`\`

**Purpose:** Add notes for developers (not visible to users)

**Best practices:**
- Explain complex code
- Mark sections
- Temporarily disable code

---

## Block vs Inline Elements

### Block-Level Elements
- Take full width
- Start on new line
- Examples: \`<div>\`, \`<p>\`, \`<h1>\` to \`<h6>\`, \`<ul>\`, \`<ol>\`

\`\`\`html
<div>Block 1</div>
<div>Block 2</div>
<!-- Result: Two separate lines -->
\`\`\`

### Inline Elements
- Take only needed width
- Stay on same line
- Examples: \`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`, \`<img>\`

\`\`\`html
<span>Inline 1</span>
<span>Inline 2</span>
<!-- Result: Both on same line -->
\`\`\`

---

## Real-Time Scenarios

### Scenario 1: Blog Post Structure

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>10 Tips for Learning HTML</title>
</head>
<body>
    <h1>10 Tips for Learning HTML</h1>
    
    <div>
        <h2>Introduction</h2>
        <p>Learning HTML is the first step in web development...</p>
    </div>
    
    <div>
        <h2>Tip 1: Practice Daily</h2>
        <p>Consistency is key...</p>
    </div>
    
    <div>
        <h2>Tip 2: Build Projects</h2>
        <p>Apply what you learn...</p>
    </div>
    
    <!-- More tips... -->
</body>
</html>
\`\`\`

### Scenario 2: Product Page Structure

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Laptop - Best Deals</title>
</head>
<body>
    <h1>Gaming Laptop</h1>
    
    <div>
        <h2>Product Details</h2>
        <p><strong>Price:</strong> $999</p>
        <p><em>Free shipping available</em></p>
    </div>
    
    <div>
        <h2>Specifications</h2>
        <p>Processor: Intel i7<br>
           RAM: 16GB<br>
           Storage: 512GB SSD</p>
    </div>
</body>
</html>
\`\`\`

---

## Best Practices

1. **Always include DOCTYPE** - \`<!DOCTYPE html>\`
2. **Set language** - \`<html lang="en">\`
3. **Use UTF-8 encoding** - \`<meta charset="UTF-8">\`
4. **Add viewport meta** - For responsive design
5. **One h1 per page** - Main title only
6. **Use semantic tags** - \`<header>\`, \`<nav>\`, \`<article>\` (we'll learn these later)
7. **Validate HTML** - Use W3C validator

---

## Summary

**HTML Document Structure:**
- ✅ \`<!DOCTYPE html>\` - Document type declaration
- ✅ \`<html>\` - Root element
- ✅ \`<head>\` - Metadata (title, meta tags, links)
- ✅ \`<body>\` - Visible content

**Basic Tags:**
- ✅ \`<h1>\` to \`<h6>\` - Headings
- ✅ \`<p>\` - Paragraphs
- ✅ \`<br>\` - Line break
- ✅ \`<hr>\` - Horizontal rule
- ✅ \`<strong>\` - Important text
- ✅ \`<em>\` - Emphasized text
- ✅ \`<div>\` - Block container
- ✅ \`<span>\` - Inline container

Understanding structure is the foundation of HTML!
`,
  code: `// HTML Document Structure & Basic Tags

/*
 * COMPLETE HTML DOCUMENT STRUCTURE
 * =================================
 */

// ============================================
// 1. DOCTYPE DECLARATION
// ============================================
/*
<!DOCTYPE html>
  → Tells browser this is HTML5
  → Must be first line
  → No closing tag needed
*/

// ============================================
// 2. HTML ROOT ELEMENT
// ============================================
/*
<html lang="en">
  → Wraps all HTML content
  → lang attribute for language (en, hi, fr, etc.)
</html>
*/

// ============================================
// 3. HEAD SECTION (Metadata)
// ============================================
/*
<head>
  → Contains metadata (not visible)
  → Includes: title, meta tags, links
</head>

Common elements:
  <meta charset="UTF-8">           → Character encoding
  <meta name="viewport" ...>       → Responsive design
  <title>Page Title</title>        → Browser tab title
  <link rel="stylesheet" ...>     → CSS file
</head>
*/

// ============================================
// 4. BODY SECTION (Visible Content)
// ============================================
/*
<body>
  → All visible content goes here
  → Headings, paragraphs, images, links, etc.
</body>
*/

// ============================================
// 5. BASIC TAGS
// ============================================
/*
HEADINGS:
  <h1>Main Title</h1>      → Largest, use once per page
  <h2>Subheading</h2>
  <h3>Section</h3>
  <h4>Subsection</h4>
  <h5>Minor</h5>
  <h6>Smallest</h6>

PARAGRAPHS:
  <p>Text content</p>       → Block of text

LINE BREAKS:
  <br>                      → Force new line (self-closing)

HORIZONTAL RULE:
  <hr>                      → Visual separator (self-closing)

TEXT FORMATTING:
  <strong>Bold</strong>     → Important text (semantic)
  <em>Italic</em>          → Emphasized text (semantic)

CONTAINERS:
  <div>Content</div>        → Block-level container
  <span>Text</span>         → Inline container
*/

// ============================================
// 6. COMPLETE EXAMPLE
// ============================================
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is a paragraph with <strong>important</strong> text.</p>
    <hr>
    <div>
        <h2>Section</h2>
        <p>More content here.</p>
    </div>
</body>
</html>
*/

// ============================================
// 7. BLOCK vs INLINE ELEMENTS
// ============================================
/*
BLOCK-LEVEL (full width, new line):
  <div>, <p>, <h1>-<h6>, <ul>, <ol>

INLINE (only needed width, same line):
  <span>, <a>, <strong>, <em>, <img>
*/

// ============================================
// 8. HTML COMMENTS
// ============================================
/*
<!-- This is a comment -->
<!-- 
    Multi-line
    comment
-->
<p>Visible</p> <!-- Comment after code -->
*/

// ============================================
// 9. BEST PRACTICES
// ============================================
/*
✅ Always include DOCTYPE
✅ Set lang attribute
✅ Use UTF-8 encoding
✅ Add viewport meta tag
✅ One <h1> per page
✅ Use semantic tags when possible
✅ Validate HTML
*/
`
};

export default htmlStructure;


