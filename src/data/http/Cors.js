const cors = {
  id: 'cors',
  title: 'CORS - Cross-Origin Resource Sharing',
  description: 'Learn CORS: Same-Origin Policy, preflight requests, CORS headers, how to configure CORS for APIs, and security best practices',
  content: `
# CORS — Deep Real-Time Explanation

Let me explain CORS in a way that makes complete sense. This is one of those topics that confuses many developers, but once you understand what's really happening, it becomes crystal clear.

---

## What Exactly is CORS?

CORS stands for Cross-Origin Resource Sharing. But what does that actually mean?

Here's the thing: CORS is not something your backend server does. It's a security mechanism enforced by your web browser. Let me repeat that because it's crucial: CORS is enforced by the browser, not by your server.

Think of it this way: Your browser is like a security guard. When your JavaScript code tries to make a request to a different domain, the browser stops and asks: "Hey, is this allowed?" The browser checks with the server by looking at special headers. If the server says "yes, this origin is allowed," the browser lets the request through. If not, the browser blocks it.

---

## Understanding Origins

Before we dive deeper, you need to understand what an "origin" actually is. An origin is made up of three parts:

1. The protocol (http or https)
2. The domain (example.com)
3. The port (80, 8080, 3000, etc.)

All three must match exactly for two URLs to be considered the same origin.

Let me show you some examples:

**Same Origin Examples:**

\`http://example.com/page1\` and \`http://example.com/page2\`
- Same protocol (http)
- Same domain (example.com)
- Same port (default 80)
- Result: Same origin

**Different Origin Examples:**

\`http://example.com\` and \`https://example.com\`
- Different protocol (http vs https)
- Result: Different origin

\`http://example.com\` and \`http://example.com:8080\`
- Different port (80 vs 8080)
- Result: Different origin

\`http://example.com\` and \`http://api.example.com\`
- Different subdomain
- Result: Different origin

\`http://localhost:3000\` and \`http://localhost:8080\`
- Different port
- Result: Different origin (this is why you see CORS errors in development!)

---

## The Same-Origin Policy

Browsers have something called the "Same-Origin Policy." This is a security feature that prevents websites from accessing resources from other origins without permission.

Why does this exist? Imagine you're logged into your bank's website. Without the Same-Origin Policy, a malicious website could make requests to your bank's API using your cookies and steal your money. The Same-Origin Policy prevents this.

But here's the problem: Modern web applications often need to make requests to different origins. Your React app might be running on \`http://localhost:3000\`, but your API is on \`http://localhost:8080\`. These are different origins, so the browser blocks the request.

This is where CORS comes in. CORS allows the server to say: "Yes, I trust requests from this specific origin. Let them through."

---

## How CORS Actually Works Internally

Let me walk you through exactly what happens when a cross-origin request is made. This is the part that most tutorials skip, but it's crucial to understand.

### Step 1: Your JavaScript Makes a Request

You write code like this:

\`\`\`javascript
fetch('http://localhost:8080/api/users')
\`\`\`

Your page is running on \`http://localhost:3000\`, but you're requesting from \`http://localhost:8080\`. These are different origins.

### Step 2: Browser Intercepts the Request

Before sending the request, the browser checks: "Is this a cross-origin request?" Since the origins don't match, the browser knows this is cross-origin.

The browser automatically adds an \`Origin\` header to your request:

\`\`\`http
GET /api/users HTTP/1.1
Host: localhost:8080
Origin: http://localhost:3000
\`\`\`

Notice that you didn't write code to add this header. The browser does it automatically. You cannot add or modify the Origin header from JavaScript - the browser controls it completely.

### Step 3: Server Responds

Your server receives the request and processes it. If your server is configured for CORS, it will include special headers in the response:

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:3000

{
  "users": [...]
}
\`\`\`

The key header here is \`Access-Control-Allow-Origin\`. This tells the browser: "I allow requests from \`http://localhost:3000\`."

### Step 4: Browser Checks the Response

The browser receives the response and checks: "Does the \`Access-Control-Allow-Origin\` header match the origin I sent?"

If it matches (or is set to \`*\`), the browser allows your JavaScript to access the response. If it doesn't match, the browser blocks the response and throws a CORS error in the console.

### Step 5: Your Code Gets the Response (or an Error)

If CORS is configured correctly, your \`fetch()\` call succeeds and you get the data. If not, you get an error like:

\`\`\`
Access to fetch at 'http://localhost:8080/api/users' from origin 'http://localhost:3000' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present 
on the requested resource.
\`\`\`

---

## Simple Requests vs Preflight Requests

This is where it gets interesting. Not all cross-origin requests are treated the same way. The browser categorizes requests into two types: simple requests and preflight requests.

### Simple Requests

A simple request is one that the browser considers "safe" and doesn't require a preflight check. For a request to be simple, it must meet ALL of these conditions:

1. The HTTP method must be one of: GET, HEAD, or POST
2. The Content-Type header (if present) must be one of:
   - \`application/x-www-form-urlencoded\`
   - \`multipart/form-data\`
   - \`text/plain\`
3. No custom headers are sent (except for a few safe ones like Accept, Accept-Language, Content-Language)

**Example of a Simple Request:**

\`\`\`javascript
fetch('http://localhost:8080/api/users')
\`\`\`

This is a GET request with no custom headers and no body. The browser sends it directly, and if the server responds with the right CORS headers, it works.

**What the browser sends:**

\`\`\`http
GET /api/users HTTP/1.1
Host: localhost:8080
Origin: http://localhost:3000
\`\`\`

**What the server needs to respond with:**

\`\`\`http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000

{
  "users": [...]
}
\`\`\`

That's it. Just the \`Access-Control-Allow-Origin\` header is enough for simple requests.

### Preflight Requests

A preflight request is sent BEFORE the actual request when the browser determines that the request is "not simple." This happens when:

1. The HTTP method is PUT, DELETE, PATCH, or any method other than GET, HEAD, or POST
2. The Content-Type is \`application/json\` or any value other than the simple types
3. Custom headers are included (like \`Authorization\`, \`X-Custom-Header\`, etc.)

**Why does preflight exist?**

Preflight exists to protect servers. Before sending a potentially dangerous request (like DELETE), the browser asks the server: "Hey, do you allow PUT requests from this origin?" The server can say "no" without the browser even sending the actual request.

**Example of a Preflight Request:**

Let's say you want to send a POST request with JSON:

\`\`\`javascript
fetch('http://localhost:8080/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    body: JSON.stringify({ name: 'John' })
})
\`\`\`

This triggers a preflight because:
- Content-Type is \`application/json\` (not a simple type)
- There's a custom \`Authorization\` header

**Step 1: Browser Sends Preflight (OPTIONS request)**

The browser automatically sends an OPTIONS request first:

\`\`\`http
OPTIONS /api/users HTTP/1.1
Host: localhost:8080
Origin: http://localhost:3000
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type, authorization
\`\`\`

Notice:
- Method is OPTIONS (not POST)
- \`Access-Control-Request-Method\` tells the server what method you want to use
- \`Access-Control-Request-Headers\` tells the server what headers you want to send

**Step 2: Server Responds to Preflight**

Your server must handle this OPTIONS request and respond with CORS headers:

\`\`\`http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 3600
\`\`\`

**Step 3: Browser Checks Preflight Response**

The browser checks:
- Does \`Access-Control-Allow-Origin\` match my origin? Yes.
- Does \`Access-Control-Allow-Methods\` include POST? Yes.
- Does \`Access-Control-Allow-Headers\` include Content-Type and Authorization? Yes.

If all checks pass, the browser proceeds. If any check fails, the browser stops and throws a CORS error.

**Step 4: Browser Sends Actual Request**

Only if the preflight succeeds, the browser sends your actual POST request:

\`\`\`http
POST /api/users HTTP/1.1
Host: localhost:8080
Origin: http://localhost:3000
Content-Type: application/json
Authorization: Bearer token123

{
  "name": "John"
}
\`\`\`

**Step 5: Server Responds (Again with CORS Headers)**

\`\`\`http
HTTP/1.1 201 Created
Access-Control-Allow-Origin: http://localhost:3000
Content-Type: application/json

{
  "id": 123,
  "name": "John"
}
\`\`\`

Notice that the server must include CORS headers in BOTH the preflight response AND the actual response.

---

## Understanding CORS Headers in Detail

Let me explain each CORS header and what it does. This is important because you need to understand what each header means.

### Access-Control-Allow-Origin

This is the most important CORS header. It tells the browser which origins are allowed to access the resource.

**Single Origin:**

\`\`\`http
Access-Control-Allow-Origin: http://localhost:3000
\`\`\`

This means: "Only requests from \`http://localhost:3000\` are allowed."

**All Origins (Wildcard):**

\`\`\`http
Access-Control-Allow-Origin: *
\`\`\`

This means: "Any origin can access this resource."

**Important Limitation:** You cannot use \`*\` if you're also using \`Access-Control-Allow-Credentials: true\`. This is a browser security restriction. If you need to send cookies or authentication, you must specify the exact origin.

### Access-Control-Allow-Methods

This header tells the browser which HTTP methods are allowed for cross-origin requests.

\`\`\`http
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
\`\`\`

This means: "Cross-origin requests can use GET, POST, PUT, or DELETE methods."

**Important:** This header is only used in preflight responses. For simple requests, you don't need it.

### Access-Control-Allow-Headers

This header tells the browser which request headers are allowed in cross-origin requests.

\`\`\`http
Access-Control-Allow-Headers: Content-Type, Authorization, X-Custom-Header
\`\`\`

This means: "Cross-origin requests can include Content-Type, Authorization, and X-Custom-Header headers."

**Important:** Like \`Access-Control-Allow-Methods\`, this is only used in preflight responses.

### Access-Control-Allow-Credentials

This header tells the browser whether it's allowed to send credentials (cookies, authorization headers, etc.) with the request.

\`\`\`http
Access-Control-Allow-Credentials: true
\`\`\`

**Critical Rules:**
1. If you set this to \`true\`, you CANNOT use \`Access-Control-Allow-Origin: *\`. You must specify the exact origin.
2. On the client side, you must also set \`credentials: 'include'\` in your fetch request.

**Example:**

Server:
\`\`\`http
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
\`\`\`

Client:
\`\`\`javascript
fetch('http://localhost:8080/api/users', {
    credentials: 'include'  // Required to send cookies
})
\`\`\`

### Access-Control-Expose-Headers

By default, JavaScript can only read certain response headers (like \`Content-Type\`). This header tells the browser which additional headers JavaScript is allowed to read.

\`\`\`http
Access-Control-Expose-Headers: X-Request-ID, X-Rate-Limit-Remaining
\`\`\`

Without this header, if your server sends \`X-Request-ID\`, your JavaScript cannot read it. With this header, you can do:

\`\`\`javascript
fetch('http://localhost:8080/api/users')
    .then(response => {
        const requestId = response.headers.get('X-Request-ID');  // Now this works
    })
\`\`\`

### Access-Control-Max-Age

This header tells the browser how long (in seconds) it can cache the preflight response.

\`\`\`http
Access-Control-Max-Age: 3600
\`\`\`

This means: "Cache the preflight response for 1 hour. Don't send another preflight request for 1 hour."

This improves performance because the browser doesn't need to send a preflight request for every actual request.

---

## Real-World Development Scenario

Let me walk you through a real scenario that happens all the time in development.

**The Setup:**
- Frontend: React app running on \`http://localhost:3000\`
- Backend: Spring Boot API running on \`http://localhost:8080\`

**The Problem:**
You try to fetch data from your API:

\`\`\`javascript
fetch('http://localhost:8080/api/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
\`\`\`

**What Happens:**

1. Your React app makes the request
2. Browser sees: Origin is \`http://localhost:3000\`, but target is \`http://localhost:8080\`
3. Browser thinks: "Different origins! I need to check CORS."
4. Browser adds \`Origin: http://localhost:3000\` header automatically
5. Request goes to your Spring Boot server
6. Your server processes the request and returns data, but doesn't include CORS headers
7. Browser receives response, checks for \`Access-Control-Allow-Origin\` header
8. Browser doesn't find it
9. Browser blocks the response and shows error in console

**The Error You See:**

\`\`\`
Access to fetch at 'http://localhost:8080/api/users' from origin 'http://localhost:3000' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present 
on the requested resource.
\`\`\`

**The Solution:**

You need to configure your Spring Boot server to send CORS headers. Let me show you how.

---

## Spring Boot CORS Configuration

There are several ways to configure CORS in Spring Boot. Let me show you the most common approaches, from simplest to most professional.

### Method 1: @CrossOrigin Annotation (Quick and Simple)

This is the fastest way to enable CORS for a specific controller or endpoint:

\`\`\`java
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }
}
\`\`\`

**What this does:**
- Allows requests from \`http://localhost:3000\`
- Works for all endpoints in this controller
- Spring Boot automatically handles preflight requests

**When to use:** Quick development, single origin, simple setup.

**Limitations:** 
- Only works for the controller/endpoint where it's applied
- Not ideal for multiple origins
- Hard to maintain if you have many controllers

### Method 2: Global CORS Configuration (Professional Way)

This is the recommended approach for production applications. You create a configuration class that applies CORS settings globally:

\`\`\`java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000", "https://myapp.com")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
            .allowedHeaders("Content-Type", "Authorization", "X-Request-ID")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
\`\`\`

**What this does:**
- Applies to all endpoints matching \`/api/**\`
- Allows multiple origins
- Specifies allowed methods
- Specifies allowed headers
- Allows credentials (cookies, auth headers)
- Caches preflight for 1 hour

**When to use:** Production applications, multiple origins, need fine-grained control.

**Benefits:**
- Centralized configuration
- Easy to maintain
- Applies to all matching endpoints automatically

### Method 3: CORS Filter (Most Control)

For maximum control, you can create a CORS filter:

\`\`\`java
@Configuration
public class CorsFilterConfig {
    
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Allow specific origins
        config.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "https://myapp.com",
            "https://admin.myapp.com"
        ));
        
        // Allow specific methods
        config.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
        ));
        
        // Allow specific headers
        config.setAllowedHeaders(Arrays.asList(
            "Content-Type",
            "Authorization",
            "X-Request-ID",
            "X-API-Key"
        ));
        
        // Allow credentials
        config.setAllowCredentials(true);
        
        // Cache preflight for 1 hour
        config.setMaxAge(3600L);
        
        // Expose custom headers to JavaScript
        config.setExposedHeaders(Arrays.asList(
            "X-Request-ID",
            "X-Rate-Limit-Remaining"
        ));
        
        // Apply to all paths
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}
\`\`\`

**When to use:** When you need dynamic origin checking, custom logic, or integration with other filters.

---

## CORS with Spring Security

This is where many developers get stuck. If you're using Spring Security, you need to configure CORS differently. Spring Security has its own CORS handling that can conflict with your CORS configuration.

**The Problem:**

You configure CORS using \`WebMvcConfigurer\`, but Spring Security intercepts requests before they reach your controllers. If Spring Security doesn't know about CORS, it might block the preflight request.

**The Solution:**

You need to tell Spring Security to allow CORS:

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()  // Enable CORS support
            .and()
            .csrf().disable()  // Disable CSRF for API (or configure properly)
            .authorizeHttpRequests()
            .requestMatchers("/api/**").permitAll()
            .anyRequest().authenticated();
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allowed origins
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "https://myapp.com"
        ));
        
        // Allowed methods
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
        ));
        
        // Allowed headers
        configuration.setAllowedHeaders(Arrays.asList(
            "Content-Type",
            "Authorization"
        ));
        
        // Allow credentials
        configuration.setAllowCredentials(true);
        
        // Cache preflight
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        
        return source;
    }
}
\`\`\`

**Key Points:**
1. Call \`.cors()\` in your security configuration
2. Provide a \`CorsConfigurationSource\` bean
3. Spring Security will use this configuration for CORS handling

**Common Mistake:** Developers configure CORS in \`WebMvcConfigurer\` but forget to configure it in Spring Security. The result is that preflight requests fail with 403 Forbidden.

---

## Debugging CORS Issues

Let me teach you how to debug CORS issues like a pro. When CORS isn't working, you need to know where to look.

### Step 1: Open Browser DevTools

Open your browser's developer tools (F12) and go to the Network tab.

### Step 2: Make Your Request

Make the request that's failing. Watch the Network tab.

### Step 3: Look for the OPTIONS Request

If you see an OPTIONS request, that's your preflight. Click on it and check:

**Request Headers:**
- Is \`Origin\` header present? It should be.
- Is \`Access-Control-Request-Method\` present? It should show the method you want to use.
- Is \`Access-Control-Request-Headers\` present? It should show the headers you want to send.

**Response Headers:**
- Is \`Access-Control-Allow-Origin\` present? It should match your origin.
- Is \`Access-Control-Allow-Methods\` present? It should include your method.
- Is \`Access-Control-Allow-Headers\` present? It should include your headers.

**Status Code:**
- Is it 200 OK? If it's 403 or 404, your server isn't handling the OPTIONS request properly.

### Step 4: Check the Actual Request

If preflight succeeds, look at your actual request (GET, POST, etc.):

**Response Headers:**
- Is \`Access-Control-Allow-Origin\` present? It must be, even for the actual request.
- Does it match your origin exactly?

### Common Issues and Solutions

**Issue 1: "No 'Access-Control-Allow-Origin' header"**

**Cause:** Your server isn't sending CORS headers at all.

**Solution:** Add CORS configuration to your server. Use one of the methods I showed above.

**Issue 2: "Credentials flag is true, but 'Access-Control-Allow-Origin' is '*'"**

**Cause:** You're using \`*\` with \`allowCredentials: true\`.

**Solution:** Specify the exact origin instead of \`*\`:

\`\`\`java
// Wrong
config.setAllowedOrigins(Arrays.asList("*"));
config.setAllowCredentials(true);

// Correct
config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
config.setAllowCredentials(true);
\`\`\`

**Issue 3: Preflight returns 403 Forbidden**

**Cause:** Spring Security is blocking the OPTIONS request.

**Solution:** Configure CORS in Spring Security as I showed above. Make sure you call \`.cors()\` and provide a \`CorsConfigurationSource\`.

**Issue 4: "Request header field authorization is not allowed"**

**Cause:** Your server's \`Access-Control-Allow-Headers\` doesn't include \`Authorization\`.

**Solution:** Add \`Authorization\` to allowed headers:

\`\`\`java
config.setAllowedHeaders(Arrays.asList(
    "Content-Type",
    "Authorization"  // Add this
));
\`\`\`

**Issue 5: CORS works in Postman but not in browser**

**Cause:** Postman doesn't enforce CORS. It's not a browser.

**Solution:** This is expected behavior. CORS is browser-only. Always test CORS in a real browser, not in Postman.

---

## Real-World Example: Complete Setup

Let me show you a complete, production-ready CORS setup for a Spring Boot application.

**Scenario:**
- Frontend: React app on \`http://localhost:3000\` (development) and \`https://myapp.com\` (production)
- Backend: Spring Boot API on \`http://localhost:8080\` (development) and \`https://api.myapp.com\` (production)
- Authentication: JWT tokens sent in Authorization header
- Need to send cookies for session management

**Complete Configuration:**

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Value("\${app.allowed-origins}")
    private String allowedOrigins;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()
            .and()
            .csrf().disable()  // APIs typically don't need CSRF
            .authorizeHttpRequests()
            .requestMatchers("/api/public/**").permitAll()
            .requestMatchers("/api/**").authenticated()
            .and()
            .oauth2ResourceServer()
            .jwt();
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Parse allowed origins from properties
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        configuration.setAllowedOrigins(origins);
        
        // Allow common HTTP methods
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
        ));
        
        // Allow common headers
        configuration.setAllowedHeaders(Arrays.asList(
            "Content-Type",
            "Authorization",
            "X-Request-ID"
        ));
        
        // Allow credentials (cookies, auth headers)
        configuration.setAllowCredentials(true);
        
        // Cache preflight for 1 hour
        configuration.setMaxAge(3600L);
        
        // Expose custom headers to JavaScript
        configuration.setExposedHeaders(Arrays.asList(
            "X-Request-ID",
            "X-Rate-Limit-Remaining",
            "X-Rate-Limit-Reset"
        ));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        
        return source;
    }
}
\`\`\`

**application.properties:**

\`\`\`properties
# Development
app.allowed-origins=http://localhost:3000,http://localhost:3001

# Production (override in production profile)
# app.allowed-origins=https://myapp.com,https://admin.myapp.com
\`\`\`

**Frontend Code:**

\`\`\`javascript
// Make sure to include credentials
fetch('http://localhost:8080/api/users', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    credentials: 'include'  // Important: include cookies
})
.then(response => {
    // Check if request was successful
    if (!response.ok) {
        throw new Error('Request failed');
    }
    return response.json();
})
.then(data => {
    console.log('Users:', data);
})
.catch(error => {
    console.error('Error:', error);
});
\`\`\`

---

## Security Best Practices

Now that you understand how CORS works, let me share some security best practices that you should always follow.

### 1. Never Use * in Production with Credentials

This is a critical security rule. If you use \`*\` with credentials, any website can make requests to your API using a user's cookies. This is a serious security vulnerability.

**Wrong:**
\`\`\`java
config.setAllowedOrigins(Arrays.asList("*"));
config.setAllowCredentials(true);  // This combination is blocked by browser
\`\`\`

**Correct:**
\`\`\`java
config.setAllowedOrigins(Arrays.asList("https://myapp.com"));
config.setAllowCredentials(true);
\`\`\`

### 2. Whitelist Specific Origins

Don't allow all origins unless you're building a truly public API (like GitHub's public API). Even then, be careful.

**Wrong:**
\`\`\`java
config.setAllowedOrigins(Arrays.asList("*"));  // Too permissive
\`\`\`

**Correct:**
\`\`\`java
config.setAllowedOrigins(Arrays.asList(
    "https://myapp.com",
    "https://admin.myapp.com"
));  // Specific origins only
\`\`\`

### 3. Limit Allowed Methods

Only allow the HTTP methods you actually use. Don't allow all methods.

**Wrong:**
\`\`\`java
config.setAllowedMethods(Arrays.asList("*"));  // Too permissive
\`\`\`

**Correct:**
\`\`\`java
config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));  // Only what you need
\`\`\`

### 4. Limit Allowed Headers

Only allow the headers you actually need. Don't allow all headers.

**Wrong:**
\`\`\`java
config.setAllowedHeaders(Arrays.asList("*"));  // Too permissive
\`\`\`

**Correct:**
\`\`\`java
config.setAllowedHeaders(Arrays.asList(
    "Content-Type",
    "Authorization"
));  // Only what you need
\`\`\`

### 5. Use Environment-Based Configuration

Don't hardcode origins. Use configuration files or environment variables:

\`\`\`java
@Value("\${cors.allowed-origins}")
private String allowedOrigins;
\`\`\`

This allows you to have different origins for development, staging, and production.

### 6. Always Use HTTPS in Production

CORS should always be used over HTTPS in production. HTTP is vulnerable to man-in-the-middle attacks.

---

## Common Misconceptions

Let me clear up some common misconceptions about CORS:

### Misconception 1: "CORS is a backend issue"

**Reality:** CORS is enforced by the browser. Your backend just needs to send the right headers. The browser does all the checking and blocking.

### Misconception 2: "I can disable CORS"

**Reality:** You cannot disable CORS in the browser (without disabling browser security, which you should never do). You must configure your server to allow cross-origin requests.

### Misconception 3: "CORS affects server-to-server requests"

**Reality:** CORS only affects browser-based requests. Server-to-server requests (like one backend calling another) don't go through the browser, so CORS doesn't apply.

### Misconception 4: "I need CORS for same-origin requests"

**Reality:** CORS only applies to cross-origin requests. If your frontend and backend are on the same origin, CORS doesn't apply.

### Misconception 5: "Postman tests prove CORS works"

**Reality:** Postman doesn't enforce CORS. If your API works in Postman but not in the browser, that's actually a sign that CORS isn't configured. Always test in a real browser.

---

## Testing CORS

Here's how to properly test CORS:

### Test 1: Simple Request

\`\`\`javascript
// This should work if CORS is configured
fetch('http://localhost:8080/api/users')
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
\`\`\`

**What to check:**
- Open DevTools → Network tab
- Look for the GET request
- Check response headers for \`Access-Control-Allow-Origin\`

### Test 2: Preflight Request

\`\`\`javascript
// This should trigger a preflight
fetch('http://localhost:8080/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    body: JSON.stringify({ name: 'John' })
})
\`\`\`

**What to check:**
- Open DevTools → Network tab
- Look for OPTIONS request first (preflight)
- Check that OPTIONS returns 200 OK with CORS headers
- Then look for POST request
- Check that POST also has CORS headers

### Test 3: With Credentials

\`\`\`javascript
// This should work if credentials are allowed
fetch('http://localhost:8080/api/users', {
    credentials: 'include'
})
\`\`\`

**What to check:**
- Response must have \`Access-Control-Allow-Credentials: true\`
- \`Access-Control-Allow-Origin\` must be exact origin (not \`*\`)

---

## Summary

Let me summarize what we've learned:

CORS is a browser security mechanism that controls cross-origin requests. The browser enforces it, not your server. Your server just needs to send the right headers to tell the browser "yes, this origin is allowed."

**Key Points:**

1. **CORS is browser-enforced**: Your browser checks CORS, not your server
2. **Origin = Protocol + Domain + Port**: All three must match for same origin
3. **Simple vs Preflight**: Simple requests go directly, complex requests need preflight
4. **Headers matter**: Server must send \`Access-Control-Allow-Origin\` and other CORS headers
5. **Credentials require exact origin**: Can't use \`*\` with credentials
6. **Spring Security needs CORS config**: Don't forget to configure CORS in Spring Security
7. **Test in browser**: Postman doesn't enforce CORS, always test in a real browser

**The Flow:**

1. JavaScript makes cross-origin request
2. Browser adds \`Origin\` header automatically
3. For complex requests, browser sends OPTIONS preflight first
4. Server responds with CORS headers
5. Browser checks if origin is allowed
6. If allowed, browser lets request through
7. If not allowed, browser blocks and shows error

Understanding CORS is essential for building modern web applications where frontend and backend are often on different origins. Once you understand the mechanism, configuring it becomes straightforward.

---

## Frequently Asked Questions

### 1. Why do I get CORS errors in the browser but not in Postman?

Postman is not a browser. It doesn't enforce CORS. Browsers enforce CORS for security. This is why your API might work in Postman but fail in the browser. Always test CORS in a real browser.

### 2. Can I disable CORS in the browser?

Technically yes, but you should never do this. Disabling CORS disables browser security features and makes you vulnerable to attacks. Instead, configure your server to allow cross-origin requests properly.

### 3. Why can't I use * with credentials?

This is a browser security restriction. If you could use \`*\` with credentials, any malicious website could make requests to your API using a user's cookies. Browsers prevent this by requiring you to specify the exact origin when using credentials.

### 4. Do I need CORS for server-to-server requests?

No. CORS only applies to browser-based requests. When one server makes a request to another server (like your backend calling another API), CORS doesn't apply because there's no browser involved.

### 5. Why does my preflight request return 403?

This usually means Spring Security is blocking the OPTIONS request. You need to configure CORS in Spring Security, not just in your controller configuration. Make sure you call \`.cors()\` in your security configuration and provide a \`CorsConfigurationSource\` bean.

### 6. How do I allow multiple origins?

List them in your configuration:

\`\`\`java
config.setAllowedOrigins(Arrays.asList(
    "http://localhost:3000",
    "https://myapp.com",
    "https://admin.myapp.com"
));
\`\`\`

Or use environment variables to make it configurable.

### 7. What's the difference between allowedOrigins and allowedOriginPatterns?

\`allowedOrigins\` requires exact matches. \`allowedOriginPatterns\` allows pattern matching (like \`https://*.myapp.com\`). Use \`allowedOriginPatterns\` if you need to allow multiple subdomains dynamically.

### 8. Why do I need CORS headers in both preflight and actual response?

The browser checks CORS headers in both:
- Preflight response: Browser checks if the request is allowed
- Actual response: Browser checks again before allowing JavaScript to access the response

Both must have the correct CORS headers.

### 9. Can I cache preflight responses?

Yes, use \`Access-Control-Max-Age\` header. This tells the browser how long to cache the preflight response. For example, \`Access-Control-Max-Age: 3600\` means cache for 1 hour. This reduces the number of preflight requests.

### 10. What happens if I don't configure CORS?

If you don't configure CORS, cross-origin requests from browsers will fail. The browser will block the response and show a CORS error in the console. Your API might still work for same-origin requests or server-to-server requests, but browser-based cross-origin requests will be blocked.
  `,
  code: `// CORS - Complete Spring Boot Examples

// Example 1: Quick CORS with @CrossOrigin
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }
}

// Example 2: Global CORS Configuration (Recommended)
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000", "https://myapp.com")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
            .allowedHeaders("Content-Type", "Authorization", "X-Request-ID")
            .allowCredentials(true)
            .maxAge(3600);
    }
}

// Example 3: CORS with Spring Security (Critical!)
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()  // Enable CORS
            .and()
            .csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers("/api/**").permitAll();
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "https://myapp.com"
        ));
        
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
        ));
        
        configuration.setAllowedHeaders(Arrays.asList(
            "Content-Type",
            "Authorization"
        ));
        
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        
        return source;
    }
}

// Example 4: Environment-Based CORS
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Value("\${cors.allowed-origins}")
    private String allowedOrigins;
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        
        registry.addMapping("/api/**")
            .allowedOrigins(origins.toArray(new String[0]))
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("Content-Type", "Authorization")
            .allowCredentials(true)
            .maxAge(3600);
    }
}

// application.properties:
// cors.allowed-origins=http://localhost:3000,https://myapp.com

// Example 5: Dynamic Origin Checking
@Configuration
public class DynamicCorsConfig {
    
    private final List<String> allowedOrigins = Arrays.asList(
        "http://localhost:3000",
        "https://myapp.com",
        "https://admin.myapp.com"
    );
    
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        config.setAllowedOriginPatterns(Arrays.asList("*"));  // Pattern-based
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
        config.setAllowCredentials(true);
        
        // Custom origin resolver
        config.setAllowedOriginResolver(request -> {
            String origin = request.getHeader("Origin");
            if (origin != null && allowedOrigins.contains(origin)) {
                return origin;
            }
            return null;  // Reject if not in whitelist
        });
        
        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }
}

// Example 6: Manual Preflight Handler
@RestController
public class CorsController {
    
    @RequestMapping(value = "/api/**", method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handlePreflight(HttpServletRequest request) {
        HttpHeaders headers = new HttpHeaders();
        String origin = request.getHeader("Origin");
        
        // Check if origin is allowed
        List<String> allowedOrigins = Arrays.asList(
            "http://localhost:3000",
            "https://myapp.com"
        );
        
        if (allowedOrigins.contains(origin)) {
            headers.add("Access-Control-Allow-Origin", origin);
            headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization");
            headers.add("Access-Control-Allow-Credentials", "true");
            headers.add("Access-Control-Max-Age", "3600");
        }
        
        return ResponseEntity.ok().headers(headers).build();
    }
}

// Example 7: JavaScript - Simple Request
fetch('http://localhost:8080/api/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('CORS Error:', error));

// Example 8: JavaScript - Preflight Request
fetch('http://localhost:8080/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    body: JSON.stringify({ name: 'John' }),
    credentials: 'include'  // Include cookies
})
.then(response => response.json())
.then(data => console.log(data));

// Example 9: JavaScript - Check CORS Headers
fetch('http://localhost:8080/api/users')
    .then(response => {
        // Check if CORS headers are present
        const allowOrigin = response.headers.get('Access-Control-Allow-Origin');
        console.log('Allowed Origin:', allowOrigin);
        
        // Check exposed headers
        const requestId = response.headers.get('X-Request-ID');
        console.log('Request ID:', requestId);
        
        return response.json();
    });

// Example 10: Error Handling for CORS
fetch('http://localhost:8080/api/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP error: ' + response.status);
        }
        return response.json();
    })
    .catch(error => {
        if (error.message.includes('CORS') || error.message.includes('fetch')) {
            console.error('CORS Error: Check server configuration');
        } else {
            console.error('Other Error:', error);
        }
    });`
};

export default cors;
