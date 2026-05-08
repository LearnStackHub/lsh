const cssBoxModel = {
  id: 'css-box-model',
  title: 'CSS Box Model - Margin, Padding, Border',
  description: 'Understand the CSS box model - how margin, padding, border, and content work together',
  content: `
# CSS Box Model — Understanding Layout

The box model is fundamental to CSS. Every element is a box with content, padding, border, and margin.

---

## What is the Box Model?

Every HTML element is a rectangular box with four areas:

\`\`\`
┌─────────────────────────────────┐ ← Margin (outside)
│ ┌─────────────────────────────┐ │
│ │ ┌─────────────────────────┐ │ │ ← Border
│ │ │ ┌─────────────────────┐ │ │ │
│ │ │ │     Padding         │ │ │ │
│ │ │ │ ┌─────────────────┐ │ │ │ │
│ │ │ │ │    Content      │ │ │ │ │
│ │ │ │ └─────────────────┘ │ │ │ │
│ │ │ └─────────────────────┘ │ │ │
│ │ └─────────────────────────┘ │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
\`\`\`

**From inside to outside:**
1. **Content** - Actual content (text, images)
2. **Padding** - Space inside border
3. **Border** - Border around padding
4. **Margin** - Space outside border

---

## Content

The actual content of the element:

\`\`\`css
div {
  width: 200px;
  height: 100px;
}
\`\`\`

**Sets:** Size of content area

---

## Padding

Space between content and border:

\`\`\`css
div {
  padding: 20px;              /* All sides */
  padding: 10px 20px;          /* Top/Bottom, Left/Right */
  padding: 10px 20px 30px;    /* Top, Left/Right, Bottom */
  padding: 10px 20px 30px 40px; /* Top, Right, Bottom, Left */
}
\`\`\`

**Individual sides:**
\`\`\`css
div {
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 40px;
}
\`\`\`

---

## Border

Border around padding:

\`\`\`css
div {
  border: 2px solid black;
}
\`\`\`

**Shorthand:** \`border: width style color;\`

**Individual properties:**
\`\`\`css
div {
  border-width: 2px;
  border-style: solid;
  border-color: black;
}
\`\`\`

**Border styles:**
- \`solid\` - Solid line
- \`dashed\` - Dashed line
- \`dotted\` - Dotted line
- \`double\` - Double line
- \`none\` - No border

**Individual sides:**
\`\`\`css
div {
  border-top: 2px solid red;
  border-right: 3px dashed blue;
  border-bottom: 1px dotted green;
  border-left: 4px solid black;
}
\`\`\`

**Border radius (rounded corners):**
\`\`\`css
div {
  border-radius: 10px;        /* All corners */
  border-radius: 10px 20px;   /* Top-left/Bottom-right, Top-right/Bottom-left */
  border-radius: 10px 20px 30px 40px; /* Each corner */
}
\`\`\`

---

## Margin

Space outside border (between elements):

\`\`\`css
div {
  margin: 20px;               /* All sides */
  margin: 10px 20px;          /* Top/Bottom, Left/Right */
  margin: 10px 20px 30px;    /* Top, Left/Right, Bottom */
  margin: 10px 20px 30px 40px; /* Top, Right, Bottom, Left */
}
\`\`\`

**Individual sides:**
\`\`\`css
div {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 30px;
  margin-left: 40px;
}
\`\`\`

**Auto margin (centering):**
\`\`\`css
div {
  width: 500px;
  margin: 0 auto;  /* Centers horizontally */
}
\`\`\`

---

## Box Sizing

### Content Box (Default)

\`\`\`css
div {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 200 + 20*2 + 5*2 = 250px */
}
\`\`\`

**Total width = width + padding + border**

---

### Border Box (Recommended)

\`\`\`css
div {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 200px (includes padding and border) */
}
\`\`\`

**Total width = width (includes padding and border)**

**Best Practice:** Use \`box-sizing: border-box\` for all elements:

\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`

---

## Complete Example

\`\`\`css
.card {
  /* Content */
  width: 300px;
  height: 200px;
  
  /* Padding */
  padding: 20px;
  
  /* Border */
  border: 2px solid #ddd;
  border-radius: 8px;
  
  /* Margin */
  margin: 20px;
  
  /* Box sizing */
  box-sizing: border-box;
}
\`\`\`

---

## Real-Time Scenarios

### Scenario 1: Card Component

\`\`\`css
.product-card {
  width: 300px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 15px;
  box-sizing: border-box;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
\`\`\`

### Scenario 2: Button with Padding

\`\`\`css
.button {
  padding: 12px 24px;
  border: 2px solid blue;
  border-radius: 5px;
  margin: 10px;
  background: blue;
  color: white;
}
\`\`\`

### Scenario 3: Container with Spacing

\`\`\`css
.container {
  max-width: 1200px;
  margin: 0 auto;  /* Centers container */
  padding: 20px;
  box-sizing: border-box;
}
\`\`\`

---

## Margin Collapse

When two vertical margins meet, they collapse (only the larger one applies):

\`\`\`css
.box1 {
  margin-bottom: 20px;
}

.box2 {
  margin-top: 30px;
}

/* Space between = 30px (not 50px) */
\`\`\`

**Horizontal margins don't collapse** - they add up.

---

## Negative Margins

\`\`\`css
div {
  margin-top: -10px;  /* Moves element up */
  margin-left: -20px; /* Moves element left */
}
\`\`\`

**Use carefully** - Can cause layout issues.

---

## Best Practices

1. **Use \`box-sizing: border-box\`** - Easier calculations
2. **Use consistent spacing** - Create spacing scale
3. **Avoid negative margins** - Use positioning instead
4. **Understand margin collapse** - Know when it happens
5. **Use shorthand** - \`padding: 10px 20px;\` not individual properties

---

## Summary

The CSS box model describes how every element is structured. Each element has four main components: the content area (where your actual content lives), padding (the space between the content and the border), the border (a line around the padding), and margin (the space outside the border that separates elements).

Box sizing controls how the width and height are calculated. With \`content-box\` (the default), the width only includes the content area, so padding and border are added on top. With \`border-box\` (recommended), the width includes content, padding, and border, making it much easier to size elements correctly.

You can use shorthand properties to set all sides at once. For padding and margin, use \`padding: top right bottom left;\` or \`margin: top right bottom left;\`. For borders, use \`border: width style color;\` to set all border properties at once.

Understanding the box model is essential for CSS layout. Once you understand how content, padding, border, and margin work together, you'll be able to create layouts with confidence.

---

## 10 Important CSS Box Model Interview Questions

1. **What are the four layers of the standard box model?**  
   From inside out: **content** (text/replaced elements), **padding** (inside border), **border**, and **margin** (outside border). **Width/height** in default **content-box** apply to **content only**—padding and border **add** to the total size.

2. **What does \`box-sizing: border-box\` change?**  
   **\`width\` and \`height\`** include **content + padding + border**—the **border box**. Layout math matches intuition: “300px wide card” stays **300px** after padding. Most **CSS resets** set \`* { box-sizing: border-box; }\` globally.

3. **What is margin collapse and when does it happen?**  
   **Adjacent vertical margins** of **block** boxes in normal flow **collapse** to the **larger** margin (not sum). **Horizontal** margins don’t collapse. **Padding**, **borders**, **flex/grid**, and **overflow** other than **visible** can **prevent** collapse. Explains “missing” vertical spacing bugs.

4. **Difference between margin and padding?**  
   **Padding** is **inside** the border—**background** paints under padding. **Margin** is **outside**—transparent, pushes **other** boxes away. Use **padding** for **clickable** touch targets inside a component; **margin** for **space between** siblings.

5. **How do percentage widths and margins work?**  
   **Percentage** \`width\` is usually relative to the **containing block** width. **margin: 0 auto** with a **fixed width** block **centers** horizontally. **Vertical** percentage margins can reference **width** too (CSS quirk)—know the **containing block** rules.

6. **What is the \`outline\` property and how is it different from \`border\`?**  
   **Outline** does **not** affect layout (no extra box space) and is often used for **focus rings**. **Border** participates in **box size** (with box-sizing) and layout. **Don’t** remove **:focus-visible** outlines without replacement—**accessibility** issue.

7. **What are negative margins used for?**  
   Pulling elements **closer** or creating **full-bleed** effects inside constrained parents. **Risky**: can cause **overlap** and **scroll** issues. Prefer **transform** or **grid** alignment when possible; use negative margins **knowingly**.

8. **What is \`min-width\`, \`max-width\`, and \`min-height\` used for?**  
   They **clamp** the **computed** size—essential for **responsive** text columns (\`max-width: 65ch\`) and **flex** children (\`min-width: 0\` to allow shrinking). **Flex** items default **min-width: auto** which can **block** shrinking—common interview trap.

9. **How does \`border-radius\` interact with background and overflow?**  
   Rounds the **border box**; **background** clips to radius unless otherwise set. **overflow: hidden** with **radius** clips **children** for **card** UIs. **Percentage** radius makes **circles** when **width == height**.

10. **Why is the box model foundational for Flexbox and Grid?**  
    Flex and Grid items are still **boxes**—**min/max sizes**, **padding**, and **borders** affect **flex-basis**, **track sizing**, and **alignment**. Debugging layout often means inspecting **computed** box sizes in DevTools.

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
  code: `// CSS Box Model

/*
 * BOX MODEL = CONTENT + PADDING + BORDER + MARGIN
 * ================================================
 */

// ============================================
// 1. BOX MODEL STRUCTURE
// ============================================
/*
From inside to outside:
  1. Content    → Actual content
  2. Padding    → Space inside border
  3. Border     → Border around padding
  4. Margin     → Space outside border
*/

// ============================================
// 2. PADDING
// ============================================
/*
padding: 20px;                    → All sides
padding: 10px 20px;              → Top/Bottom, Left/Right
padding: 10px 20px 30px 40px;    → Top, Right, Bottom, Left

INDIVIDUAL:
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 40px;
*/

// ============================================
// 3. BORDER
// ============================================
/*
SHORTHAND:
  border: 2px solid black;

INDIVIDUAL:
  border-width: 2px;
  border-style: solid;
  border-color: black;

STYLES:
  solid, dashed, dotted, double, none

BORDER RADIUS:
  border-radius: 10px;
  border-radius: 10px 20px 30px 40px;
*/

// ============================================
// 4. MARGIN
// ============================================
/*
margin: 20px;                    → All sides
margin: 10px 20px;              → Top/Bottom, Left/Right
margin: 10px 20px 30px 40px;    → Top, Right, Bottom, Left

AUTO (centering):
  margin: 0 auto;  → Centers horizontally
*/

// ============================================
// 5. BOX SIZING
// ============================================
/*
CONTENT-BOX (default):
  width = content only
  Total = width + padding + border

BORDER-BOX (recommended):
  width = content + padding + border
  Total = width

BEST PRACTICE:
  * {
      box-sizing: border-box;
  }
*/
`
};

export default cssBoxModel;

