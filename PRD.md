# FotosFolio Form Portal - Project Requirements

## 📋 Project Overview

A standalone, read-only Next.js application for displaying and submitting booking forms created in the FotosFolio platform. This portal will be hosted at `forms.fotosfolio.com` and provides a clean interface for clients to view form details and submit their booking information.

**Key Point:** This is a VIEW-ONLY portal. No form customization or editing capabilities needed - only display and submit functionality.

---

## 🎯 Core Objectives

1. Fetch and display booking forms from FotosFolio API
2. Render forms exactly as configured in the form builder
3. Collect and submit client responses to the event management API
4. Provide a clean, responsive user experience
5. Handle form validation and error states

---

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14+** (App Router)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form** for form state management (simple validation)

### Additional Libraries
- `next/image` for optimized logo loading
- `axios` for API calls
- `react-hot-toast` for user notifications

---

## 📂 Project Structure

```
form-portal/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout
│   │   ├── page.tsx                      # Landing page (redirect or info)
│   │   ├── bookings/
│   │   │   └── [templateId]/
│   │   │       ├── page.tsx              # Main form display page
│   │   │       └── loading.tsx           # Loading state
│   │   └── success/
│   │       └── page.tsx                  # Success confirmation page
│   ├── components/
│   │   ├── FormRenderer.tsx              # Main form rendering component
│   │   ├── FormHeader.tsx                # Logo, title, subtitle, description
│   │   ├── FormElements/
│   │   │   ├── TextInput.tsx
│   │   │   ├── EmailInput.tsx
│   │   │   ├── PhoneInput.tsx
│   │   │   ├── DateInput.tsx
│   │   │   ├── TextArea.tsx
│   │   │   ├── SelectInput.tsx
│   │   │   └── NumberInput.tsx
│   │   ├── SubmitButton.tsx              # Themed submit button
│   │   ├── FormFooter.tsx                # Branding footer
│   │   └── LoadingSpinner.tsx            # Loading indicator
│   ├── types/
│   │   ├── form.types.ts                 # Form element types
│   │   ├── theme.types.ts                # Theme configuration
│   │   └── api.types.ts                  # API response types
│   ├── services/
│   │   ├── api.ts                        # Axios client setup
│   │   ├── formService.ts                # Get form configuration
│   │   └── submissionService.ts          # Submit form data
│   ├── utils/
│   │   ├── validation.ts                 # Client-side validation
│   │   └── formatting.ts                 # Data transformation
│   └── hooks/
│       ├── useFormData.ts                # Fetch form configuration
│       └── useFormSubmit.ts              # Handle form submission
├── public/
│   └── images/
│       └── fotosfolio-logo.png
├── .env.local
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔌 API Integration

### Base URL
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://prod.fotosfolio.com';
```

### Required API Endpoints

#### 1. Get Form Configuration
```typescript
GET https://prod.fotosfolio.com/event-management/custom-forms/{templateId}

Response: {
  success: boolean;
  data: {
    id: string;                          // templateId
    eventName: string;                   // Form title
    eventType: string;                   // wedding, corporate, travel, etc.
    description?: string;                // Form description
    logo?: string;                       // Logo URL
    subtitle?: string;                   // Optional subtitle
    theme: {
      primaryColor: string;
      secondaryColor: string;
      backgroundColor: string;
      textColor: string;
      fontFamily: string;
      buttonStyle: 'rounded' | 'square' | 'pill';
      formWidth: 'narrow' | 'medium' | 'wide';
    };
    formElements: Array<{
      id: string;
      type: 'text' | 'email' | 'phone' | 'number' | 'textarea' | 'date' | 'select';
      label: string;
      placeholder?: string;
      required?: boolean;
      options?: string[];                // For select type
    }>;
    isActive: boolean;
    photographerId: string;
  };
}

// Error Responses:
// 404 - Form not found
// 403 - Form is inactive
// 500 - Server error
```

