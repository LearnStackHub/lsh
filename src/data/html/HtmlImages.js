const htmlImages = {
  id: 'html-images',
  title: 'HTML Images',
  description: 'Learn how to add images to web pages, optimize them, and make them accessible',
  content: `
# HTML Images - Adding Visual Content

HTML images are essential elements for adding visual content to web pages, enhancing user engagement, conveying information, and improving overall user experience. Images are embedded using the \`<img>\` element, which displays graphical content from various sources. Understanding image implementation, optimization, and accessibility is crucial for building modern, performant web applications.

Enterprise web applications extensively use images for product displays, user avatars, infographics, icons, and visual branding. Proper image implementation includes optimization for performance, accessibility through alt text, responsive sizing, and appropriate format selection. Images significantly impact page load times and user experience, making optimization essential for production applications.

**Image Considerations:**
- **Performance**: Image optimization and format selection
- **Accessibility**: Alt text for screen readers
- **Responsiveness**: Adapting to different screen sizes
- **Format Selection**: Choosing appropriate image formats (JPEG, PNG, WebP, SVG)

---

## Basic Image Syntax

\`\`\`html
<img src="image.jpg" alt="Description">
\`\`\`

**Components:**
- \`<img>\` - Image tag (self-closing)
- \`src\` - Source (path to image file)
- \`alt\` - Alternative text (for accessibility)

---

## Image Attributes

### src (Source) - Required

\`\`\`html
<!-- Image in same folder -->
<img src="photo.jpg" alt="Photo">

<!-- Image in subfolder -->
<img src="images/photo.jpg" alt="Photo">

<!-- Image in parent folder -->
<img src="../photos/photo.jpg" alt="Photo">

<!-- External image (not recommended) -->
<img src="https://example.com/image.jpg" alt="Photo">
\`\`\`

---

### alt (Alternative Text) - Required

\`\`\`html
<img src="cat.jpg" alt="A cute orange cat sitting on a windowsill">
\`\`\`

**Purpose:**
- Screen readers read this text
- Shows if image fails to load
- Important for SEO

**Best Practices:**
- Be descriptive but concise
- Don't start with "Image of..." (screen readers add that)
- ❌ Bad: \`alt="cat"\`
- ✅ Good: \`alt="Orange tabby cat playing with yarn"\`

---

### width and height

\`\`\`html
<!-- Fixed dimensions (pixels) -->
<img src="photo.jpg" alt="Photo" width="500" height="300">

<!-- Using CSS (better approach) -->
<img src="photo.jpg" alt="Photo" style="width: 500px; height: 300px;">

<!-- Responsive (percentage) -->
<img src="photo.jpg" alt="Photo" style="width: 100%; height: auto;">
\`\`\`

**Best Practice:** Use CSS for sizing, not HTML attributes

---

### title (Tooltip)

\`\`\`html
<img src="photo.jpg" alt="Photo" title="This is a beautiful sunset">
\`\`\`

**Shows:** Tooltip when user hovers over image

---

## Image Formats

### Common Formats:

1. **JPEG/JPG** - Photos, complex images
   - Best for: Photographs, images with many colors
   - Not good for: Images with text, logos

2. **PNG** - Graphics with transparency
   - Best for: Logos, icons, images needing transparency
   - Larger file size than JPEG

3. **GIF** - Animated images
   - Best for: Simple animations
   - Limited colors (256)

4. **WebP** - Modern format (smaller size)
   - Best for: All image types
   - Better compression than JPEG/PNG
   - Not supported in all browsers (use fallback)

5. **SVG** - Vector graphics
   - Best for: Icons, logos, simple graphics
   - Scalable without quality loss

---

## Responsive Images

### Using CSS

\`\`\`html
<img src="photo.jpg" alt="Photo" style="max-width: 100%; height: auto;">
\`\`\`

**Result:** Image scales to fit container width

---

### Using srcset (Multiple Sizes)

\`\`\`html
<img src="photo-small.jpg"
     srcset="photo-small.jpg 400w,
             photo-medium.jpg 800w,
             photo-large.jpg 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1200px) 800px,
            1200px"
     alt="Responsive photo">
\`\`\`

**Purpose:** Browser chooses best image size based on screen

---

### Using picture Element (Art Direction)

\`\`\`html
<picture>
    <source media="(min-width: 800px)" srcset="photo-large.jpg">
    <source media="(min-width: 400px)" srcset="photo-medium.jpg">
    <img src="photo-small.jpg" alt="Responsive photo">
</picture>
\`\`\`

**Purpose:** Different images for different screen sizes

---

## Image as Link

\`\`\`html
<a href="large-photo.jpg">
    <img src="thumbnail.jpg" alt="Click to view larger">
</a>
\`\`\`

**Common use:** Thumbnail gallery

---

## Figure and Figcaption

\`\`\`html
<figure>
    <img src="diagram.jpg" alt="System architecture diagram">
    <figcaption>Figure 1: System Architecture</figcaption>
</figure>
\`\`\`

**Purpose:** Semantic way to add captions to images

---

## Image Maps (Clickable Areas)

\`\`\`html
<img src="world-map.jpg" alt="World Map" usemap="#worldmap">

<map name="worldmap">
    <area shape="rect" coords="0,0,100,100" 
          href="india.html" alt="India">
    <area shape="circle" coords="200,200,50" 
          href="usa.html" alt="USA">
</map>
\`\`\`

**Purpose:** Different clickable areas on one image

---

## Lazy Loading

\`\`\`html
<img src="photo.jpg" alt="Photo" loading="lazy">
\`\`\`

**Purpose:** Image loads only when user scrolls near it

**Benefits:**
- Faster initial page load
- Saves bandwidth
- Better performance

---

## Real-Time Scenarios

### Scenario 1: Product Image Gallery

\`\`\`html
<div class="product-gallery">
    <img src="product-main.jpg" alt="Gaming Laptop - Front View" 
         class="main-image">
    
    <div class="thumbnails">
        <img src="product-side.jpg" alt="Gaming Laptop - Side View" 
             onclick="changeMainImage('product-side.jpg')">
        <img src="product-back.jpg" alt="Gaming Laptop - Back View" 
             onclick="changeMainImage('product-back.jpg')">
    </div>
</div>
\`\`\`

### Scenario 2: Responsive Hero Image

\`\`\`html
<header>
    <picture>
        <source media="(min-width: 1200px)" 
                srcset="hero-large.jpg">
        <source media="(min-width: 768px)" 
                srcset="hero-medium.jpg">
        <img src="hero-small.jpg" 
             alt="Welcome to our website"
             style="width: 100%; height: auto;">
    </picture>
</header>
\`\`\`

### Scenario 3: Logo with Link

\`\`\`html
<a href="index.html">
    <img src="logo.png" alt="Company Logo" 
         width="200" height="50">
</a>
\`\`\`

### Scenario 4: Article with Image

\`\`\`html
<article>
    <h1>10 Tips for Learning HTML</h1>
    
    <figure>
        <img src="html-tutorial.jpg" 
             alt="Developer coding HTML on laptop"
             loading="lazy">
        <figcaption>Learning HTML is the first step in web development</figcaption>
    </figure>
    
    <p>Content here...</p>
</article>
\`\`\`

---

## Image Optimization Best Practices

### 1. Compress Images

**Before uploading:**
- Use tools like TinyPNG, ImageOptim
- Reduce file size without losing quality
- Faster page load

### 2. Use Appropriate Format

- **Photos** → JPEG
- **Logos/Icons** → PNG or SVG
- **Simple graphics** → SVG

### 3. Provide Multiple Sizes

\`\`\`html
<img srcset="small.jpg 400w,
             medium.jpg 800w,
             large.jpg 1200w"
     sizes="(max-width: 600px) 400px, 800px"
     src="medium.jpg" alt="Photo">
\`\`\`

### 4. Use Lazy Loading

\`\`\`html
<img src="photo.jpg" alt="Photo" loading="lazy">
\`\`\`

### 5. Always Include Alt Text

\`\`\`html
✅ <img src="cat.jpg" alt="Orange tabby cat sleeping">
❌ <img src="cat.jpg">
\`\`\`

---

## Common Mistakes

### Mistake 1: Missing Alt Text

\`\`\`html
❌ <img src="photo.jpg">
✅ <img src="photo.jpg" alt="Description">
\`\`\`

### Mistake 2: Using Width/Height Attributes

\`\`\`html
❌ <img src="photo.jpg" width="500" height="300">
✅ <img src="photo.jpg" style="width: 500px; height: auto;">
\`\`\`

### Mistake 3: Large File Sizes

\`\`\`html
❌ <img src="5mb-photo.jpg">  <!-- Too large! -->
✅ <img src="optimized-200kb-photo.jpg">  <!-- Compressed -->
\`\`\`

### Mistake 4: Broken Image Paths

\`\`\`html
❌ <img src="photo.jpg">  <!-- File doesn't exist -->
✅ <img src="images/photo.jpg">  <!-- Correct path -->
\`\`\`

---

## Accessibility

### Always Include Alt Text

\`\`\`html
<img src="chart.jpg" alt="Sales increased 25% in Q4 2024">
\`\`\`

### Decorative Images

\`\`\`html
<!-- If image is purely decorative -->
<img src="decoration.jpg" alt="">
\`\`\`

**Note:** Empty alt is OK for decorative images

---

## Summary

**Essential Attributes:**
- ✅ \`src\` - Image source (required)
- ✅ \`alt\` - Alternative text (required for accessibility)
- ✅ \`width\` / \`height\` - Dimensions (use CSS instead)
- ✅ \`loading="lazy"\` - Lazy loading

**Image Formats:**
- ✅ JPEG - Photos
- ✅ PNG - Graphics with transparency
- ✅ SVG - Vector graphics
- ✅ WebP - Modern format (smaller)

**Best Practices:**
- ✅ Always include alt text
- ✅ Optimize image file sizes
- ✅ Use responsive images
- ✅ Implement lazy loading
- ✅ Choose appropriate format

Images bring life to web pages when used correctly!
`,
  code: `// HTML Images

/*
 * IMAGES ADD VISUAL CONTENT
 * ========================
 * 
 * Images make web pages engaging and informative.
 */

// ============================================
// 1. BASIC IMAGE SYNTAX
// ============================================
/*
<img src="image.jpg" alt="Description">

Components:
  <img>        → Image tag (self-closing)
  src          → Source (path to image)
  alt          → Alternative text (required)
*/

// ============================================
// 2. IMAGE ATTRIBUTES
// ============================================
/*
SOURCE (required):
  <img src="photo.jpg" alt="Photo">
  <img src="images/photo.jpg" alt="Photo">
  <img src="../photos/photo.jpg" alt="Photo">

ALT TEXT (required for accessibility):
  <img src="cat.jpg" alt="Orange tabby cat sleeping">

WIDTH & HEIGHT:
  <img src="photo.jpg" alt="Photo" width="500" height="300">
  <img src="photo.jpg" alt="Photo" style="width: 500px;">

TITLE (tooltip):
  <img src="photo.jpg" alt="Photo" title="Tooltip text">
*/

// ============================================
// 3. IMAGE FORMATS
// ============================================
/*
JPEG/JPG  → Photos, complex images
PNG       → Graphics with transparency
GIF       → Animated images
WebP      → Modern format (smaller size)
SVG       → Vector graphics (scalable)
*/

// ============================================
// 4. RESPONSIVE IMAGES
// ============================================
/*
USING CSS:
  <img src="photo.jpg" alt="Photo" 
       style="max-width: 100%; height: auto;">

USING SRCSET:
  <img src="photo-small.jpg"
       srcset="photo-small.jpg 400w,
               photo-medium.jpg 800w,
               photo-large.jpg 1200w"
       sizes="(max-width: 600px) 400px, 800px"
       alt="Photo">

USING PICTURE:
  <picture>
      <source media="(min-width: 800px)" srcset="large.jpg">
      <source media="(min-width: 400px)" srcset="medium.jpg">
      <img src="small.jpg" alt="Photo">
  </picture>
*/

// ============================================
// 5. IMAGE AS LINK
// ============================================
/*
<a href="large-photo.jpg">
    <img src="thumbnail.jpg" alt="Click to view larger">
</a>
*/

// ============================================
// 6. FIGURE & FIGCAPTION
// ============================================
/*
<figure>
    <img src="diagram.jpg" alt="System architecture">
    <figcaption>Figure 1: System Architecture</figcaption>
</figure>
*/

// ============================================
// 7. LAZY LOADING
// ============================================
/*
<img src="photo.jpg" alt="Photo" loading="lazy">
  → Image loads only when user scrolls near it
  → Faster initial page load
*/

// ============================================
// 8. BEST PRACTICES
// ============================================
/*
✅ Always include alt text
✅ Optimize image file sizes
✅ Use responsive images
✅ Implement lazy loading
✅ Choose appropriate format (JPEG/PNG/SVG)
✅ Use CSS for sizing, not HTML attributes
*/
`
};

export default htmlImages;


