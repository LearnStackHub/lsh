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
   **Short Answer:** Transitions animate state changes, while animations follow keyframes and can run independently.  
   **Detailed Explanation:** A transition is ideal when one state changes into another, such as hover, focus, or class toggles. It needs a trigger and usually handles simple interactions smoothly. Animations are more powerful because they can define multiple stages using keyframes, run automatically, repeat, reverse, and support complex motion patterns. In interviews, explain that transitions are best for lightweight UI feedback, while animations are better for storytelling effects, loaders, or sequence-based motion. Also mention maintainability and performance: use motion intentionally, avoid over-animation, and pick the simpler tool when possible. This shows practical judgment, not just syntax knowledge.

2. **Which properties are cheapest to animate?**  
   **Short Answer:** Transform and opacity are usually the safest and most performant properties to animate.  
   **Detailed Explanation:** Modern browsers can often animate transform and opacity on a compositor layer, which avoids expensive layout recalculation and heavy repaint operations. This usually results in smoother motion, especially on low-powered devices. In contrast, animating layout-affecting properties like width, height, top, left, or margin can trigger reflow and repaint, leading to visual stutter. Interviewers expect this distinction because animation performance directly impacts user experience. A strong answer includes practical advice: prefer translate over top movement and scale over width changes where possible. Performance-friendly animation choices are a key sign of production-level frontend engineering.

3. **What does \`transition: all\` risk?**  
   **Short Answer:** It may animate unintended properties, causing performance issues and harder debugging.  
   **Detailed Explanation:** Transitioning all means every changed property is eligible for animation, including those that are expensive or should remain immediate. This can create surprising UI behavior, delayed feedback, and harder-to-trace bugs during styling updates. In large codebases, a minor CSS change may suddenly animate properties that were never intended to animate, making maintenance difficult. Interviewers like this question because it checks defensive CSS practices. The safer pattern is explicit transition lists, where only chosen properties and durations are animated. This improves readability, predictability, and performance, and prevents accidental regressions when teams iterate quickly on design and component states.

4. **How do \`@keyframes\` work?**  
   **Short Answer:** Keyframes define intermediate motion states that an element follows over animation duration.  
   **Detailed Explanation:** Keyframes allow you to describe motion as a timeline. You can define start and end points or multiple percentage checkpoints that shape movement, opacity, rotation, and other effects. Once keyframes are defined, the animation property attaches them to an element with duration, easing, delay, iteration count, direction, and fill mode controls. This gives precise control for simple and advanced effects. Interviewers often expect you to mention that fill mode can preserve start or end styles and that iteration controls looping behavior. A complete explanation shows you understand both declaration and behavior, which is essential when building polished, reliable interface motion.

5. **What is \`will-change\` and when to use it?**  
   **Short Answer:** Will change hints upcoming property changes, but should be used carefully and temporarily.  
   **Detailed Explanation:** The will change property informs the browser that certain properties are likely to change soon, allowing pre-optimization for smoother rendering. It can help with heavy or frequent animations, but overusing it can consume memory and reduce performance rather than improve it. Interviewers expect balanced understanding here: it is an optimization hint, not a magic fix for poor animation choices. Use it only for targeted elements and remove it when no longer needed. If your animation strategy already uses efficient properties and sensible timing, you may not need will change at all. Thoughtful usage reflects advanced CSS performance awareness.

6. **What easing functions are common?**  
   **Short Answer:** Common easing functions include ease variants, linear, steps, and custom cubic bezier curves.  
   **Detailed Explanation:** Easing controls how speed changes during animation and strongly affects perceived quality. Ease and ease in out are popular for natural UI motion. Linear is useful for constant-speed effects like spinners and progress indicators. Step-based easing is useful when movement should jump in discrete frames. Custom cubic bezier curves provide fine-grained control for product-specific motion identity. In interviews, mention that easing should match interaction intent, not just look fancy. For example, quick feedback actions often need responsive curves, while decorative transitions can be softer. Good easing improves clarity, reduces visual fatigue, and makes the interface feel more professional and intentional.

7. **How does \`prefers-reduced-motion\` relate to animations?**  
   **Short Answer:** It lets your site reduce or disable motion for users who request lower animation intensity.  
   **Detailed Explanation:** Some users experience discomfort or motion sensitivity from large or continuous animations. The reduced motion media query allows interfaces to adapt by minimizing movement, shortening durations, or replacing motion with simpler state changes. This is both an accessibility best practice and a user respect principle. Interviewers ask this to see whether you consider inclusive design as part of frontend quality. A strong response explains that motion is optional enhancement, not required for understanding core content. Supporting reduced motion improves usability, broadens audience compatibility, and aligns with modern accessibility expectations in enterprise and public-facing applications.

8. **Can CSS animations run on the compositor thread?**  
   **Short Answer:** Yes, many transform and opacity animations can run on compositor layers for smoother rendering.  
   **Detailed Explanation:** Browser rendering pipelines may move certain animations to compositor handling, especially when properties do not require layout recalculation. This helps maintain smoother frames even when the main thread is busy. However, not every animation automatically benefits, and excessive layer creation can increase memory pressure. Interviewers usually want practical understanding: compositor-friendly properties help, but profiling is still necessary in real pages. Use performance tools to confirm frame rate and paint behavior under realistic load. This answer demonstrates that you understand both the theory and the operational tradeoffs of animation performance in production frontend systems.

9. **What is the difference between \`animation-play-state: paused\` and \`visibility: hidden\` on animated elements?**  
   **Short Answer:** Paused stops timeline progression, while hidden only changes visibility and does not control animation state.  
   **Detailed Explanation:** Animation play state directly controls whether keyframes advance over time, making it useful for hover pauses, user controls, or reduced activity states. Visibility hidden simply hides rendering output but does not necessarily stop related animation processing depending on setup. These properties solve different problems and should not be treated as substitutes. Interviewers ask this to test precision in CSS behavior understanding. In practical UI work, combine clear state management with performance testing to ensure hidden or inactive components do not consume unnecessary resources. Thoughtful control of animation lifecycle improves battery usage, responsiveness, and overall interface quality.

10. **When might you prefer JS (Web Animations API / RAF) over CSS?**  
    **Short Answer:** Prefer JavaScript when animation depends on runtime data, user input, or complex dynamic choreography.  
    **Detailed Explanation:** CSS handles many common effects elegantly, but some scenarios require runtime control that keyframes cannot express well. Examples include physics-like motion, timeline synchronization with user gestures, scroll-linked interactions with custom logic, and dynamic values from live data. JavaScript APIs can compute frames, orchestrate sequences, and react continuously to events. Interviewers expect balanced decisions, so mention that CSS should still be the default for simple transitions and static choreography due to clarity and maintainability. Choosing JavaScript only when needed shows engineering maturity. The best approach is selecting the simplest tool that meets motion requirements without sacrificing performance or readability.

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