#### 2. Submit Event Booking
```typescript
POST https://prod.fotosfolio.com/event-management

Request Headers:
Content-Type: application/json

Request Body: {
  eventName: string;                     // From form title or first field
  eventDate: string;                     // ISO 8601 format: "2024-12-31T10:00:00Z"
  customFields: {                        // All form field responses
    [fieldLabel: string]: any;           // Dynamic based on form fields
  }
}

Example Request:
{
  "eventName": "Wedding Photography Booking",
  "eventDate": "2024-12-31T10:00:00Z",
  "customFields": {
    "brideName": "Jane Doe",
    "groomName": "John Smith",
    "contactEmail": "jane@example.com",
    "phoneNumber": "+1234567890",
    "guestCount": 150,
    "venue": "Grand Hotel",
    "packageSelected": "Premium Package",
    "notes": "Outdoor ceremony"
  }
}

Response: {
  success: boolean;
  data: {
    bookingId: string;
    eventName: string;
    eventDate: string;
    status: string;
    message: string;
  };
  error?: string;
}

// Error Responses:
// 400 - Invalid data or validation error
// 429 - Rate limit exceeded
// 500 - Server error
```

---

## 📱 Page Routes

### 1. Form Page: `/bookings/[templateId]`
**Purpose:** Display and submit booking form

**Features:**
- Extract templateId from URL
- Fetch form configuration from API
- Display form header (logo, title, subtitle, description)
- Render all form fields dynamically
- Basic client-side validation
- Submit to event-management API
- Show loading and error states

**URL Structure:**
```
https://forms.fotosfolio.com/bookings/abc123xyz
```

**User Flow:**
1. User opens shared link
2. Portal fetches form config using templateId
3. Form renders with photographer's branding
4. User fills out form fields
5. Click submit → data sent to event-management API
6. Success → redirect to success page
7. Error → show error message

### 2. Success Page: `/success`
**Purpose:** Show confirmation after successful submission

**Features:**
- Display success message
- Show booking/submission ID
- "Create another booking" button
- FotosFolio branding footer

**Query Parameters:**
```
?bookingId=xyz789
&eventName=Wedding+Photography
```

### 3. Landing Page: `/`
**Purpose:** Default homepage (optional)

**Features:**
- Simple info page
- Link to FotosFolio main site
- "How it works" information

### 4. Error Pages
**Purpose:** Handle various error scenarios

**404:** Form not found  
**403:** Form inactive/expired  
**500:** Server error  

All include link back to FotosFolio homepage

---

## 🎨 Form Rendering Specifications

### Form Header Component
```tsx
<FormHeader>
  {logo && <Logo src={logo} width={80} height={80} />}
  <Title color={theme.primaryColor} fontFamily={theme.fontFamily}>
    {eventName}
  </Title>
  {subtitle && (
    <Subtitle color={theme.primaryColor} fontFamily={theme.fontFamily}>
      {subtitle}
    </Subtitle>
  )}
  {description && (
    <Description fontFamily={theme.fontFamily}>
      {description}
    </Description>
  )}
  <Divider color={theme.primaryColor} />
</FormHeader>
```

### Form Elements Mapping

| Element Type | Component | HTML Element | Validation |
|-------------|-----------|--------------|------------|
| `text` | TextInput | `<input type="text">` | Required, min/max length |
| `email` | EmailInput | `<input type="email">` | Required, email format |
| `phone` | PhoneInput | `<input type="tel">` | Required, phone format |
| `number` | NumberInput | `<input type="number">` | Required, numeric |
| `textarea` | TextArea | `<textarea>` | Required, max length |
| `date` | DateInput | `<input type="date">` | Required, valid date |
| `select` | SelectInput | `<select>` | Required, one of options |

**Note:** Only render input elements from API - no heading, image, divider, amount, or payment components needed for booking submission.

### Theme Application

#### Width Classes
```typescript
const getFormWidthClass = (width: string) => {
  switch (width) {
    case 'narrow': return 'max-w-xl';
    case 'wide': return 'max-w-5xl';
    default: return 'max-w-3xl';
  }
};
```

#### Button Styles
```typescript
const getButtonStyleClass = (style: string) => {
  switch (style) {
    case 'pill': return 'rounded-full';
    case 'square': return 'rounded-none';
    default: return 'rounded-lg';
  }
};
```

#### Background Gradient (Same as Form Builder)
```typescript
background: `linear-gradient(135deg, 
  ${theme.backgroundColor} 0%, 
  ${theme.primaryColor}08 50%, 
  ${theme.backgroundColor} 100%)`
```

