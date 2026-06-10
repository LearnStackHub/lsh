import makeSpringAiTopic from './topicHelpers.js';

const topic = makeSpringAiTopic(
  'spring-ai-image-models',
  'Spring AI Image Models',
  'Generate images from text in Spring Boot — prompts, safety rules, and a logo generator flow.',
  'Image APIs belong on the backend, same as chat',
  'Text chat is not the only thing models do. Image models turn a written description into a PNG or JPEG. Your Spring Boot app builds the prompt, calls the provider, stores the file, returns a URL. Frontend never holds the API key.',
  ['Structure an image prompt with subject, style, colors, and constraints', 'Explain why image generation runs on the server', 'Design a logo request API with validation', 'List safety rules for copyrighted brand requests'],
  {
    title: 'Startup founder wants a logo from your SaaS app',
    body: 'They enter business name, industry, and color preference. Your API validates input, builds a safe prompt ("original logo, no Nike swoosh"), calls the image model, saves the file to S3 or local disk, returns the URL.',
    checks: ['Validate business name and style fields', 'Block prompts that ask to copy existing brands', 'Save image metadata in database for regenerate', 'Show preview in UI; allow "try again" without extra key exposure']
  },
  [
    { title: 'Use case', body: 'Logos, banners, product mockups — all backend-generated.' },
    { title: 'Prompt structure', body: 'Subject + style + colors + constraints in one string.' },
    { title: 'API design', body: 'POST with LogoRequest DTO; return URL or base64.' },
    { title: 'Product rules', body: 'Moderation, cost tracking, regenerate option.' }
  ],
  `
# Spring AI Image Models

Chat models return text. **Image models** return pictures. The integration pattern in Spring Boot is the same: dependency, config, service, controller.

Common features: logo ideas for startups, banner images for marketing, thumbnails for a course platform.

## Image Prompt Structure

| Part | Example |
|------|---------|
| Subject | Logo for online Java learning platform |
| Style | Clean, modern, flat vector style |
| Colors | Green, blue, white |
| Constraints | No copyrighted brand marks |
| Output | Square logo, simple shape, readable at small size |

## Real Application Flow

- Controller receives logo request
- Service validates business name and style
- Service builds a safe prompt
- Image model generates image
- App stores image URL or file
- Frontend displays preview

## Freshers Should Know

Image generation is usually not called directly from frontend because API keys and moderation rules belong on the backend.

---

## Deep Project: AI Logo Generator Backend

Requirement:

> "User enters business name, industry, colors, and style. Spring Boot should create a safe image prompt and call the image model."

## Request DTO

\`\`\`java
package com.learnstackhub.springai.image;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LogoRequest(
        @NotBlank String businessName,
        @NotBlank String industry,
        @Size(max = 120) String colorPreference,
        @Size(max = 120) String style
) {
}
\`\`\`

## Prompt Builder Service

\`\`\`java
package com.learnstackhub.springai.image;

import org.springframework.stereotype.Service;

@Service
public class LogoPromptService {

    public String buildPrompt(LogoRequest request) {
        return """
                Create a clean original logo concept.
                Business name: %s
                Industry: %s
                Color preference: %s
                Style: %s

                Rules:
                - No copyrighted symbols.
                - No existing brand imitation.
                - Simple shape, readable at small size.
                - Suitable for website header and app icon.
                """.formatted(
                request.businessName(),
                request.industry(),
                emptyToDefault(request.colorPreference(), "modern green and blue"),
                emptyToDefault(request.style(), "minimal professional")
        );
    }

    private String emptyToDefault(String value, String defaultValue) {
        return value == null || value.isBlank() ? defaultValue : value.trim();
    }
}
\`\`\`

## What Freshers Must Understand

Image generation is not only "send prompt and get image." In a real product:

- validate user input
- block unsafe/copyrighted requests
- store generated image metadata
- allow regenerate
- show preview
- track cost

## Common Errors

| Problem | Fix |
|---------|-----|
| Logo looks random | Add industry, style, and usage context |
| Output copies brand style | Add rule: no existing brand imitation |
| User enters huge prompt | Limit input length |
| API key exposed | Generate image from backend only |

---

## Full stack: logo generation API

### pom.xml dependency

\`\`\`xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-model-openai</artifactId>
</dependency>
\`\`\`

OpenAI starter includes image model support when configured in \`application.properties\`.

### application.properties

\`\`\`properties
spring.ai.openai.api-key=\${OPENAI_API_KEY}
spring.ai.openai.image.options.model=dall-e-3
spring.ai.openai.image.options.quality=standard
spring.ai.openai.image.options.size=1024x1024
\`\`\`

**Real-world note:** Image generation is expensive. Product teams gate it behind admin roles and cache results — do not expose a public logo endpoint without auth.

### LogoGenerationService.java

\`\`\`java
package com.learnstackhub.springai.image;

import org.springframework.ai.image.ImageModel;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class LogoGenerationService {

    private final ImageModel imageModel;
    private final LogoPromptService logoPromptService;

    public LogoGenerationService(ImageModel imageModel, LogoPromptService logoPromptService) {
        this.imageModel = imageModel;
        this.logoPromptService = logoPromptService;
    }

    public LogoGenerationResponse generate(LogoRequest request) {
        String prompt = logoPromptService.buildPrompt(request);
        ImageResponse response = imageModel.call(new ImagePrompt(prompt));
        String base64 = response.getResult().getOutput().getB64Json();
        return new LogoGenerationResponse(prompt, "data:image/png;base64," + base64);
    }
}

record LogoGenerationResponse(String promptUsed, String imageDataUrl) {}
\`\`\`

### LogoController.java

\`\`\`java
package com.learnstackhub.springai.image;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/branding")
public class LogoController {

    private final LogoGenerationService logoGenerationService;

    public LogoController(LogoGenerationService logoGenerationService) {
        this.logoGenerationService = logoGenerationService;
    }

    @PostMapping("/logo")
    public ResponseEntity<LogoGenerationResponse> generate(@Valid @RequestBody LogoRequest request) {
        return ResponseEntity.ok(logoGenerationService.generate(request));
    }
}
\`\`\`

### Production notes

- Store \`promptUsed\` and timestamp in DB for audit and regenerate.
- Return a CDN URL instead of base64 when file size grows.
- Block user input containing brand names like "Nike style logo".
- Image APIs cost more than chat — add per-user daily limits.

### Test with cURL

\`\`\`bash
curl -X POST http://localhost:8080/api/branding/logo \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"businessName\\": \\"LearnStackHub\\",
    \\"industry\\": \\"Corporate Java Training\\",
    \\"colorPreference\\": \\"green and blue\\",
    \\"style\\": \\"minimal flat vector\\"
  }"
\`\`\`

### Test with Postman

\`\`\`text
POST http://localhost:8080/api/branding/logo
Content-Type: application/json
\`\`\`

Body:

\`\`\`json
{
  "businessName": "LearnStackHub",
  "industry": "Corporate Java Training",
  "colorPreference": "green and blue",
  "style": "minimal flat vector"
}
\`\`\`

Expected: JSON with \`promptUsed\` and \`imageDataUrl\` (base64 data URL). Open the URL in a browser tab to preview the logo.
`
);

export default topic;

