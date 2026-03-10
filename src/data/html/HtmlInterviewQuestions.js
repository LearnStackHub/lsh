const htmlInterviewQuestions = {
  id: 'html-interview-questions',
  title: 'Top 30 HTML Interview Questions',
  description: 'Most frequently asked HTML interview questions for web developers with detailed answers, real-world scenarios, and practical examples',
  content: `
# Top 30 HTML Interview Questions - Complete Guide

Master the most commonly asked HTML interview questions for web developers. These questions cover fundamentals to advanced concepts with practical examples.

---

## Basic Level Questions (Freshers to 1 Year)

---

### Question 1: What is HTML? Explain its purpose.

**Answer:**
HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using markup tags.

**Purpose:**
- Defines the structure and content of web pages
- Creates headings, paragraphs, links, images, forms, etc.
- Works with CSS (styling) and JavaScript (behavior) to create complete websites

**Real-Time Example:**
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is a paragraph.</p>
</body>
</html>
\`\`\`

---

### Question 2: What is the difference between HTML and XHTML?

**Answer:**

| Feature | HTML | XHTML |
|---------|------|-------|
| Case Sensitivity | Case-insensitive | Case-sensitive (lowercase) |
| Closing Tags | Optional for some tags | Required for all tags |
| Attribute Quotes | Optional | Required |
| DOCTYPE | Simple | Strict |

**Example:**
\`\`\`html
<!-- HTML -->
<BR>
<input type=text>

<!-- XHTML -->
<br />
<input type="text" />
\`\`\`

---

### Question 3: What are HTML5 semantic elements? Give examples.

**Answer:**
Semantic elements clearly describe their meaning to both browser and developer.

**Common Semantic Elements:**
- \`<header>\` - Header section
- \`<nav>\` - Navigation links
- \`<main>\` - Main content
- \`<article>\` - Independent content
- \`<section>\` - Section of content
- \`<aside>\` - Sidebar content
- \`<footer>\` - Footer section

**Example:**
\`\`\`html
<header>
    <h1>Website Title</h1>
    <nav>
        <a href="/home">Home</a>
        <a href="/about">About</a>
    </nav>
</header>
<main>
    <article>
        <h2>Article Title</h2>
        <p>Article content...</p>
    </article>
</main>
<footer>
    <p>&copy; 2024 Company</p>
</footer>
\`\`\`

---

### Question 4: What is the difference between \`<div>\` and \`<span>\`?

**Answer:**

| Feature | \`<div>\` | \`<span>\` |
|---------|-----------|------------|
| Display | Block-level | Inline |
| Usage | Container for sections | Container for inline text |
| Width | Full width by default | Only as wide as content |

**Example:**
\`\`\`html
<div style="background: lightblue;">
    <p>This is a block-level div</p>
    <p>It takes full width</p>
</div>

<p>This is <span style="color: red;">inline span</span> text.</p>
\`\`\`

---

### Question 5: Explain HTML5 form elements and attributes.

**Answer:**
HTML5 introduced new input types and attributes for better form handling.

**New Input Types:**
- \`email\` - Email validation
- \`date\` - Date picker
- \`number\` - Numeric input
- \`range\` - Slider
- \`color\` - Color picker
- \`url\` - URL validation
- \`tel\` - Telephone number
- \`search\` - Search field

**New Attributes:**
- \`required\` - Mandatory field
- \`placeholder\` - Hint text
- \`autocomplete\` - Auto-completion
- \`pattern\` - Regex validation
- \`min\` / \`max\` - Range limits

**Example:**
\`\`\`html
<form>
    <input type="email" placeholder="Enter email" required>
    <input type="date" min="2024-01-01">
    <input type="number" min="1" max="100">
    <input type="submit" value="Submit">
</form>
\`\`\`

---

## Intermediate Level Questions (1-3 Years)

---

### Question 6: What is the difference between \`<script>\`, \`<script async>\`, and \`<script defer>\`?

**Answer:**

| Type | Execution | Blocking |
|------|-----------|----------|
| \`<script>\` | Immediate, blocks parsing | Yes |
| \`<script async>\` | Downloads async, executes immediately | No (but blocks execution) |
| \`<script defer>\` | Downloads async, executes after parsing | No |

**Example:**
\`\`\`html
<!-- Blocks HTML parsing -->
<script src="script.js"></script>

<!-- Downloads in parallel, executes when ready -->
<script src="script.js" async></script>

<!-- Downloads in parallel, executes after HTML parsing -->
<script src="script.js" defer></script>
\`\`\`

---

### Question 7: Explain HTML5 Web Storage (localStorage vs sessionStorage).

**Answer:**

| Feature | localStorage | sessionStorage |
|---------|--------------|----------------|
| Scope | Persistent across sessions | Only for current session |
| Size Limit | ~5-10MB | ~5-10MB |
| Data Type | String only | String only |
| Expiration | Never (until cleared) | Tab/window close |

**Example:**
\`\`\`javascript
// localStorage
localStorage.setItem('username', 'John');
let user = localStorage.getItem('username');
localStorage.removeItem('username');

// sessionStorage
sessionStorage.setItem('theme', 'dark');
let theme = sessionStorage.getItem('theme');
\`\`\`

---

### Question 8: What are HTML5 APIs? Give examples.

**Answer:**
HTML5 introduced several JavaScript APIs for enhanced functionality.

**Common APIs:**
- **Geolocation API** - Get user location
- **Canvas API** - Draw graphics
- **Web Storage API** - Store data locally
- **Web Workers** - Background processing
- **Drag & Drop API** - Drag and drop elements
- **History API** - Manipulate browser history

**Example:**
\`\`\`javascript
// Geolocation
navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude);
});

// Canvas
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillRect(10, 10, 100, 100);
\`\`\`

---

### Question 9: What is the difference between \`<iframe>\`, \`<embed>\`, and \`<object>\`?

**Answer:**

| Element | Purpose | Use Case |
|---------|---------|----------|
| \`<iframe>\` | Embed another HTML page | Videos, maps, widgets |
| \`<embed>\` | Embed external content | Plugins, media |
| \`<object>\` | Embed external resources | PDFs, Flash, applets |

**Example:**
\`\`\`html
<!-- iframe -->
<iframe src="https://example.com" width="600" height="400"></iframe>

<!-- embed -->
<embed src="video.swf" type="application/x-shockwave-flash">

<!-- object -->
<object data="document.pdf" type="application/pdf">
    <p>PDF not supported</p>
</object>
\`\`\`

---

### Question 10: Explain HTML5 media elements (\`<video>\` and \`<audio>\`).

**Answer:**
HTML5 provides native support for audio and video without plugins.

**Video Element:**
\`\`\`html
<video width="640" height="360" controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    Your browser does not support video.
</video>
\`\`\`

**Audio Element:**
\`\`\`html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    Your browser does not support audio.
</audio>
\`\`\`

**Common Attributes:**
- \`controls\` - Show play/pause controls
- \`autoplay\` - Auto-play (use carefully)
- \`loop\` - Loop playback
- \`muted\` - Mute by default
- \`preload\` - Preload strategy

---

## Advanced Level Questions (3+ Years)

---

### Question 11: What is the HTML5 Canvas API? How do you use it?

**Answer:**
Canvas provides a drawing surface for graphics, animations, and games.

**Basic Usage:**
\`\`\`html
<canvas id="myCanvas" width="500" height="300"></canvas>
<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw rectangle
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 100);

// Draw circle
ctx.beginPath();
ctx.arc(200, 100, 50, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();
</script>
\`\`\`

---

### Question 12: Explain HTML5 Web Workers.

**Answer:**
Web Workers allow JavaScript to run in background threads without blocking the UI.

**Main Thread:**
\`\`\`javascript
const worker = new Worker('worker.js');
worker.postMessage('Start processing');
worker.onmessage = (e) => {
    console.log('Result:', e.data);
};
\`\`\`

**Worker Thread (worker.js):**
\`\`\`javascript
self.onmessage = (e) => {
    // Heavy computation
    const result = performHeavyTask(e.data);
    self.postMessage(result);
};
\`\`\`

---

### Question 13: What is the difference between \`<meta>\` tags and their importance for SEO?

**Answer:**
Meta tags provide metadata about the HTML document.

**Important Meta Tags:**
\`\`\`html
<!-- Character encoding -->
<meta charset="UTF-8">

<!-- Viewport for responsive design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- SEO -->
<meta name="description" content="Page description">
<meta name="keywords" content="keyword1, keyword2">
<meta name="author" content="Author Name">

<!-- Open Graph (Social Media) -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page Description">
<meta property="og:image" content="image.jpg">
\`\`\`

---

### Question 14: Explain HTML5 Drag and Drop API.

**Answer:**
HTML5 provides native drag and drop functionality.

**Example:**
\`\`\`html
<div id="drag" draggable="true" ondragstart="drag(event)">
    Drag me
</div>
<div id="drop" ondrop="drop(event)" ondragover="allowDrop(event)">
    Drop here
</div>

<script>
function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
}
</script>
\`\`\`

---

### Question 15: What are HTML5 data attributes? How are they used?

**Answer:**
Data attributes allow custom data to be stored on HTML elements.

**Syntax:**
\`\`\`html
<div data-user-id="123" data-role="admin" data-status="active">
    User Info
</div>
\`\`\`

**JavaScript Access:**
\`\`\`javascript
const element = document.querySelector('div');
const userId = element.dataset.userId; // "123"
const role = element.dataset.role; // "admin"
\`\`\`

---

## Tricky Questions

---

### Question 16: What happens when you don't include \`<!DOCTYPE html>\`?

**Answer:**
Without DOCTYPE, browsers enter "quirks mode" - older rendering behavior that may cause layout issues.

**Always include:**
\`\`\`html
<!DOCTYPE html>
<html>
...
\`\`\`

---

### Question 17: Explain the difference between \`<strong>\` and \`<b>\`, \`<em>\` and \`<i>\`.

**Answer:**

| Tag | Type | Meaning |
|-----|------|---------|
| \`<strong>\` | Semantic | Important text (screen readers) |
| \`<b>\` | Presentational | Bold text (visual only) |
| \`<em>\` | Semantic | Emphasized text (screen readers) |
| \`<i>\` | Presentational | Italic text (visual only) |

**Best Practice:** Use \`<strong>\` and \`<em>\` for accessibility.

---

### Question 18: What is the purpose of \`<base>\` tag?

**Answer:**
The \`<base>\` tag specifies the base URL for all relative URLs in the document.

**Example:**
\`\`\`html
<head>
    <base href="https://example.com/images/">
</head>
<body>
    <img src="photo.jpg"> <!-- Loads from https://example.com/images/photo.jpg -->
</body>
\`\`\`

---

### Question 19: Explain HTML5 Microdata.

**Answer:**
Microdata provides a way to embed machine-readable data in HTML.

**Example:**
\`\`\`html
<div itemscope itemtype="http://schema.org/Person">
    <span itemprop="name">John Doe</span>
    <span itemprop="jobTitle">Developer</span>
    <a href="mailto:john@example.com" itemprop="email">john@example.com</a>
</div>
\`\`\`

---

### Question 20: What is the difference between \`<link>\` and \`<a>\` tags?

**Answer:**

| Tag | Purpose | Location |
|-----|---------|----------|
| \`<link>\` | Links external resources | \`<head>\` section |
| \`<a>\` | Creates hyperlinks | \`<body>\` section |

**Example:**
\`\`\`html
<head>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="favicon.ico">
</head>
<body>
    <a href="https://example.com">Visit Example</a>
</body>
\`\`\`

---

## Real-World Scenario Questions

---

### Question 21: How do you implement a responsive navigation menu in HTML5?

**Answer:**
Use semantic HTML5 with CSS media queries.

\`\`\`html
<nav>
    <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
\`\`\`

---

### Question 22: How do you create an accessible HTML form?

**Answer:**
Use proper labels, ARIA attributes, and semantic HTML.

\`\`\`html
<form>
    <label for="email">Email Address:</label>
    <input type="email" id="email" name="email" required 
           aria-describedby="email-help">
    <small id="email-help">Enter your email address</small>
    
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    
    <button type="submit">Submit</button>
</form>
\`\`\`

---

### Question 23: Explain HTML5 offline web applications.

**Answer:**
Use Application Cache (deprecated) or Service Workers (modern approach).

**Service Worker (Modern):**
\`\`\`javascript
// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
\`\`\`

---

### Question 24: How do you optimize HTML for performance?

**Answer:**
- Minify HTML
- Use semantic HTML
- Optimize images (use \`<picture>\` and \`srcset\`)
- Defer/async scripts
- Use CDN for resources
- Enable compression (gzip)

---

### Question 25: What is the difference between \`<article>\` and \`<section>\`?

**Answer:**

| Element | Purpose | Use Case |
|---------|---------|----------|
| \`<article>\` | Independent, reusable content | Blog post, news article |
| \`<section>\` | Thematic grouping | Chapter, tab panel |

**Example:**
\`\`\`html
<article>
    <h2>Blog Post Title</h2>
    <p>Content...</p>
</article>

<section>
    <h2>Comments Section</h2>
    <p>Comments...</p>
</section>
\`\`\`

---

## Debugging Questions

---

### Question 26: Why might an HTML form not submit?

**Answer:**
Common issues:
- Missing \`action\` attribute
- Missing \`method\` attribute
- JavaScript preventing default
- Required fields not filled
- Form validation errors

---

### Question 27: How do you debug HTML rendering issues?

**Answer:**
- Use browser DevTools
- Validate HTML (W3C Validator)
- Check console for errors
- Inspect element styles
- Test in multiple browsers

---

### Question 28: What causes layout shifts in HTML?

**Answer:**
- Images without dimensions
- Fonts loading late
- Dynamic content insertion
- Ads loading
- Third-party scripts

**Solution:** Set width/height on images, use \`font-display: swap\`.

---

### Question 29: Explain HTML5 form validation.

**Answer:**
HTML5 provides built-in validation.

\`\`\`html
<form>
    <input type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$">
    <input type="number" min="1" max="100" required>
    <input type="submit" value="Submit">
</form>
\`\`\`

---

### Question 30: What are the best practices for HTML5?

**Answer:**
- Always use DOCTYPE
- Use semantic HTML5 elements
- Validate HTML
- Ensure accessibility (ARIA, alt text)
- Optimize for performance
- Use proper indentation
- Close all tags
- Use lowercase for tags/attributes
- Separate structure (HTML), presentation (CSS), behavior (JS)

---

## Summary

These 30 HTML interview questions cover:
- HTML fundamentals and structure
- HTML5 features and APIs
- Semantic HTML
- Forms and validation
- Media elements
- Performance optimization
- Accessibility
- Best practices

Master these questions to excel in HTML interviews!
  `
};

export default htmlInterviewQuestions;

