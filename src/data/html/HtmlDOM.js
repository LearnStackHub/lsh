const htmlDOM = {
  id: 'html-dom',
  title: 'HTML DOM - Document Object Model',
  description: 'Learn about the Document Object Model (DOM) and how HTML elements become objects that can be manipulated',
  content: `
# HTML DOM - Document Object Model

The DOM (Document Object Model) is a programming interface that represents HTML documents as a hierarchical tree of objects that can be accessed and manipulated programmatically. The DOM enables JavaScript to interact with HTML elements, modify content, change styles, handle events, and create dynamic web experiences. Understanding the DOM is fundamental to JavaScript programming and building interactive web applications.

Enterprise web applications rely heavily on DOM manipulation for dynamic content updates, user interactions, form validation, and single-page application (SPA) functionality. The DOM serves as the bridge between HTML structure and JavaScript functionality, enabling developers to create responsive, interactive user interfaces. Mastery of the DOM is essential for modern frontend development.

**DOM Concepts:**
- **Tree Structure**: Hierarchical representation of HTML elements
- **Node Types**: Elements, text, attributes, comments
- **DOM Methods**: Access and manipulate elements
- **Event Handling**: Respond to user interactions

---

## What is DOM?

**DOM** = Document Object Model

- **Document** - The HTML page
- **Object** - Elements become objects
- **Model** - Tree structure representation

**In simple terms:** DOM is how browsers see and interact with HTML.

---

## DOM Tree Structure

When browser loads HTML, it creates a tree:

\`\`\`html
<!DOCTYPE html>
<html>
    <head>
        <title>My Page</title>
    </head>
    <body>
        <h1>Hello</h1>
        <p>World</p>
    </body>
</html>
\`\`\`

**DOM Tree:**
\`\`\`
Document
└── html
    ├── head
    │   └── title
    │       └── "My Page"
    └── body
        ├── h1
        │   └── "Hello"
        └── p
            └── "World"
\`\`\`

---

## DOM Nodes

Everything in DOM is a **node**:

1. **Element Node** - HTML tags (\`<div>\`, \`<p>\`, etc.)
2. **Text Node** - Text content
3. **Attribute Node** - Attributes (\`id\`, \`class\`, etc.)
4. **Comment Node** - HTML comments

---

## Accessing DOM Elements

### By ID

\`\`\`html
<div id="myDiv">Content</div>

<script>
    const element = document.getElementById('myDiv');
    console.log(element); // <div id="myDiv">Content</div>
</script>
\`\`\`

### By Class Name

\`\`\`html
<div class="item">Item 1</div>
<div class="item">Item 2</div>

<script>
    const elements = document.getElementsByClassName('item');
    console.log(elements); // HTMLCollection of elements
</script>
\`\`\`

### By Tag Name

\`\`\`html
<p>Paragraph 1</p>
<p>Paragraph 2</p>

<script>
    const paragraphs = document.getElementsByTagName('p');
    console.log(paragraphs); // HTMLCollection
</script>
\`\`\`

### By Query Selector (Modern)

\`\`\`html
<div id="container">
    <p class="text">Hello</p>
</div>

<script>
    // Select by ID
    const div = document.querySelector('#container');
    
    // Select by class
    const text = document.querySelector('.text');
    
    // Select all
    const allText = document.querySelectorAll('.text');
</script>
\`\`\`

---

## Manipulating DOM

### Changing Content

\`\`\`html
<p id="demo">Original Text</p>

<script>
    document.getElementById('demo').innerHTML = 'New Text';
    // or
    document.getElementById('demo').textContent = 'New Text';
</script>
\`\`\`

**Difference:**
- \`innerHTML\` - Can include HTML tags
- \`textContent\` - Plain text only

---

### Changing Attributes

\`\`\`html
<img id="myImage" src="old.jpg" alt="Old">

<script>
    const img = document.getElementById('myImage');
    img.src = 'new.jpg';
    img.alt = 'New';
    img.setAttribute('width', '500');
</script>
\`\`\`

---

### Changing Styles

\`\`\`html
<p id="text">Hello</p>

<script>
    const text = document.getElementById('text');
    text.style.color = 'red';
    text.style.fontSize = '20px';
    text.style.backgroundColor = 'yellow';
</script>
\`\`\`

---

### Adding/Removing Elements

\`\`\`html
<div id="container"></div>

<script>
    const container = document.getElementById('container');
    
    // Create element
    const p = document.createElement('p');
    p.textContent = 'New paragraph';
    
    // Add to DOM
    container.appendChild(p);
    
    // Remove element
    container.removeChild(p);
</script>
\`\`\`

---

## DOM Events

\`\`\`html
<button id="btn">Click Me</button>

<script>
    const btn = document.getElementById('btn');
    
    btn.addEventListener('click', function() {
        alert('Button clicked!');
    });
</script>
\`\`\`

**Common Events:**
- \`click\` - Mouse click
- \`mouseover\` - Mouse enters element
- \`mouseout\` - Mouse leaves element
- \`keydown\` - Key pressed
- \`load\` - Page loaded
- \`submit\` - Form submitted

---

## Real-Time Scenarios

### Scenario 1: Form Validation

\`\`\`html
<form id="myForm">
    <input type="text" id="username" required>
    <button type="submit">Submit</button>
</form>

<script>
    document.getElementById('myForm').addEventListener('submit', function(e) {
        const username = document.getElementById('username').value;
        if (username.length < 3) {
            e.preventDefault();
            alert('Username must be at least 3 characters');
        }
    });
</script>
\`\`\`

### Scenario 2: Dynamic Content

\`\`\`html
<div id="content"></div>
<button onclick="addItem()">Add Item</button>

<script>
    let count = 0;
    function addItem() {
        const content = document.getElementById('content');
        const p = document.createElement('p');
        p.textContent = 'Item ' + (++count);
        content.appendChild(p);
    }
</script>
\`\`\`

### Scenario 3: Show/Hide Element

\`\`\`html
<p id="text">This text can be hidden</p>
<button onclick="toggleText()">Toggle</button>

<script>
    function toggleText() {
        const text = document.getElementById('text');
        if (text.style.display === 'none') {
            text.style.display = 'block';
        } else {
            text.style.display = 'none';
        }
    }
</script>
\`\`\`

---

## DOM Methods Summary

### Finding Elements
- \`getElementById(id)\` - Find by ID
- \`getElementsByClassName(class)\` - Find by class
- \`getElementsByTagName(tag)\` - Find by tag
- \`querySelector(selector)\` - Find first match
- \`querySelectorAll(selector)\` - Find all matches

### Changing Content
- \`innerHTML\` - Get/set HTML content
- \`textContent\` - Get/set text content
- \`innerText\` - Get/set visible text

### Changing Attributes
- \`getAttribute(name)\` - Get attribute value
- \`setAttribute(name, value)\` - Set attribute
- \`removeAttribute(name)\` - Remove attribute

### Manipulating Elements
- \`createElement(tag)\` - Create new element
- \`appendChild(element)\` - Add child element
- \`removeChild(element)\` - Remove child element
- \`replaceChild(new, old)\` - Replace element

### Styling
- \`style.property\` - Change CSS property
- \`classList.add(class)\` - Add CSS class
- \`classList.remove(class)\` - Remove CSS class
- \`classList.toggle(class)\` - Toggle CSS class

---

## Best Practices

1. **Use querySelector/querySelectorAll** - Modern, flexible
2. **Cache DOM elements** - Don't query repeatedly
3. **Use event delegation** - For dynamic content
4. **Minimize DOM manipulation** - Batch changes
5. **Use document fragments** - For multiple additions

---

## Summary

**DOM Concepts:**
- ✅ DOM = Tree structure of HTML
- ✅ Everything is a node
- ✅ Elements become objects
- ✅ Can be manipulated with JavaScript

**Accessing Elements:**
- ✅ \`getElementById()\`
- ✅ \`getElementsByClassName()\`
- ✅ \`querySelector()\`
- ✅ \`querySelectorAll()\`

**Manipulating:**
- ✅ Change content (\`innerHTML\`, \`textContent\`)
- ✅ Change attributes (\`setAttribute()\`)
- ✅ Change styles (\`style.property\`)
- ✅ Add/remove elements (\`appendChild()\`, \`removeChild()\`)

**Events:**
- ✅ \`addEventListener()\` - Listen to events
- ✅ Common events: click, mouseover, keydown, etc.

DOM is the bridge between HTML and JavaScript!

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

## 10 Important HTML DOM Interview Questions

1. **What is the DOM?**  
   After the browser **parses** HTML, it builds the **Document Object Model**—a **live tree** of **nodes** (objects) you can read and change with **JavaScript**. The DOM is **not** the same as the **source HTML string**; **scripts** can add/remove nodes **after** load. **CSS** also interacts via the **CSSOM**; layout uses both.

2. **What is a node vs an element?**  
   **Node** is the **generic** interface: **elements**, **text nodes**, **comments**, **document** itself. **Element** nodes represent **HTML tags** (\`HTMLElement\`, etc.). **Text** inside \`<p>Hi</p>\` is a **child text node**. **Traversing** uses properties like \`childNodes\` (includes text) vs \`children\` (elements only).

3. **What does \`document.getElementById\` do?**  
   Returns a **live reference** to the element with matching **\`id\`**, or **null**. **IDs** must be **unique**—duplicates are invalid HTML and \`getElementById\` returns an **arbitrary** match. **Fast** lookup via ID maps. Prefer **\`getElementById\`** over **\`querySelector('#id')\`** when possible (micro-optimization, clearer intent).

4. **Difference between \`querySelector\` and \`querySelectorAll\`?**  
   **\`querySelector(css)\`** returns the **first** matching **Element** or **null**. **\`querySelectorAll(css)\`** returns a **static NodeList** of **all** matches (not live for most changes). Use **modern** CSS selectors (\`:scope\`, \`:is()\`). **Live** vs **static** lists matter if you mutate the DOM while iterating.

5. **What is the difference between \`innerHTML\` and \`textContent\`?**  
   **\`innerHTML\`** parses **HTML** and can introduce **XSS** if you interpolate **untrusted** strings—**sanitize** or avoid. **\`textContent\`** assigns **plain text** (no HTML parsing), which is **safer** for user-supplied values. For performance, **textContent** is often faster than **innerHTML** for large text updates.

6. **How do you create and add an element in JS?**  
   \`const el = document.createElement('div');\` then set **properties** (\`textContent\`, \`className\`, \`attributes\`). Insert with **\`parent.append(el)\`** (modern), **\`appendChild\`**, **\`insertBefore\`**, or **\`replaceChildren\`**. Use **\`DocumentFragment\`** to batch many inserts and reduce **reflows**.

7. **What is \`addEventListener\` used for?**  
   Registers a **callback** for **DOM events** (\`click\`, \`input\`, \`keydown\`, \`submit\`). Third argument can be **\`{ capture, passive, once }\`**—**\`passive: true\`** helps **scroll** performance for touch/wheel. Prefer **\`addEventListener\`** over **\`onclick\` HTML attributes** for separation and **multiple** handlers.

8. **What is event delegation?**  
   Attach **one** listener on a **stable ancestor** (e.g. \`<ul>\`) and check **\`event.target\`** for which **child** was clicked. **Pros**: fewer listeners, works for **dynamically added** children. **Cons**: **filtering** logic needed; **focus** events don’t bubble the same way—know **event phases** (capture vs bubble).

9. **Why cache DOM queries in variables?**  
   Each **querySelector**/DOM walk has **cost**. If you reference the same element in a **hot** loop, **cache** it. **Re-query** if **third-party** scripts might **replace** nodes. **React/Vue** abstract this with **virtual DOM**—but vanilla JS interviews expect this reasoning.

10. **What is reflow/repaint in the DOM context?**  
    **Reflow** (layout): browser recalculates **positions/sizes** when geometry-affecting properties change. **Repaint**: redraw **pixels** (e.g. color) without full layout. **Batch** DOM reads/writes—alternating read/write causes **forced synchronous layout** (layout thrashing). **CSS transforms/opacity** often **composite** on the GPU with fewer reflows.

`,
  code: `// HTML DOM - Document Object Model

/*
 * DOM = TREE STRUCTURE OF HTML
 * =============================
 * 
 * Elements become objects that can be manipulated
 */

// ============================================
// 1. WHAT IS DOM
// ============================================
/*
DOM = Document Object Model
  → Tree structure of HTML
  → Elements become objects
  → Can be manipulated with JavaScript
*/

// ============================================
// 2. ACCESSING ELEMENTS
// ============================================
/*
BY ID:
  document.getElementById('myId')

BY CLASS:
  document.getElementsByClassName('myClass')

BY TAG:
  document.getElementsByTagName('p')

QUERY SELECTOR (Modern):
  document.querySelector('#myId')
  document.querySelector('.myClass')
  document.querySelectorAll('.myClass')
*/

// ============================================
// 3. MANIPULATING CONTENT
// ============================================
/*
CHANGE CONTENT:
  element.innerHTML = '<p>New HTML</p>'
  element.textContent = 'New Text'

CHANGE ATTRIBUTES:
  element.setAttribute('src', 'new.jpg')
  element.src = 'new.jpg'

CHANGE STYLES:
  element.style.color = 'red'
  element.style.fontSize = '20px'
*/

// ============================================
// 4. ADDING/REMOVING ELEMENTS
// ============================================
/*
CREATE:
  const p = document.createElement('p')

ADD:
  parent.appendChild(p)

REMOVE:
  parent.removeChild(p)
*/

// ============================================
// 5. EVENTS
// ============================================
/*
element.addEventListener('click', function() {
    // Do something
})

Common events:
  click, mouseover, mouseout
  keydown, load, submit
*/

// ============================================
// 6. BEST PRACTICES
// ============================================
/*
✅ Use querySelector (modern)
✅ Cache DOM elements
✅ Use event delegation
✅ Minimize DOM manipulation
✅ Batch changes
*/
`
};

export default htmlDOM;


