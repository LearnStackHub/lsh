const jspCustomTags = {
  id: 'jsp-custom-tags',
  title: 'JSP Custom Tags',
  description: 'Creating your own tag libraries',
  content: `
# Custom Tags — Build Your Own

When JSTL doesn't have what you need, you can create custom tags. Custom tags encapsulate reusable functionality and keep your JSP pages clean.

---

## Why Custom Tags?

- **Reusability:** Use the same tag across multiple pages
- **Encapsulation:** Hide complex logic from JSP
- **Maintainability:** Change implementation without touching JSPs
- **Readability:** Clean, declarative syntax

---

## Creating a Simple Tag

### Step 1: Create the Tag Handler

\`\`\`java
package com.example.tags;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;
import java.io.IOException;

public class HelloTag extends SimpleTagSupport {
    
    private String name;
    
    public void setName(String name) {
        this.name = name;
    }
    
    @Override
    public void doTag() throws JspException, IOException {
        getJspContext().getOut().write("Hello, " + name + "!");
    }
}
\`\`\`

### Step 2: Create the TLD File

**WEB-INF/mytags.tld:**
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<taglib xmlns="http://java.sun.com/xml/ns/javaee"
        version="2.1">
    
    <tlib-version>1.0</tlib-version>
    <short-name>my</short-name>
    <uri>http://example.com/mytags</uri>
    
    <tag>
        <name>hello</name>
        <tag-class>com.example.tags.HelloTag</tag-class>
        <body-content>empty</body-content>
        <attribute>
            <name>name</name>
            <required>true</required>
            <rtexprvalue>true</rtexprvalue>
        </attribute>
    </tag>
</taglib>
\`\`\`

### Step 3: Use in JSP

\`\`\`jsp
<%@ taglib uri="http://example.com/mytags" prefix="my" %>

<my:hello name="World" />
<my:hello name="Dollar{user.name}" />
\`\`\`

---

## Tag with Body Content

### Tag Handler

\`\`\`java
public class PanelTag extends SimpleTagSupport {
    
    private String title;
    private String type = "default";
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    @Override
    public void doTag() throws JspException, IOException {
        JspWriter out = getJspContext().getOut();
        
        out.write("<div class=\\"panel panel-" + type + "\\">");
        out.write("<div class=\\"panel-header\\">" + title + "</div>");
        out.write("<div class=\\"panel-body\\">");
        
        // Process body content
        getJspBody().invoke(null);
        
        out.write("</div>");
        out.write("</div>");
    }
}
\`\`\`

### TLD Entry

\`\`\`xml
<tag>
    <name>panel</name>
    <tag-class>com.example.tags.PanelTag</tag-class>
    <body-content>scriptless</body-content>
    <attribute>
        <name>title</name>
        <required>true</required>
        <rtexprvalue>true</rtexprvalue>
    </attribute>
    <attribute>
        <name>type</name>
        <required>false</required>
        <rtexprvalue>true</rtexprvalue>
    </attribute>
</tag>
\`\`\`

### Usage

\`\`\`jsp
<my:panel title="User Information" type="info">
    <p>Name: Dollar{user.name}</p>
    <p>Email: Dollar{user.email}</p>
</my:panel>
\`\`\`

---

## Classic Tag Handler

For more control, extend TagSupport:

\`\`\`java
public class LoopTag extends TagSupport {
    
    private int count;
    private int current = 0;
    
    public void setCount(int count) {
        this.count = count;
    }
    
    @Override
    public int doStartTag() throws JspException {
        if (count > 0) {
            current = 1;
            pageContext.setAttribute("index", current);
            return EVAL_BODY_INCLUDE;
        }
        return SKIP_BODY;
    }
    
    @Override
    public int doAfterBody() throws JspException {
        current++;
        if (current <= count) {
            pageContext.setAttribute("index", current);
            return EVAL_BODY_AGAIN;
        }
        return SKIP_BODY;
    }
    
    @Override
    public int doEndTag() throws JspException {
        return EVAL_PAGE;
    }
}
\`\`\`

---

## Tag with Dynamic Attributes

\`\`\`java
public class HtmlTag extends SimpleTagSupport implements DynamicAttributes {
    
    private String tagName;
    private Map<String, Object> attributes = new HashMap<>();
    
    public void setTagName(String tagName) {
        this.tagName = tagName;
    }
    
    @Override
    public void setDynamicAttribute(String uri, String name, Object value) {
        attributes.put(name, value);
    }
    
    @Override
    public void doTag() throws JspException, IOException {
        JspWriter out = getJspContext().getOut();
        
        out.write("<" + tagName);
        for (Map.Entry<String, Object> attr : attributes.entrySet()) {
            out.write(" " + attr.getKey() + "=\\"" + attr.getValue() + "\\"");
        }
        out.write(">");
        
        getJspBody().invoke(null);
        
        out.write("</" + tagName + ">");
    }
}
\`\`\`

---

## Tag File (Simpler Approach)

Create tags without Java code using .tag files.

**WEB-INF/tags/alert.tag:**
\`\`\`jsp
<%@ tag body-content="scriptless" %>
<%@ attribute name="type" required="true" %>
<%@ attribute name="title" required="false" %>

<div class="alert alert-Dollar{type}">
    <c:if test="Dollar{not empty title}">
        <strong>Dollar{title}</strong>
    </c:if>
    <jsp:doBody />
</div>
\`\`\`

**Usage:**
\`\`\`jsp
<%@ taglib tagdir="/WEB-INF/tags" prefix="ui" %>

<ui:alert type="success" title="Success!">
    Your changes have been saved.
</ui:alert>

<ui:alert type="error">
    Something went wrong.
</ui:alert>
\`\`\`

---

## Complete Example: Form Components

### FormInput.java

\`\`\`java
public class FormInputTag extends SimpleTagSupport {
    
    private String name;
    private String label;
    private String type = "text";
    private String value = "";
    private boolean required = false;
    
    // Setters...
    
    @Override
    public void doTag() throws JspException, IOException {
        JspWriter out = getJspContext().getOut();
        
        out.write("<div class=\\"form-group\\">");
        out.write("<label for=\\"" + name + "\\">" + label);
        if (required) {
            out.write(" <span class=\\"required\\">*</span>");
        }
        out.write("</label>");
        out.write("<input type=\\"" + type + "\\" ");
        out.write("id=\\"" + name + "\\" ");
        out.write("name=\\"" + name + "\\" ");
        out.write("value=\\"" + value + "\\" ");
        if (required) {
            out.write("required ");
        }
        out.write("/>");
        out.write("</div>");
    }
}
\`\`\`

### Usage

\`\`\`jsp
<%@ taglib uri="http://example.com/forms" prefix="form" %>

<form action="register" method="post">
    <form:input name="username" label="Username" required="true" />
    <form:input name="email" label="Email" type="email" required="true" />
    <form:input name="password" label="Password" type="password" required="true" />
    <form:input name="phone" label="Phone" type="tel" />
    <button type="submit">Register</button>
</form>
\`\`\`

---

## 10 Important JSP Custom Tags Interview Questions

### 1. Why create custom JSP tags instead of using scriptlets?

**Answer:** Custom tags package **reusable** view behavior (UI widgets, conditional chrome, formatted blocks) behind a **declarative** XML interface. Page authors use \`<my:widget />\` instead of copying **Java** snippets. That improves **consistency**, **testing** of tag handlers in isolation, and **separation** between designers and Java developers. Interview narrative: “We push repetition into tags or includes, not into scriptlets.”

### 2. What is a **tag handler** class?

**Answer:** For **simple** tags, you often extend \`SimpleTagSupport\` and implement \`doTag()\` to generate output via \`JspContext.getOut()\`. **Classic** tags used \`Tag\` / \`BodyTag\` with a heavier lifecycle (\`doStartTag\`, \`doEndTag\`, body iteration). Modern JSP favors **SimpleTag** and **tag files** for many use cases. Know which API your **container** version targets.

### 3. What is a TLD file?

**Answer:** A **Tag Library Descriptor** (XML) maps **tag names** to **Java classes** (or tag files), declares **attributes**, **required** flags, **rtexprvalue** (whether attributes accept runtime expressions), and **body-content** (\`empty\`, \`scriptless\`, \`tagdependent\`, etc.). The \`uri\` in the TLD matches the \`taglib\` directive in JSP. Misconfigured TLDs cause **translation** errors before runtime.

### 4. What are **tag files**?

**Answer:** Tag files are JSP fragments (often \`.tag\` or \`.tagx\`) packaged under \`WEB-INF/tags\` or in tag libraries, compiled into tag handlers **without** writing a Java class by hand. They are ideal for **lightweight** composition—headers, repeated panels—when full Java handlers are overkill. Contrast **performance** and **tooling**: tag files are faster to write; Java handlers offer maximal **control**.

### 5. Explain \`body-content\` values in a TLD.

**Answer:** \`empty\` means no body; \`scriptless\` allows EL and subactions but **not** scriptlets; \`tagdependent\` passes body text **verbatim** to the handler (for embedded mini-languages); \`JSP\` (classic) allows full JSP in bodies—rare in modern **scriptless** policies. Choosing wrong values breaks **translation** or allows **scriptlets** where you wanted to forbid them.

### 6. What does \`rtexprvalue\` mean on an attribute?

**Answer:** If **true**, the attribute may be set from a **runtime** expression (EL or request-time expression, depending on spec and container). If **false**, only **static** strings are allowed. This controls whether \`<my:tag title="\${msg}" />\` is legal. Interviewers check whether you understand **translation-time** vs **request-time** attribute values.

### 7. How do custom tags access the **page context** or **scoped variables**?

**Answer:** Handlers receive \`JspContext\` / \`PageContext\` to look up **attributes**, find **request/response**, dispatch **forwards/includes**, or cooperate with **tag parents**. Nested tags can coordinate via **findAncestorWithClass**. Advanced questions cover **attribute** scope and **cooperative** tags (e.g. iterator + item renderer patterns).

### 8. How do custom tags relate to **security**?

**Answer:** Tags that render **user** input must **encode** appropriately, mirroring \`c:out\` discipline. Tags that perform **authorization** checks can centralize **access control** for fragments of a page—but business **authorization** still belongs in **controllers/services** for **non-negotiable** rules. Mention **OWASP**-style thinking: tags are not a magic sandbox.

### 9. When would you choose **SimpleTag** vs **JSP Fragment** / **jsp:include**?

**Answer:** Use **SimpleTag** (or tag files) when you need **parameters**, **body** evaluation control, or **iteration** over **JspFragment**. Use **include** for **page** composition without a new tag contract. Use **tag files** for rapid UI reuse. The decision is about **API surface** vs **simplicity**.

### 10. How do custom tags fit into Spring MVC or similar frameworks?

**Answer:** Frameworks often provide their **own** tag libraries (form binding, URL tags, security) that wrap **model** data and **CSRF** tokens. Even then, **project-specific** tags help standardize **widgets**. In interviews, acknowledge **ecosystem** tags first, then explain where **custom** tags still add value (design system components, legacy coexistence).

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **JSTL** | [JSP JSTL](/tutorial/jsp-jstl) |
| **Directives** | [JSP directives](/tutorial/jsp-directives) |
| **EL** | [JSP Expression Language](/tutorial/jsp-expression-language) |
| **Action tags** | [JSP action tags](/tutorial/jsp-action-tags) |
| **Architecture** | [JSP architecture](/tutorial/jsp-architecture) |

`,
  code: `// JSP Custom Tags Demo
// Demonstrates creating and using custom tags

import java.util.*;

public class CustomTagsDemo {
    public static void main(String[] args) {
        System.out.println("=== JSP Custom Tags Demo ===\\n");
        
        // 1. SIMPLE TAG
        System.out.println("1. SIMPLE TAG");
        System.out.println("   -----------");
        
        HelloTag helloTag = new HelloTag();
        helloTag.setName("World");
        System.out.println("   <my:hello name=\\"World\\" />");
        System.out.println("   Output: " + helloTag.doTag());
        System.out.println();
        
        // 2. TAG WITH BODY
        System.out.println("2. TAG WITH BODY");
        System.out.println("   ---------------");
        
        PanelTag panelTag = new PanelTag();
        panelTag.setTitle("User Info");
        panelTag.setType("info");
        panelTag.setBody("<p>Name:  Dattu</p><p>Email:  Dattu@email.com</p>");
        
        System.out.println("   <my:panel title=\\"User Info\\" type=\\"info\\">");
        System.out.println("       <p>Name:  Dattu</p>");
        System.out.println("   </my:panel>");
        System.out.println();
        System.out.println("   Output:");
        System.out.println(panelTag.doTag());
        System.out.println();
        
        // 3. LOOP TAG
        System.out.println("3. LOOP TAG");
        System.out.println("   ---------");
        
        LoopTag loopTag = new LoopTag();
        loopTag.setCount(3);
        
        System.out.println("   <my:loop count=\\"3\\">");
        System.out.println("       <p>Item Dollar{index}</p>");
        System.out.println("   </my:loop>");
        System.out.println();
        System.out.println("   Output:");
        loopTag.execute(index -> System.out.println("       <p>Item " + index + "</p>"));
        System.out.println();
        
        // 4. FORM INPUT TAG
        System.out.println("4. FORM INPUT TAG");
        System.out.println("   ----------------");
        
        FormInputTag inputTag = new FormInputTag();
        inputTag.setName("email");
        inputTag.setLabel("Email Address");
        inputTag.setType("email");
        inputTag.setRequired(true);
        
        System.out.println("   <form:input name=\\"email\\" label=\\"Email Address\\" type=\\"email\\" required=\\"true\\" />");
        System.out.println();
        System.out.println("   Output:");
        System.out.println(inputTag.doTag());
        System.out.println();
        
        // 5. ALERT TAG (Tag File Style)
        System.out.println("5. ALERT TAG (Tag File)");
        System.out.println("   ---------------------");
        
        AlertTag alertTag = new AlertTag();
        alertTag.setType("success");
        alertTag.setTitle("Success!");
        alertTag.setBody("Your changes have been saved.");
        
        System.out.println("   <ui:alert type=\\"success\\" title=\\"Success!\\">");
        System.out.println("       Your changes have been saved.");
        System.out.println("   </ui:alert>");
        System.out.println();
        System.out.println("   Output:");
        System.out.println(alertTag.doTag());
        System.out.println();
        
        // 6. TLD FILE STRUCTURE
        System.out.println("6. TLD FILE STRUCTURE");
        System.out.println("   -------------------");
        System.out.println("   <?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>");
        System.out.println("   <taglib>");
        System.out.println("       <tlib-version>1.0</tlib-version>");
        System.out.println("       <short-name>my</short-name>");
        System.out.println("       <uri>http://example.com/mytags</uri>");
        System.out.println("       ");
        System.out.println("       <tag>");
        System.out.println("           <name>hello</name>");
        System.out.println("           <tag-class>com.example.HelloTag</tag-class>");
        System.out.println("           <body-content>empty</body-content>");
        System.out.println("           <attribute>");
        System.out.println("               <name>name</name>");
        System.out.println("               <required>true</required>");
        System.out.println("               <rtexprvalue>true</rtexprvalue>");
        System.out.println("           </attribute>");
        System.out.println("       </tag>");
        System.out.println("   </taglib>");
        System.out.println();
        
        // 7. BODY CONTENT TYPES
        System.out.println("7. BODY CONTENT TYPES");
        System.out.println("   -------------------");
        System.out.println("   | Type       | Description                          |");
        System.out.println("   |------------|--------------------------------------|");
        System.out.println("   | empty      | No body allowed                      |");
        System.out.println("   | scriptless | Body with EL/JSTL, no scriptlets     |");
        System.out.println("   | tagdependent | Body passed as-is to tag handler  |");
        System.out.println("   | JSP        | Full JSP content (classic tags only) |");
    }
}

// Simple Hello Tag
class HelloTag {
    private String name;
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String doTag() {
        return "Hello, " + name + "!";
    }
}

// Panel Tag with Body
class PanelTag {
    private String title;
    private String type = "default";
    private String body;
    
    public void setTitle(String title) { this.title = title; }
    public void setType(String type) { this.type = type; }
    public void setBody(String body) { this.body = body; }
    
    public String doTag() {
        StringBuilder sb = new StringBuilder();
        sb.append("   <div class=\\"panel panel-").append(type).append("\\">\\n");
        sb.append("       <div class=\\"panel-header\\">").append(title).append("</div>\\n");
        sb.append("       <div class=\\"panel-body\\">\\n");
        sb.append("           ").append(body).append("\\n");
        sb.append("       </div>\\n");
        sb.append("   </div>");
        return sb.toString();
    }
}

// Loop Tag
class LoopTag {
    private int count;
    
    public void setCount(int count) {
        this.count = count;
    }
    
    public void execute(java.util.function.Consumer<Integer> bodyProcessor) {
        for (int i = 1; i <= count; i++) {
            bodyProcessor.accept(i);
        }
    }
}

// Form Input Tag
class FormInputTag {
    private String name;
    private String label;
    private String type = "text";
    private String value = "";
    private boolean required = false;
    
    public void setName(String name) { this.name = name; }
    public void setLabel(String label) { this.label = label; }
    public void setType(String type) { this.type = type; }
    public void setValue(String value) { this.value = value; }
    public void setRequired(boolean required) { this.required = required; }
    
    public String doTag() {
        StringBuilder sb = new StringBuilder();
        sb.append("   <div class=\\"form-group\\">\\n");
        sb.append("       <label for=\\"").append(name).append("\\">").append(label);
        if (required) {
            sb.append(" <span class=\\"required\\">*</span>");
        }
        sb.append("</label>\\n");
        sb.append("       <input type=\\"").append(type).append("\\" ");
        sb.append("id=\\"").append(name).append("\\" ");
        sb.append("name=\\"").append(name).append("\\" ");
        if (!value.isEmpty()) {
            sb.append("value=\\"").append(value).append("\\" ");
        }
        if (required) {
            sb.append("required ");
        }
        sb.append("/>\\n");
        sb.append("   </div>");
        return sb.toString();
    }
}

// Alert Tag
class AlertTag {
    private String type;
    private String title;
    private String body;
    
    public void setType(String type) { this.type = type; }
    public void setTitle(String title) { this.title = title; }
    public void setBody(String body) { this.body = body; }
    
    public String doTag() {
        StringBuilder sb = new StringBuilder();
        sb.append("   <div class=\\"alert alert-").append(type).append("\\">\\n");
        if (title != null && !title.isEmpty()) {
            sb.append("       <strong>").append(title).append("</strong> ");
        }
        sb.append(body).append("\\n");
        sb.append("   </div>");
        return sb.toString();
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a custom tag library for UI components',
      hint: 'Build button, card, and badge tags',
      starterCode: `import java.util.*;

public class UITagLibraryDemo {
    public static void main(String[] args) {
        System.out.println("=== UI Tag Library Demo ===\\n");
        
        // Button Tag
        System.out.println("1. Button Tag");
        System.out.println("   -----------");
        ButtonTag btn = new ButtonTag();
        btn.setText("Click Me");
        btn.setType("primary");
        btn.setSize("lg");
        System.out.println("   <ui:button text=\\"Click Me\\" type=\\"primary\\" size=\\"lg\\" />");
        System.out.println("   Output: " + btn.render());
        System.out.println();
        
        // Card Tag
        System.out.println("2. Card Tag");
        System.out.println("   ---------");
        CardTag card = new CardTag();
        card.setTitle("Product");
        card.setImage("/img/product.jpg");
        card.setBody("This is a great product!");
        System.out.println("   <ui:card title=\\"Product\\" image=\\"/img/product.jpg\\">");
        System.out.println("       This is a great product!");
        System.out.println("   </ui:card>");
        System.out.println("   Output:");
        System.out.println(card.render());
        System.out.println();
        
        // Badge Tag
        System.out.println("3. Badge Tag");
        System.out.println("   ----------");
        BadgeTag badge = new BadgeTag();
        badge.setText("New");
        badge.setColor("success");
        System.out.println("   <ui:badge text=\\"New\\" color=\\"success\\" />");
        System.out.println("   Output: " + badge.render());
    }
}

class ButtonTag {
    private String text;
    private String type = "default";
    private String size = "md";
    
    public void setText(String text) { this.text = text; }
    public void setType(String type) { this.type = type; }
    public void setSize(String size) { this.size = size; }
    
    public String render() {
        return "<button class=\\"btn btn-" + type + " btn-" + size + "\\">" + text + "</button>";
    }
}

class CardTag {
    private String title;
    private String image;
    private String body;
    
    public void setTitle(String title) { this.title = title; }
    public void setImage(String image) { this.image = image; }
    public void setBody(String body) { this.body = body; }
    
    public String render() {
        StringBuilder sb = new StringBuilder();
        sb.append("   <div class=\\"card\\">\\n");
        if (image != null) {
            sb.append("       <img src=\\"").append(image).append("\\" class=\\"card-img\\"/>\\n");
        }
        sb.append("       <div class=\\"card-body\\">\\n");
        sb.append("           <h3 class=\\"card-title\\">").append(title).append("</h3>\\n");
        sb.append("           <p>").append(body).append("</p>\\n");
        sb.append("       </div>\\n");
        sb.append("   </div>");
        return sb.toString();
    }
}

class BadgeTag {
    private String text;
    private String color = "default";
    
    public void setText(String text) { this.text = text; }
    public void setColor(String color) { this.color = color; }
    
    public String render() {
        return "<span class=\\"badge badge-" + color + "\\">" + text + "</span>";
    }
}`
    }
  ]
};

export default jspCustomTags;
