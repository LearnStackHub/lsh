const cssTextFonts = {
  id: 'css-text-fonts',
  title: 'CSS Text & Fonts',
  description: 'Learn how to style text, fonts, typography, and text effects in CSS',
  content: `
# CSS Text & Fonts — Typography

Typography is crucial for readability and design. Learn how to style text and fonts effectively.

---

## Font Properties

### Font Family

\`\`\`css
p {
  font-family: Arial, sans-serif;
  font-family: "Times New Roman", serif;
  font-family: "Courier New", monospace;
}
\`\`\`

**Font stacks (fallbacks):**
\`\`\`css
p {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
\`\`\`

**Browser tries:** Helvetica Neue → Helvetica → Arial → sans-serif

---

### Font Size

\`\`\`css
p {
  font-size: 16px;        /* Pixels */
  font-size: 1em;         /* Relative to parent */
  font-size: 1rem;        /* Relative to root */
  font-size: 100%;        /* Percentage */
  font-size: 1.2em;       /* 120% of parent */
}
\`\`\`

**Units:**
- \`px\` - Pixels (fixed)
- \`em\` - Relative to parent
- \`rem\` - Relative to root (recommended)
- \`%\` - Percentage

---

### Font Weight

\`\`\`css
p {
  font-weight: normal;    /* 400 */
  font-weight: bold;      /* 700 */
  font-weight: 100;        /* Thin */
  font-weight: 300;        /* Light */
  font-weight: 400;        /* Normal */
  font-weight: 700;        /* Bold */
  font-weight: 900;        /* Black */
}
\`\`\`

---

### Font Style

\`\`\`css
p {
  font-style: normal;
  font-style: italic;
  font-style: oblique;
}
\`\`\`

---

### Font Shorthand

\`\`\`css
p {
  font: italic bold 16px/1.5 Arial, sans-serif;
}
\`\`\`

**Order:** \`style weight size/line-height family\`

---

## Text Properties

### Text Color

\`\`\`css
p {
  color: blue;
  color: #ff0000;
  color: rgb(255, 0, 0);
}
\`\`\`

---

### Text Alignment

\`\`\`css
p {
  text-align: left;      /* Default */
  text-align: right;
  text-align: center;
  text-align: justify;    /* Stretches lines */
}
\`\`\`

---

### Text Decoration

\`\`\`css
p {
  text-decoration: none;      /* Remove underline */
  text-decoration: underline;
  text-decoration: overline;
  text-decoration: line-through;
}
\`\`\`

**With color:**
\`\`\`css
a {
  text-decoration: underline;
  text-decoration-color: red;
  text-decoration-style: wavy;
  text-decoration-thickness: 2px;
}
\`\`\`

---

### Text Transform

\`\`\`css
p {
  text-transform: none;
  text-transform: uppercase;   /* ALL CAPS */
  text-transform: lowercase;   /* all lowercase */
  text-transform: capitalize;  /* First Letter Capital */
}
\`\`\`

---

### Text Indent

\`\`\`css
p {
  text-indent: 20px;      /* Indent first line */
  text-indent: 2em;
}
\`\`\`

---

### Letter Spacing

\`\`\`css
h1 {
  letter-spacing: 2px;    /* Space between letters */
  letter-spacing: -1px;   /* Tighter spacing */
}
\`\`\`

---

### Word Spacing

\`\`\`css
p {
  word-spacing: 5px;      /* Space between words */
}
\`\`\`

---

### Line Height

\`\`\`css
p {
  line-height: 1.5;       /* 1.5x font size */
  line-height: 24px;      /* Fixed height */
  line-height: 150%;     /* Percentage */
}
\`\`\`

**Best practice:** 1.5-1.8 for readability

---

### Text Shadow

\`\`\`css
h1 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
\`\`\`

**Format:** \`text-shadow: x-offset y-offset blur color;\`

**Multiple shadows:**
\`\`\`css
h1 {
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.3),
    0 0 10px rgba(255, 0, 0, 0.5);
}
\`\`\`

---

### White Space

\`\`\`css
p {
  white-space: normal;     /* Default - wraps */
  white-space: nowrap;     /* No wrapping */
  white-space: pre;        /* Preserves spaces/line breaks */
  white-space: pre-wrap;   /* Wraps but preserves spaces */
  white-space: pre-line;   /* Wraps, preserves line breaks */
}
\`\`\`

---

### Word Wrap

\`\`\`css
p {
  word-wrap: break-word;   /* Break long words */
  overflow-wrap: break-word;  /* Modern property */
}
\`\`\`

---

## Google Fonts

### Using Google Fonts

**Step 1:** Add link in HTML
\`\`\`html
<head>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>
\`\`\`

**Step 2:** Use in CSS
\`\`\`css
p {
  font-family: 'Roboto', sans-serif;
}
\`\`\`

---

## Real-Time Scenarios

### Scenario 1: Article Typography

\`\`\`css
.article {
  font-family: 'Georgia', serif;
  font-size: 18px;
  line-height: 1.8;
  color: #333;
  text-align: justify;
}

.article h1 {
  font-family: 'Arial', sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
}
\`\`\`

### Scenario 2: Button Text

\`\`\`css
.button {
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
}
\`\`\`

### Scenario 3: Code Block

\`\`\`css
code {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  background: #f4f4f4;
  padding: 2px 6px;
  border-radius: 3px;
}
\`\`\`

---

## Best Practices

1. **Use readable fonts** - Sans-serif for body, serif for headings
2. **Maintain line height** - 1.5-1.8 for body text
3. **Limit font families** - 2-3 max per page
4. **Use font stacks** - Provide fallbacks
5. **Consider readability** - Don't sacrifice readability for style

---

## Summary

Typography is crucial for making your content readable and visually appealing. Font properties control the appearance of text. Use \`font-family\` to choose the typeface, \`font-size\` to set the text size, \`font-weight\` to control boldness, and \`font-style\` for italic or normal text.

Text properties control how text is displayed. The \`color\` property sets the text color, \`text-align\` controls alignment (left, right, center, justify), \`text-decoration\` adds underlines or removes them, \`text-transform\` changes capitalization, \`line-height\` controls spacing between lines, and \`text-shadow\` adds shadow effects.

When working with typography, remember to use readable fonts that are appropriate for your content. Maintain a proper line height (typically 1.5 to 1.8 times the font size) for comfortable reading. Limit the number of font families you use (2-3 maximum) to keep your design cohesive. Always provide font stacks with fallbacks so your text displays correctly even if the primary font isn't available.

Typography makes content readable and beautiful. Good typography enhances readability and helps guide users through your content.

---

## 10 Important CSS Text & Fonts Interview Questions

1. **What is a font stack and why use it?**  
   A **comma-separated** list: \`font-family: "Inter", system-ui, sans-serif;\`. The browser picks the **first** available font. **Stacks** ensure **graceful degradation** when webfonts fail to load or glyphs are missing. Always end with a **generic** family (\`serif\`, \`sans-serif\`, \`monospace\`).

2. **How do \`@font-face\` and webfonts work?**  
   **\`@font-face\`** declares a **font family name** and points to **font files** (woff2 preferred). Browsers **download** fonts—impacts **performance** (FOIT/FOUT). Use **font-display: swap** (or **optional**) to control **text visibility** during load. **Subset** fonts to **languages** you need.

3. **What is the difference between \`rem\`, \`em\`, and \`px\` for font-size?**  
   **rem** = root **em**—scales with **html** font size (user zoom friendly). **em** compounds with **parent** font size—powerful but easy to **nest** incorrectly. **px** is **fixed**—ignores user **browser text size** preferences unless zoomed—**avoid** for **body** text when accessibility matters.

4. **What does \`line-height\` control and what values are common?**  
   Vertical rhythm between **lines** (often **unitless** like \`1.5\` so it scales with font-size). Too tight hurts **readability**; too loose looks **disjointed**. **Headings** often use **tighter** line-height than **body** copy.

5. **What is \`font-weight\` and how do variable fonts change things?**  
   Numeric weights **100–900** map to **Thin** through **Black** if the **font file** contains those masters. **Variable fonts** interpolate—fewer files, **smooth** weight animation. If you request **700** but only **400** exists, browser **synthesizes**—may look **blurry**.

6. **How do \`letter-spacing\` and \`word-spacing\` affect UI text?**  
   **letter-spacing** (tracking) adjusts space **between characters**—common in **uppercase** labels. **word-spacing** adjusts **words**—less common. Overuse harms **dyslexic** readers—keep **subtle**.

7. **What does \`text-overflow: ellipsis\` require?**  
   Typically **\`white-space: nowrap\`**, **\`overflow: hidden\`**, and a **bounded width**. For **multi-line** ellipsis, newer **line-clamp** (\`-webkit-line-clamp\` with **flex**) is common—check **browser** support and **fallbacks**.

8. **Difference between \`text-align\` and flex \`justify-content\` for centering text?**  
   **text-align** affects **inline content** inside a **block**. **Flex** centers the **flex items** (boxes). For **one line of text** in a flex item, you may need **both** or **align-items/justify-content** depending on **direction**.

9. **What is \`font-smoothing\` / \`-webkit-font-smoothing\`?**  
   **Non-standard** tweaks for **subpixel** antialiasing on macOS—use **carefully**; can make text **thinner**. Not a substitute for **good** font choice. **Test** on **Windows** and **Linux** too.

10. **How does typography relate to responsive design?**  
    Use **fluid** type (\`clamp(min, preferred, max)\`) or **stepped** sizes at **breakpoints**. **Avoid** shrinking body text below **16px** on mobile for **readability**. Pair with **max-width** on text blocks (**measure**) for comfortable **line length**.

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
| **Hibernate** | [Hibernate Introduction](/tutorial/hibernate-introduction) |
| **Spring Framework** | [Spring Introduction](/tutorial/spring-introduction) |
| **Spring Boot** | [Spring Boot Introduction](/tutorial/spring-boot-introduction) |
| **Spring Cloud** | [Spring Cloud & Microservices](/tutorial/spring-cloud-microservices) |
| **HTTP & HTTPS** | [HTTP Introduction](/tutorial/http-introduction) · [HTTPS Security](/tutorial/https-security) |
| **APIs** | [API Introduction](/tutorial/api-introduction) · [REST API Fundamentals](/tutorial/rest-api-fundamentals) |

`,
  code: `// CSS Text & Fonts

/*
 * TYPOGRAPHY = TEXT STYLING
 * =========================
 */

// ============================================
// 1. FONT PROPERTIES
// ============================================
/*
FONT FAMILY:
  font-family: Arial, sans-serif;
  font-family: "Times New Roman", serif;

FONT SIZE:
  font-size: 16px;
  font-size: 1em;
  font-size: 1rem;  (recommended)

FONT WEIGHT:
  font-weight: normal;  (400)
  font-weight: bold;   (700)
  font-weight: 100-900;

FONT STYLE:
  font-style: normal;
  font-style: italic;

SHORTHAND:
  font: italic bold 16px/1.5 Arial;
*/
// ============================================
// 2. TEXT PROPERTIES
// ============================================
/*
TEXT COLOR:
  color: blue;

TEXT ALIGN:
  text-align: left | right | center | justify;

TEXT DECORATION:
  text-decoration: underline;
  text-decoration: none;

TEXT TRANSFORM:
  text-transform: uppercase;
  text-transform: lowercase;
  text-transform: capitalize;

LINE HEIGHT:
  line-height: 1.5;  (recommended)

TEXT SHADOW:
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
*/
`
};

export default cssTextFonts;

