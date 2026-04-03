const htmlLists = {
  id: 'html-lists',
  title: 'HTML Lists - Ordered, Unordered & Description Lists',
  description: 'Learn how to create ordered lists, unordered lists, and description lists in HTML',
  content: `
# HTML Lists - Ordered, Unordered & Description Lists

HTML lists are structural elements designed to organize and present information in an ordered, hierarchical, or descriptive format. HTML provides three types of lists: unordered lists for bullet points, ordered lists for numbered sequences, and description lists for term-definition pairs. Lists are fundamental for content organization, navigation menus, and structured information presentation.

Enterprise web applications extensively use lists for navigation menus, content organization, feature lists, step-by-step instructions, and data presentation. Lists improve content readability, enable semantic structure, and enhance accessibility. Understanding list types and their appropriate usage is essential for building well-structured, accessible web applications.

**List Types:**
- **Unordered Lists (\`<ul>\`)**: Bullet points for non-sequential items
- **Ordered Lists (\`<ol>\`)**: Numbered sequences for ordered items
- **Description Lists (\`<dl>\`)**: Term-definition pairs for glossaries

---

## Types of Lists

1. **Unordered List** (\`<ul>\`) - Bullet points
2. **Ordered List** (\`<ol>\`) - Numbered items
3. **Description List** (\`<dl>\`) - Terms and definitions

---

## 1. Unordered List (Bullet Points)

\`\`\`html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
\`\`\`

**Result:**
- Item 1
- Item 2
- Item 3

---

### Nested Unordered Lists

\`\`\`html
<ul>
    <li>Fruits
        <ul>
            <li>Apple</li>
            <li>Banana</li>
            <li>Orange</li>
        </ul>
    </li>
    <li>Vegetables
        <ul>
            <li>Carrot</li>
            <li>Broccoli</li>
        </ul>
    </li>
</ul>
\`\`\`

---

## 2. Ordered List (Numbered)

\`\`\`html
<ol>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ol>
\`\`\`

**Result:**
1. First item
2. Second item
3. Third item

---

### Ordered List Attributes

\`\`\`html
<!-- Start from specific number -->
<ol start="5">
    <li>Item 5</li>
    <li>Item 6</li>
</ol>

<!-- Reverse order -->
<ol reversed>
    <li>Third</li>
    <li>Second</li>
    <li>First</li>
</ol>

<!-- Type of numbering -->
<ol type="1">   <!-- 1, 2, 3 (default) -->
<ol type="A">   <!-- A, B, C -->
<ol type="a">   <!-- a, b, c -->
<ol type="I">   <!-- I, II, III (Roman) -->
<ol type="i">   <!-- i, ii, iii (lowercase Roman) -->
\`\`\`

**Examples:**
\`\`\`html
<ol type="A">
    <li>First</li>
    <li>Second</li>
</ol>
<!-- Result: A. First, B. Second -->

<ol type="I">
    <li>First</li>
    <li>Second</li>
</ol>
<!-- Result: I. First, II. Second -->
\`\`\`

---

### Nested Ordered Lists

\`\`\`html
<ol>
    <li>Step 1: Prepare
        <ol type="a">
            <li>Gather materials</li>
            <li>Set up workspace</li>
        </ol>
    </li>
    <li>Step 2: Execute
        <ol type="a">
            <li>Follow instructions</li>
            <li>Check progress</li>
        </ol>
    </li>
</ol>
\`\`\`

---

## 3. Description List (Terms & Definitions)

\`\`\`html
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language - the standard markup language for web pages</dd>
    
    <dt>CSS</dt>
    <dd>Cascading Style Sheets - used for styling web pages</dd>
    
    <dt>JavaScript</dt>
    <dd>A programming language that makes web pages interactive</dd>
</dl>
\`\`\`

**Components:**
- \`<dl>\` - Description List
- \`<dt>\` - Definition Term
- \`<dd>\` - Definition Description

**Result:**
HTML
: HyperText Markup Language - the standard markup language for web pages

CSS
: Cascading Style Sheets - used for styling web pages

---

### Multiple Definitions for One Term

\`\`\`html
<dl>
    <dt>Java</dt>
    <dd>A programming language</dd>
    <dd>An island in Indonesia</dd>
    <dd>A type of coffee</dd>
</dl>
\`\`\`

---

## List Item Attributes

### Value Attribute (Ordered Lists)

\`\`\`html
<ol>
    <li>First</li>
    <li value="5">Fifth (skips 2, 3, 4)</li>
    <li>Sixth</li>
</ol>
\`\`\`

**Result:**
1. First
5. Fifth
6. Sixth

---

## Styling Lists with CSS

### Change Bullet Style (Unordered)

\`\`\`html
<ul style="list-style-type: disc;">     <!-- Default: filled circle -->
<ul style="list-style-type: circle;">  <!-- Hollow circle -->
<ul style="list-style-type: square;">   <!-- Square -->
<ul style="list-style-type: none;">     <!-- No bullet -->
\`\`\`

### Custom Bullets

\`\`\`html
<ul style="list-style-type: '✓ ';">
    <li>Completed task</li>
    <li>Another task</li>
</ul>
\`\`\`

---

## Real-Time Scenarios

### Scenario 1: Navigation Menu

\`\`\`html
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
\`\`\`

### Scenario 2: Recipe Instructions

\`\`\`html
<h2>How to Make Coffee</h2>
<ol>
    <li>Boil water</li>
    <li>Add coffee grounds to filter</li>
    <li>Pour hot water over grounds</li>
    <li>Wait for coffee to brew</li>
    <li>Serve and enjoy</li>
</ol>
\`\`\`

### Scenario 3: Product Features

\`\`\`html
<h3>Product Features</h3>
<ul>
    <li>High performance processor</li>
    <li>16GB RAM</li>
    <li>512GB SSD storage</li>
    <li>Long battery life</li>
    <li>Lightweight design</li>
</ul>
\`\`\`

### Scenario 4: Glossary

\`\`\`html
<h2>Web Development Glossary</h2>
<dl>
    <dt>Frontend</dt>
    <dd>The part of a website users interact with</dd>
    
    <dt>Backend</dt>
    <dd>The server-side logic that processes requests</dd>
    
    <dt>API</dt>
    <dd>Application Programming Interface - allows communication between applications</dd>
</dl>
\`\`\`

### Scenario 5: Table of Contents

\`\`\`html
<h2>Table of Contents</h2>
<ol>
    <li>Introduction</li>
    <li>Getting Started
        <ol type="a">
            <li>Installation</li>
            <li>Configuration</li>
        </ol>
    </li>
    <li>Advanced Topics</li>
    <li>Conclusion</li>
</ol>
\`\`\`

---

## Best Practices

1. **Use appropriate list type**
   - Steps/Instructions → \`<ol>\`
   - Features/Items → \`<ul>\`
   - Terms/Definitions → \`<dl>\`

2. **Keep items concise**
   - List items should be brief
   - Use paragraphs inside \`<li>\` for longer content

3. **Nest properly**
   - Close inner lists before outer lists
   - Maintain proper indentation

4. **Use semantic lists**
   - Don't use lists just for styling
   - Use lists when content is actually a list

---

## Common Mistakes

### Mistake 1: Forgetting Closing Tags

\`\`\`html
❌ <ul>
     <li>Item 1
     <li>Item 2
   </ul>

✅ <ul>
     <li>Item 1</li>
     <li>Item 2</li>
   </ul>
\`\`\`

### Mistake 2: Using Lists for Layout

\`\`\`html
❌ <ul>
     <li>Header</li>
     <li>Content</li>
     <li>Footer</li>
   </ul>

✅ Use <header>, <main>, <footer> semantic tags
\`\`\`

### Mistake 3: Missing List Items

\`\`\`html
❌ <ul>
     Text without <li>
   </ul>

✅ <ul>
     <li>Text in list item</li>
   </ul>
\`\`\`

---

## Summary

**List Types:**
- ✅ \`<ul>\` - Unordered (bullet points)
- ✅ \`<ol>\` - Ordered (numbered)
- ✅ \`<dl>\` - Description (terms & definitions)

**List Elements:**
- ✅ \`<li>\` - List item (for ul and ol)
- ✅ \`<dt>\` - Definition term (for dl)
- ✅ \`<dd>\` - Definition description (for dl)

**Ordered List Attributes:**
- ✅ \`type\` - Numbering style (1, A, I, etc.)
- ✅ \`start\` - Starting number
- ✅ \`reversed\` - Reverse order
- ✅ \`value\` - Set item number (on <li>)

Lists are essential for organizing content on web pages!

---

## Full-stack Java tutorials — quick links

Use these tutorials as you build the full stack after HTML: styling, backend, data, and APIs.

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

## 10 Important HTML Lists Interview Questions

1. **What are the three main list types in HTML?**  
   **\`<ul>\` (unordered list)** for items where sequence does not matter—typically **bullets**. **\`<ol>\` (ordered list)** when **order is meaningful**—steps, rankings, legal clauses—typically **numbers**. **\`<dl>\` (description list)** pairs **terms** (\`<dt>\`) with **descriptions** (\`<dd>\`)—glossaries, metadata, FAQ-style pairs. Choosing the right list type helps **screen readers** announce content correctly (e.g. “list, three items” vs “numbered list”).

2. **When should you use \`<ol>\` vs \`<ul>\`?**  
   Use **\`<ol>\`** when changing the order would **change the meaning** (recipe steps, tutorial instructions). Use **\`<ul>\`** for **sets** where order is arbitrary (feature lists, nav items). If you only number for **decoration**, that is a **styling** concern—still use \`<ul>\` and style with CSS, unless the numbers carry **semantic** meaning.

3. **What is \`<li>\`?**  
   The **list item** element. Only \`<li>\` should be direct children of \`<ul>\` or \`<ol>\` (plus script-supporting elements in some cases). Each \`<li>\` can contain **flow content**: paragraphs, nested lists, links, etc. **Never** put bare text or other elements directly under \`<ul>\` without wrapping in \`<li>\`.

4. **Can lists be nested?**  
   Yes. Put the **inner** \`<ul>\` or \`<ol>\` **inside** an \`<li>\` of the outer list. This pattern builds **multi-level** navigation, outlines, and sub-steps. **Deep nesting** hurts usability—consider **flattening** or **headings** for very complex structures. Screen readers announce **nesting level**, so keep hierarchy meaningful.

5. **What are \`<dl>\`, \`<dt>\`, and \`<dd>\`?**  
   A **description list** groups **name–value** pairs. **\`<dt>\`** = term (name). **\`<dd>\`** = description (one or more \`<dd>\` per \`<dt>\` is allowed). Common uses: **glossary**, **product specs**, **key–value** metadata. Do **not** misuse \`<dl>\` for arbitrary columns—if it is not term/definition semantics, a **table** or **grid** may fit better.

6. **What does the \`start\` attribute on \`<ol>\` do?**  
   It sets the **numeric starting value** for the list (e.g. continue a procedure from step 5 across sections: \`<ol start="5">\`). This affects **accessibility** and **printed** documents. Combine with **CSS counters** for advanced styling if needed.

7. **What does \`reversed\` do on \`<ol>\`?**  
   It numbers items in **descending** order (e.g. top-10 countdown). The **browser** handles numbering; you still author \`<li>\` in **document order**. Test with **screen readers** to ensure the announcement matches user expectations.

8. **How do you change bullet/number style?**  
   Use **CSS** \`list-style-type\` on \`<ul>\`/\`<ol>\` (e.g. \`disc\`, \`circle\`, \`decimal\`, \`lower-roman\`). The old **\`type\`** attribute on \`<ol>\`/\`<ul>\` still exists but **CSS** is preferred for maintainability. For **custom** bullets, **\`list-style: none\`** plus **pseudo-elements** or background images is common.

9. **Is it valid to put raw text directly inside \`<ul>\`?**  
   **No**—only \`<li>\` (and certain **script/template** elements) belong as direct children. Raw text nodes under \`<ul>\` are **invalid** and confuse parsers and assistive tech. Always wrap content in \`<li>\`.

10. **Why use a list for navigation?**  
    A **\`<nav>\`** containing a **\`<ul>\` of links** is a widely recognized **pattern**: screen readers announce **“navigation, list, N items”**, and keyboard users can move predictably. **Divs** with links work visually but lose **list semantics**. Combine with **focus styles** and **ARIA** only when patterns are nonstandard.

`,
  code: `// HTML Lists

/*
 * LISTS ORGANIZE CONTENT
 * ======================
 * 
 * Three types: Unordered, Ordered, Description
 */

// ============================================
// 1. UNORDERED LIST (Bullet Points)
// ============================================
/*
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>

Result:
  • Item 1
  • Item 2
  • Item 3
*/

// ============================================
// 2. ORDERED LIST (Numbered)
// ============================================
/*
<ol>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ol>

Result:
  1. First item
  2. Second item
  3. Third item

ATTRIBUTES:
  <ol start="5">        → Start from 5
  <ol reversed>         → Reverse order
  <ol type="A">         → A, B, C
  <ol type="I">         → I, II, III (Roman)
  <li value="5">        → Set item number
*/

// ============================================
// 3. DESCRIPTION LIST (Terms & Definitions)
// ============================================
/*
<dl>
    <dt>Term</dt>
    <dd>Definition</dd>
    
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
</dl>

Components:
  <dl>  → Description List
  <dt>  → Definition Term
  <dd>  → Definition Description
*/

// ============================================
// 4. NESTED LISTS
// ============================================
/*
<ul>
    <li>Category 1
        <ul>
            <li>Sub-item 1</li>
            <li>Sub-item 2</li>
        </ul>
    </li>
    <li>Category 2
        <ol>
            <li>Step 1</li>
            <li>Step 2</li>
        </ol>
    </li>
</ul>
*/

// ============================================
// 5. LIST STYLING (CSS)
// ============================================
/*
<ul style="list-style-type: disc;">     → Filled circle
<ul style="list-style-type: circle;">  → Hollow circle
<ul style="list-style-type: square;">  → Square
<ul style="list-style-type: none;">     → No bullet
*/

// ============================================
// 6. REAL-WORLD USAGE
// ============================================
/*
NAVIGATION MENU:
  <nav>
      <ul>
          <li><a href="home.html">Home</a></li>
          <li><a href="about.html">About</a></li>
      </ul>
  </nav>

RECIPE INSTRUCTIONS:
  <ol>
      <li>Step 1</li>
      <li>Step 2</li>
  </ol>

GLOSSARY:
  <dl>
      <dt>Term</dt>
      <dd>Definition</dd>
  </dl>
*/

// ============================================
// 7. BEST PRACTICES
// ============================================
/*
✅ Use <ol> for steps/instructions
✅ Use <ul> for features/items
✅ Use <dl> for terms/definitions
✅ Keep items concise
✅ Nest properly
✅ Always close tags
*/
`
};

export default htmlLists;


