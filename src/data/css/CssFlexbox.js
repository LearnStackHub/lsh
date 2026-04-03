const cssFlexbox = {
  id: 'css-flexbox',
  title: 'CSS Flexbox - Modern Layout System',
  description: 'Learn Flexbox - the modern CSS layout system for creating flexible and responsive layouts',
  content: `
# CSS Flexbox — Modern Layout System

Flexbox is a powerful layout system that makes it easy to create flexible, responsive layouts. It's the modern way to arrange elements.

---

## What is Flexbox?

**Flexbox** (Flexible Box Layout) is a one-dimensional layout method for arranging items in rows or columns.

**Key Concepts:**
- **Container** - Parent element with \`display: flex\`
- **Items** - Child elements inside container
- **Main Axis** - Primary direction (row or column)
- **Cross Axis** - Perpendicular to main axis

---

## Creating a Flex Container

\`\`\`css
.container {
  display: flex;
}
\`\`\`

**Result:** Children become flex items and arrange in a row (default)

---

## Flex Direction

Controls main axis direction:

\`\`\`css
.container {
  display: flex;
  flex-direction: row;        /* Default - left to right */
  flex-direction: row-reverse; /* Right to left */
  flex-direction: column;     /* Top to bottom */
  flex-direction: column-reverse; /* Bottom to top */
}
\`\`\`

---

## Justify Content (Main Axis)

Aligns items along main axis:

\`\`\`css
.container {
  display: flex;
  justify-content: flex-start;   /* Default - start */
  justify-content: flex-end;      /* End */
  justify-content: center;        /* Center */
  justify-content: space-between; /* Space between items */
  justify-content: space-around;  /* Space around items */
  justify-content: space-evenly;  /* Equal space everywhere */
}
\`\`\`

---

## Align Items (Cross Axis)

Aligns items along cross axis:

\`\`\`css
.container {
  display: flex;
  align-items: stretch;      /* Default - stretch to fill */
  align-items: flex-start;  /* Start */
  align-items: flex-end;    /* End */
  align-items: center;      /* Center */
  align-items: baseline;    /* Baseline alignment */
}
\`\`\`

---

## Flex Wrap

Controls whether items wrap:

\`\`\`css
.container {
  display: flex;
  flex-wrap: nowrap;    /* Default - no wrap */
  flex-wrap: wrap;      /* Wrap to new line */
  flex-wrap: wrap-reverse; /* Wrap in reverse */
}
\`\`\`

**Shorthand:**
\`\`\`css
.container {
  flex-flow: row wrap;  /* flex-direction + flex-wrap */
}
\`\`\`

---

## Align Content (Multiple Lines)

Aligns wrapped lines:

\`\`\`css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;      /* Default */
  align-content: flex-start;
  align-content: flex-end;
  align-content: center;
  align-content: space-between;
  align-content: space-around;
}
\`\`\`

---

## Flex Item Properties

### Flex Grow

\`\`\`css
.item {
  flex-grow: 0;    /* Default - don't grow */
  flex-grow: 1;    /* Grow to fill space */
  flex-grow: 2;    /* Grow twice as much */
}
\`\`\`

---

### Flex Shrink

\`\`\`css
.item {
  flex-shrink: 1;  /* Default - can shrink */
  flex-shrink: 0;  /* Don't shrink */
}
\`\`\`

---

### Flex Basis

\`\`\`css
.item {
  flex-basis: auto;  /* Default - use content size */
  flex-basis: 200px;  /* Initial size */
  flex-basis: 50%;    /* Percentage */
}
\`\`\`

---

### Flex Shorthand

\`\`\`css
.item {
  flex: 1;           /* flex-grow: 1, shrink: 1, basis: 0 */
  flex: 0 1 200px;   /* grow, shrink, basis */
  flex: 2 0 auto;    /* grow: 2, shrink: 0, basis: auto */
}
\`\`\`

---

### Align Self

Overrides container's \`align-items\` for specific item:

\`\`\`css
.item {
  align-self: auto;      /* Default - use container's align-items */
  align-self: flex-start;
  align-self: flex-end;
  align-self: center;
  align-self: stretch;
}
\`\`\`

---

## Common Flexbox Patterns

### Centering Content

\`\`\`css
.container {
  display: flex;
  justify-content: center;  /* Horizontal center */
  align-items: center;      /* Vertical center */
  height: 100vh;
}
\`\`\`

---

### Equal Width Columns

\`\`\`css
.container {
  display: flex;
}

.item {
  flex: 1;  /* All items equal width */
}
\`\`\`

---

### Navigation Bar

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 20px;
}
\`\`\`

---

### Card Layout

\`\`\`css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px;  /* Grow, shrink, min-width 300px */
}
\`\`\`

---

## Real-Time Scenarios

### Scenario 1: Header with Logo and Menu

\`\`\`css
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.logo {
  flex-shrink: 0;
}

.nav-menu {
  display: flex;
  gap: 20px;
}
\`\`\`

### Scenario 2: Product Grid

\`\`\`css
.products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  flex: 1 1 250px;  /* Min width 250px, equal growth */
}
\`\`\`

### Scenario 3: Sidebar Layout

\`\`\`css
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  flex: 0 0 250px;  /* Fixed width 250px */
}

.main-content {
  flex: 1;  /* Takes remaining space */
}
\`\`\`

---

## Best Practices

1. **Use flexbox for one-dimensional layouts**
2. **Use \`gap\` for spacing** - Better than margins
3. **Use \`flex: 1\` for equal distribution**
4. **Combine with media queries** - For responsive design
5. **Use \`flex-shrink: 0\`** - To prevent unwanted shrinking

---

## Summary

Flexbox is a powerful layout system that makes it easy to create flexible, responsive layouts. To use Flexbox, you create a flex container with \`display: flex\`. You can control the direction with \`flex-direction\` (row or column), align items along the main axis with \`justify-content\`, align items along the cross axis with \`align-items\`, and control wrapping with \`flex-wrap\`.

For flex items, you can use the \`flex\` shorthand property which combines \`flex-grow\`, \`flex-shrink\`, and \`flex-basis\`. The \`flex-grow\` property controls how much an item can grow, \`flex-shrink\` controls how much it can shrink, and \`flex-basis\` sets the initial size. You can override the container's alignment for individual items using \`align-self\`.

Flexbox makes layouts flexible and responsive. It's particularly useful for navigation bars, card layouts, and centering content. Once you understand the basic concepts, you'll find it much easier to create modern layouts than with older CSS methods.

---

## 10 Important CSS Flexbox Interview Questions

1. **What problem does Flexbox solve?**  
   **One-dimensional** layout: distribute space and align items along a **row OR column** (main axis). Great for **nav bars**, **toolbars**, **card rows**, **centering**. For **full page** 2D layouts, often combine with **Grid** or nested flex containers.

2. **What are the main axis and cross axis?**  
   **flex-direction: row** → main axis is **horizontal**, cross is **vertical**. **column** swaps them. **justify-content** aligns on the **main** axis; **align-items** on the **cross** axis (for a **single line**—use **align-content** for **multi-line** wrap).

3. **What does \`justify-content: space-between\` do?**  
   Distributes **free space between** items—first/last flush to edges. Contrast with **space-around** (half-size end gaps) and **space-evenly**. **gap** property adds **consistent** spacing without **margin hacks**.

4. **Explain \`flex: 1\` shorthand.**  
   **\`flex: 1 1 0\`** commonly—grow, shrink, **basis 0**—items share **remaining** space equally. **\`flex: none\`** = \`0 0 auto\` (fixed size). **\`flex-basis\`** sets **initial** size before **grow/shrink** distribution.

5. **What is \`align-self\`?**  
   Overrides **align-items** for a **single** flex item—useful for **odd one out** vertical alignment in a row.

6. **What does \`flex-wrap: wrap\` change?**  
   Items **wrap** to new lines when they exceed container width—**cross-axis** behavior then involves **align-content** (distribution of **lines**). Without wrap, items **shrink** (if allowed) or **overflow**.

7. **Why is \`min-width: 0\` often needed on flex children?**  
   Flex items default **min-width: auto**—content **prevents** shrinking below intrinsic size, causing **overflow**. Setting **min-width: 0** (or **overflow** tricks) lets **flex-shrink** work for **text**/**long URLs**.

8. **How do you vertically center with Flexbox?**  
   Parent: \`display: flex; align-items: center;\` (single line) or **justify-content** too for **both** axes (\`justify-content: center\`). For **viewport** centering, **min-height: 100vh** on container is common—watch **mobile** browser **dynamic toolbars**.

9. **What is \`order\` and should you use it?**  
   **order** changes **visual** order without changing **DOM** order—**bad** for **focus** tab order if it mismatches. Use for **responsive** tweaks cautiously; **screen readers** follow **DOM** order.

10. **Flexbox vs Grid—when to choose Flex?**  
    **Flex** for **components** along one axis (nav, distribute **icons**). **Grid** for **2D** **page** layouts (rows **and** columns). **Interview** answer: they **complement**—many UIs use **Grid** for page shell and **Flex** inside regions.

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
  code: `// CSS Flexbox

/*
 * FLEXBOX = FLEXIBLE LAYOUT
 * =========================
 * 
 * One-dimensional layout system
 */

// ============================================
// 1. FLEX CONTAINER
// ============================================
/*
.container {
    display: flex;
    flex-direction: row | column;
    justify-content: flex-start | center | space-between;
    align-items: flex-start | center | flex-end;
    flex-wrap: wrap | nowrap;
}
*/

// ============================================
// 2. JUSTIFY-CONTENT (Main Axis)
// ============================================
/*
justify-content: flex-start;    → Start
justify-content: center;        → Center
justify-content: flex-end;      → End
justify-content: space-between; → Space between
justify-content: space-around;  → Space around
justify-content: space-evenly;   → Equal space
*/

// ============================================
// 3. ALIGN-ITEMS (Cross Axis)
// ============================================
/*
align-items: flex-start;  → Start
align-items: center;     → Center
align-items: flex-end;   → End
align-items: stretch;    → Stretch (default)
*/

// ============================================
// 4. FLEX ITEMS
// ============================================
/*
.item {
    flex: 1;              → Grow to fill space
    flex: 0 1 200px;      → grow, shrink, basis
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 200px;
    align-self: center;   → Override alignment
}
*/

// ============================================
// 5. COMMON PATTERNS
// ============================================
/*
CENTERING:
  display: flex;
  justify-content: center;
  align-items: center;

EQUAL WIDTH:
  .item { flex: 1; }

NAVBAR:
  display: flex;
  justify-content: space-between;
*/
`
};

export default cssFlexbox;

