const cssAnimations = {
  id: 'css-animations',
  title: 'CSS Animations & Transitions',
  description: 'Learn how to create smooth animations and transitions using CSS',
  content: `
# CSS Animations & Transitions — Adding Motion

Animations and transitions bring websites to life. Learn how to create smooth, engaging animations with CSS.

---

## CSS Transitions

Transitions smoothly change property values over time.

### Basic Transition

\`\`\`css
.button {
  background: blue;
  transition: background 0.3s;
}

.button:hover {
  background: red;
}
\`\`\`

**Result:** Background smoothly changes from blue to red over 0.3 seconds

---

### Transition Properties

\`\`\`css
.element {
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0.1s;
}
\`\`\`

**Shorthand:**
\`\`\`css
.element {
  transition: property duration timing-function delay;
  transition: background-color 0.3s ease 0.1s;
}
\`\`\`

---

### Multiple Properties

\`\`\`css
.button {
  transition: 
    background-color 0.3s,
    transform 0.2s,
    color 0.3s;
}

.button:hover {
  background-color: red;
  transform: scale(1.1);
  color: white;
}
\`\`\`

---

### Transition Timing Functions

\`\`\`css
.element {
  transition-timing-function: ease;        /* Default - slow, fast, slow */
  transition-timing-function: linear;      /* Constant speed */
  transition-timing-function: ease-in;     /* Slow start */
  transition-timing-function: ease-out;    /* Slow end */
  transition-timing-function: ease-in-out; /* Slow start and end */
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* Custom */
}
\`\`\`

---

## CSS Animations

Animations are more powerful than transitions - they can loop, reverse, and have multiple keyframes.

### Keyframes

\`\`\`css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
\`\`\`

**With percentages:**
\`\`\`css
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
\`\`\`

---

### Using Animations

\`\`\`css
.element {
  animation-name: slideIn;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
}
\`\`\`

**Shorthand:**
\`\`\`css
.element {
  animation: slideIn 0.5s ease 0s 1 normal forwards;
}
\`\`\`

---

### Animation Properties

**Duration:**
\`\`\`css
animation-duration: 1s;
animation-duration: 500ms;
\`\`\`

**Iteration Count:**
\`\`\`css
animation-iteration-count: 1;      /* Once */
animation-iteration-count: 3;      /* 3 times */
animation-iteration-count: infinite; /* Forever */
\`\`\`

**Direction:**
\`\`\`css
animation-direction: normal;   /* Forward */
animation-direction: reverse;  /* Backward */
animation-direction: alternate; /* Forward then backward */
animation-direction: alternate-reverse; /* Backward then forward */
\`\`\`

**Fill Mode:**
\`\`\`css
animation-fill-mode: none;      /* Default */
animation-fill-mode: forwards;  /* Keep end state */
animation-fill-mode: backwards;  /* Apply start state before delay */
animation-fill-mode: both;      /* Both forwards and backwards */
\`\`\`

**Play State:**
\`\`\`css
animation-play-state: running;  /* Playing */
animation-play-state: paused;   /* Paused */
\`\`\`

---

## Transform Property

Transform changes element's appearance without affecting layout:

### Translate (Move)

\`\`\`css
.element {
  transform: translateX(50px);   /* Move right 50px */
  transform: translateY(-20px);  /* Move up 20px */
  transform: translate(50px, -20px); /* X, Y */
}
\`\`\`

---

### Scale

\`\`\`css
.element {
  transform: scale(1.5);         /* 150% size */
  transform: scaleX(2);          /* Double width */
  transform: scaleY(0.5);        /* Half height */
  transform: scale(1.5, 0.8);    /* X, Y */
}
\`\`\`

---

### Rotate

\`\`\`css
.element {
  transform: rotate(45deg);       /* Rotate 45 degrees */
  transform: rotate(-90deg);     /* Rotate counter-clockwise */
}
\`\`\`

---

### Skew

\`\`\`css
.element {
  transform: skewX(20deg);       /* Skew horizontally */
  transform: skewY(10deg);       /* Skew vertically */
  transform: skew(20deg, 10deg); /* X, Y */
}
\`\`\`

---

### Multiple Transforms

\`\`\`css
.element {
  transform: translateX(50px) rotate(45deg) scale(1.2);
}
\`\`\`

**Order matters!** Apply in order: translate → rotate → scale

---

## Common Animation Examples

### Fade In

\`\`\`css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.element {
  animation: fadeIn 0.5s ease;
}
\`\`\`

---

### Slide In

\`\`\`css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  animation: slideIn 0.5s ease;
}
\`\`\`

---

### Bounce

\`\`\`css
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

.element {
  animation: bounce 0.6s ease infinite;
}
\`\`\`

---

### Pulse

\`\`\`css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.element {
  animation: pulse 2s ease infinite;
}
\`\`\`

---

### Rotate

\`\`\`css
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loader {
  animation: rotate 1s linear infinite;
}
\`\`\`

---

## Real-Time Scenarios

### Scenario 1: Button Hover Effect

\`\`\`css
.button {
  background: blue;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.button:hover {
  background: darkblue;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.button:active {
  transform: translateY(0);
}
\`\`\`

### Scenario 2: Loading Spinner

\`\`\`css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid blue;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
\`\`\`

### Scenario 3: Modal Fade In

\`\`\`css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal {
  animation: fadeIn 0.3s ease;
}
\`\`\`

---

## Performance Tips

1. **Use \`transform\` and \`opacity\`** - GPU accelerated
2. **Avoid animating \`width\`, \`height\`, \`margin\`** - Causes reflow
3. **Use \`will-change\`** - Hint browser for optimization
4. **Limit animations** - Too many can slow down page

---

## Best Practices

1. **Keep animations subtle** - Don't distract from content
2. **Use appropriate duration** - 0.2s-0.5s for most
3. **Provide reduced motion option** - For accessibility
4. **Test performance** - Ensure smooth on all devices

---

## Summary

Transitions allow you to smoothly change property values over time. The syntax is \`transition: property duration timing delay;\`. Transitions are perfect for hover effects and simple state changes.

Animations are more powerful than transitions because they can loop, reverse, and have multiple keyframes. You define animation steps using \`@keyframes\`, and apply them with \`animation: name duration timing iteration direction;\`. Animations can loop infinitely, reverse direction, and be paused or played.

The transform property lets you move, resize, rotate, and skew elements. Use \`translate()\` to move elements, \`scale()\` to resize them, \`rotate()\` to turn them, and \`skew()\` to distort them. These transformations don't affect the document flow, making them perfect for animations.

Animations make websites engaging and interactive. When used thoughtfully, they can guide user attention and make interfaces feel more responsive and polished.

---

## 10 Important CSS Animations & Transitions Interview Questions

1. **What is the difference between \`transition\` and \`animation\`?**  
   **Transitions** interpolate between **two states** when a **property changes** (often on **:hover**)—need a **trigger**. **Animations** use **@keyframes** with **multiple steps**, can **loop**, **reverse**, and run **without** a discrete state change (careful with **autoplay**).

2. **Which properties are cheapest to animate?**  
   **transform** (translate, scale, rotate) and **opacity** are typically **compositor-friendly** and avoid **layout** (**reflow**). Animating **width**, **height**, **top/left**, **margin** forces **layout**—**janky** on low-end devices.

3. **What does \`transition: all\` risk?**  
   Accidentally animating **expensive** properties when **any** style changes—**harder** debugging. Prefer **explicit** property lists: **\`transition: transform 200ms, opacity 200ms;\`**.

4. **How do \`@keyframes\` work?**  
   Define **keyframes** with **from/to** or **percentages**. **animation** shorthand sets **name, duration, timing-function, delay, iteration-count, direction, fill-mode, play-state**. **animation-fill-mode: forwards** keeps **end** styles after finish.

5. **What is \`will-change\` and when to use it?**  
   Hints the browser to **optimize** for upcoming changes—**overuse** wastes **memory**. Apply **short-term** before **heavy** animations; **remove** when done. **Not** a substitute for **good** property choice.

6. **What easing functions are common?**  
   **ease, ease-in-out, cubic-bezier()**—**custom** curves for **natural** motion. **linear** for **spinners**. **step** functions for **frame**-like changes. **DevTools** can **edit** cubic-bezier interactively.

7. **How does \`prefers-reduced-motion\` relate to animations?**  
   **\`@media (prefers-reduced-motion: reduce)\`** should **disable or shorten** non-essential motion—**WCAG** guidance. **Respect** OS setting—some users get **motion sickness** from **parallax** or **large** transitions.

8. **Can CSS animations run on the compositor thread?**  
   **transform/opacity** often **avoid** main-thread **paint** when promoted to **layers**—smoother during **JS** **busy** work. **Still** profile—**too many** layers cost **memory**.

9. **What is the difference between \`animation-play-state: paused\` and \`visibility: hidden\` on animated elements?**  
   **paused** freezes **keyframes**—useful for **scroll-driven** or **interaction** control. **hidden** removes **visibility**—different purpose. For **infinite** loaders, **paused** may still **consume** CPU if poorly implemented—**test**.

10. **When might you prefer JS (Web Animations API / RAF) over CSS?**  
    **Complex** choreography tied to **input**, **physics**, or **dynamic** values **not** expressible in keyframes. For **simple** **UI** feedback, **CSS** stays **declarative** and **performant**.

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

## Deep Theory: Motion as Perception and State Communication

CSS animation is a communication layer between interface state and human perception. It should encode causality:

- what changed,
- where it changed,
- how important the change is.

### Transition vs Animation Theory

- transition is event-driven interpolation between two computed states.
- animation is timeline-driven progression through keyframe-defined states.

Transitions are ideal for direct interaction feedback. Animations are suitable for sequence storytelling or repeated system signals.

### Rendering Pipeline Awareness

Not all properties animate equally. Properties that trigger layout recalculation can degrade frame stability. Transform and opacity are preferred because they usually avoid layout reflow and align better with compositor pipelines.

### UX and Accessibility Dimension

Motion intensity influences cognitive load. Good motion reduces uncertainty; excessive motion increases fatigue. Reduced-motion support is not optional in inclusive design theory.

`,
  code: `// CSS Animations & Transitions

/*
 * ANIMATIONS ADD MOTION
 * ====================
 */

// ============================================
// 1. TRANSITIONS
// ============================================
/*
.element {
    transition: property duration timing delay;
    transition: background-color 0.3s ease;
}

MULTIPLE:
  transition: background 0.3s, transform 0.2s;
*/

// ============================================
// 2. KEYFRAMES
// ============================================
/*
@keyframes slideIn {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

WITH PERCENTAGES:
  @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
  }
*/

// ============================================
// 3. ANIMATIONS
// ============================================
/*
.element {
    animation: name duration timing iteration direction;
    animation: slideIn 0.5s ease 1 normal;
    animation: bounce 0.6s ease infinite;
}
*/

// ============================================
// 4. TRANSFORM
// ============================================
/*
transform: translateX(50px);
transform: translateY(-20px);
transform: translate(50px, -20px);
transform: scale(1.5);
transform: rotate(45deg);
transform: skew(20deg);
transform: translateX(50px) rotate(45deg) scale(1.2);
*/

// ============================================
// 5. COMMON ANIMATIONS
// ============================================
/*
FADE IN:
  @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
  }

SLIDE IN:
  @keyframes slideIn {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
  }

BOUNCE:
  @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-30px); }
  }
*/
`
};

export default cssAnimations;