### Input Styling
```typescript
const inputClass = `w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all`;
const inputStyle = {
  borderColor: `${theme.textColor}20`,
  color: theme.textColor,
  fontFamily: theme.fontFamily
};
```

---

## ✅ Form Validation Rules

### Client-Side Validation
```typescript
const validationRules = {
  text: (value: string, required: boolean) => {
    if (required && !value.trim()) return 'This field is required';
    return null;
  },
  
  email: (value: string, required: boolean) => {
    if (required && !value) return 'Email is required';
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Invalid email format';
    }
    return null;
  },
  
  phone: (value: string, required: boolean) => {
    if (required && !value) return 'Phone number is required';
    if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
      return 'Invalid phone format';
    }
    return null;
  },
  
  number: (value: number, required: boolean) => {
    if (required && !value) return 'This field is required';
    if (value && isNaN(value)) return 'Must be a valid number';
    return null;
  },
  
  date: (value: string, required: boolean) => {
    if (required && !value) return 'Date is required';
    if (value && isNaN(Date.parse(value))) return 'Invalid date';
    return null;
  },
  
  select: (value: string, required: boolean, options: string[]) => {
    if (required && !value) return 'Please select an option';
    if (value && !options.includes(value)) return 'Invalid selection';
    return null;
  }
};
```

---

## 🚀 Performance Optimization

### Image Optimization
- Use `next/image` for logo and images
- Lazy load images below the fold
- Support WebP format
- Responsive image sizing

### Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting
- Lazy load form elements

### Caching Strategy
```typescript
// Cache form configurations
export const revalidate = 3600; // 1 hour

// Stale-while-revalidate for form data
const formData = await fetch(`/api/forms/${formId}`, {
  next: { revalidate: 3600 }
});
```

### Loading States
- Skeleton screens for form loading
- Progressive form rendering
- Optimistic UI updates

---

## 🔒 Security Considerations

### Data Protection
- No sensitive data stored in client
- HTTPS only
- CSRF protection
- Rate limiting on submission endpoint

### Form Validation
- Client-side validation for UX
- Server-side validation (handled by API)
- Sanitize all inputs
- Prevent XSS attacks

### Access Control
- Public forms only (no authentication needed)
- Check form `isActive` status
- Validate formId format
- Handle inactive/deleted forms gracefully



## 🎯 User Experience Features

### Progressive Disclosure
- Smooth scroll to error fields
- Real-time validation feedback
- Clear error messages
- Success animations

### Accessibility
- ARIA labels on all inputs
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Color contrast compliance (WCAG AA)

### Mobile Optimization
- Touch-friendly inputs
- Responsive design
- Mobile-first approach
- Prevent zoom on input focus

---

## 🌍 Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://prod.fotosfolio.com
NEXT_PUBLIC_SITE_URL=https://forms.fotosfolio.com
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "react-hook-form": "^7.48.0",
    "axios": "^1.6.0",
    "react-hot-toast": "^2.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

---

## 🚦 Implementation Phases

### Phase 1: Project Setup (30 mins)
1. Create Next.js project with TypeScript
2. Configure Tailwind CSS
3. Set up project structure
4. Configure environment variables
5. Set up axios client

### Phase 2: Type Definitions (20 mins)
1. Create form element types
2. Create theme types
3. Create API response types
4. Create utility types

### Phase 3: API Services (30 mins)
1. Create formService.ts (GET form config)
2. Create submissionService.ts (POST booking)
3. Add error handling
4. Add loading states

### Phase 4: Core Components (2 hours)
1. Build FormHeader component
2. Create input components (text, email, phone, number, date, textarea, select)
3. Create FormRenderer component
4. Create SubmitButton component
5. Create LoadingSpinner component

### Phase 5: Main Page (1 hour)
1. Create `/bookings/[templateId]/page.tsx`
2. Implement data fetching
3. Implement form submission
4. Add validation
5. Handle loading and error states

### Phase 6: Success & Error Pages (30 mins)
1. Create success page
2. Create error pages (404, 403, 500)
3. Add proper messaging

### Phase 7: Styling & Theming (1 hour)
1. Apply dynamic theming
2. Implement responsive design
3. Match FormPreview styling exactly
4. Add animations and transitions

