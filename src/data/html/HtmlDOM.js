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


