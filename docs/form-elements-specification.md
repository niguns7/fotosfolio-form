# Form Builder Elements Specification

This document details all the form elements used in the `FormBuilderInterface` and `FormElementsPanel`. When rendering these forms in external projects/servers, the implementation must support all the element types and properties listed below to ensure full compatibility.

## data Structure

Each form element in the API response generally follows this structure:

```typescript
interface FormElement {
  id: string;          // Unique identifier
  type: string;        // Element type (see list below)
  label: string;       // Display label
  placeholder?: string; // Placeholder text (for inputs)
  required?: boolean;  // Validation flag
  
  // Type-specific properties
  options?: string[];  // For 'select' type
  checkboxLabel?: string; // For 'checkbox' type
}
```

## Form Element Types

### 1. Core Input Fields

| Type       | Icon (Ref)        | Description | Specifics |
|------------|-------------------|-------------|-----------|
| **text**   | `IoTextOutline`  | Single-line text input. Used for names, standard inputs. | Standard input |
| **email**  | `IoMailOutline`  | Email address field. Should include email format validation. | `type="email"` |
| **phone**  | `IoCallOutline`  | Phone number field. | `type="tel"` recommended |
| **number** | `IoCashOutline`  | Numeric input field. | `type="number"` |
| **textarea**| `IoDocumentTextOutline` | Multi-line text area. Used for long descriptions. | Render as `<textarea>` |

### 2. Date & Time

| Type       | Icon (Ref)        | Description | Specifics |
|------------|-------------------|-------------|-----------|
| **date**   | `IoCalendarOutline`| Date picker input. | Browser native or custom date picker. |
| **time**   | `IoTimeOutline`   | Time picker input. | Browser native or custom time picker. |

### 3. Selection & Options

| Type       | Icon (Ref)        | Description | Specifics |
|------------|-------------------|-------------|-----------|
| **select** | `IoListOutline`   | Dropdown menu. | **Requires `options` array.** <br> Example: `options: ["Option 1", "Option 2"]` |
| **checkbox**| `IoCheckboxOutline`| Single checkbox toggle. | **Requires `checkboxLabel`.** <br> The `label` is the main field title, `checkboxLabel` is the text next to the box. |

### 4. Financial & Payment (Specialized)

| Type       | Icon (Ref)        | Description | Specifics |
|------------|-------------------|-------------|-----------|
| **amount** | `IoCashOutline`   | Price or amount input. | often formatted with currency symbol. |
| **payment**| `IoCardOutline`   | Payment method selector. | Integration with payment gateway UI. |

### 5. Static & Layout Elements

| Type       | Icon (Ref)        | Description | Specifics |
|------------|-------------------|-------------|-----------|
| **heading**| `IoTextOutline`   | Section header text. Not an input field. | Render as `<h3>` or `<h4>`. `required` is ignored. |
| **divider**| `IoRemoveOutline` | Horizontal visual separator. | Render as `<hr />`. |
| **image**  | `IoImageOutline`  | Image display or placeholder. | Used for static visuals in the form. |
| **terms**  | `IoReaderOutline` | Terms & Conditions block. | Displays the global `termsAndConditions` text. usually implies a "Read and Accept" interaction. |

## Implementation Checklist for External Project

- [ ] **Data Mapping**: Ensure the API consumer maps `checkboxLabel` and `options` correctly.
- [ ] **Validation**: Implement `required` field validation for all input types.
- [ ] **Layout**: Support the specific visual elements (`heading`, `divider`) to maintain the form's intended structure.
- [ ] **Terms**: Ensure the `terms` element pulls the correct content from the form metadata/settings.

## JSON Payload Example

```json
[
  {
    "id": "1",
    "type": "heading",
    "label": "Contact Information",
    "required": false
  },
  {
    "id": "2",
    "type": "text",
    "label": "Full Name",
    "placeholder": "Enter your name",
    "required": true
  },
  {
    "id": "3",
    "type": "select",
    "label": "Event Type",
    "required": true,
    "options": ["Wedding", "Corporate", "Birthday"]
  },
  {
    "id": "4",
    "type": "checkbox",
    "label": "Agreements",
    "checkboxLabel": "I agree to the terms",
    "required": true
  }
]
```