### Phase 8: Testing & Deployment (1 hour)
1. Test with real API
2. Test responsive design
3. Test error scenarios
4. Deploy to production
5. Test production deployment

**Total Estimated Time:** 6-7 hours

---

## 📝 Data Flow & Transformation

### Step 1: Fetch Form Configuration
```typescript
// GET from: https://prod.fotosfolio.com/event-management/custom-forms/{templateId}

// Example Response:
{
  "success": true,
  "data": {
    "id": "wedding-template-123",
    "eventName": "Wedding Photography Booking",
    "eventType": "wedding",
    "description": "Fill out this form to book your wedding photography session",
    "subtitle": "Let's capture your special day",
    "logo": "https://cdn.fotosfolio.com/logos/photographer-456.jpg",
    "theme": {
      "primaryColor": "#701A19",
      "secondaryColor": "#A1111A",
      "backgroundColor": "#FFFFFF",
      "textColor": "#1A1A1A",
      "fontFamily": "Inter",
      "buttonStyle": "rounded",
      "formWidth": "medium"
    },
    "formElements": [
      {
        "id": "field-1",
        "type": "text",
        "label": "Bride's Name",
        "placeholder": "Enter bride's full name",
        "required": true
      },
      {
        "id": "field-2",
        "type": "text",
        "label": "Groom's Name",
        "placeholder": "Enter groom's full name",
        "required": true
      },
      {
        "id": "field-3",
        "type": "email",
        "label": "Contact Email",
        "placeholder": "your@email.com",
        "required": true
      },
      {
        "id": "field-4",
        "type": "phone",
        "label": "Phone Number",
        "placeholder": "(000) 000-0000",
        "required": true
      },
      {
        "id": "field-5",
        "type": "date",
        "label": "Wedding Date",
        "placeholder": "Select date",
        "required": true
      },
      {
        "id": "field-6",
        "type": "text",
        "label": "Ceremony Venue",
        "placeholder": "Enter venue name",
        "required": true
      },
      {
        "id": "field-7",
        "type": "number",
        "label": "Expected Guest Count",
        "placeholder": "Number of guests",
        "required": false
      },
      {
        "id": "field-8",
        "type": "textarea",
        "label": "Special Requests",
        "placeholder": "Any special requirements?",
        "required": false
      },
      {
        "id": "field-9",
        "type": "select",
        "label": "Photography Package",
        "placeholder": "Select a package",
        "required": true,
        "options": ["Basic Package", "Premium Package", "Deluxe Package"]
      }
    ],
    "isActive": true,
    "photographerId": "photographer-456"
  }
}
```

### Step 2: Transform User Input to API Format
```typescript
// User fills form, data collected as:
const formData = {
  "field-1": "Jane Doe",
  "field-2": "John Smith",
  "field-3": "jane@example.com",
  "field-4": "+1234567890",
  "field-5": "2024-12-31",
  "field-6": "Grand Hotel",
  "field-7": 150,
  "field-8": "Outdoor ceremony preferred",
  "field-9": "Premium Package"
};

// Transform to API payload:
const transformToAPIPayload = (formData, formElements, eventName) => {
  // Find date field for eventDate
  const dateField = formElements.find(el => el.type === 'date');
  const eventDate = dateField ? formData[dateField.id] : new Date().toISOString();
  
  // Convert YYYY-MM-DD to ISO 8601 format
  const eventDateISO = new Date(eventDate + 'T10:00:00Z').toISOString();
  
  // Build customFields object with labels as keys
  const customFields = {};
  formElements.forEach(element => {
    const value = formData[element.id];
    if (value !== undefined && value !== '') {
      // Use camelCase version of label as key
      const key = toCamelCase(element.label);
      customFields[key] = value;
    }
  });
  
  return {
    eventName: eventName,
    eventDate: eventDateISO,
    customFields: customFields
  };
};

// Final payload sent to API:
{
  "eventName": "Wedding Photography Booking",
  "eventDate": "2024-12-31T10:00:00Z",
  "customFields": {
    "brideName": "Jane Doe",
    "groomName": "John Smith",
    "contactEmail": "jane@example.com",
    "phoneNumber": "+1234567890",
    "weddingDate": "2024-12-31",
    "ceremonyVenue": "Grand Hotel",
    "expectedGuestCount": 150,
    "specialRequests": "Outdoor ceremony preferred",
    "photographyPackage": "Premium Package"
  }
}
```

