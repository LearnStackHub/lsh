const cssGrid = {
  id: 'css-grid',
  title: 'CSS Grid - Two-Dimensional Layout',
  description: 'Learn CSS Grid for creating complex two-dimensional layouts with rows and columns',
  content: `
# CSS Grid — Two-Dimensional Layout

CSS Grid is a powerful layout system for creating two-dimensional layouts (rows and columns). Perfect for complex page layouts.

---

## What is CSS Grid?

**Grid** is a two-dimensional layout system:
- **Rows** - Horizontal tracks
- **Columns** - Vertical tracks
- **Cells** - Intersection of row and column

**Key Concepts:**
- **Container** - Parent with \`display: grid\`
- **Items** - Children placed in grid
- **Tracks** - Rows and columns
- **Lines** - Boundaries between tracks

---

## Creating a Grid Container

\`\`\`css
.container {
  display: grid;
}
\`\`\`

---

## Defining Columns

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;  /* 3 columns, 200px each */
  grid-template-columns: 1fr 1fr 1fr;        /* 3 equal columns */
  grid-template-columns: 1fr 2fr 1fr;        /* Middle column twice as wide */
  grid-template-columns: repeat(3, 1fr);      /* 3 equal columns */
  grid-template-columns: 200px 1fr 200px;    /* Fixed, flexible, fixed */
}
\`\`\`

**Units:**
- \`fr\` - Fraction (flexible unit)
- \`px\`, \`em\`, \`rem\` - Fixed units
- \`auto\` - Auto-sizing
- \`minmax()\` - Min and max size

---

## Defining Rows

\`\`\`css
.container {
  display: grid;
  grid-template-rows: 100px 200px 100px;  /* 3 rows */
  grid-template-rows: repeat(3, 1fr);     /* 3 equal rows */
  grid-template-rows: auto 1fr auto;      /* Auto, flexible, auto */
}
\`\`\`

---

## Grid Template (Shorthand)

\`\`\`css
.container {
  display: grid;
  grid-template: 
    "header header header" 80px
    "sidebar main aside" 1fr
    "footer footer footer" 60px
    / 200px 1fr 200px;
}
\`\`\`

**Format:** \`grid-template: rows / columns;\`

---

## Grid Gap

Space between grid items:

\`\`\`css
.container {
  display: grid;
  gap: 20px;              /* Both row and column gap */
  row-gap: 20px;          /* Row gap only */
  column-gap: 30px;       /* Column gap only */
  gap: 20px 30px;         /* Row gap, column gap */
}
\`\`\`

---

## Placing Items

### Grid Column

\`\`\`css
.item {
  grid-column: 1 / 3;     /* Start at line 1, end at line 3 */
  grid-column: 1 / span 2; /* Start at 1, span 2 columns */
  grid-column-start: 1;
  grid-column-end: 3;
}
\`\`\`

---

### Grid Row

\`\`\`css
.item {
  grid-row: 1 / 3;        /* Start at line 1, end at line 3 */
  grid-row: 1 / span 2;  /* Start at 1, span 2 rows */
  grid-row-start: 1;
  grid-row-end: 3;
}
\`\`\`

---

### Grid Area (Shorthand)

\`\`\`css
.item {
  grid-area: 1 / 1 / 3 / 3;  /* row-start / col-start / row-end / col-end */
}
\`\`\`

---

## Named Grid Areas

### Define Areas

\`\`\`css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 80px 1fr 60px;
}
\`\`\`

### Place Items

\`\`\`css
.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}

.aside {
  grid-area: aside;
}

.footer {
  grid-area: footer;
}
\`\`\`

---

## Auto-Fit and Auto-Fill

### Auto-Fit

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
\`\`\`

**Creates:** As many columns as fit, minimum 250px each

---

### Auto-Fill

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
\`\`\`

**Difference:** \`auto-fit\` collapses empty tracks, \`auto-fill\` keeps them

---

## Alignment

### Justify Items (Horizontal)

\`\`\`css
.container {
  display: grid;
  justify-items: start;   /* Left */
  justify-items: center;   /* Center */
  justify-items: end;     /* Right */
  justify-items: stretch; /* Default - fill cell */
}
\`\`\`

---

### Align Items (Vertical)

\`\`\`css
.container {
  display: grid;
  align-items: start;     /* Top */
  align-items: center;    /* Center */
  align-items: end;       /* Bottom */
  align-items: stretch;   /* Default */
}
\`\`\`

---

### Justify Content (Grid Container)

\`\`\`css
.container {
  display: grid;
  justify-content: start;
  justify-content: center;
  justify-content: end;
  justify-content: space-between;
}
\`\`\`

---

## Real-Time Scenarios

### Scenario 1: Page Layout

\`\`\`css
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 250px;
  grid-template-rows: 80px 1fr 60px;
  min-height: 100vh;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
\`\`\`

### Scenario 2: Responsive Card Grid

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
\`\`\`

### Scenario 3: Image Gallery

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.gallery-item:first-child {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
\`\`\`

---

## Grid vs Flexbox

| Feature | Grid | Flexbox |
|---------|------|---------|
| Dimensions | 2D (rows & columns) | 1D (row OR column) |
| Use Case | Page layouts | Component layouts |
| Alignment | Both axes | One axis at a time |
| Overlap | Yes | No |

**Use Grid for:** Page layouts, complex 2D layouts
**Use Flexbox for:** Component layouts, navigation, simple 1D layouts

---

## Best Practices

1. **Use Grid for page layouts**
2. **Use Flexbox for components**
3. **Use \`fr\` units** - For flexible sizing
4. **Use \`gap\`** - Instead of margins
5. **Name grid areas** - For clarity

---

## Summary

CSS Grid is a two-dimensional layout system that lets you create complex layouts with rows and columns. To create a grid, use \`display: grid\` on a container. Define your columns with \`grid-template-columns\` and rows with \`grid-template-rows\`. You can also use \`grid-template-areas\` to create named areas, which makes your layout code more readable. Use the \`gap\` property to add space between grid items.

For grid items, you can control placement using \`grid-column\` to specify which columns an item spans, \`grid-row\` for rows, or \`grid-area\` to place items in named areas.

For responsive designs, you can use \`repeat(auto-fit, minmax())\` to automatically create as many columns as fit in the available space, with each column having a minimum and maximum size. This is perfect for creating responsive card grids that adapt to different screen sizes.

Grid is perfect for complex two-dimensional layouts like page layouts, image galleries, and dashboard interfaces. It works great alongside Flexbox, which is better for one-dimensional layouts.

---

## 10 Important CSS Grid Interview Questions

1. **What problem does CSS Grid solve?**  
   **Two-dimensional** layout: explicit **rows and columns** with alignment, **gaps**, and **named areas**. Ideal for **page shells**, **dashboards**, **galleries**. Unlike Flex (primarily **1D**), Grid models **both** axes simultaneously.

2. **What do \`grid-template-columns\` and \`fr\` units mean?**  
   **fr** = **fraction** of **remaining** free space after **min-content** contributions. **\`1fr 2fr\`** splits space **1:2**. **\`minmax(200px, 1fr)\`** prevents columns shrinking below **200px**—key for **responsive** grids.

3. **What does \`repeat(auto-fit, minmax(250px, 1fr))\` achieve?**  
   **Responsive** columns without **media queries**: as many **250px-min** tracks as fit, **stretch** to fill (\`auto-fit\` collapses empty tracks). **auto-fill** keeps **empty** tracks—subtle difference for **sparse** rows.

4. **How does \`grid-template-areas\` help readability?**  
   ASCII-art **layout** maps (\`"header header"\`) assign **names** to **cells**; children use **\`grid-area: header\`**. Great for **prototypes** and **team** communication. Reflow by **renaming** areas at breakpoints.

5. **What is the difference between \`justify-items\` and \`justify-self\`?**  
   In the default horizontal writing mode, **justify-*** aligns items along the **inline axis** (column direction) inside each **grid area**; **align-*** aligns along the **block axis** (row direction). **-items** sets the default for **all** cells; **-self** overrides **one** item. In vertical writing modes those axes swap—avoid confusing Grid with Flexbox “main/cross” unless you map axes explicitly.

6. **What are implicit vs explicit grid tracks?**  
   **Explicit** tracks come from **template-rows/columns**. **Implicit** tracks are **auto-created** when you place **more** items than defined—sized with **grid-auto-rows/columns**. **Dense** packing (\`grid-auto-flow: row dense\`) fills **holes** but can reorder **visual** vs **DOM** reading order—**accessibility** caution.

7. **How do you overlap grid items?**  
   Place two items in the **same** **grid-area** or overlapping **line ranges**. Use **z-index** for **stacking**. Useful for **badges** on **cards**—often simpler than **absolute** positioning if already in **grid**.

8. **What is subgrid (\`grid-template-rows: subgrid\`)?**  
   Lets nested grids **align** to **parent** track definitions—great for **card** titles lining up across **rows**. **Growing** browser support—**fallbacks** may be needed for **older** browsers.

9. **Grid vs Flexbox in interviews—practical split?**  
   **Grid** for **macro** layout (sections, columns). **Flex** for **micro** layout (icon + label row). **Grid** handles **2D** alignment; **Flex** is simpler when you only need **one** axis distribution.

10. **What is \`minmax()\` with \`min-content\` and \`max-content\`?**  
    **min-content** is the **smallest** size without **overflow** (often **longest word** width). **max-content** is **as wide as content wants**. Used in **advanced** grids to let **tracks** respond to **typography** and **images**.

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

---

## Deep Theory: Grid as Two-Dimensional Constraint System

CSS Grid is a declarative spatial model for arranging content in both rows and columns simultaneously. Unlike Flexbox, Grid solves macro layout composition.

### Structural Concepts

- tracks: row/column sizing units,
- lines: boundaries used for placement,
- areas: named logical regions,
- implicit grid: auto-generated structure when placement exceeds explicit definition.

Grid lets layout be expressed in terms of relationships rather than absolute coordinates.

### Why Grid Matters

Page-level systems often require alignment across both axes. Grid minimizes layout coupling and enables strong visual rhythm with fewer media-query overrides.

### Theoretical Advantage

Grid separates content order from visual placement while preserving semantic HTML order. This supports maintainability and progressive enhancement when used carefully.

`,
  code: `// CSS Grid

/*
 * GRID = TWO-DIMENSIONAL LAYOUT
 * =============================
 * 
 * Rows and columns layout system
 */

// ============================================
// 1. GRID CONTAINER
// ============================================
/*
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px 1fr 100px;
    gap: 20px;
}
*/

// ============================================
// 2. DEFINING COLUMNS
// ============================================
/*
grid-template-columns: 200px 200px 200px;
grid-template-columns: 1fr 1fr 1fr;
grid-template-columns: repeat(3, 1fr);
grid-template-columns: 200px 1fr 200px;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
*/

// ============================================
// 3. PLACING ITEMS
// ============================================
/*
.item {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
    grid-area: 1 / 1 / 3 / 3;
}
*/

// ============================================
// 4. NAMED AREAS
// ============================================
/*
.container {
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
*/

// ============================================
// 5. GRID vs FLEXBOX
// ============================================
/*
GRID:    2D layout (rows & columns) - Page layouts
FLEXBOX: 1D layout (row OR column) - Components
*/
`
};

export default cssGrid;

