const htmlTables = {
  id: 'html-tables',
  title: 'HTML Tables - Creating Data Tables',
  description: 'Learn how to create tables for displaying structured data in HTML',
  content: `
# HTML Tables - Creating Data Tables

HTML tables are structural elements designed to display tabular data in rows and columns. Tables are essential for presenting structured information such as data comparisons, schedules, financial reports, product catalogs, and any information that benefits from row-column organization. Understanding HTML tables is fundamental for displaying data-driven content on web pages.

Enterprise applications extensively use tables for data presentation, reports, dashboards, and administrative interfaces. Tables provide a clear, organized way to display large amounts of structured data. Modern web development combines HTML tables with CSS for styling and JavaScript for interactivity, creating powerful data presentation solutions.

**Table Components:**
- **table**: Container element for the entire table
- **tr**: Table row containing cells
- **th**: Table header cell (bold, typically centered)
- **td**: Table data cell (normal cell content)
- **thead, tbody, tfoot**: Semantic sections for table organization

---

## Basic Table Structure

\`\`\`html
<table>
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
    </tr>
    <tr>
        <td>Data 1</td>
        <td>Data 2</td>
    </tr>
</table>
\`\`\`

**Components:**
- \`<table>\` - Table container
- \`<tr>\` - Table Row
- \`<th>\` - Table Header (bold, centered)
- \`<td>\` - Table Data (normal cell)

---

## Complete Table Example

\`\`\`html
<table>
    <tr>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
    </tr>
    <tr>
        <td>John</td>
        <td>25</td>
        <td>Mumbai</td>
    </tr>
    <tr>
        <td>Jane</td>
        <td>30</td>
        <td>Delhi</td>
    </tr>
</table>
\`\`\`

**Result:**

| Name | Age | City |
|------|-----|------|
| John | 25  | Mumbai |
| Jane | 30  | Delhi |

---

## Table Headers

### Using <thead>, <tbody>, <tfoot>

\`\`\`html
<table>
    <thead>
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Laptop</td>
            <td>$999</td>
            <td>50</td>
        </tr>
        <tr>
            <td>Phone</td>
            <td>$599</td>
            <td>100</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2">Total Items</td>
            <td>150</td>
        </tr>
    </tfoot>
</table>
\`\`\`

**Purpose:**
- \`<thead>\` - Header section (sticky on scroll)
- \`<tbody>\` - Main content
- \`<tfoot>\` - Footer (totals, summaries)

---

## Table Attributes

### Border

\`\`\`html
<table border="1">
    <!-- Old way, use CSS instead -->
</table>

<!-- Better: Use CSS -->
<table style="border: 1px solid black;">
\`\`\`

### Cell Padding & Spacing

\`\`\`html
<!-- Old way -->
<table cellpadding="10" cellspacing="5">

<!-- Better: Use CSS -->
<table style="border-collapse: collapse; padding: 10px;">
\`\`\`

---

## Colspan (Merge Columns)

\`\`\`html
<table>
    <tr>
        <th colspan="2">Personal Information</th>
    </tr>
    <tr>
        <th>Name</th>
        <th>Email</th>
    </tr>
    <tr>
        <td>John</td>
        <td>john@example.com</td>
    </tr>
</table>
\`\`\`

**Purpose:** Merge multiple columns into one

---

## Rowspan (Merge Rows)

\`\`\`html
<table>
    <tr>
        <th rowspan="2">Name</th>
        <th>First Name</th>
    </tr>
    <tr>
        <td>John</td>
    </tr>
    <tr>
        <td>Jane</td>
        <td>Jane</td>
    </tr>
</table>
\`\`\`

**Purpose:** Merge multiple rows into one

---

## Complete Example with Colspan and Rowspan

\`\`\`html
<table border="1" style="border-collapse: collapse; width: 100%;">
    <thead>
        <tr>
            <th rowspan="2">Student</th>
            <th colspan="3">Marks</th>
        </tr>
        <tr>
            <th>Math</th>
            <th>Science</th>
            <th>English</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John</td>
            <td>85</td>
            <td>90</td>
            <td>88</td>
        </tr>
        <tr>
            <td>Jane</td>
            <td>92</td>
            <td>87</td>
            <td>95</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td><strong>Average</strong></td>
            <td>88.5</td>
            <td>88.5</td>
            <td>91.5</td>
        </tr>
    </tfoot>
</table>
\`\`\`

---

## Styling Tables with CSS

\`\`\`html
<style>
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0;
    }
    
    th, td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
    }
    
    th {
        background-color: #4CAF50;
        color: white;
    }
    
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    
    tr:hover {
        background-color: #ddd;
    }
</style>

<table>
    <tr>
        <th>Name</th>
        <th>Age</th>
    </tr>
    <tr>
        <td>John</td>
        <td>25</td>
    </tr>
</table>
\`\`\`

---

## Responsive Tables

### Horizontal Scroll

\`\`\`html
<div style="overflow-x: auto;">
    <table style="min-width: 600px;">
        <!-- Wide table content -->
    </table>
</div>
\`\`\`

### Stack on Mobile

\`\`\`html
<style>
    @media screen and (max-width: 600px) {
        table, thead, tbody, th, td, tr {
            display: block;
        }
        thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
        }
        tr {
            border: 1px solid #ccc;
            margin-bottom: 10px;
        }
        td {
            border: none;
            position: relative;
            padding-left: 50%;
        }
        td:before {
            content: attr(data-label);
            position: absolute;
            left: 6px;
            font-weight: bold;
        }
    }
</style>
\`\`\`

---

## Real-Time Scenarios

### Scenario 1: Product Comparison Table

\`\`\`html
<table>
    <thead>
        <tr>
            <th>Feature</th>
            <th>Basic Plan</th>
            <th>Pro Plan</th>
            <th>Enterprise Plan</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Price</td>
            <td>$9/month</td>
            <td>$29/month</td>
            <td>$99/month</td>
        </tr>
        <tr>
            <td>Storage</td>
            <td>10GB</td>
            <td>100GB</td>
            <td>Unlimited</td>
        </tr>
        <tr>
            <td>Support</td>
            <td>Email</td>
            <td>Email + Chat</td>
            <td>24/7 Phone</td>
        </tr>
    </tbody>
</table>
\`\`\`

### Scenario 2: Schedule/Timetable

\`\`\`html
<table>
    <thead>
        <tr>
            <th>Time</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>9:00 AM</td>
            <td>Math</td>
            <td>Science</td>
            <td>English</td>
        </tr>
        <tr>
            <td>10:00 AM</td>
            <td>History</td>
            <td>Math</td>
            <td>Science</td>
        </tr>
    </tbody>
</table>
\`\`\`

### Scenario 3: Shopping Cart

\`\`\`html
<table>
    <thead>
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Laptop</td>
            <td>1</td>
            <td>$999</td>
            <td>$999</td>
        </tr>
        <tr>
            <td>Mouse</td>
            <td>2</td>
            <td>$25</td>
            <td>$50</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3"><strong>Grand Total</strong></td>
            <td><strong>$1049</strong></td>
        </tr>
    </tfoot>
</table>
\`\`\`

---

## Table Caption

\`\`\`html
<table>
    <caption>Monthly Sales Report - 2024</caption>
    <tr>
        <th>Month</th>
        <th>Sales</th>
    </tr>
    <tr>
        <td>January</td>
        <td>$10,000</td>
    </tr>
</table>
\`\`\`

**Purpose:** Adds a title/description to the table

---

## Best Practices

1. **Use semantic structure**
   - \`<thead>\`, \`<tbody>\`, \`<tfoot>\` for organization
   - \`<th>\` for headers, \`<td>\` for data

2. **Add captions**
   - Use \`<caption>\` for table titles

3. **Make tables accessible**
   - Use proper headers
   - Add scope attributes

4. **Style with CSS**
   - Don't use deprecated HTML attributes
   - Use CSS for borders, spacing, colors

5. **Make responsive**
   - Consider mobile users
   - Use horizontal scroll or stack on small screens

---

## Accessibility

### Scope Attribute

\`\`\`html
<table>
    <tr>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
    </tr>
    <tr>
        <th scope="row">John</th>
        <td>25</td>
    </tr>
</table>
\`\`\`

**Purpose:** Helps screen readers understand table structure

---

## Common Mistakes

### Mistake 1: Using Tables for Layout

\`\`\`html
❌ <table>
     <tr>
       <td>Header</td>
     </tr>
     <tr>
       <td>Content</td>
     </tr>
   </table>

✅ Use <header>, <main>, <section> for layout
✅ Use tables only for tabular data
\`\`\`

### Mistake 2: Missing Headers

\`\`\`html
❌ <table>
     <tr>
       <td>Name</td>
       <td>Age</td>
     </tr>
   </table>

✅ <table>
     <tr>
       <th>Name</th>
       <th>Age</th>
     </tr>
   </table>
\`\`\`

---

## Summary

**Table Elements:**
- ✅ \`<table>\` - Table container
- ✅ \`<tr>\` - Table row
- ✅ \`<th>\` - Table header
- ✅ \`<td>\` - Table data
- ✅ \`<thead>\` - Header section
- ✅ \`<tbody>\` - Body section
- ✅ \`<tfoot>\` - Footer section
- ✅ \`<caption>\` - Table title

**Attributes:**
- ✅ \`colspan\` - Merge columns
- ✅ \`rowspan\` - Merge rows
- ✅ \`scope\` - Accessibility

**Best Practices:**
- ✅ Use for tabular data only
- ✅ Include proper headers
- ✅ Style with CSS
- ✅ Make responsive
- ✅ Add captions

Tables are perfect for displaying structured data!
`,
  code: `// HTML Tables

/*
 * TABLES DISPLAY STRUCTURED DATA
 * ===============================
 * 
 * Perfect for comparisons, schedules, data display
 */

// ============================================
// 1. BASIC TABLE STRUCTURE
// ============================================
/*
<table>
    <tr>                    → Table Row
        <th>Header</th>    → Table Header (bold)
        <td>Data</td>       → Table Data
    </tr>
</table>
*/

// ============================================
// 2. COMPLETE TABLE EXAMPLE
// ============================================
/*
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John</td>
            <td>25</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Total</td>
            <td>25</td>
        </tr>
    </tfoot>
</table>

Components:
  <thead>  → Header section
  <tbody>  → Body section
  <tfoot>  → Footer section
*/

// ============================================
// 3. COLSPAN (Merge Columns)
// ============================================
/*
<table>
    <tr>
        <th colspan="2">Personal Info</th>
    </tr>
    <tr>
        <th>Name</th>
        <th>Email</th>
    </tr>
</table>
*/

// ============================================
// 4. ROWSPAN (Merge Rows)
// ============================================
/*
<table>
    <tr>
        <th rowspan="2">Name</th>
        <th>First</th>
    </tr>
    <tr>
        <td>John</td>
    </tr>
</table>
*/

// ============================================
// 5. TABLE CAPTION
// ============================================
/*
<table>
    <caption>Monthly Sales Report</caption>
    <tr>
        <th>Month</th>
        <th>Sales</th>
    </tr>
</table>
*/

// ============================================
// 6. STYLING WITH CSS
// ============================================
/*
table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    border: 1px solid #ddd;
    padding: 12px;
}

th {
    background-color: #4CAF50;
    color: white;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}
*/

// ============================================
// 7. ACCESSIBILITY
// ============================================
/*
<table>
    <tr>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
    </tr>
    <tr>
        <th scope="row">John</th>
        <td>25</td>
    </tr>
</table>
*/

// ============================================
// 8. BEST PRACTICES
// ============================================
/*
✅ Use for tabular data only (not layout)
✅ Include proper headers (<th>)
✅ Use <thead>, <tbody>, <tfoot>
✅ Add captions
✅ Style with CSS
✅ Make responsive
✅ Add scope for accessibility
*/
`
};

export default htmlTables;