### Step 3: Handle API Response
```typescript
// Success Response:
{
  "success": true,
  "data": {
    "bookingId": "booking-789",
    "eventName": "Wedding Photography Booking",
    "eventDate": "2024-12-31T10:00:00Z",
    "status": "pending",
    "message": "Booking received successfully"
  }
}

// Redirect to: /success?bookingId=booking-789&eventName=Wedding+Photography
```

---

## 🛠️ Helper Functions

### 1. Transform Form Data to API Payload
```typescript
// src/utils/formatting.ts

export const toCamelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => 
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, '');
};

export const transformFormDataToPayload = (
  formData: Record<string, any>,
  formElements: FormElement[],
  eventName: string
) => {
  // Find date field for eventDate
  const dateField = formElements.find(el => el.type === 'date');
  let eventDate = new Date().toISOString();
  
  if (dateField && formData[dateField.id]) {
    // Convert YYYY-MM-DD to ISO 8601 with time
    const dateValue = formData[dateField.id];
    eventDate = new Date(dateValue + 'T10:00:00Z').toISOString();
  }
  
  // Build customFields object
  const customFields: Record<string, any> = {};
  
  formElements.forEach(element => {
    const value = formData[element.id];
    if (value !== undefined && value !== '') {
      const key = toCamelCase(element.label);
      customFields[key] = value;
    }
  });
  
  return {
    eventName,
    eventDate,
    customFields
  };
};
```

### 2. Basic Validation
```typescript
// src/utils/validation.ts

export const validateField = (
  type: string,
  value: any,
  required: boolean
): string | null => {
  // Check required
  if (required && (!value || value.toString().trim() === '')) {
    return 'This field is required';
  }
  
  if (!value) return null; // Skip further validation if empty and not required
  
  // Type-specific validation
  switch (type) {
    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Invalid email format';
      }
      break;
      
    case 'phone':
      if (!/^[\d\s\-\+\(\)]+$/.test(value)) {
        return 'Invalid phone format';
      }
      break;
      
    case 'number':
      if (isNaN(Number(value))) {
        return 'Must be a valid number';
      }
      break;
      
    case 'date':
      if (isNaN(Date.parse(value))) {
        return 'Invalid date';
      }
      break;
  }
  
  return null;
};

export const validateForm = (
  formData: Record<string, any>,
  formElements: FormElement[]
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  formElements.forEach(element => {
    const error = validateField(
      element.type,
      formData[element.id],
      element.required || false
    );
    
    if (error) {
      errors[element.id] = error;
    }
  });
  
  return errors;
};
```

### 3. Theme Utilities
```typescript
// src/utils/theme.ts

export const getFormWidthClass = (width: string): string => {
  switch (width) {
    case 'narrow': return 'max-w-xl';
    case 'wide': return 'max-w-5xl';
    default: return 'max-w-3xl';
  }
};

export const getButtonStyleClass = (style: string): string => {
  switch (style) {
    case 'pill': return 'rounded-full';
    case 'square': return 'rounded-none';
    default: return 'rounded-lg';
  }
};

export const getBackgroundGradient = (
  backgroundColor: string,
  primaryColor: string
): string => {
  return `linear-gradient(135deg, ${backgroundColor} 0%, ${primaryColor}08 50%, ${backgroundColor} 100%)`;
};
```

---

## 🎓 Implementation Notes for Developer

### Key Points to Remember:
1. **Read-Only Portal**: This portal ONLY displays and submits forms - no editing or customization
2. **Exact Visual Match**: Form rendering must match FormPreview component exactly
3. **Simple Data Flow**: 
   - GET form config from `/event-management/custom-forms/{templateId}`
   - POST submission to `/event-management`
4. **Data Transformation**: Convert form field values to `customFields` object with camelCase keys
5. **Date Handling**: Find date field, convert to ISO 8601 format for `eventDate`
6. **Basic Validation**: Client-side validation for required fields and format checking
7. **No Persistence**: One-time submission, no draft saving

