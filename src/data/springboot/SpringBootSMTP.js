const springBootSMTP = {
  id: 'spring-boot-smtp',
  title: 'Spring Boot SMTP Integration - Email Sending',
  description: 'Learn how to integrate SMTP email service in Spring Boot application to send emails using Gmail, Outlook, or custom SMTP servers',
  content: `
# Spring Boot SMTP Integration - Send Emails Step by Step

Hey there! I'm going to teach you how to send emails from your Spring Boot application. Don't worry if you're new to this - I'll explain everything step by step, just like I would if we were sitting together and I was showing you on my computer.

---

## What is SMTP?

**SMTP** stands for Simple Mail Transfer Protocol. It's like a postman that delivers your emails.

**Simple Explanation:**
- Your Spring Boot application = You writing a letter
- SMTP server (Gmail/Outlook) = Post office
- Recipient's inbox = Their mailbox

**How it works:**
1. You write an email in your Spring Boot application
2. Your application sends it to Gmail's SMTP server
3. Gmail's server delivers it to the recipient's inbox

---

## Why Do We Need Email in Applications?

Real-world examples:
- When a user registers, you send them a welcome email
- When a user forgets their password, you send them a reset link
- When an order is placed, you send a confirmation email
- When payment is successful, you send an invoice

Without email, your application feels incomplete!

---

## Complete Step-by-Step Guide

Let me show you exactly how to send emails. Follow these steps one by one.

---

## Step 1: Get Gmail App Password

**Important:** Gmail doesn't allow your regular password. You need a special "App Password".

### Step 1.1: Enable 2-Step Verification

1. Go to: https://myaccount.google.com/
2. Click **Security** (left sidebar)
3. Find **2-Step Verification**
4. Click **Get Started** or **Turn On**
5. Enter your phone number
6. Enter the code sent to your phone
7. Click **Turn On**

**Why?** Without 2-Step Verification, you cannot create App Password!

### Step 1.2: Generate App Password

1. Go back to **Security** page
2. Find **App passwords** (below 2-Step Verification)
3. Click **App passwords**
4. Sign in again if asked
5. Select app: **Mail**
6. Select device: **Other (Custom name)**
7. Type: "Spring Boot Application"
8. Click **Generate**
9. **Copy the 16-character password** (looks like: abcd efgh ijkl mnop)
10. **Remove all spaces** - it should become: abcdefghijklmnop
11. **Save it somewhere safe!** You can only see it once.

**Example:** If you see the password as "abcd efgh ijkl mnop", remove the spaces and use "abcdefghijklmnop" in your code.

---

## Step 2: Create Spring Boot Project

### Step 2.1: Add Dependency

Open your \`pom.xml\` file and add this:

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
\`\`\`

That's it! Spring Boot will handle everything else.

---

## Step 3: Configure Email Settings

### Step 3.1: Open application.properties

Go to: \`src/main/resources/application.properties\`

### Step 3.2: Add Gmail Configuration

Copy and paste this code. Replace with your actual email and App Password:

\`\`\`properties
# Gmail SMTP Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-16-character-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
\`\`\`

**Replace these values:**
- Replace "your-email@gmail.com" with your actual Gmail address
- Replace "your-16-character-app-password" with the App Password you copied (without spaces)

**Example:**
\`\`\`properties
spring.mail.username=dattu@gmail.com
spring.mail.password=abcdefghijklmnop
\`\`\`

---

## Step 4: Create Email Service

### Step 4.1: Create EmailService Class

Create a new file: \`src/main/java/com/learnstackhub/service/EmailService.java\`

Copy this complete code:

\`\`\`java
package com.learnstackhub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendSimpleEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("noreply@learnstackhub.com");
        
        mailSender.send(message);
        System.out.println("Email sent successfully to: " + to);
    }
}
\`\`\`

**What this code does:**
1. \`@Service\` - Tells Spring this is a service class
2. \`@Autowired JavaMailSender\` - Spring automatically provides email sending capability
3. \`sendSimpleEmail()\` - Method to send email
4. \`SimpleMailMessage\` - Creates email message
5. \`mailSender.send()\` - Actually sends the email

---

## Step 5: Create Controller to Test

### Step 5.1: Create EmailController

Create: \`src/main/java/com/learnstackhub/controller/EmailController.java\`

Copy this code:

\`\`\`java
package com.learnstackhub.controller;

import com.learnstackhub.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {
    
    @Autowired
    private EmailService emailService;
    
    @GetMapping("/test")
    public ResponseEntity<String> sendTestEmail(@RequestParam String to) {
        try {
            emailService.sendSimpleEmail(
                to,
                "Test Email from Spring Boot",
                "Hello! This is a test email. If you receive this, your SMTP is working correctly!"
            );
            return ResponseEntity.ok("Email sent successfully to " + to);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body("Failed to send email: " + e.getMessage());
        }
    }
}
\`\`\`

---

## Step 6: Test Your Email

### Step 6.1: Run Your Application

\`\`\`bash
mvn spring-boot:run
\`\`\`

### Step 6.2: Open Browser

Type this URL in your browser (replace with your email):

\`\`\`
http://localhost:8080/api/email/test?to=your-email@gmail.com
\`\`\`

**Example:**
\`\`\`
http://localhost:8080/api/email/test?to=dattu@gmail.com
\`\`\`

### Step 6.3: Check Your Email

1. Open your Gmail inbox
2. Check spam folder if not in inbox
3. You should see "Test Email from Spring Boot"

**If you see the email in your inbox, congratulations! Your SMTP is working perfectly!**

---

## How to Send Email from Your Code

Now that everything is set up, here's how to send emails from anywhere in your application:

### Example 1: Send Email When User Registers

\`\`\`java
@Service
public class UserService {
    
    @Autowired
    private EmailService emailService;
    
    public void registerUser(String name, String email) {
        // Save user to database
        System.out.println("User registered: " + name);
        
        // Send welcome email
        emailService.sendSimpleEmail(
            email,
            "Welcome to LearnStackHub!",
            "Hi " + name + ",\\n\\nThank you for joining us!"
        );
    }
}
\`\`\`

### Example 2: Send Password Reset Email

\`\`\`java
@Service
public class PasswordService {
    
    @Autowired
    private EmailService emailService;
    
    public void sendPasswordReset(String email, String resetLink) {
        String body = "Click this link to reset your password:\\n" + resetLink;
        
        emailService.sendSimpleEmail(
            email,
            "Reset Your Password",
            body
        );
    }
}
\`\`\`

---

## Sending HTML Emails (Beautiful Emails)

Simple text emails are boring. Let's send beautiful HTML emails!

### Update EmailService

Add this method to your \`EmailService\` class:

\`\`\`java
import org.springframework.mail.javamail.MimeMessageHelper;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

public void sendHtmlEmail(String to, String subject, String htmlContent) {
    try {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        helper.setFrom("noreply@learnstackhub.com");
        
        mailSender.send(message);
        System.out.println("HTML email sent successfully!");
    } catch (MessagingException e) {
        System.err.println("Error sending HTML email: " + e.getMessage());
        e.printStackTrace();
    }
}
\`\`\`

### Example: Send Beautiful Welcome Email

\`\`\`java
public void sendWelcomeEmail(String email, String name) {
    String htmlContent = 
        "<html>" +
        "<body style='font-family: Arial, sans-serif;'>" +
        "<h2 style='color: #3b82f6;'>Welcome to LearnStackHub!</h2>" +
        "<p>Hi " + name + ",</p>" +
        "<p>Thank you for joining us. Start learning today!</p>" +
        "<p style='color: #64748b;'>Best regards,<br>LearnStackHub Team</p>" +
        "</body>" +
        "</html>";
    
    emailService.sendHtmlEmail(email, "Welcome!", htmlContent);
}
\`\`\`

---

## Sending Email with Attachment

### Add Method to EmailService

\`\`\`java
import org.springframework.core.io.FileSystemResource;
import java.io.File;

public void sendEmailWithAttachment(String to, String subject, 
                                   String body, String filePath) {
    try {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body);
        helper.setFrom("noreply@learnstackhub.com");
        
        FileSystemResource file = new FileSystemResource(new File(filePath));
        helper.addAttachment("invoice.pdf", file);
        
        mailSender.send(message);
        System.out.println("Email with attachment sent!");
    } catch (MessagingException e) {
        e.printStackTrace();
    }
}
\`\`\`

### Example: Send Invoice

\`\`\`java
public void sendInvoice(String email, String invoicePath) {
    emailService.sendEmailWithAttachment(
        email,
        "Your Invoice",
        "Please find your invoice attached.",
        invoicePath
    );
}
\`\`\`

---

## Complete Project Structure

Here's how your project should look:

\`\`\`
spring-boot-smtp-project/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── learnstackhub/
│   │   │           ├── SpringBootSmtpApplication.java
│   │   │           ├── controller/
│   │   │           │   └── EmailController.java
│   │   │           └── service/
│   │   │               └── EmailService.java
│   │   └── resources/
│   │       └── application.properties
└── pom.xml
\`\`\`

---

## Common Problems and Solutions

### Problem 1: "Authentication Failed"

**Error:** \`javax.mail.AuthenticationFailedException\`

**Solution:**
1. Make sure you're using App Password, not regular password
2. Remove all spaces from App Password
3. Verify 2-Step Verification is enabled

### Problem 2: "Connection Timeout"

**Error:** \`java.net.ConnectException: Connection timed out\`

**Solution:**
1. Check your internet connection
2. Verify SMTP host: \`smtp.gmail.com\`
3. Verify port: \`587\`

### Problem 3: Email Not Received

**Check:**
1. Check spam/junk folder
2. Verify recipient email is correct
3. Check application logs for errors

---

## Using Different Email Providers

### Outlook Configuration

\`\`\`properties
spring.mail.host=smtp-mail.outlook.com
spring.mail.port=587
spring.mail.username=your-email@outlook.com
spring.mail.password=your-outlook-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
\`\`\`

**Note:** Outlook uses regular password (no App Password needed).

### Custom SMTP Server

\`\`\`properties
spring.mail.host=smtp.yourcompany.com
spring.mail.port=587
spring.mail.username=your-username
spring.mail.password=your-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
\`\`\`

---

## Security Best Practices

### 1. Don't Hardcode Passwords

**Bad:**
\`\`\`properties
spring.mail.password=abcdefghijklmnop
\`\`\`

**Good:** Use environment variables

\`\`\`properties
spring.mail.password=\${MAIL_PASSWORD}
\`\`\`

Set environment variable:
\`\`\`bash
export MAIL_PASSWORD=abcdefghijklmnop
\`\`\`

### 2. Handle Errors Gracefully

\`\`\`java
public void sendEmail(String to, String subject, String body) {
    try {
        // Send email
        mailSender.send(message);
    } catch (Exception e) {
        // Log error, don't crash application
        System.err.println("Failed to send email: " + e.getMessage());
    }
}
\`\`\`

---

## Summary

Let me summarize what we covered today:

**What you learned:**
1. How to get Gmail App Password - This is the first and most important step
2. How to configure Spring Boot for email - Setting up the application.properties file
3. How to create EmailService - Writing the service class that sends emails
4. How to send simple text emails - The basic email sending functionality
5. How to send HTML emails - Making your emails look professional
6. How to send emails with attachments - Adding files to your emails

**What to do next:**
1. Practice sending different types of emails - Try sending welcome emails, password reset emails
2. Create email templates - Design beautiful HTML templates for your emails
3. Integrate with your user registration - Add email sending when users sign up
4. Add email verification - Send verification links to new users

You now have all the knowledge to send emails from your Spring Boot application. Start practicing and build something real. The more you practice, the better you'll become. Good luck with your projects!
`
};

export default springBootSMTP;
