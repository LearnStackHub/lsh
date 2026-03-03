const requestResponseFormats = {
  id: 'request-response-formats',
  title: 'Request & Response Formats - JSON, XML, Form Data',
  description: 'Learn API request and response formats: JSON, XML, form data, multipart file uploads, content negotiation, and format best practices',
  content: `
# Request & Response Formats — Complete Guide

APIs need to exchange data in formats that both client and server understand. Understanding different formats (JSON, XML, form data) and when to use each is essential for building effective APIs.

---

## Common Data Formats

### 1. JSON (JavaScript Object Notation)

**Most Popular Format** for modern APIs

**Characteristics:**
- Lightweight
- Human-readable
- Easy to parse
- Language-agnostic

**Example:**
\`\`\`json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "active": true,
  "tags": ["developer", "java"],
  "address": {
    "street": "123 Main St",
    "city": "New York"
  }
}
\`\`\`

**Content-Type:**
\`\`\`http
Content-Type: application/json
\`\`\`

**Pros:**
- Simple and lightweight
- Native JavaScript support
- Easy to read and write
- Widely supported

**Cons:**
- No comments
- No date type (use strings)
- Limited data types

---

### 2. XML (eXtensible Markup Language)

**Structured Format** for complex data

**Characteristics:**
- Self-describing
- Supports schemas
- More verbose than JSON

**Example:**
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<user>
  <id>123</id>
  <name>John Doe</name>
  <email>john@example.com</email>
  <age>30</age>
  <active>true</active>
  <tags>
    <tag>developer</tag>
    <tag>java</tag>
  </tags>
  <address>
    <street>123 Main St</street>
    <city>New York</city>
  </address>
</user>
\`\`\`

**Content-Type:**
\`\`\`http
Content-Type: application/xml
\`\`\`

**Pros:**
- Self-describing
- Schema validation (XSD)
- Namespaces support
- Mature standard

**Cons:**
- Verbose
- More complex to parse
- Larger file size

---

### 3. Form Data

**Traditional Web Forms** format

**Characteristics:**
- Key-value pairs
- URL-encoded
- Simple structure

**Example:**
\`\`\`
username=john&password=secret123&email=john@example.com
\`\`\`

**Content-Type:**
\`\`\`http
Content-Type: application/x-www-form-urlencoded
\`\`\`

**Use Cases:**
- HTML forms
- Simple data submission
- Login forms

**Pros:**
- Simple
- Browser-native
- Easy to implement

**Cons:**
- Limited data types
- No nested structures
- URL encoding overhead

---

### 4. Multipart Form Data

**File Uploads** and complex forms

**Characteristics:**
- Supports files
- Multiple parts
- Binary data

**Example:**
\`\`\`http
POST /api/upload HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="username"

john
------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="photo.jpg"
Content-Type: image/jpeg

[binary file data]
------WebKitFormBoundary--
\`\`\`

**Content-Type:**
\`\`\`http
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary
\`\`\`

**Use Cases:**
- File uploads
- Forms with files
- Binary data

**Pros:**
- Supports files
- Multiple fields
- Binary data support

**Cons:**
- Complex parsing
- Larger payload
- More overhead

---

## Format Comparison

| Feature | JSON | XML | Form Data | Multipart |
|---------|------|-----|-----------|-----------|
| **Readability** | High | Medium | Low | Low |
| **Size** | Small | Large | Medium | Large |
| **Parsing** | Easy | Complex | Easy | Complex |
| **Nested Data** | Yes | Yes | No | Limited |
| **Files** | No | No | No | Yes |
| **Schema** | JSON Schema | XSD | No | No |
| **Popularity** | Very High | Medium | High | Medium |

---

## Content Negotiation

**Content Negotiation** allows clients to request their preferred format.

### Request Headers

**Accept Header:**
\`\`\`http
Accept: application/json
Accept: application/xml
Accept: application/json, application/xml;q=0.9
\`\`\`

**Quality Values:**
\`\`\`http
Accept: application/json;q=1.0, application/xml;q=0.9
\`\`\`
- \`q=1.0\`: Highest priority
- \`q=0.9\`: Lower priority

### Response Headers

**Content-Type:**
\`\`\`http
Content-Type: application/json; charset=utf-8
Content-Type: application/xml; charset=utf-8
\`\`\`

### Implementation

**Java (Spring Boot):**
\`\`\`java
@GetMapping(value = "/api/users/{id}", produces = {
    MediaType.APPLICATION_JSON_VALUE,
    MediaType.APPLICATION_XML_VALUE
})
public ResponseEntity<?> getUser(
    @PathVariable Long id,
    @RequestHeader("Accept") String accept
) {
    User user = userService.findById(id);
    
    if (accept.contains("application/xml")) {
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_XML)
            .body(convertToXml(user));
    }
    
    return ResponseEntity.ok()
        .contentType(MediaType.APPLICATION_JSON)
        .body(user);
}
\`\`\`

---

## JSON Best Practices

### 1. Use Consistent Structure

**Good:**
\`\`\`json
{
  "data": {
    "id": 123,
    "name": "John"
  }
}
\`\`\`

**Bad:**
\`\`\`json
{
  "id": 123,
  "name": "John"
}
\`\`\`
(Inconsistent with list responses)

### 2. Use Proper Data Types

**Good:**
\`\`\`json
{
  "id": 123,
  "active": true,
  "price": 99.99,
  "createdAt": "2026-02-21T10:00:00Z"
}
\`\`\`

**Bad:**
\`\`\`json
{
  "id": "123",
  "active": "true",
  "price": "99.99"
}
\`\`\`

### 3. Handle Null Values

**Good:**
\`\`\`json
{
  "email": null
}
\`\`\`

**Or omit:**
\`\`\`json
{
  "name": "John"
}
\`\`\`

### 4. Use Arrays for Lists

**Good:**
\`\`\`json
{
  "tags": ["java", "spring", "api"]
}
\`\`\`

**Bad:**
\`\`\`json
{
  "tags": "java,spring,api"
}
\`\`\`

---

## XML Best Practices

### 1. Use Meaningful Element Names

**Good:**
\`\`\`xml
<user>
  <id>123</id>
  <name>John Doe</name>
</user>
\`\`\`

**Bad:**
\`\`\`xml
<u>
  <i>123</i>
  <n>John Doe</n>
</u>
\`\`\`

### 2. Use Attributes Sparingly

**Good:**
\`\`\`xml
<user id="123">
  <name>John Doe</name>
</user>
\`\`\`

**Or:**
\`\`\`xml
<user>
  <id>123</id>
  <name>John Doe</name>
</user>
\`\`\`

### 3. Include XML Declaration

**Good:**
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<user>...</user>
\`\`\`

---

## File Upload Handling

### Multipart Form Data

**Client (JavaScript):**
\`\`\`javascript
const formData = new FormData();
formData.append('username', 'john');
formData.append('file', fileInput.files[0]);

fetch('/api/upload', {
    method: 'POST',
    body: formData
});
\`\`\`

**Server (Java):**
\`\`\`java
@PostMapping("/api/upload")
public ResponseEntity<Map<String, String>> uploadFile(
    @RequestParam("username") String username,
    @RequestParam("file") MultipartFile file
) {
    String fileUrl = fileService.upload(file);
    return ResponseEntity.ok(Map.of("url", fileUrl));
}
\`\`\`

### Base64 Encoding

**For Small Files:**
\`\`\`json
{
  "filename": "photo.jpg",
  "data": "base64encodedstring..."
}
\`\`\`

**Pros:**
- Works with JSON
- Simple implementation

**Cons:**
- 33% size increase
- Not efficient for large files

---

## Real-World Examples

### Example 1: JSON API Response

**Request:**
\`\`\`http
GET /api/users/123 HTTP/1.1
Accept: application/json
\`\`\`

**Response:**
\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com"
}
\`\`\`

### Example 2: XML API Response

**Request:**
\`\`\`http
GET /api/users/123 HTTP/1.1
Accept: application/xml
\`\`\`

**Response:**
\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/xml; charset=utf-8

<?xml version="1.0" encoding="UTF-8"?>
<user>
  <id>123</id>
  <name>John Doe</name>
  <email>john@example.com</email>
</user>
\`\`\`

### Example 3: Form Data Submission

**Request:**
\`\`\`http
POST /api/login HTTP/1.1
Content-Type: application/x-www-form-urlencoded

username=john&password=secret123
\`\`\`

**Response:**
\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

### Example 4: File Upload

**Request:**
\`\`\`http
POST /api/upload HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="photo.jpg"
Content-Type: image/jpeg

[binary data]
------WebKitFormBoundary--
\`\`\`

**Response:**
\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "url": "https://cdn.example.com/files/photo.jpg",
  "size": 123456
}
\`\`\`

---

## Format Selection Guidelines

### Use JSON When:
- Building modern APIs
- JavaScript clients
- Mobile apps
- Simple data structures
- Performance matters

### Use XML When:
- Legacy systems
- Complex schemas needed
- Industry standards require it
- Enterprise integrations

### Use Form Data When:
- HTML forms
- Simple key-value pairs
- Login/authentication
- Browser submissions

### Use Multipart When:
- File uploads
- Forms with files
- Binary data
- Large payloads

---

## Industry Examples

### GitHub API

**Format**: JSON
\`\`\`json
{
  "id": 123456,
  "name": "octocat",
  "login": "octocat"
}
\`\`\`

### Stripe API

**Format**: JSON
\`\`\`json
{
  "id": "cus_abc123",
  "object": "customer",
  "email": "customer@example.com"
}
\`\`\`

### SOAP Services

**Format**: XML
\`\`\`xml
<soap:Envelope>
  <soap:Body>
    <GetUser>
      <UserId>123</UserId>
    </GetUser>
  </soap:Body>
</soap:Envelope>
\`\`\`

---

## Summary

Request/response formats:

- **JSON**: Most popular, lightweight, easy to parse
- **XML**: Structured, schema support, more verbose
- **Form Data**: Simple key-value pairs
- **Multipart**: File uploads, binary data

**Important points:**
- Use JSON for modern APIs
- Support content negotiation
- Use appropriate format for use case
- Follow format best practices
- Handle file uploads properly

Understanding formats is essential for:
- Building effective APIs
- Supporting multiple clients
- Handling file uploads
- Content negotiation
- Data exchange

---

## Frequently Asked Questions (FAQs)

### 1. Which format should I use for my API?

**JSON** is recommended for modern APIs. It's lightweight, easy to parse, and widely supported. Use XML only if required by legacy systems or industry standards.

### 2. Can I support multiple formats?

**Yes**, use content negotiation with Accept header. Server can respond in requested format (JSON, XML, etc.).

### 3. How do I handle file uploads?

**Use multipart/form-data** for file uploads. It supports binary data and multiple files. For small files, Base64 in JSON is also possible.

### 4. What is content negotiation?

**Content negotiation** allows clients to request preferred format using Accept header. Server responds in requested format if supported.

### 5. Should I validate request format?

**Yes**, always validate Content-Type header. Reject unsupported formats with 415 Unsupported Media Type.

### 6. How do I handle date formats in JSON?

**Use ISO 8601 format**: \`"2026-02-21T10:00:00Z"\`. JSON doesn't have native date type, so use strings.

### 7. What is the difference between form data and JSON?

**Form data** is URL-encoded key-value pairs. **JSON** is structured object format. Use form data for simple forms, JSON for complex data.

### 8. Can I use JSON for file uploads?

**Not recommended** for large files. Use multipart/form-data. For small files, Base64 encoding in JSON is possible but inefficient.

### 9. How do I handle nested data in form data?

**Form data doesn't support nesting**. Use JSON for nested structures. Form data is flat key-value pairs only.

### 10. What charset should I use?

**UTF-8** is standard and recommended. Always specify: \`Content-Type: application/json; charset=utf-8\`.
  `,
  code: `// Request & Response Formats - Complete Examples

// Example 1: JSON Request/Response (Java)
@PostMapping(value = "/api/users", consumes = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<User> createUser(@RequestBody UserRequest request) {
    User user = userService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED)
        .contentType(MediaType.APPLICATION_JSON)
        .body(user);
}

// Example 2: XML Request/Response (Java)
@PostMapping(value = "/api/users", consumes = MediaType.APPLICATION_XML_VALUE)
public ResponseEntity<User> createUserXml(@RequestBody UserRequest request) {
    User user = userService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED)
        .contentType(MediaType.APPLICATION_XML)
        .body(user);
}

// Example 3: Content Negotiation (Java)
@GetMapping(value = "/api/users/{id}", produces = {
    MediaType.APPLICATION_JSON_VALUE,
    MediaType.APPLICATION_XML_VALUE
})
public ResponseEntity<?> getUser(
    @PathVariable Long id,
    @RequestHeader(value = "Accept", defaultValue = "application/json") String accept
) {
    User user = userService.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    
    if (accept.contains("application/xml")) {
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_XML)
            .body(convertToXml(user));
    }
    
    return ResponseEntity.ok()
        .contentType(MediaType.APPLICATION_JSON)
        .body(user);
}

// Example 4: Form Data (Java)
@PostMapping(value = "/api/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
public ResponseEntity<Map<String, String>> login(
    @RequestParam String username,
    @RequestParam String password
) {
    String token = authService.authenticate(username, password);
    return ResponseEntity.ok(Map.of("token", token));
}

// Example 5: Multipart File Upload (Java)
@PostMapping(value = "/api/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<Map<String, String>> uploadFile(
    @RequestParam("file") MultipartFile file,
    @RequestParam(value = "description", required = false) String description
) {
    String fileUrl = fileService.upload(file);
    return ResponseEntity.ok(Map.of(
        "url", fileUrl,
        "size", String.valueOf(file.getSize())
    ));
}

// Example 6: JSON with JavaScript
async function createUser(userData) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return await response.json();
}

// Example 7: Form Data with JavaScript
async function login(username, password) {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    });
    return await response.json();
}

// Example 8: File Upload with JavaScript
async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', 'Profile photo');
    
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
    });
    return await response.json();
}

// Example 9: Format Validation
@PostMapping("/api/users")
public ResponseEntity<User> createUser(@RequestBody UserRequest request) {
    // Validate Content-Type
    // Spring automatically validates based on @RequestBody
    
    // Validate JSON structure
    if (request.getName() == null || request.getEmail() == null) {
        throw new ValidationException("Name and email are required");
    }
    
    User user = userService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(user);
}

// Example 10: XML Conversion
@Component
public class XmlConverter {
    
    public String toXml(Object object) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(object.getClass());
        Marshaller marshaller = context.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        
        StringWriter writer = new StringWriter();
        marshaller.marshal(object, writer);
        return writer.toString();
    }
    
    public <T> T fromXml(String xml, Class<T> clazz) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(clazz);
        Unmarshaller unmarshaller = context.createUnmarshaller();
        
        StringReader reader = new StringReader(xml);
        return (T) unmarshaller.unmarshal(reader);
    }
}

// Example 11: Base64 File Upload
@PostMapping("/api/upload-base64")
public ResponseEntity<Map<String, String>> uploadBase64(
    @RequestBody Base64UploadRequest request
) {
    byte[] fileData = Base64.getDecoder().decode(request.getData());
    String fileUrl = fileService.upload(fileData, request.getFilename());
    return ResponseEntity.ok(Map.of("url", fileUrl));
}

// Example 12: Format Error Handling
@ExceptionHandler(HttpMediaTypeNotSupportedException.class)
public ResponseEntity<ErrorResponse> handleUnsupportedMediaType(
    HttpMediaTypeNotSupportedException ex
) {
    ErrorResponse error = new ErrorResponse(
        "UNSUPPORTED_MEDIA_TYPE",
        "Content-Type not supported. Supported types: application/json, application/xml",
        415
    );
    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(error);
}`
};

export default requestResponseFormats;

