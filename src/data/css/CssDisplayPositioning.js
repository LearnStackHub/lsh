const cssDisplayPositioning = {
  id: 'css-display-positioning',
  title: 'CSS Display & Positioning',
  description: 'Learn about display properties and positioning (static, relative, absolute, fixed, sticky)',
  content: `
# CSS Display & Positioning — Layout Control

Understanding display and positioning is essential for creating layouts. Learn how to control element placement.

---

## Display Property

### Block

\`\`\`css
div {
  display: block;
}
\`\`\`

**Characteristics:**
- Takes full width
- Starts on new line
- Can set width/height
- Examples: \`<div>\`, \`<p>\`, \`<h1>\`

---

### Inline

\`\`\`css
span {
  display: inline;
}
\`\`\`

**Characteristics:**
- Takes only needed width
- Stays on same line
- Cannot set width/height
- Examples: \`<span>\`, \`<a>\`, \`<strong>\`

---

### Inline-Block

\`\`\`css
.button {
  display: inline-block;
}
\`\`\`

**Characteristics:**
- Stays on same line (like inline)
- Can set width/height (like block)
- Best of both worlds

---

### None

\`\`\`css
.hidden {
  display: none;
}
\`\`\`

**Effect:** Element is completely removed (not visible, takes no space)

---

### Flex

\`\`\`css
.container {
  display: flex;
}
\`\`\`

**Effect:** Creates flexbox container (we'll learn more in Flexbox topic)

---

### Grid

\`\`\`css
.container {
  display: grid;
}
\`\`\`

**Effect:** Creates grid container (we'll learn more in Grid topic)

---

## Position Property

### Static (Default)

\`\`\`css
div {
  position: static;
}
\`\`\`

**Behavior:** Normal document flow (default)

---

### Relative

\`\`\`css
div {
  position: relative;
  top: 20px;
  left: 30px;
}
\`\`\`

**Behavior:**
- Positioned relative to its normal position
- Still takes space in flow
- Can use \`top\`, \`right\`, \`bottom\`, \`left\`

---

### Absolute

\`\`\`css
div {
  position: absolute;
  top: 50px;
  left: 100px;
}
\`\`\`

**Behavior:**
- Positioned relative to nearest positioned ancestor
- Removed from normal flow
- Doesn't take space
- If no positioned ancestor, relative to \`<body>\`

---

### Fixed

\`\`\`css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
\`\`\`

**Behavior:**
- Positioned relative to viewport
- Stays in place when scrolling
- Removed from normal flow
- Common for headers, navigation

---

### Sticky

\`\`\`css
.navbar {
  position: sticky;
  top: 0;
}
\`\`\`

**Behavior:**
- Acts like \`relative\` until scroll position
- Then acts like \`fixed\`
- Sticks to specified position when scrolling

---

## Positioning Properties

### Top, Right, Bottom, Left

\`\`\`css
div {
  position: relative;
  top: 20px;      /* Move down 20px */
  right: 30px;    /* Move left 30px */
  bottom: 10px;  /* Move up 10px */
  left: 40px;    /* Move right 40px */
}
\`\`\`

**Note:** Only works with \`position\` other than \`static\`

---

## Z-Index

Controls stacking order (which element appears on top):

\`\`\`css
.box1 {
  position: relative;
  z-index: 1;
}

.box2 {
  position: relative;
  z-index: 2;  /* Appears above box1 */
}
\`\`\`

**Rules:**
- Higher z-index = on top
- Only works with positioned elements
- Default: \`auto\` (0)

---

## Real-Time Scenarios

### Scenario 1: Fixed Header

\`\`\`css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
\`\`\`

### Scenario 2: Modal Overlay

\`\`\`css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10001;
  background: white;
  padding: 20px;
}
\`\`\`

### Scenario 3: Sticky Navigation

\`\`\`css
.navbar {
  position: sticky;
  top: 0;
  background: white;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
\`\`\`

### Scenario 4: Absolute Positioned Badge

\`\`\`css
.product-card {
  position: relative;
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}
\`\`\`

---

## Best Practices

1. **Use \`relative\` for containers** - When positioning children
2. **Use \`fixed\` for headers/modals** - Stays in viewport
3. **Use \`sticky\` for navigation** - Sticks when scrolling
4. **Avoid \`absolute\` without parent** - Can cause layout issues
5. **Use z-index carefully** - Keep it organized

---

## Summary

The display property controls how elements are rendered. Block elements take full width and start on a new line, inline elements only take the width they need and stay on the same line, and inline-block combines both behaviors. Use \`display: none\` to hide elements completely. For modern layouts, you can use \`display: flex\` for Flexbox or \`display: grid\` for Grid layouts.

The position property controls where elements are placed. Static is the default and follows normal document flow. Relative positions elements relative to their normal position, while absolute positions them relative to the nearest positioned ancestor. Fixed positions elements relative to the viewport, so they stay in place when scrolling. Sticky is a hybrid that acts like relative until you scroll, then acts like fixed.

Positioning properties like \`top\`, \`right\`, \`bottom\`, and \`left\` only work with positioned elements (not static). The \`z-index\` property controls the stacking order, with higher values appearing on top.

Display and positioning give you control over layout. Understanding these concepts is essential for creating the layouts you want.

---

## 10 Important CSS Display & Positioning Interview Questions

1. **What does \`display: block\` vs \`inline\` vs \`inline-block\` do?**  
   **block** takes full **available width** (breaks line), respects **width/height**. **inline** flows in text—**width/height** ignored for non-replaced elements. **inline-block** is inline-level but **box** respects **dimensions**—good for **buttons** in text. **none** removes from **layout** and **accessibility tree** (use **visibility** or **hidden** attribute carefully for **screen readers**).

2. **How does \`position: relative\` differ from \`absolute\`?**  
   **relative** offsets from the element’s **normal** position but **keeps** space in flow unless shifted visually. **absolute** removes from flow; **top/right/bottom/left** position relative to the **nearest positioned ancestor** (not \`static\`) or **viewport** if none. **absolute** needs a **relative** parent for predictable **containment**.

3. **What is \`position: fixed\` and what breaks it?**  
   **fixed** is relative to the **viewport**—stays on screen on scroll (headers, modals). **transform**, **filter**, or **perspective** on **ancestors** can create a new **containing block** and make **fixed** behave like **absolute**—classic **debugging** gotcha.

4. **Explain \`position: sticky\`.**  
   Hybrid: **relative** until scroll crosses a **threshold** (\`top: 0\`), then **sticks** like fixed **within** its **scroll container**. Requires **room** to stick (ancestor **overflow** hidden can break it). Great for **section headers** and **nav bars**.

5. **What is stacking context and \`z-index\`?**  
   **z-index** only works on **positioned** elements (not \`static\`) or **flex/grid** items with **z-index**. New **stacking contexts** are created by **opacity < 1**, **transforms**, **filters**, **isolation**, etc.—children can’t escape above **parent’s** context. **Higher** z-index wins **within** the same context.

6. **What does \`overflow: hidden\` do beyond clipping?**  
   Clips **paint** and creates a **scroll container** if content overflows (with **auto/scroll**). Affects **sticky**, **position: fixed** descendants, and **border-radius** clipping. Can **clip** **focus outlines**—watch **accessibility**.

7. **When would you use \`display: flex\` or \`grid\` vs floats?**  
   **Floats** were for **wrapping** text around images; layout hacks are **legacy**. **Flex**/**Grid** are **modern** layout tools with **alignment** and **gap**. Prefer them for **UI** layout; **float** rarely except **typography** cases.

8. **What is \`inset\` shorthand?**  
   Sets **top/right/bottom/left** together—less typing for **absolute/fixed** **full-bleed**: \`inset: 0;\`. Logical properties (\`inset-inline\`) help **RTL** layouts.

9. **How does \`visibility: hidden\` differ from \`opacity: 0\`?**  
   **hidden** hides visually but element **occupies space** (layout); non-interactive. **opacity: 0** can still **receive pointer events** unless **pointer-events: none**. For **screen readers**, **display:none** or **hidden** attribute may be better than **visibility** depending on intent.

10. **Why understand “containing block” for absolute positioning?**  
    **Absolute** elements position against the **padding edge** of the containing block—usually the nearest **positioned** ancestor. Misunderstanding leads to elements **anchoring** to \`body\` or **viewport** unexpectedly. **DevTools** highlight the containing block in modern browsers.

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
  code: `// CSS Display & Positioning

/*
 * DISPLAY & POSITIONING
 * =====================
 * 
 * Control element layout and placement
 */

// ============================================
// 1. DISPLAY PROPERTY
// ============================================
/*
display: block;        → Full width, new line
display: inline;       → Only needed width, same line
display: inline-block; → Best of both
display: none;         → Hidden
display: flex;         → Flexbox
display: grid;         → Grid
*/

// ============================================
// 2. POSITION PROPERTY
// ============================================
/*
STATIC (default):
  position: static;
  → Normal document flow

RELATIVE:
  position: relative;
  top: 20px;
  left: 30px;
  → Relative to normal position

ABSOLUTE:
  position: absolute;
  top: 50px;
  left: 100px;
  → Relative to positioned ancestor

FIXED:
  position: fixed;
  top: 0;
  → Relative to viewport (stays when scrolling)

STICKY:
  position: sticky;
  top: 0;
  → Sticks when scrolling
*/

// ============================================
// 3. Z-INDEX
// ============================================
/*
z-index: 1;  → Lower
z-index: 2;  → Higher (on top)
  → Only works with positioned elements
*/
`
};

export default cssDisplayPositioning;

