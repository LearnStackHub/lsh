const htmlIframe = {
  id: 'html-iframe',
  title: 'HTML iframe - Embedding Content',
  description: 'Learn how to embed external content like videos, maps, and other web pages using iframe',
  content: `
# HTML iframe - Embedding External Content

The HTML \`<iframe>\` (inline frame) element enables embedding external HTML documents, web pages, or resources within the current page. Iframes are commonly used for embedding videos, maps, social media content, advertisements, and third-party widgets. Understanding iframes is essential for integrating external content while maintaining security and performance.

Enterprise web applications use iframes for embedding third-party services, maps, videos, payment forms, and external widgets. Iframes enable content isolation, security through sandboxing, and integration of external services. However, iframes require careful security considerations and performance optimization. Proper iframe implementation includes security attributes, responsive sizing, and accessibility considerations.

**Iframe Use Cases:**
- **Video Embedding**: YouTube, Vimeo, and other video platforms
- **Maps Integration**: Google Maps, OpenStreetMap
- **Third-Party Widgets**: Social media feeds, chat widgets
- **Secure Forms**: Payment forms, external applications

---

## Basic iframe Syntax

\`\`\`html
<iframe src="https://example.com"></iframe>
\`\`\`

**Components:**
- \`<iframe>\` - Inline frame element
- \`src\` - Source URL of content to embed

---

## iframe Attributes

### Width and Height

\`\`\`html
<iframe src="https://example.com" width="800" height="600"></iframe>

<!-- Better: Use CSS -->
<iframe src="https://example.com" style="width: 100%; height: 500px;"></iframe>
\`\`\`

### Name Attribute

\`\`\`html
<iframe src="page.html" name="myFrame"></iframe>
<a href="other.html" target="myFrame">Load in iframe</a>
\`\`\`

**Purpose:** Allows links to load content in the iframe

---

### Sandbox Attribute (Security)

\`\`\`html
<iframe src="external.html" sandbox></iframe>
\`\`\`

**Restrictions:**
- Blocks scripts
- Blocks forms
- Blocks popups
- More secure

**Allow specific features:**
\`\`\`html
<iframe src="external.html" 
        sandbox="allow-scripts allow-forms">
</iframe>
\`\`\`

---

### Loading Attribute

\`\`\`html
<iframe src="page.html" loading="lazy"></iframe>
\`\`\`

**Options:**
- \`lazy\` - Load when near viewport
- \`eager\` - Load immediately (default)

---

## Real-Time Scenarios

### Scenario 1: Embed YouTube Video

\`\`\`html
<iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>
\`\`\`

### Scenario 2: Embed Google Maps

\`\`\`html
<iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022..." 
    width="600" 
    height="450" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy">
</iframe>
\`\`\`

### Scenario 3: Embed PDF Document

\`\`\`html
<iframe src="document.pdf" width="100%" height="600px"></iframe>
\`\`\`

### Scenario 4: Embed Another Website

\`\`\`html
<iframe src="https://example.com" width="800" height="600"></iframe>
\`\`\`

**Note:** Many websites block embedding for security (X-Frame-Options header)

---

## Responsive iframe

\`\`\`html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <iframe 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        frameborder="0">
    </iframe>
</div>
\`\`\`

**Purpose:** Makes iframe responsive (16:9 aspect ratio)

---

## Best Practices

1. **Use sandbox for untrusted content**
2. **Set explicit dimensions**
3. **Use loading="lazy" for performance**
4. **Handle cases where embedding is blocked**
5. **Consider security implications**

---

## Summary

**iframe Attributes:**
- ✅ \`src\` - Source URL
- ✅ \`width\` / \`height\` - Dimensions
- ✅ \`name\` - Target name
- ✅ \`sandbox\` - Security restrictions
- ✅ \`loading\` - Lazy loading

**Common Uses:**
- ✅ Embed videos (YouTube, Vimeo)
- ✅ Embed maps (Google Maps)
- ✅ Embed documents (PDFs)
- ✅ Embed external content

iframes are powerful but use them carefully for security!

---

## Real-World Applications

### Video Embedding
Video platforms use iframes extensively for embedding videos on external websites. YouTube, Vimeo, and other platforms provide iframe embed codes for sharing videos across the web.

**Implementation Example:**
- YouTube video embeds in articles
- Vimeo video players on websites
- Custom video player embeds
- Live streaming embeds

### Map Integration
Mapping services use iframes for embedding interactive maps. Google Maps, OpenStreetMap, and other mapping services provide iframe-based embedding for location display.

**Implementation Example:**
- Business location maps
- Event venue maps
- Interactive location finders
- Route visualization

### Third-Party Widgets
Applications use iframes to embed third-party widgets and services while maintaining security isolation. Payment forms, chat widgets, and social media feeds are commonly embedded via iframes.

**Implementation Example:**
- Payment gateway forms
- Customer support chat widgets
- Social media feed embeds
- Analytics and tracking widgets

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Not Using Sandbox Attribute
**Problem:** Iframes without sandbox can execute scripts and pose security risks.

**Solution:** Always use sandbox attribute for external content:

\`\`\`html
<!-- GOOD - Sandboxed -->
<iframe src="external.html" sandbox></iframe>

<!-- BAD - No security restrictions -->
<iframe src="external.html"></iframe>
\`\`\`

### Mistake 2: Not Setting Dimensions
**Problem:** Iframes without dimensions may not display correctly.

**Solution:** Always set width and height:

\`\`\`html
<!-- GOOD - Explicit dimensions -->
<iframe src="page.html" width="800" height="600"></iframe>

<!-- BAD - No dimensions -->
<iframe src="page.html"></iframe>
\`\`\`

### Mistake 3: Embedding Untrusted Content
**Problem:** Embedding untrusted content without sandbox creates security risks.

**Solution:** Use sandbox and only embed trusted sources:

\`\`\`html
<!-- GOOD - Sandboxed untrusted content -->
<iframe src="untrusted.html" sandbox="allow-scripts"></iframe>

<!-- PREFER - Only embed trusted sources -->
<iframe src="https://trusted-service.com/widget"></iframe>
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is an iframe and when should I use it?

An iframe (inline frame) embeds another HTML document within the current page. Use iframes for: (1) embedding external content (videos, maps), (2) isolating third-party widgets, (3) embedding documents (PDFs), and (4) creating secure content boundaries. Use iframes when you need to embed external content while maintaining isolation.

### What is the sandbox attribute?

The \`sandbox\` attribute restricts iframe capabilities for security, preventing script execution, form submission, and other operations by default. You can enable specific capabilities using sandbox values (e.g., \`sandbox="allow-scripts"\`). Always use sandbox for untrusted content to prevent security issues.

### Can iframes affect page performance?

Yes, iframes can impact performance by: (1) loading additional resources, (2) executing scripts in iframe context, (3) creating additional HTTP requests, and (4) blocking page rendering if not optimized. Use lazy loading (\`loading="lazy"\`) and optimize iframe content for better performance.

### How do I make iframes responsive?

Make iframes responsive using CSS:

\`\`\`html
<iframe src="page.html" style="width: 100%; height: 500px;"></iframe>
\`\`\`

Or use aspect ratio techniques for maintaining proportions. Responsive iframes adapt to different screen sizes.

### Can I style iframe content?

No, you cannot style iframe content from the parent page due to same-origin policy (unless the iframe is from the same origin). Iframe content must be styled within the iframe document itself. This isolation is intentional for security.

### What happens if an iframe is blocked?

Some websites block iframe embedding using X-Frame-Options header. If blocked, the iframe won't display content. Provide fallback content or alternative embedding methods. Check if the source allows iframe embedding before implementing.

### Can I communicate between parent and iframe?

Yes, using \`postMessage\` API for cross-origin communication:

\`\`\`javascript
// Parent to iframe
iframe.contentWindow.postMessage('message', 'https://example.com');

// Iframe to parent
window.parent.postMessage('message', '*');
\`\`\`

This enables secure cross-origin communication.

### What is the difference between iframe and embed?

\`<iframe>\` is the modern, standard way to embed content. \`<embed>\` is older and less flexible. Use \`<iframe>\` for all embedding needs. \`<embed>\` is rarely used in modern development.

### Should I use iframes for layout?

No, never use iframes for page layout. Use CSS (Flexbox, Grid) for layout. Iframes are for embedding external content, not for structuring page layout. Using iframes for layout is outdated and problematic.

### How do I handle iframe loading errors?

Handle iframe errors by: (1) providing fallback content, (2) using onerror handlers, (3) checking iframe load events, and (4) providing alternative content when embedding fails. Always have fallback options for better user experience.

---

## Key Takeaways

Before proceeding to advanced HTML topics, ensure you understand these iframe fundamentals:

- **Iframes embed external content** within the current page
- **Always use sandbox** for security with external content
- **Set explicit dimensions** for proper display
- **Use lazy loading** for performance optimization
- **Iframes are for embedding**, not for layout
- **Sandbox attribute** restricts iframe capabilities for security
- **postMessage API** enables cross-origin communication
- **Provide fallback content** for blocked or failed embeds
- **Test iframe compatibility** across browsers

---

## What's Next?

Now that you understand iframes, you're ready to explore related web development topics:

### Immediate Next Steps

1. **[HTML Media](/tutorial/html-media)**: Learn about video and audio embedding
2. **[JavaScript Introduction](/tutorial/javascript-introduction)**: Control iframes with JavaScript
3. **[Web Security](/tutorial/web-security)**: Understand iframe security considerations
4. **[Responsive Design](/tutorial/responsive-design)**: Make iframes responsive

### Advanced Topics

- **Iframe Security**: Master sandbox and security best practices
- **Cross-Origin Communication**: Advanced postMessage usage
- **Widget Development**: Build embeddable widgets
- **Performance Optimization**: Optimize iframe loading and performance

### Related Tutorials

- **[HTML Introduction](/tutorial/html-introduction)**: Review HTML fundamentals
- **[HTML Structure](/tutorial/html-structure)**: Integrate iframes into page structure
- **[Web Development](/tutorial/web-development-introduction)**: Build complete applications
- **[Frontend Development](/tutorial/frontend-development)**: Master modern embedding techniques

Iframes are essential for embedding external content. Continue learning about [Web Security](/tutorial/web-security) to understand iframe security best practices.
`,
  code: `// HTML iframe

/*
 * IFRAME EMBEDS EXTERNAL CONTENT
 * ==============================
 */

// ============================================
// 1. BASIC SYNTAX
// ============================================
/*
<iframe src="https://example.com"></iframe>
*/

// ============================================
// 2. ATTRIBUTES
// ============================================
/*
WIDTH & HEIGHT:
  <iframe src="page.html" width="800" height="600"></iframe>

NAME:
  <iframe src="page.html" name="myFrame"></iframe>
  <a href="other.html" target="myFrame">Load</a>

SANDBOX (Security):
  <iframe src="external.html" sandbox></iframe>
  <iframe src="external.html" sandbox="allow-scripts"></iframe>

LOADING:
  <iframe src="page.html" loading="lazy"></iframe>
*/

// ============================================
// 3. COMMON USES
// ============================================
/*
YOUTUBE VIDEO:
  <iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>

GOOGLE MAPS:
  <iframe src="https://www.google.com/maps/embed?..."></iframe>

PDF DOCUMENT:
  <iframe src="document.pdf"></iframe>
*/
`
};

export default htmlIframe;


