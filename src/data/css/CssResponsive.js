const cssResponsive = {
  id: 'css-responsive',
  title: 'CSS Responsive Design - Media Queries',
  description: 'Learn how to create responsive websites that work on all devices using media queries',
  content: `
# CSS Responsive Design — Media Queries

Responsive design ensures your website looks great on all devices - mobile, tablet, and desktop. Media queries make this possible.

---

## What is Responsive Design?

**Responsive Design** means your website adapts to different screen sizes:
- **Mobile** - Small screens (phones)
- **Tablet** - Medium screens
- **Desktop** - Large screens

**Goal:** One website that works everywhere!

---

## Viewport Meta Tag

**Essential for mobile:**

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

**Without this:** Mobile browsers zoom out, making text tiny

---

## Media Queries

Media queries apply styles based on device characteristics:

\`\`\`css
@media (max-width: 768px) {
  /* Styles for screens smaller than 768px */
  body {
    font-size: 14px;
  }
}
\`\`\`

---

## Common Breakpoints

\`\`\`css
/* Mobile */
@media (max-width: 640px) {
  /* Phone styles */
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  /* Tablet styles */
}

/* Desktop */
@media (min-width: 1025px) {
  /* Desktop styles */
}
\`\`\`

**Common breakpoints:**
- **Mobile:** 320px - 640px
- **Tablet:** 641px - 1024px
- **Desktop:** 1025px+

---

## Media Query Syntax

\`\`\`css
@media (condition) {
  /* CSS rules */
}
\`\`\`

**Conditions:**
- \`max-width: 768px\` - Screen width ≤ 768px
- \`min-width: 1024px\` - Screen width ≥ 1024px
- \`orientation: landscape\` - Landscape mode
- \`orientation: portrait\` - Portrait mode

---

## Responsive Patterns

### Mobile-First Approach

\`\`\`css
/* Base styles (mobile) */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    width: 750px;
    padding: 20px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    width: 1200px;
    padding: 30px;
  }
}
\`\`\`

**Benefits:** Start with mobile, enhance for larger screens

---

### Desktop-First Approach

\`\`\`css
/* Base styles (desktop) */
.container {
  width: 1200px;
  padding: 30px;
}

/* Tablet and down */
@media (max-width: 1024px) {
  .container {
    width: 750px;
    padding: 20px;
  }
}

/* Mobile and down */
@media (max-width: 768px) {
  .container {
    width: 100%;
    padding: 10px;
  }
}
\`\`\`

---

## Responsive Typography

\`\`\`css
/* Base (mobile) */
h1 {
  font-size: 24px;
}

/* Tablet */
@media (min-width: 768px) {
  h1 {
    font-size: 32px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  h1 {
    font-size: 48px;
  }
}
\`\`\`

---

## Responsive Images

\`\`\`css
img {
  max-width: 100%;
  height: auto;
}
\`\`\`

**Result:** Images scale to fit container

---

## Responsive Grid

### Flexbox

\`\`\`css
.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex: 1 1 100%;  /* Mobile: full width */
}

@media (min-width: 768px) {
  .item {
    flex: 1 1 50%;  /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .item {
    flex: 1 1 33.33%;  /* Desktop: 3 columns */
  }
}
\`\`\`

---

### CSS Grid

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr;  /* Mobile: 1 column */
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);  /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(3, 1fr);  /* Desktop: 3 columns */
  }
}
\`\`\`

---

## Real-Time Scenarios

### Scenario 1: Responsive Navigation

\`\`\`css
/* Desktop: Horizontal menu */
.nav {
  display: flex;
  gap: 20px;
}

/* Mobile: Hamburger menu */
@media (max-width: 768px) {
  .nav {
    display: none;
  }
  
  .mobile-menu {
    display: block;
  }
}
\`\`\`

### Scenario 2: Responsive Cards

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: 1fr;  /* Mobile: 1 column */
  gap: 20px;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);  /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);  /* Desktop: 3 columns */
  }
}
\`\`\`

### Scenario 3: Hide/Show Elements

\`\`\`css
.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  
  .mobile-only {
    display: block;
  }
}
\`\`\`

---

## Responsive Units

### Relative Units

\`\`\`css
.container {
  width: 100%;        /* Percentage of parent */
  font-size: 1rem;    /* Relative to root */
  font-size: 1em;     /* Relative to parent */
  width: 50vw;        /* 50% of viewport width */
  height: 50vh;       /* 50% of viewport height */
}
\`\`\`

**Viewport Units:**
- \`vw\` - Viewport width (1vw = 1% of viewport width)
- \`vh\` - Viewport height (1vh = 1% of viewport height)
- \`vmin\` - Smaller of vw or vh
- \`vmax\` - Larger of vw or vh

---

## Best Practices

1. **Mobile-first approach** - Start with mobile, enhance for larger screens
2. **Use relative units** - \`rem\`, \`%\`, \`vw\`, \`vh\`
3. **Test on real devices** - Not just browser resize
4. **Use flexible images** - \`max-width: 100%\`
5. **Keep breakpoints consistent** - Use same breakpoints throughout

---

## Summary

Media queries let you apply different styles based on device characteristics. Use \`@media (max-width: 768px)\` to target screens smaller than 768px, \`@media (min-width: 1024px)\` for larger screens, and \`@media (orientation: landscape)\` for landscape orientation.

Responsive design uses several key techniques. Make images flexible with \`max-width: 100%\` so they scale to fit their containers. Use relative units like \`rem\`, percentages, \`vw\`, and \`vh\` instead of fixed pixels. Create flexible layouts using Flexbox or Grid that adapt to different screen sizes. The mobile-first approach means you start with mobile styles and enhance for larger screens.

Common breakpoints are mobile devices (640px and below), tablets (641px to 1024px), and desktops (1025px and above). However, you should test your design on actual devices and adjust breakpoints based on your content.

Responsive design ensures your site works on all devices, providing a good user experience whether someone visits on a phone, tablet, or desktop computer.

---

## 10 Important CSS Responsive Design Interview Questions

1. **What is the viewport meta tag and why is it required?**  
   **\`<meta name="viewport" content="width=device-width, initial-scale=1">\`** maps CSS **px** to **device-independent** pixels and sets **initial zoom**. Without it, mobile browsers may assume **~980px** layout width—your **media queries** won’t match expectations.

2. **What is mobile-first vs desktop-first CSS?**  
   **Mobile-first**: base styles for **small** screens, **\`min-width\`** media queries **add** complexity for larger. **Desktop-first** uses **\`max-width\`** to **simplify** down. **Mobile-first** is **default** in modern tutorials—**lighter** CSS for phones on **first paint**.

3. **How do \`min-width\` and \`max-width\` media queries differ?**  
   **\`@media (min-width: 768px)\`** applies when viewport **≥ 768**. **max-width** applies when **≤**. **Inclusive** boundaries matter—avoid **1px gaps** between breakpoints; use **consistent** tokens (\`767px\` vs \`768px\`).

4. **What units are common for responsive typography and layout?**  
   **rem** for type (scales with **root**), **%** for **fluid** widths, **vw/vh** for **viewport-relative** (careful: **vh** includes mobile **browser UI** quirks—\`dvh\` **dynamic** viewport units help). **clamp()** for **fluid** type without **many** breakpoints.

5. **What is a breakpoint and how do you choose them?**  
   A **width** where layout **changes**. Prefer **content-based** breakpoints (“**design breaks**”) over **device** stereotypes. **Test** real **content**—long **German** words shift layouts. **Standard** values (640/768/1024) are only **starting points**.

6. **How do images behave responsively?**  
   **\`max-width: 100%; height: auto;\`** for **intrinsic** scaling. **\`srcset\`/\`sizes\`** on **\`<img>\`** serve **appropriate** resolution. **CSS** **background** images are harder for **art direction**—**picture** element for **critical** **LCP** images.

7. **What is \`clamp(min, preferred, max)\` used for?**  
   **Fluid** sizing without **media queries**: e.g. **\`font-size: clamp(1rem, 2.5vw, 1.25rem)\`**. **preferred** usually mixes **vw** with **rem** for **scalable** UI. **Test** **extreme** viewports.

8. **How does \`orientation: portrait\` media query help?**  
   Targets **tall** vs **wide** viewports—useful for **video** players or **split** layouts. **Not** a substitute for **width** breakpoints—tablets can be **landscape** with **large** width.

9. **What are common responsive accessibility concerns?**  
   **Touch targets** ≥ **44×44px**, **readable** font sizes, **no horizontal scroll** for **text** blocks, **contrast** maintained in **dark** themes. **Zoom** to **200%** should not **break** layout (**WCAG**).

10. **How do container queries differ from viewport media queries?**  
    **\`@container\`** responds to **parent container** width—**component-level** responsiveness inside **sidebars** vs **main**. **Growing** support—**progressive enhancement** for **design systems**.

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

---

## Deep Theory: Responsive Design as Adaptive Constraint Design

Responsive design is not just "fit to screen." It is adaptation of information architecture under changing viewport, input mode, and device capability constraints.

### Foundational Principle

A layout is responsive when meaning remains stable while presentation adapts. The same content must preserve hierarchy, readability, and interaction quality across contexts.

### Technical Model

- fluid sizing handles continuous change,
- breakpoints handle discontinuous structural change,
- media and container queries decide where adaptation is triggered.

### Why Mobile-First Is Preferred

Mobile-first optimizes baseline experience under strict constraints, then progressively enhances. This generally leads to cleaner cascade logic and lower CSS complexity.

### Quality Criterion

True responsiveness is measured by task success and readability, not by matching device names.

`,
  code: `// CSS Responsive Design

/*
 * RESPONSIVE = WORKS ON ALL DEVICES
 * ==================================
 */

// ============================================
// 1. VIEWPORT META TAG
// ============================================
/*
<meta name="viewport" content="width=device-width, initial-scale=1.0">
  → Essential for mobile
*/

// ============================================
// 2. MEDIA QUERIES
// ============================================
/*
@media (max-width: 768px) {
    /* Mobile styles */
}

@media (min-width: 1024px) {
    /* Desktop styles */
}
*/

// ============================================
// 3. COMMON BREAKPOINTS
// ============================================
/*
MOBILE:   ≤ 640px
TABLET:   641px - 1024px
DESKTOP:  ≥ 1025px
*/

// ============================================
// 4. RESPONSIVE IMAGES
// ============================================
/*
img {
    max-width: 100%;
    height: auto;
}
*/

// ============================================
// 5. RESPONSIVE GRID
// ============================================
/*
.container {
    display: grid;
    grid-template-columns: 1fr;  /* Mobile */
}

@media (min-width: 768px) {
    .container {
        grid-template-columns: repeat(2, 1fr);  /* Tablet */
    }
}
*/
`
};

export default cssResponsive;

