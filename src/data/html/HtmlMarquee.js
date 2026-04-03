const htmlMarquee = {
  id: 'html-marquee',
  title: 'HTML Marquee - Scrolling Text (Deprecated)',
  description: 'Learn about the marquee tag for scrolling text, though it is deprecated and CSS alternatives are recommended',
  content: `
# HTML Marquee - Scrolling Text (Deprecated)

The HTML \`<marquee>\` element creates automatically scrolling text or images. **Important: This element is deprecated** in HTML5 and should not be used in modern web development. While browsers still support it for backward compatibility, modern alternatives using CSS animations or JavaScript are recommended. This tutorial covers marquee for educational purposes and legacy code understanding, but emphasizes modern alternatives.

**Deprecation Status:**
- **Deprecated in HTML5**: Removed from official specification
- **Still Supported**: Browsers maintain support for legacy reasons
- **Not Recommended**: Use CSS animations or JavaScript instead
- **Accessibility Issues**: Poor accessibility and user control

---

## ⚠️ Important: Marquee is Deprecated

**The \`<marquee>\` tag is deprecated** (removed from HTML5 specification). Use CSS animations or JavaScript instead for modern websites.

**Why it's deprecated:**
- Poor accessibility
- Can't be paused by users
- Not semantic
- Better alternatives exist

---

## Basic Marquee Syntax

\`\`\`html
<marquee>This text scrolls</marquee>
\`\`\`

**Result:** Text scrolls horizontally from right to left

---

## Marquee Attributes

### Direction

\`\`\`html
<marquee direction="left">Scrolls left</marquee>
<marquee direction="right">Scrolls right</marquee>
<marquee direction="up">Scrolls up</marquee>
<marquee direction="down">Scrolls down</marquee>
\`\`\`

### Behavior

\`\`\`html
<marquee behavior="scroll">Continuous scroll</marquee>
<marquee behavior="slide">Slides in and stops</marquee>
<marquee behavior="alternate">Bounces back and forth</marquee>
\`\`\`

### Speed

\`\`\`html
<marquee scrollamount="10">Fast scroll</marquee>
<marquee scrollamount="2">Slow scroll</marquee>
\`\`\`

**\`scrollamount\`** - Pixels per scroll (higher = faster)

### Loop

\`\`\`html
<marquee loop="3">Scrolls 3 times then stops</marquee>
<marquee loop="infinite">Scrolls forever</marquee>
\`\`\`

### Width and Height

\`\`\`html
<marquee width="500" height="100">Scrolling text</marquee>
\`\`\`

---

## Complete Examples

### Horizontal Scrolling Text

\`\`\`html
<marquee direction="left" behavior="scroll" scrollamount="5">
    Welcome to our website! Special offers available now.
</marquee>
\`\`\`

### Vertical Scrolling Text

\`\`\`html
<marquee direction="up" height="100" behavior="scroll">
    <p>News Item 1</p>
    <p>News Item 2</p>
    <p>News Item 3</p>
</marquee>
\`\`\`

### Bouncing Text

\`\`\`html
<marquee behavior="alternate" direction="left">
    This text bounces back and forth
</marquee>
\`\`\`

### Scrolling Images

\`\`\`html
<marquee direction="left" scrollamount="3">
    <img src="image1.jpg" alt="Image 1">
    <img src="image2.jpg" alt="Image 2">
    <img src="image3.jpg" alt="Image 3">
</marquee>
\`\`\`

---

## Modern CSS Alternative (Recommended)

Instead of \`<marquee>\`, use CSS animations:

\`\`\`html
<style>
    .scrolling-text {
        white-space: nowrap;
        overflow: hidden;
        animation: scroll 10s linear infinite;
    }
    
    @keyframes scroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
    }
</style>

<div class="scrolling-text">
    This text scrolls using CSS animation
</div>
\`\`\`

**Benefits:**
- ✅ Modern standard
- ✅ Better performance
- ✅ Can be paused with CSS
- ✅ More control
- ✅ Accessible

---

## JavaScript Alternative

\`\`\`html
<div id="scrolling-text">Scrolling text content</div>

<script>
    function scrollText() {
        const element = document.getElementById('scrolling-text');
        element.style.transform = 'translateX(-100%)';
    }
    // Add animation logic
</script>
\`\`\`

---

## When Marquee Was Used (Historical Context)

**Old websites (1990s-2000s) used marquee for:**
- News tickers
- Announcements
- Stock prices
- Breaking news
- Advertisements

**Modern websites avoid it because:**
- Poor user experience
- Accessibility issues
- Not professional
- Better alternatives exist

---

## Best Practices (If You Must Use It)

1. **Don't use it** - Use CSS/JavaScript instead
2. **If legacy support needed:**
   - Keep it simple
   - Don't use for important content
   - Provide alternative static version
   - Test accessibility

---

## Summary

**Marquee Tag:**
- ⚠️ **Deprecated** - Don't use in new projects
- ✅ Still works in browsers (legacy support)
- ❌ Poor accessibility
- ❌ Not semantic

**Attributes:**
- ✅ \`direction\` - left, right, up, down
- ✅ \`behavior\` - scroll, slide, alternate
- ✅ \`scrollamount\` - Speed
- ✅ \`loop\` - Number of times

**Modern Alternatives:**
- ✅ CSS animations
- ✅ JavaScript
- ✅ Better UX and accessibility

**Recommendation:** Use CSS animations or JavaScript instead of marquee!

---

## Real-World Applications

### Legacy Code Maintenance
Developers maintaining legacy websites may encounter marquee elements. Understanding marquee helps in updating and replacing deprecated code with modern alternatives.

**Implementation Example:**
- Identifying marquee in legacy codebases
- Replacing marquee with CSS animations
- Updating deprecated HTML to modern standards
- Maintaining backward compatibility during migration

### Educational Context
Educational resources cover marquee for historical understanding and to demonstrate why it was deprecated. Understanding deprecated elements helps developers make informed decisions about modern alternatives.

**Implementation Example:**
- Learning HTML evolution and deprecation
- Understanding accessibility issues
- Comparing deprecated vs modern approaches
- Making informed technology choices

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Using Marquee in New Projects
**Problem:** Marquee is deprecated and should not be used.

**Solution:** Use CSS animations or JavaScript instead:

\`\`\`html
<!-- AVOID - Deprecated -->
<marquee>Scrolling text</marquee>

<!-- USE - Modern CSS -->
<div class="scrolling">Text</div>
<style>
.scrolling {
    animation: scroll 10s linear infinite;
}
@keyframes scroll {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
}
</style>
\`\`\`

### Mistake 2: Not Providing Alternatives
**Problem:** Removing marquee without providing alternatives breaks functionality.

**Solution:** Always provide modern alternatives when removing marquee:

\`\`\`html
<!-- Replace marquee with CSS animation or JavaScript solution -->
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is the marquee element and why is it deprecated?

The \`<marquee>\` element creates automatically scrolling text or images. It's deprecated because it: (1) has poor accessibility (can't be paused), (2) isn't semantic, (3) has better alternatives (CSS/JavaScript), and (4) was removed from HTML5 specification. Modern web development should use CSS animations or JavaScript instead.

### Can I still use marquee?

Technically yes, browsers still support marquee for backward compatibility, but you should not use it in new projects. Marquee is deprecated and may be removed in future browser versions. Always use modern alternatives (CSS animations or JavaScript) for new development.

### What are the modern alternatives to marquee?

Modern alternatives include: (1) CSS animations using \`@keyframes\` and \`animation\` properties, (2) JavaScript-based scrolling solutions, (3) CSS transforms and transitions, and (4) JavaScript libraries for advanced scrolling effects. These alternatives provide better control, accessibility, and performance.

### Why was marquee deprecated?

Marquee was deprecated because: (1) poor accessibility (users can't pause scrolling), (2) not semantic (doesn't convey meaning), (3) limited control (hard to customize), (4) better alternatives exist (CSS/JavaScript), and (5) inconsistent browser behavior. Modern alternatives address all these issues.

### How do I replace marquee with CSS?

Replace marquee with CSS animations:

\`\`\`html
<div class="scrolling-text">Your text here</div>
<style>
.scrolling-text {
    animation: scroll 10s linear infinite;
    white-space: nowrap;
}
@keyframes scroll {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
}
</style>
\`\`\`

This provides better control and accessibility.

### Can I pause CSS scrolling animations?

Yes, CSS animations can be paused using \`animation-play-state: paused;\` and controlled with JavaScript. This provides better user control than marquee, which couldn't be paused. Modern solutions offer full control over animation behavior.

### What are the accessibility issues with marquee?

Marquee accessibility issues include: (1) can't be paused by users, (2) distracting for users with attention disorders, (3) screen readers may struggle with constantly changing content, (4) no keyboard control, and (5) violates WCAG accessibility guidelines. Modern alternatives address these issues.

### Should I remove marquee from existing websites?

Yes, replace marquee with modern alternatives when updating websites. This improves accessibility, maintainability, and future compatibility. However, test replacements thoroughly to ensure functionality is preserved. Gradual migration is acceptable for large legacy sites.

### How do I create scrolling text with JavaScript?

Use JavaScript for scrolling with pause/play controls:

\`\`\`javascript
const element = document.querySelector('.scrolling');
let position = 0;
function scroll() {
    position--;
    element.style.transform = \`translateX(\${position}px)\`;
    requestAnimationFrame(scroll);
}
scroll();
\`\`\`

JavaScript provides full control and accessibility features.

### What's the best practice for scrolling content?

Best practices: (1) use CSS animations for simple scrolling, (2) use JavaScript for interactive scrolling with controls, (3) provide pause/play functionality, (4) ensure accessibility compliance, (5) test across browsers, and (6) consider whether scrolling is necessary (static content may be better). Always prioritize user experience and accessibility.

---

## Key Takeaways

Before proceeding to advanced HTML topics, ensure you understand these marquee fundamentals:

- **Marquee is deprecated** and should not be used in new projects
- **Use CSS animations** or JavaScript for modern scrolling solutions
- **Marquee has accessibility issues** that modern alternatives solve
- **Modern alternatives** provide better control and user experience
- **Replace marquee** in existing codebases when possible
- **CSS animations** can be paused and controlled
- **JavaScript solutions** offer full interactivity
- **Always prioritize** accessibility and user experience
- **Test alternatives** thoroughly when replacing marquee

---

## What's Next?

Now that you understand marquee (and why to avoid it), you're ready to explore modern alternatives:

### Immediate Next Steps

1. **[CSS Introduction](/tutorial/css-introduction)**: Learn CSS animations as marquee replacement
2. **[JavaScript Introduction](/tutorial/javascript-introduction)**: Create interactive scrolling with JavaScript
3. **[HTML Best Practices](/tutorial/html-best-practices)**: Follow modern HTML standards
4. **[Accessibility](/tutorial/accessibility)**: Ensure scrolling content is accessible

### Advanced Topics

- **CSS Animations**: Master modern animation techniques
- **JavaScript Scrolling**: Build interactive scrolling solutions
- **Accessibility**: Ensure scrolling content meets WCAG guidelines
- **Performance**: Optimize scrolling animations

### Related Tutorials

- **[HTML Introduction](/tutorial/html-introduction)**: Review HTML fundamentals
- **[CSS Introduction](/tutorial/css-introduction)**: Learn modern styling and animations
- **[Web Development](/tutorial/web-development-introduction)**: Build complete applications
- **[Frontend Development](/tutorial/frontend-development)**: Master modern frontend techniques

Marquee is deprecated - use modern alternatives. Continue learning about [CSS Introduction](/tutorial/css-introduction) to create modern scrolling effects.

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

## 10 Important HTML Marquee Interview Questions

1. **Is \`<marquee>\` valid in modern HTML?**  
   **No** for new work—\`<marquee>\` is **obsolete** in the WHATWG HTML living standard. Browsers may still render it for **legacy** pages, but it is **non-standard** behavior you should not depend on. **Interviews** expect you to say: “deprecated—use CSS/JS alternatives.”

2. **Why was marquee deprecated?**  
   It mixes **presentation** into HTML, offers **no reliable pause** for users who need to read slowly, and creates **constant motion** that distracts users with **ADHD** or **vestibular** sensitivity. **Screen reader** behavior was inconsistent. **Separation of concerns**: motion belongs in **CSS** or **JS** with **controls**.

3. **What WCAG concern does scrolling text raise?**  
   **WCAG 2.2** includes guidance on **moving/blinking** content: users must be able to **pause, stop, or hide** movement unless it is **essential**. Auto-scrolling tickers often **violate** this. **Flashing** content also risks **seizures** (thresholds on frequency). **Marquee** fails many of these tests by design.

4. **What is the recommended replacement for marquee?**  
   Build a **ticker** with **CSS animation** (\`transform: translateX\`) or **JS** \`requestAnimationFrame\`, and add **Pause/Play** buttons wired to **\`animation-play-state\`** or class toggles. Provide **keyboard** access. Respect **\`prefers-reduced-motion: reduce\`** by showing **static** text or disabling animation.

5. **Can screen readers handle marquee well?**  
   **Generally poorly**—moving text may be **hard to track**, and focus order may not follow visual order. **Better**: static headline + **link** to full article, or **aria-live** updates only when content **changes meaningfully**, not continuously.

6. **How do CSS \`@keyframes\` replace marquee?**  
   Wrap text in an **overflow:hidden** container; animate **\`transform\`** (GPU-friendly) instead of **\`left\`/\`margin\`** for smoother performance. Control **duration**, **easing**, and **iteration**. For **infinite** loops, duplicate content for **seamless** scroll. **Test** on **low-end** mobile devices.

7. **Why prefer JS over pure CSS for news tickers?**  
   **CSS-only** tickers struggle with **dynamic feeds**, **pause on hover/focus**, and **accessible** announcements. **JS** can fetch items, **pause** when the tab is hidden (**Page Visibility API**), and expose **ARIA** live regions **carefully**. Still keep **animations** in CSS where possible.

8. **Should you refactor legacy pages that use marquee?**  
   **Yes**, when those pages are actively **maintained**—especially **public** or **compliance**-sensitive sites. Prioritize **high-traffic** pages first. **Full** removal may need **design** approval if marketing liked the effect—offer **accessible** equivalents.

9. **Is infinite scrolling animation always bad?**  
   Not always—**subtle**, **slow** motion with **clear controls** may be acceptable. **Never** make **critical** text only available inside endless motion. **User testing** matters. **Always** honor **reduced motion** settings.

10. **What is \`prefers-reduced-motion\`?**  
    A **CSS media query** (\`@media (prefers-reduced-motion: reduce)\`) that matches when the user selects **“reduce motion”** at the OS level (Windows, macOS, iOS, Android). **Disable or simplify** animations; provide **static** alternatives. **Not** a replacement for **pause buttons**—some users need motion reduced **even** when the OS setting is off.

`,
  code: `// HTML Marquee (Deprecated)

/*
 * MARQUEE IS DEPRECATED
 * =====================
 * 
 * Use CSS animations or JavaScript instead
 */

// ============================================
// 1. BASIC MARQUEE
// ============================================
/*
<marquee>Scrolling text</marquee>
  ⚠️ DEPRECATED - Don't use in new projects
*/

// ============================================
// 2. MARQUEE ATTRIBUTES
// ============================================
/*
DIRECTION:
  <marquee direction="left">Left</marquee>
  <marquee direction="right">Right</marquee>
  <marquee direction="up">Up</marquee>
  <marquee direction="down">Down</marquee>

BEHAVIOR:
  <marquee behavior="scroll">Continuous</marquee>
  <marquee behavior="slide">Slides and stops</marquee>
  <marquee behavior="alternate">Bounces</marquee>

SPEED:
  <marquee scrollamount="10">Fast</marquee>
  <marquee scrollamount="2">Slow</marquee>

LOOP:
  <marquee loop="3">3 times</marquee>
  <marquee loop="infinite">Forever</marquee>
*/

// ============================================
// 3. MODERN CSS ALTERNATIVE
// ============================================
/*
<style>
    .scrolling {
        animation: scroll 10s linear infinite;
    }
    @keyframes scroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
    }
</style>
<div class="scrolling">Text</div>
  ✅ Use this instead of marquee
*/

// ============================================
// 4. WHY DEPRECATED
// ============================================
/*
❌ Poor accessibility
❌ Can't be paused
❌ Not semantic
❌ Better alternatives exist (CSS/JS)
*/
`
};

export default htmlMarquee;