### API Integration Details:
- **Base URL**: `https://prod.fotosfolio.com`
- **Get Form**: `GET /event-management/custom-forms/{templateId}`
- **Submit Form**: `POST /event-management` with eventName, eventDate, customFields
- **No Auth Required**: Public endpoints

### Component Reusability:
- Reference FormPreview.tsx from main project for exact styling
- Only implement 7 input types: text, email, phone, number, date, textarea, select
- NO need for: heading, image, divider, amount, or payment components
- All styling must match FormPreview exactly (colors, fonts, spacing)

### API Error Scenarios:
```typescript
// Handle different error cases
- 404: Form not found → "This form does not exist"
- 403: Form inactive → "This form is no longer available"
- 400: Invalid data → Show validation errors
- 429: Rate limited → "Too many requests, please try again later"
- 500: Server error → "Something went wrong, please try again"
- Network error → "Connection failed, check your internet"
```

### Data Transformation Example:
```typescript
// Input: User fills form
{ "field-1": "Jane", "field-5": "2024-12-31" }

// Output: API payload
{
  "eventName": "Wedding Booking",
  "eventDate": "2024-12-31T10:00:00Z",
  "customFields": {
    "brideName": "Jane",
    "weddingDate": "2024-12-31"
  }
}
```

---

## 📞 Support & Documentation

### For Developers:
- Reference the main FotosFolio codebase for styling consistency
- Use the type definitions from `src/types/form-builder.ts`
- Follow the exact component structure from FormPreview.tsx

### For Users:
- Provide clear error messages
- Include help text for complex fields
- Add "Powered by FotosFolio" branding in footer

---

## ✅ Acceptance Criteria

The form portal is complete when:
- [ ] Can fetch form config from `/event-management/custom-forms/{templateId}`
- [ ] Forms render identically to FormPreview in main app
- [ ] All 7 input types work correctly (text, email, phone, number, date, textarea, select)
- [ ] Dynamic theming applies correctly (colors, fonts, button styles)
- [ ] Form validation works (required fields, email format, phone format)
- [ ] Can submit to `/event-management` with correct payload structure
- [ ] Data transforms correctly (camelCase keys, ISO date format)
- [ ] Success page shows after successful submission
- [ ] Error pages work for 404, 403, 400, 500 scenarios
- [ ] Loading states display during API calls
- [ ] Mobile responsive design works perfectly
- [ ] Logo displays correctly in form header
- [ ] Form matches exact styling from FormPreview component

---

## 🎉 Success Metrics

- Form load time < 2 seconds
- Mobile responsiveness score > 95
- Form completion rate > 70%
- Error rate < 5%
- Accessibility score > 90

---

## 📌 Quick Reference

### URLs
- **Portal Domain**: `https://forms.fotosfolio.com`
- **Form URL Pattern**: `https://forms.fotosfolio.com/bookings/{templateId}`
- **API Base**: `https://prod.fotosfolio.com`

### API Endpoints
1. **GET Form**: `/event-management/custom-forms/{templateId}`
2. **POST Booking**: `/event-management`

### Form Elements Supported
✅ text, email, phone, number, date, textarea, select  
❌ heading, image, divider, amount, payment (not needed for submissions)

### Key Features
- 🔍 Fetch form configuration by templateId
- 🎨 Apply dynamic theming (colors, fonts, styles)
- 📝 Display form with logo, title, subtitle, description
- ✔️ Client-side validation
- 📤 Submit to event-management API
- 🔄 Transform data: fieldIds → camelCase keys
- ✅ Success page after submission
- ⚠️ Error handling for all scenarios

### Example Flow
```
User opens: forms.fotosfolio.com/bookings/abc123
      ↓
Portal GETs: /event-management/custom-forms/abc123
      ↓
Form renders with theme and fields
      ↓
User fills and submits
      ↓
Portal POSTs: /event-management
{
  eventName, 
  eventDate (ISO), 
  customFields (camelCase)
}
      ↓
Success → /success?bookingId=xyz
```

---

**Version:** 1.0  
**Last Updated:** December 11, 2025  
**Project:** FotosFolio Form Portal  
**Domain:** forms.fotosfolio.com  
**Purpose:** Display-only booking form portal (no customization)
