const httpsSecurity = {
  id: 'https-security',
  title: 'HTTPS & Security - SSL/TLS, Encryption, Certificates',
  description: 'Learn HTTPS, SSL/TLS protocols, certificates, encryption basics, HTTP vs HTTPS, and security best practices for web applications',
  content: `
# HTTPS & Security — Complete Guide

HTTPS (HTTP Secure) is the secure version of HTTP. It encrypts data in transit, protecting sensitive information from interception and tampering. Understanding HTTPS and security is essential for building secure web applications and APIs.

---

## What is HTTPS?

**HTTPS** stands for **HyperText Transfer Protocol Secure**:

- **HTTP**: The same protocol as regular HTTP
- **Secure**: Data is encrypted using SSL/TLS

### Simple Definition

HTTPS is HTTP with encryption. It uses SSL/TLS (Secure Sockets Layer/Transport Layer Security) to encrypt data between client and server.

### Key Difference

\`\`\`
HTTP:  http://example.com  (Unencrypted - Plain text)
HTTPS: https://example.com  (Encrypted - Secure)
\`\`\`

---

## Why HTTPS is Essential

### 1. Data Encryption

**Without HTTPS:**
- Data sent in plain text
- Anyone can intercept and read
- Passwords, credit cards, personal info exposed

**With HTTPS:**
- Data encrypted before transmission
- Only server can decrypt
- Sensitive information protected

### 2. Data Integrity

HTTPS ensures data hasn't been tampered with:
- Detects if data was modified in transit
- Prevents man-in-the-middle attacks
- Ensures data arrives unchanged

### 3. Authentication

HTTPS verifies server identity:
- Certificates prove server is legitimate
- Prevents phishing attacks
- Builds user trust

### 4. SEO Benefits

Google favors HTTPS sites:
- Higher search rankings
- "Not Secure" warning for HTTP
- Better user trust

---

## HTTP vs HTTPS

### Comparison Table

| Feature | HTTP | HTTPS |
|---------|------|-------|
| **Port** | 80 | 443 |
| **Encryption** | No | Yes (SSL/TLS) |
| **Security** | Low | High |
| **Speed** | Faster | Slightly slower |
| **Certificate** | Not required | Required |
| **SEO** | Lower ranking | Higher ranking |
| **Browser Trust** | "Not Secure" warning | Secure indicator |

### Visual Difference

**HTTP:**
\`\`\`
Browser → [Plain Text] → Internet → [Plain Text] → Server
         (Anyone can read)
\`\`\`

**HTTPS:**
\`\`\`
Browser → [Encrypted] → Internet → [Encrypted] → Server
         (Only server can decrypt)
\`\`\`

---

## SSL/TLS Protocol

### What is SSL/TLS?

**SSL** (Secure Sockets Layer) and **TLS** (Transport Layer Security) are cryptographic protocols that provide secure communication.

**Evolution:**
- **SSL 2.0** (1995) - Deprecated
- **SSL 3.0** (1996) - Deprecated
- **TLS 1.0** (1999) - Deprecated
- **TLS 1.1** (2006) - Deprecated
- **TLS 1.2** (2008) - Widely used
- **TLS 1.3** (2018) - Latest, recommended

### How SSL/TLS Works

#### 1. Handshake Process

\`\`\`
Client                    Server
  │                         │
  │─── Client Hello ────────>│
  │   (Supported ciphers)   │
  │                         │
  │<── Server Hello ────────│
  │   (Selected cipher)      │
  │   Certificate            │
  │                         │
  │─── Verify Certificate ─>│
  │                         │
  │<── Server Hello Done ───│
  │                         │
  │─── Client Key Exchange ─>│
  │   (Encrypted key)       │
  │                         │
  │<── Change Cipher Spec ──│
  │   Encrypted Handshake   │
  │                         │
  │─── Encrypted Data ──────>│
  │                         │
\`\`\`

#### 2. Encryption Process

1. **Client initiates connection**
2. **Server sends certificate**
3. **Client verifies certificate**
4. **Key exchange** (symmetric key established)
5. **Encrypted communication** begins

### TLS Versions

#### TLS 1.2

**Characteristics:**
- Widely supported
- Secure cipher suites
- Good performance

**Cipher Suites:**
- AES-256-GCM
- ChaCha20-Poly1305

#### TLS 1.3

**Improvements:**
- Faster handshake (1-RTT vs 2-RTT)
- Better security
- Removed insecure features
- Forward secrecy mandatory

**Benefits:**
- 30-50% faster connection
- Stronger encryption
- Better performance

---

## Certificates

### What is a Certificate?

A **certificate** is a digital document that proves a server's identity. It's issued by a Certificate Authority (CA).

### Certificate Components

1. **Domain Name**: The website it's issued for
2. **Public Key**: Used for encryption
3. **Issuer**: Certificate Authority
4. **Validity Period**: Expiration date
5. **Digital Signature**: CA's signature

### Types of Certificates

#### 1. Domain Validated (DV)

**Validation**: Basic domain ownership check

**Use Case**: Personal websites, blogs

**Cost**: Free or low cost

**Example**: Let's Encrypt

#### 2. Organization Validated (OV)

**Validation**: Organization verification

**Use Case**: Business websites

**Cost**: Moderate

**Features**: Shows organization name

#### 3. Extended Validation (EV)

**Validation**: Extensive verification

**Use Case**: E-commerce, banking

**Cost**: Higher

**Features**: Green address bar (legacy browsers)

### Certificate Authorities (CAs)

**Popular CAs:**
- **Let's Encrypt**: Free, automated
- **DigiCert**: Enterprise-grade
- **Sectigo**: Commercial
- **GlobalSign**: Enterprise

---

## Encryption Basics

### Symmetric Encryption

**Definition**: Same key for encryption and decryption

**Example:**
\`\`\`
Key: secret123
Encrypt: "Hello" → "XyZ12"
Decrypt: "XyZ12" → "Hello" (using same key)
\`\`\`

**Algorithms:**
- AES (Advanced Encryption Standard)
- ChaCha20

**Pros:**
- Fast
- Efficient

**Cons:**
- Key distribution problem

### Asymmetric Encryption

**Definition**: Different keys for encryption and decryption

**Keys:**
- **Public Key**: Encrypt (can be shared)
- **Private Key**: Decrypt (must be secret)

**Example:**
\`\`\`
Public Key: abc123 (shared)
Private Key: xyz789 (secret)

Encrypt with public key → Only private key can decrypt
\`\`\`

**Algorithms:**
- RSA
- ECDSA
- EdDSA

**Pros:**
- Secure key exchange
- Digital signatures

**Cons:**
- Slower than symmetric

### How HTTPS Uses Both

1. **Asymmetric** for key exchange (handshake)
2. **Symmetric** for data encryption (after handshake)

**Why?**
- Asymmetric: Secure but slow
- Symmetric: Fast but needs secure key exchange
- **Solution**: Use asymmetric to exchange symmetric key

---

## HTTPS Handshake in Detail

### Step-by-Step Process

#### Step 1: Client Hello

Client sends:
- TLS version supported
- Cipher suites supported
- Random number (Client Random)

\`\`\`http
Client → Server:
  TLS Version: 1.3
  Cipher Suites: TLS_AES_256_GCM_SHA384
  Client Random: [random bytes]
\`\`\`

#### Step 2: Server Hello

Server responds:
- Selected TLS version
- Selected cipher suite
- Server certificate
- Server Random

\`\`\`http
Server → Client:
  TLS Version: 1.3
  Cipher Suite: TLS_AES_256_GCM_SHA384
  Certificate: [server certificate]
  Server Random: [random bytes]
\`\`\`

#### Step 3: Certificate Verification

Client verifies:
- Certificate is valid
- Certificate is not expired
- Certificate matches domain
- Certificate chain is trusted

#### Step 4: Key Exchange

Client and server establish shared secret:
- **TLS 1.2**: Diffie-Hellman key exchange
- **TLS 1.3**: Key exchange in handshake

#### Step 5: Encrypted Communication

Both sides switch to encrypted communication:
- All data encrypted with shared key
- Secure data transfer begins

---

## Real-World Examples

### Example 1: E-commerce Website

**Scenario**: User enters credit card

**Without HTTPS:**
\`\`\`
Credit Card: 1234-5678-9012-3456
→ Sent in plain text
→ Anyone can intercept
→ Stolen!
\`\`\`

**With HTTPS:**
\`\`\`
Credit Card: 1234-5678-9012-3456
→ Encrypted: XyZ12AbC34DeF56
→ Only server can decrypt
→ Secure!
\`\`\`

### Example 2: API Authentication

**Scenario**: API token in request

**Without HTTPS:**
\`\`\`
Authorization: Bearer token123
→ Sent in plain text
→ Token can be stolen
→ Unauthorized access!
\`\`\`

**With HTTPS:**
\`\`\`
Authorization: Bearer token123
→ Encrypted in transit
→ Token protected
→ Secure!
\`\`\`

### Example 3: Login Credentials

**Scenario**: User logs in

**Without HTTPS:**
\`\`\`
Username: john@example.com
Password: secret123
→ Sent in plain text
→ Credentials exposed
→ Account compromised!
\`\`\`

**With HTTPS:**
\`\`\`
Username: john@example.com
Password: secret123
→ Encrypted in transit
→ Credentials protected
→ Secure!
\`\`\`

---

## Security Best Practices

### 1. Always Use HTTPS

- **Never** send sensitive data over HTTP
- Redirect HTTP to HTTPS
- Use HSTS (HTTP Strict Transport Security)

### 2. Strong TLS Configuration

**Recommended:**
- TLS 1.2 minimum
- TLS 1.3 preferred
- Disable old protocols (SSL 3.0, TLS 1.0, TLS 1.1)

**Cipher Suites:**
- Prefer AES-256-GCM
- Avoid weak ciphers (RC4, DES)

### 3. Certificate Management

- Use valid certificates
- Monitor expiration dates
- Auto-renew certificates (Let's Encrypt)
- Use strong key sizes (2048-bit RSA minimum)

### 4. HSTS (HTTP Strict Transport Security)

**Purpose**: Force HTTPS connections

**Header:**
\`\`\`http
Strict-Transport-Security: max-age=31536000; includeSubDomains
\`\`\`

**Benefits:**
- Prevents downgrade attacks
- Forces HTTPS
- Protects against man-in-the-middle

### 5. Certificate Pinning

**Purpose**: Pin specific certificates

**Use Case**: Mobile apps, high-security applications

**Benefits:**
- Prevents certificate spoofing
- Extra security layer

**Note**: Can cause issues if certificate changes

---

## Common Security Issues

### 1. Mixed Content

**Problem**: HTTPS page loads HTTP resources

**Risk**: Security warning, insecure content

**Solution**: Load all resources over HTTPS

### 2. Expired Certificates

**Problem**: Certificate expired

**Risk**: Browser warnings, user distrust

**Solution**: Auto-renew certificates

### 3. Self-Signed Certificates

**Problem**: Self-signed certificates

**Risk**: Browser warnings, not trusted

**Solution**: Use CA-signed certificates

### 4. Weak Cipher Suites

**Problem**: Old, weak encryption

**Risk**: Vulnerable to attacks

**Solution**: Use modern, strong ciphers

---

## Industry Examples

### Let's Encrypt

**Free SSL/TLS Certificates:**
- Automated certificate issuance
- 90-day validity
- Auto-renewal
- Used by millions of websites

**Impact:**
- Made HTTPS accessible to everyone
- Increased HTTPS adoption
- Free and automated

### Google

**HTTPS Requirements:**
- All Google services use HTTPS
- Chrome marks HTTP as "Not Secure"
- Favors HTTPS in search rankings

**Impact:**
- Pushed industry toward HTTPS
- Improved web security
- Better user protection

### Cloudflare

**HTTPS Everywhere:**
- Free SSL for all customers
- Automatic HTTPS
- Universal SSL

**Impact:**
- Made HTTPS easy to implement
- Improved web security
- Simplified certificate management

---

## Implementation Examples

### Spring Boot HTTPS Configuration

\`\`\`java
// application.properties
server.port=8443
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=changeit
server.ssl.key-store-type=PKCS12
server.ssl.key-alias=tomcat
\`\`\`

### Nginx HTTPS Configuration

\`\`\`nginx
server {
    listen 443 ssl http2;
    server_name example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    location / {
        proxy_pass http://localhost:8080;
    }
}
\`\`\`

### Node.js HTTPS Server

\`\`\`javascript
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const server = https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Hello, HTTPS!');
});

server.listen(443);
\`\`\`

---

## Summary

HTTPS is essential for secure web communication:

- **Definition**: HTTP with SSL/TLS encryption
- **Benefits**: Data encryption, integrity, authentication, SEO
- **Protocols**: TLS 1.2 (widely used), TLS 1.3 (recommended)
- **Certificates**: DV (basic), OV (organization), EV (extended)
- **Encryption**: Asymmetric (key exchange) + Symmetric (data)

**Important points:**
- Always use HTTPS for sensitive data
- Use strong TLS configuration
- Keep certificates valid and updated
- Implement HSTS for extra security
- Monitor and maintain security

Understanding HTTPS is essential for:
- Building secure web applications
- Protecting user data
- Meeting security requirements
- Building user trust
- SEO and search rankings

---

## Frequently Asked Questions (FAQs)

### 1. What is the difference between HTTP and HTTPS?

**HTTP** is unencrypted, while **HTTPS** uses SSL/TLS encryption. HTTPS protects data from interception and ensures server authenticity.

### 2. Do I need HTTPS for my website?

**Yes!** HTTPS is essential for:
- Protecting user data
- Building trust
- SEO benefits
- Browser requirements

Even non-sensitive sites should use HTTPS.

### 3. How does SSL/TLS encryption work?

SSL/TLS uses:
1. **Asymmetric encryption** for secure key exchange
2. **Symmetric encryption** for fast data transfer
3. **Certificates** to verify server identity

### 4. What is a certificate authority (CA)?

A **CA** is a trusted organization that issues SSL/TLS certificates. Examples: Let's Encrypt, DigiCert, Sectigo.

### 5. Can I use HTTPS for free?

**Yes!** Let's Encrypt provides free SSL/TLS certificates. Many hosting providers also offer free SSL.

### 6. What is HSTS?

**HSTS** (HTTP Strict Transport Security) forces browsers to use HTTPS. It prevents downgrade attacks and improves security.

### 7. What happens if my certificate expires?

Browsers will show security warnings, and users may not trust your site. Always renew certificates before expiration.

### 8. Is HTTPS slower than HTTP?

**Slightly**, but the difference is minimal with modern hardware. The security benefits far outweigh the small performance cost.

### 9. What is the difference between SSL and TLS?

**SSL** is the older protocol (deprecated). **TLS** is the modern replacement. People often say "SSL" but mean "TLS".

### 10. Do mobile apps need HTTPS?

**Yes!** Mobile apps should use HTTPS for API communication. Certificate pinning provides extra security for mobile apps.
  `,
  code: `// HTTPS & Security - Complete Examples

// Example 1: Spring Boot HTTPS Configuration
// application.properties
server.port=8443
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=changeit
server.ssl.key-store-type=PKCS12
server.ssl.key-alias=tomcat

// Example 2: Nginx HTTPS Configuration
server {
    listen 443 ssl http2;
    server_name example.com;
    
    ssl_certificate /etc/ssl/certs/cert.pem;
    ssl_certificate_key /etc/ssl/private/key.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    location / {
        proxy_pass http://localhost:8080;
    }
}

// Example 3: Node.js HTTPS Server
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    // TLS 1.2 minimum
    minVersion: 'TLSv1.2',
    // Strong cipher suites
    ciphers: 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384'
};

const server = https.createServer(options, (req, res) => {
    // Add security headers
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    res.writeHead(200);
    res.end('Hello, HTTPS!');
});

server.listen(443, () => {
    console.log('HTTPS server running on port 443');
});

// Example 4: HTTP to HTTPS Redirect (Spring Boot)
@Configuration
public class HttpsRedirectConfig {
    
    @Bean
    public TomcatServletWebServerFactory servletContainer() {
        TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory() {
            @Override
            protected void postProcessContext(Context context) {
                SecurityConstraint securityConstraint = new SecurityConstraint();
                securityConstraint.setUserConstraint("CONFIDENTIAL");
                SecurityCollection collection = new SecurityCollection();
                collection.addPattern("/*");
                securityConstraint.addCollection(collection);
                context.addConstraint(securityConstraint);
            }
        };
        factory.addAdditionalTomcatConnectors(redirectConnector());
        return factory;
    }
    
    private Connector redirectConnector() {
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setScheme("http");
        connector.setPort(80);
        connector.setSecure(false);
        connector.setRedirectPort(443);
        return connector;
    }
}

// Example 5: Security Headers Configuration (Spring Boot)
@Configuration
public class SecurityHeadersConfig implements WebMvcConfigurer {
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HandlerInterceptor() {
            @Override
            public boolean preHandle(HttpServletRequest request, 
                                   HttpServletResponse response, 
                                   Object handler) {
                // HSTS
                response.setHeader("Strict-Transport-Security", 
                    "max-age=31536000; includeSubDomains");
                
                // Security headers
                response.setHeader("X-Frame-Options", "DENY");
                response.setHeader("X-Content-Type-Options", "nosniff");
                response.setHeader("X-XSS-Protection", "1; mode=block");
                
                return true;
            }
        });
    }
}

// Example 6: Certificate Validation (Java)
public class CertificateValidator {
    
    public boolean validateCertificate(X509Certificate cert) {
        try {
            // Check expiration
            cert.checkValidity();
            
            // Check key size
            int keySize = cert.getPublicKey().getEncoded().length * 8;
            if (keySize < 2048) {
                return false; // Key too small
            }
            
            // Check signature algorithm
            String sigAlg = cert.getSigAlgName();
            if (sigAlg.contains("MD5") || sigAlg.contains("SHA1")) {
                return false; // Weak algorithm
            }
            
            return true;
        } catch (CertificateExpiredException | CertificateNotYetValidException e) {
            return false;
        }
    }
}

// Example 7: HTTPS Client (Java)
public class HttpsClient {
    
    public String get(String url) throws Exception {
        // Create trust manager that accepts all certificates (for testing only!)
        TrustManager[] trustAllCerts = new TrustManager[] {
            new X509TrustManager() {
                public X509Certificate[] getAcceptedIssuers() { return null; }
                public void checkClientTrusted(X509Certificate[] certs, String authType) {}
                public void checkServerTrusted(X509Certificate[] certs, String authType) {}
            }
        };
        
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, trustAllCerts, new SecureRandom());
        
        HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
        
        URL urlObj = new URL(url);
        HttpsURLConnection conn = (HttpsURLConnection) urlObj.openConnection();
        
        BufferedReader reader = new BufferedReader(
            new InputStreamReader(conn.getInputStream())
        );
        
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        
        return response.toString();
    }
}

// Example 8: Certificate Pinning (Android)
// In Android app, pin specific certificates
public class CertificatePinner {
    private static final String CERTIFICATE_PIN = "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
    
    public OkHttpClient getClient() {
        return new OkHttpClient.Builder()
            .certificatePinner(
                new CertificatePinner.Builder()
                    .add("api.example.com", CERTIFICATE_PIN)
                    .build()
            )
            .build();
    }
}

// Example 9: HTTPS Check (JavaScript)
function isHttps() {
    return window.location.protocol === 'https:';
}

function enforceHttps() {
    if (!isHttps() && window.location.hostname !== 'localhost') {
        window.location.href = window.location.href.replace('http:', 'https:');
    }
}

// Example 10: Security Headers Middleware (Express.js)
const express = require('express');
const helmet = require('helmet');
const app = express();

// Use helmet for security headers
app.use(helmet({
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"]
        }
    }
}));

// Force HTTPS
app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(\`https://\${req.header('host')}\${req.url}\`);
    } else {
        next();
    }
});`
};

export default httpsSecurity;

