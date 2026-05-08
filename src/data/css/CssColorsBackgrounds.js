const cssColorsBackgrounds = {
  id: 'css-colors-backgrounds',
  title: 'CSS Colors & Backgrounds',
  description: 'Learn how to use colors, backgrounds, gradients, and images in CSS',
  content: `
# CSS Colors & Backgrounds — Adding Visual Appeal

Colors and backgrounds are fundamental to web design. Learn how to use them effectively in CSS.

---

## Colors

### Named Colors

\`\`\`css
p {
  color: red;
  background-color: blue;
}
\`\`\`

**Common named colors:**
- \`red\`, \`blue\`, \`green\`, \`yellow\`, \`black\`, \`white\`
- \`gray\`, \`orange\`, \`purple\`, \`pink\`, \`brown\`

---

### RGB Colors

\`\`\`css
p {
  color: rgb(255, 0, 0);        /* Red */
  color: rgb(0, 255, 0);        /* Green */
  color: rgb(0, 0, 255);        /* Blue */
  color: rgb(128, 128, 128);    /* Gray */
}
\`\`\`

**Format:** \`rgb(red, green, blue)\`
- Values: 0-255
- \`rgb(255, 0, 0)\` = Red
- \`rgb(0, 0, 0)\` = Black
- \`rgb(255, 255, 255)\` = White

---

### RGBA Colors (With Transparency)

\`\`\`css
p {
  color: rgba(255, 0, 0, 0.5);  /* Red with 50% opacity */
  background-color: rgba(0, 0, 255, 0.3);  /* Blue with 30% opacity */
}
\`\`\`

**Format:** \`rgba(red, green, blue, alpha)\`
- Alpha: 0.0 (transparent) to 1.0 (opaque)

---

### Hexadecimal Colors

\`\`\`css
p {
  color: #ff0000;    /* Red */
  color: #00ff00;    /* Green */
  color: #0000ff;    /* Blue */
  color: #ffffff;    /* White */
  color: #000000;    /* Black */
  color: #ff5733;    /* Orange */
}
\`\`\`

**Format:** \`#RRGGBB\`
- Each pair: 00-FF (0-255)
- \`#ff0000\` = Red
- \`#ffffff\` = White
- \`#000000\` = Black

**Short form:**
\`\`\`css
color: #f00;    /* Same as #ff0000 */
color: #0f0;    /* Same as #00ff00 */
\`\`\`

---

### HSL Colors

\`\`\`css
p {
  color: hsl(0, 100%, 50%);     /* Red */
  color: hsl(120, 100%, 50%);   /* Green */
  color: hsl(240, 100%, 50%);   /* Blue */
}
\`\`\`

**Format:** \`hsl(hue, saturation%, lightness%)\`
- Hue: 0-360 (color wheel)
- Saturation: 0-100% (intensity)
- Lightness: 0-100% (brightness)

---

### HSLA Colors (With Transparency)

\`\`\`css
p {
  color: hsla(0, 100%, 50%, 0.5);  /* Red with 50% opacity */
}
\`\`\`

---

## Background Color

\`\`\`css
div {
  background-color: blue;
  background-color: #ff0000;
  background-color: rgb(255, 0, 0);
  background-color: rgba(255, 0, 0, 0.5);
}
\`\`\`

---

## Background Image

\`\`\`css
div {
  background-image: url('image.jpg');
}
\`\`\`

**Multiple images:**
\`\`\`css
div {
  background-image: 
    url('image1.jpg'),
    url('image2.jpg');
}
\`\`\`

---

## Background Properties

### Background Repeat

\`\`\`css
div {
  background-image: url('pattern.jpg');
  background-repeat: repeat;      /* Default - tiles */
  background-repeat: no-repeat;   /* No tiling */
  background-repeat: repeat-x;    /* Horizontal only */
  background-repeat: repeat-y;    /* Vertical only */
}
\`\`\`

---

### Background Position

\`\`\`css
div {
  background-image: url('image.jpg');
  background-position: center;        /* Center */
  background-position: top left;      /* Top left */
  background-position: 50% 50%;      /* Center (percentage) */
  background-position: 100px 50px;   /* Specific position */
}
\`\`\`

---

### Background Size

\`\`\`css
div {
  background-image: url('image.jpg');
  background-size: cover;         /* Cover entire area */
  background-size: contain;      /* Fit entire image */
  background-size: 100% 100%;    /* Stretch to fill */
  background-size: 300px 200px;  /* Specific size */
}
\`\`\`

---

### Background Attachment

\`\`\`css
div {
  background-image: url('image.jpg');
  background-attachment: scroll;  /* Scrolls with content */
  background-attachment: fixed;   /* Fixed to viewport */
}
\`\`\`

---

## Background Shorthand

\`\`\`css
div {
  background: 
    color
    image
    repeat
    attachment
    position
    / size;
}

/* Example */
div {
  background: blue url('image.jpg') no-repeat center / cover;
}
\`\`\`

---

## Gradients

### Linear Gradient

\`\`\`css
div {
  background: linear-gradient(to right, red, blue);
  background: linear-gradient(45deg, red, blue);
  background: linear-gradient(to bottom, red, yellow, blue);
}
\`\`\`

**Directions:**
- \`to right\` - Left to right
- \`to bottom\` - Top to bottom
- \`45deg\` - 45 degrees
- \`to top right\` - Diagonal

---

### Radial Gradient

\`\`\`css
div {
  background: radial-gradient(circle, red, blue);
  background: radial-gradient(ellipse, red, blue);
  background: radial-gradient(circle at center, red, blue);
}
\`\`\`

---

### Conic Gradient

\`\`\`css
div {
  background: conic-gradient(red, yellow, green, blue, red);
}
\`\`\`

**Creates:** Color wheel effect

---

## Real-Time Scenarios

### Scenario 1: Hero Section with Background

\`\`\`css
.hero {
  background-image: url('hero-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  height: 500px;
}
\`\`\`

### Scenario 2: Button with Gradient

\`\`\`css
.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
}

.button:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}
\`\`\`

### Scenario 3: Card with Shadow and Background

\`\`\`css
.card {
  background-color: white;
  background-image: linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
}
\`\`\`

---

## Best Practices

1. **Use semantic color names** - \`--primary-color\` not \`--blue\`
2. **Maintain contrast** - Text should be readable
3. **Use CSS variables** - For consistent colors
4. **Optimize images** - Compress background images
5. **Consider performance** - Large images slow down pages

---

## Summary

CSS offers several ways to specify colors. You can use named colors like \`red\` or \`blue\`, RGB values like \`rgb(255, 0, 0)\` for precise color control, RGBA values like \`rgba(255, 0, 0, 0.5)\` when you need transparency, hexadecimal values like \`#ff0000\` which are commonly used, or HSL values like \`hsl(0, 100%, 50%)\` which can be easier to work with when adjusting colors.

Background properties let you control how backgrounds are displayed. Use \`background-color\` for solid colors, \`background-image\` to add images, \`background-repeat\` to control tiling, \`background-position\` to position images, \`background-size\` to control image size, and \`background-attachment\` to control scrolling behavior.

Gradients create smooth color transitions. Linear gradients go in one direction, radial gradients radiate from a center point, and conic gradients create color wheel effects. Gradients are great for creating modern, eye-catching designs.

Colors and backgrounds bring life to web pages. They're one of the first things users notice, so choosing the right colors and backgrounds is important for creating a good user experience.

---

## 10 Important CSS Colors & Backgrounds Interview Questions

1. **What are common ways to specify color in CSS?**  
   **Named colors**, **hex** (\`#rrggbb\`, \`#rgb\` shorthand), **rgb()/rgba()**, **hsl()/hsla()**, and **modern** \`color(display-p3 ...)\` in supporting browsers. **HSL** is intuitive for **adjusting lightness/saturation** in design systems. **Alpha** in **rgb** uses **slash** syntax: \`rgb(0 0 0 / 0.5)\`.

2. **When would you use \`rgba\` or alpha instead of opacity?**  
   **\`opacity\`** affects the **whole element** including children. **Alpha on color** only affects **that paint** (e.g. background) so **text** stays fully opaque. For **overlays**, prefer **background-color: rgba(...)** or **semi-transparent** custom properties.

3. **What is the difference between \`background-color\` and \`background\` shorthand?**  
   **\`background-color\`** sets only the solid/transparent fill. **\`background\`** resets **all** background **subproperties** not specified—can **unintentionally** clear \`background-size\` or \`background-position\` if you reuse it carelessly. Set **longhands** when you need **surgical** updates.

4. **How does \`background-size: cover\` vs \`contain\` work?**  
   **cover** scales the image to **cover** the box—may **crop**. **contain** fits the entire image inside—may show **letterboxing** (empty areas). Pick based on **hero** vs **logo** behavior. **\`background-position\`** + **\`background-repeat: no-repeat\`** usually pair with these.

5. **What are linear vs radial gradients?**  
   **linear-gradient** transitions colors along a **line** (angle or \`to bottom\`). **radial-gradient** radiates from a **center**. Use **multiple color stops** for rich UI backgrounds. **Gradients** are resolution-independent but can be **heavy** if overused—**prefer** CSS over huge background images when possible.

6. **Why set \`background-repeat\` and \`background-position\` on patterns?**  
   Small **tile** images repeat by default—often undesirable for **photos**. **no-repeat** with **cover** or explicit **size** is common. **position** controls **focal point** (e.g. **center top** for faces in hero images).

7. **What is \`background-attachment: fixed\` and what are the caveats?**  
   Background can appear **fixed** to the **viewport** while content scrolls—**parallax-like** effects. On **mobile**, behavior varies; it can hurt **performance** and **accessibility** (motion). Test thoroughly; often **avoid** for **prefers-reduced-motion** users.

8. **How do CSS variables help with colors?**  
   Define **\`--color-primary\`** on \`:root\` or a **theme** class and reuse with **\`var()\`**. Enables **dark mode** by swapping variables on \`html\` or \`body\`. Keeps **contrast** decisions in one place—pair with **design tokens**.

9. **What is contrast accessibility in practical terms?**  
   Text must meet **WCAG** contrast ratios against its **background** (roughly **4.5:1** for normal text, **3:1** large). **Tools** (DevTools, Lighthouse) sample **computed** colors. **Don’t** rely only on **hover** states for critical text.

10. **How do you optimize background images for performance?**  
    Use **compressed** formats (**WebP/AVIF** with fallbacks), **right dimensions** (not 4000px wide for a 800px slot), **lazy** load content images (not always applicable to **CSS** backgrounds—consider **\`<img>\`** + **object-fit** for **LCP** heroes). Use **CDN** and **HTTP caching**.

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
  code: `// CSS Colors & Backgrounds

/*
 * COLORS & BACKGROUNDS
 * ====================
 * 
 * Add visual appeal to web pages
 */

// ============================================
// 1. COLOR FORMATS
// ============================================
/*
NAMED:
  color: red;

RGB:
  color: rgb(255, 0, 0);

RGBA (with transparency):
  color: rgba(255, 0, 0, 0.5);

HEXADECIMAL:
  color: #ff0000;
  color: #f00;  (short form)

HSL:
  color: hsl(0, 100%, 50%);

HSLA:
  color: hsla(0, 100%, 50%, 0.5);
*/

// ============================================
// 2. BACKGROUND COLOR
// ============================================
/*
background-color: blue;
background-color: #ff0000;
background-color: rgb(255, 0, 0);
background-color: rgba(255, 0, 0, 0.5);
*/

// ============================================
// 3. BACKGROUND IMAGE
// ============================================
/*
background-image: url('image.jpg');
background-repeat: no-repeat;
background-position: center;
background-size: cover;
background-attachment: fixed;

SHORTHAND:
  background: blue url('image.jpg') no-repeat center / cover;
*/

// ============================================
// 4. GRADIENTS
// ============================================
/*
LINEAR:
  background: linear-gradient(to right, red, blue);
  background: linear-gradient(45deg, red, blue);

RADIAL:
  background: radial-gradient(circle, red, blue);

CONIC:
  background: conic-gradient(red, yellow, green);
*/
`
};

export default cssColorsBackgrounds;

