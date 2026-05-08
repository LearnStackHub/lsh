const cssIntroduction = {
  id: 'css-introduction',
  title: 'CSS Introduction - What is CSS?',
  description: 'Learn what CSS is, why it exists, and how it styles HTML to create beautiful web pages',
  content: `
# CSS Introduction — Styling the Web

CSS (Cascading Style Sheets) is the language that makes web pages beautiful. While HTML provides structure, CSS provides the visual design - colors, layouts, fonts, and animations.

---

## What is CSS?

**CSS** stands for **Cascading Style Sheets**:
- **Cascading** - Styles cascade down and can be overridden
- **Style** - Visual appearance (colors, fonts, spacing)
- **Sheets** - Separate files or embedded styles

CSS separates presentation from structure, enabling developers to style [HTML](/tutorial/html-introduction) content independently. While HTML defines the document structure, CSS controls visual presentation including layout, typography, colors, and responsive behavior.

---

## Why CSS Was Created

Before CSS, styling was embedded directly within HTML elements using inline styles:
\`\`\`html
<!-- Old way (bad) -->
<p style="color: blue; font-size: 20px;">Text</p>
\`\`\`

**Problems:**
- Repetitive code
- Hard to maintain
- Inconsistent styling
- Large HTML files

**CSS Solution:**
- Separate styling from structure
- Reusable styles
- Easy to maintain
- Consistent design

---

## How CSS Works

CSS works by selecting HTML elements and applying styles:

\`\`\`css
/* Select the element */
p {
  /* Apply styles */
  color: blue;
  font-size: 20px;
}
\`\`\`

**Result:** All \`<p>\` tags become blue and 20px.

---

## CSS Syntax

\`\`\`css
selector {
  property: value;
  property: value;
}
\`\`\`

**Example:**
\`\`\`css
h1 {
  color: red;
  font-size: 32px;
  text-align: center;
}
\`\`\`

**Components:**
- **Selector** - Which element to style (\`h1\`)
- **Property** - What to change (\`color\`)
- **Value** - How to change it (\`red\`)

---

## Ways to Add CSS

### 1. Inline CSS (Not Recommended)

\`\`\`html
<p style="color: blue;">Text</p>
\`\`\`

**Use when:** Quick testing only

---

### 2. Internal CSS (In HTML)

\`\`\`html
<head>
  <style>
    p {
      color: blue;
    }
  </style>
</head>
\`\`\`

**Use when:** Single page styling

---

### 3. External CSS (Recommended)

\`\`\`html
<head>
  <link rel="stylesheet" href="style.css">
</head>
\`\`\`

**File: style.css**
\`\`\`css
p {
  color: blue;
}
\`\`\`

**Use when:** Multiple pages (best practice)

---

## Real-World Applications of CSS

CSS is fundamental to modern web design, enabling professional user interfaces across all web applications. Understanding these use cases demonstrates CSS's critical role in web development.

### Application Example 1: E-Commerce Platform Design

E-commerce websites rely extensively on CSS for user interface design:

- **Product Card Layouts:** CSS Grid and Flexbox create responsive product card layouts with consistent spacing, shadows, and hover effects
- **Interactive Buttons:** CSS styles "Add to Cart" and checkout buttons with colors, transitions, and hover states for improved user experience
- **Navigation Systems:** CSS creates horizontal and vertical navigation menus with dropdown functionality and active state indicators
- **Responsive Design:** CSS media queries enable responsive layouts that adapt to mobile, tablet, and desktop screen sizes

**CSS Impact:** Without CSS, e-commerce sites would display as unstyled HTML with plain text and images, resulting in poor user experience and low conversion rates. CSS transforms basic HTML structure into professional, engaging shopping interfaces.

---

### Application Example 2: Social Media Platform Interfaces

Social media platforms use CSS extensively for content presentation and user interaction:

- **Post Layout:** CSS arranges images, text, and buttons
- **Profile Pictures:** CSS creates circular images with borders
- **Like Buttons:** CSS adds colors, hover effects, animations
- **Feed Design:** CSS creates the scrolling feed layout

---

### Application Example 3: News and Media Website Design

News websites use CSS for content layout and typography:

- **Typography:** CSS controls font sizes, line spacing, readability
- **Article Layout:** CSS creates columns, spacing, and hierarchy
- **Images:** CSS sizes and positions images
- **Navigation:** CSS creates the menu and breadcrumbs

---

## CSS Versions

- **CSS1** (1996) - Basic styling
- **CSS2** (1998) - Positioning, media types
- **CSS3** (1999-ongoing) - Modern features (flexbox, grid, animations)
- **CSS4** (In development) - Advanced features

**We use CSS3** - the current standard with modern features!

---

## Key Features of CSS3

1. **Flexbox** - Modern layout system
2. **Grid** - Two-dimensional layouts
3. **Animations** - Smooth transitions and animations
4. **Media Queries** - Responsive design
5. **Custom Properties** - CSS variables
6. **Transform** - Rotate, scale, translate elements

---

## CSS vs Other Technologies

### CSS vs HTML
- **HTML**: Structure and content (what's on the page)
- **CSS**: Styling and appearance (how it looks)

### CSS vs JavaScript
- **CSS**: Static styling (colors, layouts)
- **JavaScript**: Dynamic behavior (interactions, animations)

**They work together!** HTML provides structure, CSS makes it beautiful, JavaScript makes it interactive.

---

## Your First CSS

### Step 1: Create HTML

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My First CSS</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a paragraph.</p>
</body>
</html>
\`\`\`

### Step 2: Add CSS

\`\`\`html
<head>
  <style>
    h1 {
      color: blue;
      text-align: center;
    }
    p {
      color: gray;
      font-size: 18px;
    }
  </style>
</head>
\`\`\`

**Result:** Blue centered heading and gray paragraph!

---

## Common CSS Properties

| Property | Purpose | Example |
|----------|---------|---------|
| \`color\` | Text color | \`color: red;\` |
| \`background-color\` | Background color | \`background-color: blue;\` |
| \`font-size\` | Text size | \`font-size: 20px;\` |
| \`margin\` | Outer spacing | \`margin: 10px;\` |
| \`padding\` | Inner spacing | \`padding: 10px;\` |
| \`width\` | Element width | \`width: 100px;\` |
| \`height\` | Element height | \`height: 100px;\` |

---

## CSS Best Practices

When writing CSS, follow these guidelines to keep your code clean and maintainable:

1. Use external CSS files instead of inline styles. This separates your styling from your HTML structure, making both easier to maintain and update.

2. Use meaningful class names that describe what the element is, not how it looks. For example, use \`.button\` instead of \`.blue-box\`. This makes your code more readable and easier to understand later.

3. Organize your CSS by grouping related styles together. You might group all navigation styles, all button styles, and all form styles in separate sections.

4. Add comments to explain complex styles or sections. Use \`/* Comment */\` to document your code.

5. Avoid inline styles whenever possible. Instead, create classes and apply them to elements. This makes your styles reusable and easier to maintain.

6. Use CSS variables (custom properties) for colors, sizes, and other values that you use repeatedly. This makes it easy to change your design theme later.

---

## Summary

CSS stands for Cascading Style Sheets. Its main purpose is to style and design web pages, making them visually appealing and professional. The basic syntax is \`selector { property: value; }\`, where you select an element and apply styles to it. There are three ways to add CSS: inline (not recommended), internal (in the HTML file), and external (separate CSS file, which is the best practice). CSS3 is the current standard with modern features like Flexbox, Grid, and animations. CSS works together with HTML for structure and JavaScript for behavior.

CSS transforms plain HTML into beautiful, professional websites. As you learn more about CSS, you'll discover how powerful it is for creating modern, responsive designs.

---

## Industry Applications and Enterprise Use Cases

### Modern Web Development Standards

CSS serves as the foundation for enterprise web applications across industries:

**E-Commerce Platforms:**
- Amazon, Flipkart, and eBay utilize CSS Grid and Flexbox for responsive product layouts
- CSS animations enhance user experience during interactions
- Custom properties (CSS variables) enable dynamic theming for seasonal campaigns
- Media queries ensure consistent experience across devices

**Financial Services:**
- Banking applications use CSS for secure, accessible form styling
- CSS ensures compliance with WCAG 2.1 accessibility standards
- Responsive design accommodates mobile banking requirements
- CSS-in-JS solutions (styled-components) enable component-based styling

**Content Management Systems:**
- WordPress themes rely on CSS for customization
- Drupal and Joomla use CSS for responsive layouts
- Headless CMS platforms utilize CSS frameworks (Bootstrap, Tailwind) for rapid development

**Progressive Web Applications (PWAs):**
- CSS enables offline-first design patterns
- Service workers combined with CSS provide seamless user experience
- CSS animations create native app-like interactions
- Responsive design ensures cross-platform compatibility

---

## CSS Architecture and Organization

### Methodologies for Large-Scale Applications

**BEM (Block Element Modifier):**
\`\`\`css
/* Block */
.card { }

/* Element */
.card__title { }
.card__body { }

/* Modifier */
.card--featured { }
.card--dark { }
\`\`\`

**Benefits:**
- Clear naming conventions
- Prevents style conflicts
- Improves maintainability
- Scalable for large teams

**CSS Modules:**
\`\`\`css
/* styles.module.css */
.button {
    background-color: blue;
    padding: 10px;
}
\`\`\`

**CSS-in-JS (Styled Components):**
\`\`\`javascript
const Button = styled.button\`
    background-color: \${props => props.primary ? 'blue' : 'gray'};
    padding: 10px;
\`;
\`\`\`

---

## Performance Optimization Best Practices

### Critical Rendering Path Optimization

**Minimize CSS File Size:**
- Remove unused CSS (PurgeCSS, UnCSS)
- Minify CSS for production
- Use CSS compression (gzip, brotli)
- Split CSS into critical and non-critical

**Reduce Render-Blocking CSS:**
\`\`\`html
<!-- Critical CSS inline -->
<style>
    /* Above-the-fold styles */
</style>

<!-- Non-critical CSS loaded asynchronously -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
\`\`\`

**Optimize Selectors:**
\`\`\`css
/* Bad: Complex selector */
div.container > ul.list > li.item > a.link { }

/* Good: Simple, specific selector */
.nav-link { }
\`\`\`

**Use CSS Containment:**
\`\`\`css
.card {
    contain: layout style paint;
}
\`\`\`

**Impact:**
- Faster page load times
- Improved Core Web Vitals
- Better mobile performance
- Reduced bandwidth usage

---

## Advanced CSS Features

### CSS Custom Properties (Variables)

\`\`\`css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --font-size-base: 16px;
    --spacing-unit: 8px;
}

.button {
    background-color: var(--primary-color);
    font-size: var(--font-size-base);
    padding: calc(var(--spacing-unit) * 2);
}

/* Dynamic theming */
[data-theme="dark"] {
    --primary-color: #0d6efd;
    --background-color: #212529;
}
\`\`\`

**Benefits:**
- Centralized theme management
- Runtime theme switching
- Better maintainability
- Reduced code duplication

### CSS Grid for Complex Layouts

\`\`\`css
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    grid-auto-rows: minmax(100px, auto);
}

.item {
    grid-column: span 2;
    grid-row: span 1;
}
\`\`\`

**Use Cases:**
- Dashboard layouts
- Magazine-style layouts
- Complex form layouts
- Responsive card grids

### Flexbox for Component Layouts

\`\`\`css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.nav-item {
    flex: 1 1 auto;
    min-width: 100px;
}
\`\`\`

**Use Cases:**
- Navigation bars
- Card components
- Form layouts
- Centering content

---

## Responsive Design and Mobile-First Approach

### Media Queries Best Practices

\`\`\`css
/* Mobile-first approach */
.container {
    width: 100%;
    padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        max-width: 750px;
        margin: 0 auto;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        padding: 20px;
    }
}
\`\`\`

**Breakpoint Strategy:**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Large Desktop: 1440px+

### Container Queries (Modern Approach)

\`\`\`css
.card {
    container-type: inline-size;
}

@container (min-width: 400px) {
    .card-title {
        font-size: 24px;
    }
}
\`\`\`

---

## Accessibility (A11y) Considerations

### WCAG 2.1 Compliance

**Color Contrast:**
\`\`\`css
/* Minimum contrast ratio: 4.5:1 for normal text */
.text {
    color: #333333; /* Dark text */
    background-color: #ffffff; /* White background */
    /* Contrast ratio: 12.6:1 ✅ */
}

/* Minimum contrast ratio: 3:1 for large text */
.heading {
    color: #666666;
    font-size: 24px;
}
\`\`\`

**Focus Indicators:**
\`\`\`css
.button:focus {
    outline: 3px solid #007bff;
    outline-offset: 2px;
}

/* Remove default outline only if providing custom */
.button:focus:not(:focus-visible) {
    outline: none;
}
\`\`\`

**Screen Reader Support:**
\`\`\`css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
\`\`\`

---

## Security Best Practices

### Preventing CSS Injection Attacks

**Sanitize User-Generated CSS:**
- Never allow direct CSS injection from user input
- Use Content Security Policy (CSP)
- Validate and sanitize CSS in user-generated content

**Content Security Policy:**
\`\`\`html
<meta http-equiv="Content-Security-Policy" 
      content="style-src 'self' 'unsafe-inline';">
\`\`\`

**Avoid Expression() in Legacy Browsers:**
\`\`\`css
/* Dangerous - allows JavaScript execution */
width: expression(document.body.clientWidth > 600 ? "600px" : "auto");
\`\`\`

---

## Common Pitfalls and How to Avoid Them

### 1. Specificity Wars

**Problem:**
\`\`\`css
/* Too specific */
div.container ul.list li.item a.link { }
\`\`\`

**Solution:**
\`\`\`css
/* Use classes with appropriate specificity */
.nav-link { }
\`\`\`

### 2. !important Overuse

**Problem:**
\`\`\`css
.button { color: blue !important; }
.button-primary { color: red !important; }
\`\`\`

**Solution:**
\`\`\`css
/* Use proper specificity instead */
.button { color: blue; }
.button.button-primary { color: red; }
\`\`\`

### 3. Inline Styles in Production

**Problem:**
\`\`\`html
<div style="color: red; font-size: 20px;">Content</div>
\`\`\`

**Solution:**
\`\`\`html
<div class="highlight-text">Content</div>
\`\`\`
\`\`\`css
.highlight-text {
    color: red;
    font-size: 20px;
}
\`\`\`

### 4. Not Using CSS Variables

**Problem:**
\`\`\`css
.button-primary { background-color: #007bff; }
.button-secondary { background-color: #6c757d; }
.header { background-color: #007bff; }
\`\`\`

**Solution:**
\`\`\`css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
}

.button-primary { background-color: var(--primary-color); }
.header { background-color: var(--primary-color); }
\`\`\`

---

## CSS Frameworks and Preprocessors

### Popular CSS Frameworks

**Bootstrap:**
- Most widely used CSS framework
- Component-based design system
- Responsive grid system
- Extensive component library

**Tailwind CSS:**
- Utility-first CSS framework
- Highly customizable
- Small production bundle size
- Modern development workflow

**Material-UI / MUI:**
- React component library
- Material Design principles
- Comprehensive component set
- Theme customization

### CSS Preprocessors

**SASS/SCSS:**
\`\`\`scss
$primary-color: #007bff;

.button {
    background-color: $primary-color;
    
    &:hover {
        background-color: darken($primary-color, 10%);
    }
}
\`\`\`

**Less:**
\`\`\`less
@primary-color: #007bff;

.button {
    background-color: @primary-color;
}
\`\`\`

**Benefits:**
- Variables and mixins
- Nested selectors
- Functions and operations
- Better code organization

---

## Testing and Validation

### CSS Linting

**Tools:**
- Stylelint: CSS linter with configurable rules
- CSSLint: Online CSS validator
- PostCSS: CSS transformation tool

**Example Stylelint Config:**
\`\`\`json
{
  "rules": {
    "color-no-invalid-hex": true,
    "declaration-block-no-duplicate-properties": true,
    "selector-max-specificity": "0,3,0"
  }
}
\`\`\`

### Browser Testing

**Test in Multiple Browsers:**
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers

**Use Browser DevTools:**
- Inspect computed styles
- Debug layout issues
- Test responsive breakpoints
- Profile performance

---

## Frequently Asked Questions (FAQs)

### Q1: What is the difference between CSS, SCSS, and SASS?

**A:** CSS is the standard styling language. SASS (Syntactically Awesome Style Sheets) is a CSS preprocessor that extends CSS with variables, nesting, mixins, and functions. SCSS (Sassy CSS) is the newer syntax of SASS that uses curly braces and semicolons, making it more similar to CSS. SASS uses indentation-based syntax. Both compile to standard CSS that browsers understand. Preprocessors improve maintainability and reduce code duplication in large projects.

### Q2: Should I use CSS frameworks like Bootstrap or write custom CSS?

**A:** The choice depends on project requirements. CSS frameworks (Bootstrap, Tailwind) accelerate development, provide consistent design systems, and handle cross-browser compatibility. They're ideal for rapid prototyping, admin dashboards, and projects with tight deadlines. Custom CSS offers complete design control, smaller bundle sizes, and unique branding. Many projects use a hybrid approach: frameworks for common components, custom CSS for unique designs. Learn both approaches for maximum flexibility.

### Q3: What is the CSS Box Model and why is it important?

**A:** The CSS Box Model describes how elements are rendered with content, padding, border, and margin. Understanding the box model is crucial for layout control. The \`box-sizing\` property determines whether width/height include padding and border. \`box-sizing: border-box\` (recommended) includes padding and border in element dimensions, making layouts more predictable. Learn more about the [CSS Box Model](/tutorial/css-box-model) for detailed explanations and examples.

### Q4: How do I center content vertically and horizontally in CSS?

**A:** Modern CSS provides multiple centering methods. For flexbox: \`display: flex; justify-content: center; align-items: center;\`. For grid: \`display: grid; place-items: center;\`. For absolute positioning: \`position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);\`. Flexbox and Grid are the most reliable modern approaches. Learn more about [CSS Flexbox](/tutorial/css-flexbox) and [CSS Grid](/tutorial/css-grid) for comprehensive layout solutions.

### Q5: What are CSS pseudo-classes and pseudo-elements?

**A:** Pseudo-classes (like \`:hover\`, \`:focus\`, \`:nth-child()\`) style elements based on state or position. Pseudo-elements (like \`::before\`, \`::after\`, \`::first-line\`) style specific parts of elements. Pseudo-classes use a single colon (\`:\`), while pseudo-elements use double colons (\`::\`). They enable advanced styling without additional HTML elements. Common uses include hover effects, form validation states, and decorative elements.

### Q6: How does CSS specificity work and why does it matter?

**A:** CSS specificity determines which styles apply when multiple rules target the same element. Specificity is calculated based on selector types: inline styles (1000), IDs (100), classes/attributes (10), elements (1). Higher specificity overrides lower specificity. Understanding specificity prevents "specificity wars" and helps write maintainable CSS. Use classes for styling, avoid overly specific selectors, and minimize \`!important\` usage.

### Q7: What is the difference between margin and padding in CSS?

**A:** Margin creates space outside an element's border, while padding creates space inside an element's border. Margin affects spacing between elements and can collapse (adjacent vertical margins combine). Padding affects the element's internal spacing and background area. Use margin for spacing between elements, padding for internal spacing. Understanding this distinction is essential for proper layout control.

### Q8: How do CSS animations differ from JavaScript animations?

**A:** CSS animations are hardware-accelerated, perform better, and are easier to implement for simple transitions. They're declarative and work well for hover effects, transitions, and keyframe animations. JavaScript animations offer more control, can respond to complex logic, and work with dynamic values. Modern best practice: use CSS for visual transitions, JavaScript for interactive animations. CSS animations are more performant and don't block the main thread.

### Q9: What are CSS media queries and how do they enable responsive design?

**A:** Media queries allow CSS to apply styles based on device characteristics (screen size, resolution, orientation). They enable responsive design by adapting layouts for different devices. The syntax: \`@media (min-width: 768px) { /* styles */ }\`. Mobile-first approach starts with mobile styles, then adds larger breakpoints. Media queries are essential for modern web development, ensuring websites work across all devices. Learn more about [CSS Responsive Design](/tutorial/css-responsive).

### Q10: How can I optimize CSS for better performance?

**A:** Performance optimization strategies include: minifying CSS for production, removing unused CSS (PurgeCSS), using critical CSS inline, splitting CSS into critical and non-critical, optimizing selectors (avoid deep nesting), using CSS containment, leveraging browser caching, and compressing with gzip/brotli. These techniques reduce file size, improve load times, and enhance Core Web Vitals scores. Performance optimization is crucial for user experience and SEO.

---

## Key Takeaways

- **CSS (Cascading Style Sheets)** is the industry-standard language for styling web pages and creating visually appealing, professional websites
- **CSS3** is the current standard, offering modern features like Flexbox, Grid, animations, and custom properties
- **External CSS files** are the recommended approach for maintainable, scalable stylesheets
- **Responsive design** using media queries ensures websites work across all devices
- **Performance optimization** through minification, critical CSS, and selector optimization improves user experience
- **Accessibility compliance** (WCAG 2.1) through proper contrast ratios and focus indicators is essential
- **CSS frameworks and preprocessors** accelerate development and improve code organization
- **Understanding CSS architecture** (BEM, CSS Modules) is crucial for large-scale applications

---

## What's Next?

Continue your CSS learning journey with these essential topics:

- **CSS Selectors**: Master element, class, ID, attribute, and pseudo-selectors for precise styling control
- **CSS Colors & Backgrounds**: Learn color systems, gradients, and background properties
- **CSS Box Model**: Understand margin, padding, border, and box-sizing for layout control
- **CSS Display & Positioning**: Master layout techniques with display, position, and z-index
- **CSS Flexbox**: Learn modern one-dimensional layout system for component layouts
- **CSS Grid**: Master two-dimensional layout system for complex page layouts
- **CSS Responsive Design**: Create mobile-first, responsive websites with media queries
- **HTML Introduction**: Understand the structure that CSS styles

Mastering CSS is essential for creating modern, professional web applications. Combine CSS with HTML for structure and JavaScript for interactivity to build complete web solutions.

---

## 10 Important CSS Introduction Interview Questions

1. **What is CSS and what problem does it solve?**  
   **CSS (Cascading Style Sheets)** describes how HTML should **look**: colors, fonts, spacing, layout, and responsive behavior—separate from **what** the content is. That **separation** lets one stylesheet style many pages, supports **themes**, and keeps HTML **semantic**. Browsers apply CSS rules to the **DOM** after HTML is parsed.

2. **What does “cascade” mean in CSS?**  
   When several rules target the same element, the **cascade** resolves conflicts in this order: **origin and importance** (browser defaults vs author vs user styles, and whether a declaration uses \`!important\`), then **specificity**, then **order of appearance** in the stylesheet. Understanding this prevents “random” overrides and explains why moving a rule **below** another can change the outcome.

3. **How is CSS specificity calculated (at a high level)?**  
   Among **normal** declarations, specificity compares **inline \`style\`** (beats any selector), then **IDs**, then **classes, attributes, and pseudo-classes**, then **elements and pseudo-elements**. More specific selectors beat less specific ones; **equal** specificity defers to **later** rules. **\`!important\`** interacts with **origin** in a separate step—so an author rule with \`!important\` can beat a **non-\`!important\`** inline style; use \`!important\` **sparingly**.

4. **What are the three ways to include CSS, and which is preferred for large apps?**  
   **Inline** (\`style\` attribute), **internal** (\`<style>\` in HTML), and **external** (\`<link rel="stylesheet">\`). **External** CSS is preferred for **reuse**, **caching**, and **maintainability**; inline is for **one-off** or **dynamic** values only. **Critical CSS** can be inlined for **above-the-fold** performance, then load the rest async.

5. **What is the difference between \`rem\` and \`em\`?**  
   **\`rem\`** is relative to the **root** (\`<html>\`) font size—consistent scaling across components. **\`em\`** is relative to the **element’s** font size and **compounds** on nested elements, which can surprise you. **\`px\`** is absolute—fine for borders; **rem** is popular for **accessible** typography scaling.

6. **What is the CSS box model?**  
   Each element’s total space involves **content**, **padding**, **border**, and **margin**. **\`box-sizing: border-box\`** makes \`width\`/\`height\` include padding and border—easier layout math. **Margin collapse** affects adjacent **vertical** margins in normal flow.

7. **What are CSS custom properties (“variables”)?**  
   **\`--token: value;\`** on a selector (often \`:root\`) and **\`var(--token)\`** where needed. They enable **themes**, **runtime** updates via JS, and **scoped** tokens on components. They **inherit** and can **fallback**: \`var(--x, #000)\`.

8. **What is a media query and why is it used?**  
   **\`@media (min-width: 768px) { ... }\`** applies rules when conditions match (width, height, **prefers-reduced-motion**, **orientation**). It is the backbone of **responsive** design—often combined with **mobile-first** (base styles for small screens, **min-width** to enhance).

9. **How does CSS relate to accessibility?**  
   CSS affects **focus outlines**, **contrast**, **target size**, and **motion**. **Never** remove \`:focus\` styles without a **visible** replacement. Respect **\`prefers-reduced-motion\`** for large animations. **Color alone** must not convey meaning—pair with text or icons.

10. **Name common strategies for organizing large CSS codebases.**  
    **BEM** naming, **CSS Modules**, **utility-first** (e.g. Tailwind), **design tokens**, and **layering** (\`@layer\`) to control the cascade. Goals: **predictable** overrides, **fewer** global leaks, and **easier** onboarding.

---

## Full-stack Java tutorials — quick links

Use these alongside CSS when you move into backend services, databases, and APIs.

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

`,
  code: `// CSS Introduction - What is CSS?

/*
 * CSS = CASCADING STYLE SHEETS
 * ============================
 * 
 * CSS styles HTML to create beautiful web pages
 */

// ============================================
// 1. WHAT IS CSS
// ============================================
/*
CSS = Cascading Style Sheets
  → Cascading: Styles cascade down
  → Style: Visual appearance
  → Sheets: Separate files

Purpose: Make HTML beautiful
  HTML = Structure (skeleton)
  CSS  = Style (skin)
*/

// ============================================
// 2. CSS SYNTAX
// ============================================
/*
selector {
    property: value;
    property: value;
}

Example:
  h1 {
      color: red;
      font-size: 32px;
  }
*/

// ============================================
// 3. WAYS TO ADD CSS
// ============================================
/*
INLINE (Not recommended):
  <p style="color: blue;">Text</p>

INTERNAL (In HTML):
  <head>
      <style>
          p { color: blue; }
      </style>
  </head>

EXTERNAL (Recommended):
  <head>
      <link rel="stylesheet" href="style.css">
  </head>
  
  File: style.css
  p { color: blue; }
*/

// ============================================
// 4. COMMON CSS PROPERTIES
// ============================================
/*
color              → Text color
background-color   → Background color
font-size          → Text size
margin             → Outer spacing
padding            → Inner spacing
width              → Element width
height             → Element height
*/

// ============================================
// 5. CSS VERSIONS
// ============================================
/*
CSS1 (1996)  → Basic styling
CSS2 (1998)  → Positioning
CSS3 (1999+) → Modern features (flexbox, grid, animations)
CSS4          → In development
*/

// ============================================
// 6. BEST PRACTICES
// ============================================
/*
Use external CSS files
Use meaningful class names
Organize your CSS
Use comments
Avoid inline styles
Use CSS variables
*/
`
};

export default cssIntroduction;

