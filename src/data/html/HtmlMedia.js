const htmlMedia = {
  id: 'html-media',
  title: 'HTML Media - Audio & Video',
  description: 'Learn how to embed audio and video content in HTML pages',
  content: `
# HTML Media - Audio & Video

HTML5 provides native support for embedding audio and video content directly in web pages without requiring browser plugins. The \`<video>\` and \`<audio>\` elements enable rich media experiences, supporting multiple formats, playback controls, and responsive design. Understanding HTML media elements is essential for building modern web applications that include multimedia content.

Enterprise web applications extensively use media elements for product demonstrations, tutorials, marketing content, user-generated content, and interactive experiences. Media elements support multiple source formats for cross-browser compatibility, provide customizable controls, and enable programmatic control through JavaScript. Proper media implementation includes format selection, accessibility considerations, and performance optimization.

**Media Element Features:**
- **Multiple Formats**: Support for various audio/video codecs
- **Playback Controls**: Built-in or custom controls
- **Responsive Design**: Adapting to different screen sizes
- **Accessibility**: Captions, subtitles, and transcripts

---

## Video Element

### Basic Video

\`\`\`html
<video src="movie.mp4" controls>
    Your browser does not support the video tag.
</video>
\`\`\`

**Attributes:**
- \`src\` - Video file path
- \`controls\` - Shows play/pause controls
- Text inside - Fallback for unsupported browsers

---

### Video with Multiple Sources

\`\`\`html
<video controls>
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    <source src="movie.ogg" type="video/ogg">
    Your browser does not support the video tag.
</video>
\`\`\`

**Purpose:** Browser picks first supported format

---

### Video Attributes

\`\`\`html
<video 
    src="movie.mp4"
    controls
    autoplay
    loop
    muted
    poster="thumbnail.jpg"
    width="640"
    height="360"
    preload="auto">
    Your browser does not support video.
</video>
\`\`\`

**Attributes:**
- \`controls\` - Show controls
- \`autoplay\` - Start automatically (often blocked by browsers)
- \`loop\` - Repeat video
- \`muted\` - Start muted (required for autoplay in many browsers)
- \`poster\` - Thumbnail image before play
- \`width\` / \`height\` - Dimensions
- \`preload\` - "auto", "metadata", or "none"

---

## Audio Element

### Basic Audio

\`\`\`html
<audio src="audio.mp3" controls>
    Your browser does not support the audio tag.
</audio>
\`\`\`

---

### Audio with Multiple Sources

\`\`\`html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <source src="audio.wav" type="audio/wav">
    Your browser does not support the audio tag.
</audio>
\`\`\`

---

### Audio Attributes

\`\`\`html
<audio 
    src="audio.mp3"
    controls
    autoplay
    loop
    muted
    preload="auto">
    Your browser does not support audio.
</audio>
\`\`\`

---

## Supported Formats

### Video Formats:
- **MP4** - Most widely supported
- **WebM** - Open format, good compression
- **OGG** - Open format

### Audio Formats:
- **MP3** - Most widely supported
- **OGG** - Open format
- **WAV** - Uncompressed, large files

---

## Real-Time Scenarios

### Scenario 1: Video Tutorial

\`\`\`html
<article>
    <h1>HTML Tutorial</h1>
    <video controls width="800" poster="tutorial-thumb.jpg">
        <source src="tutorial.mp4" type="video/mp4">
        <source src="tutorial.webm" type="video/webm">
        <p>Download the <a href="tutorial.mp4">video</a>.</p>
    </video>
</article>
\`\`\`

### Scenario 2: Background Music

\`\`\`html
<audio autoplay loop muted>
    <source src="background-music.mp3" type="audio/mpeg">
</audio>
\`\`\`

**Note:** \`muted\` is often required for autoplay

### Scenario 3: Podcast Player

\`\`\`html
<div class="podcast-player">
    <h2>Episode 1: Learning HTML</h2>
    <audio controls>
        <source src="podcast-ep1.mp3" type="audio/mpeg">
    </audio>
    <p>Duration: 30 minutes</p>
</div>
\`\`\`

---

## Best Practices

1. **Provide multiple formats**
   - MP4 for video (widest support)
   - MP3 for audio (widest support)

2. **Include fallback text**
   - For browsers that don't support media

3. **Use poster for videos**
   - Shows thumbnail before play

4. **Don't autoplay with sound**
   - Use \`muted\` with \`autoplay\`
   - Many browsers block autoplay with sound

5. **Optimize file sizes**
   - Compress videos/audio
   - Consider streaming for large files

---

## Summary

**Video Element:**
- ✅ \`<video>\` - Embed video
- ✅ \`<source>\` - Multiple formats
- ✅ Attributes: controls, autoplay, loop, muted, poster

**Audio Element:**
- ✅ \`<audio>\` - Embed audio
- ✅ \`<source>\` - Multiple formats
- ✅ Attributes: controls, autoplay, loop, muted

**Best Formats:**
- ✅ Video: MP4, WebM
- ✅ Audio: MP3, OGG

Media elements make web pages more engaging!

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
| **Hibernate** | [Hibernate Introduction](/hibernate/hibernate-introduction) |
| **Spring Framework** | [Spring Introduction](/tutorial/spring-introduction) |
| **Spring Boot** | [Spring Boot Introduction](/tutorial/spring-boot-introduction) |
| **Spring Cloud** | [Spring Cloud & Microservices](/tutorial/spring-cloud-microservices) |
| **HTTP & HTTPS** | [HTTP Introduction](/tutorial/http-introduction) · [HTTPS Security](/tutorial/https-security) |
| **APIs** | [API Introduction](/tutorial/api-introduction) · [REST API Fundamentals](/tutorial/rest-api-fundamentals) |

---

## 10 Important HTML Audio & Video Interview Questions

1. **What do \`<video>\` and \`<audio>\` do?**  
   They embed **media** without browser plugins (Flash-era). The **browser** handles decoding, **hardware** acceleration where available, and **native controls** when \`controls\` is present. **Accessibility** requires **keyboard** operable controls and **captions** for video. **Autoplay** policies differ by browser—**never** rely on autoplay with sound for critical content.

2. **Why use multiple \`<source>\` children?**  
   Browsers support **different codecs** and **containers**. Listing **\`<source src type="video/mp4">\`** and **WebM** lets the browser **choose** the first playable source. **\`type\`** helps the browser avoid downloading an **unsupported** file. Always **order** from most compatible to **fallback**.

3. **What does the \`controls\` attribute do?**  
   Shows the **browser default** UI: play/pause, timeline, volume, fullscreen (video). Without **controls**, media is **invisible** unless you build **custom** UI with JS. Custom players must implement **keyboard** accessibility and **ARIA** patterns.

4. **Why is autoplay with sound often blocked?**  
   Autoplaying **audio** is **disruptive** and used for ads. **Chrome/Safari** etc. allow **muted** autoplay or autoplay after **user gesture** on the page. **Respect** \`prefers-reduced-motion\` for excessive motion in custom players.

5. **What is \`poster\` on \`<video>\`?**  
   **\`poster="image.jpg"\`** shows a **thumbnail** before playback and when the video is paused (depending on browser). **Pick** a frame that represents content and **optimize** size. **Poster** is not a substitute for **video captions**.

6. **What is \`preload\`?**  
   **\`none\`**: minimal preloading; **\`metadata\`**: duration/dimensions; **\`auto\`**: browser may prefetch aggressively. **Bandwidth** vs **startup latency** trade-off—use **\`none\`** for below-the-fold media unless you know it will play. **\`preload\`** is a **hint**; **mobile** networks may ignore aggressive behavior.

7. **What is the \`<track>\` element for?**  
   **\`<track kind="subtitles" src="captions.vtt" srclang="en" default>\`** links **WebVTT** text tracks for **captions/subtitles**, **descriptions**, or **chapters**. **Captions** are required for **deaf/hard-of-hearing** users and **WCAG**. **kind** controls behavior; **default** picks the initial track.

8. **Common video formats on the web?**  
   **MP4** with **H.264** video + **AAC** audio has **universal** support. **WebM** (VP9/AV1) offers **open** licensing and smaller files on supporting browsers. **HLS/DASH** streaming uses **MSE** in JS for adaptive bitrate—beyond basic \`<video>\` **src**.

9. **How do you provide fallback content?**  
   Place **children** inside \`<video>\`/\`<audio>\`: a **download link** or message for **legacy** browsers. **Feature detection** (e.g. \`canPlayType\`) can choose **formats**. For **enterprise** support, **transcoding** to multiple formats is common.

10. **Why optimize media files?**  
    Video is **heavy**—large files **bloat** LCP, **buffer**, and **data caps**. **Compress** with modern codecs, **limit** resolution to **need**, use **adaptive** streaming for long content, and **serve** responsive **bitrates**. **Audio** should be **compressed** (AAC/Opus) for **music/podcasts**.

`,
  code: `// HTML Media - Audio & Video

/*
 * HTML5 NATIVE MEDIA SUPPORT
 * ===========================
 * 
 * No plugins needed for audio/video
 */

// ============================================
// 1. VIDEO ELEMENT
// ============================================
/*
BASIC:
  <video src="movie.mp4" controls>
      Your browser does not support video.
  </video>

MULTIPLE SOURCES:
  <video controls>
      <source src="movie.mp4" type="video/mp4">
      <source src="movie.webm" type="video/webm">
  </video>

ATTRIBUTES:
  controls    → Show play/pause controls
  autoplay    → Start automatically
  loop        → Repeat video
  muted       → Start muted
  poster      → Thumbnail image
  width/height → Dimensions
  preload     → "auto", "metadata", "none"
*/

// ============================================
// 2. AUDIO ELEMENT
// ============================================
/*
BASIC:
  <audio src="audio.mp3" controls>
      Your browser does not support audio.
  </audio>

MULTIPLE SOURCES:
  <audio controls>
      <source src="audio.mp3" type="audio/mpeg">
      <source src="audio.ogg" type="audio/ogg">
  </audio>

ATTRIBUTES:
  controls    → Show controls
  autoplay    → Start automatically
  loop        → Repeat audio
  muted       → Start muted
  preload     → "auto", "metadata", "none"
*/

// ============================================
// 3. SUPPORTED FORMATS
// ============================================
/*
VIDEO:
  MP4   → Most widely supported
  WebM  → Open format
  OGG   → Open format

AUDIO:
  MP3   → Most widely supported
  OGG   → Open format
  WAV   → Uncompressed
*/

// ============================================
// 4. BEST PRACTICES
// ============================================
/*
✅ Provide multiple formats
✅ Include fallback text
✅ Use poster for videos
✅ Don't autoplay with sound (use muted)
✅ Optimize file sizes
*/
`
};

export default htmlMedia;


