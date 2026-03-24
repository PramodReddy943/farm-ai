# FarmAI - Design System & Figma Specifications

This document outlines the complete design system for FarmAI, built for mobile-first agriculture.

## 🎨 Color Palette

### Primary Colors
```
Primary Green: #10b981
RGB: (16, 185, 129)
Used for: CTAs, success states, primary buttons, active nav

Dark Green: #059669
RGB: (5, 150, 105)
Used for: Hover states, active elements, darker accents

Light Green: #d1fae5
RGB: (209, 250, 229)
Used for: Button backgrounds, light backgrounds
```

### Secondary Colors
```
Amber/Harvest: #f59e0b
RGB: (245, 158, 11)
Used for: Warnings, alerts, secondary actions

Sky Blue: #3b82f6
RGB: (59, 130, 246)
Used for: Information, water/weather features, links

Red/Danger: #ef4444
RGB: (239, 68, 68)
Used for: Severe alerts, critical issues, delete actions
```

### Neutral Colors
```
White: #ffffff
Dark Gray: #111827
Medium Gray: #6b7280
Light Gray: #f9fafb
Text: #1f2937
Borders: #e5e7eb
```

## 📱 Typography System

### Font Family
- Primary: System UI (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`)
- Fallback: Sans-serif
- Reason: Optimized for mobile readability

### Font Sizes & Weights

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| **Display** | 32px | 700 (bold) | Page titles, hero sections |
| **H1** | 28px | 700 (bold) | Main headings |
| **H2** | 24px | 700 (bold) | Section headings |
| **H3** | 20px | 600 (semibold) | Subsection headings |
| **Body Large** | 18px | 400 (regular) | Main content body text |
| **Body** | 16px | 400 (regular) | Default body text |
| **Body Small** | 14px | 400 (regular) | Secondary text, descriptions |
| **Caption** | 12px | 400 (regular) | Labels, fine print |
| **Label** | 14px | 600 (semibold) | Form labels, badges |

### Line Heights
- Display/H1/H2: 1.2
- H3/Body Large: 1.4
- Body/Caption: 1.5
- Captions: 1.6

## 🖼️ Key UI Components

### Buttons

**Primary Button**
```
Height: 44px (touch target)
Padding: 12px 24px
Background: #10b981
Text: White, 16px, semibold
Border: None
Border-radius: 8px
Box-shadow: None
Hover: #059669
Active: #047857
States: Normal, Hover, Active, Disabled (opacity 0.5)
```

**Secondary Button**
```
Height: 44px
Padding: 12px 24px
Background: White
Border: 2px #10b981
Text: #10b981, 16px, semibold
Border-radius: 8px
Hover: Light green background
Active: Green text + green border
```

**Ghost Button**
```
Height: 44px
Padding: 12px 24px
Background: Transparent
Border: None
Text: #10b981 or #3b82f6
Hover: Light gray background
Active: Green background
```

### Input Fields

**Text Input**
```
Height: 44px
Padding: 12px 16px
Background: White
Border: 2px #e5e7eb
Border-radius: 8px
Font: 16px regular
Placeholder: #9ca3af, italic
Focus: Border #10b981 (2px)
Focus-within: Shadow 0 0 0 3px rgba(16,185,129,0.1)
```

**Textarea**
```
Min-height: 120px
Padding: 12px 16px
Border-radius: 8px
Font: 16px regular
Same border/focus as input
```

**Select Dropdown**
```
Height: 44px
Padding: 12px 16px
Border: 2px #e5e7eb
Border-radius: 8px
Font: 16px regular
Focus: Green border
Arrow: #6b7280
```

### Cards

**Standard Card**
```
Background: White
Border: 1px #e5e7eb
Border-radius: 12px
Padding: 16px
Box-shadow: 0 1px 3px rgba(0,0,0,0.1)
Hover-shadow: 0 4px 12px rgba(0,0,0,0.15)
Transition: 200ms ease
```

**Alert Card**
```
Padding: 16px
Border-radius: 8px
Border-left: 4px (colored)

Variants:
- Info: Blue border, light blue background
- Success: Green border, light green background
- Warning: Amber border, light yellow background
- Error: Red border, light red background
```

### Navigation

**Bottom Mobile Navigation**
```
Position: Fixed bottom
Height: 64px
Background: White
Border-top: 1px #e5e7eb
Display: 5 icons equally spaced
Icon size: 24px
Label size: 12px
Active color: #10b981
Inactive color: #6b7280
```

**Back Header**
```
Position: Sticky top
Height: 64px
Background: White
Border-bottom: 1px #e5e7eb
Content: Title + back button (left)
Padding: 16px
Font: Bold 20px
```

## 📐 Spacing System

Consistent spacing using 8px base unit:

```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 40px
```

### Common Spacing Usage
- Component padding: 16px (md)
- Card padding: 16px (md)
- Section gaps: 24px (lg)
- Page padding: 16px (md)
- Component gap: 8-12px (sm-sm)

## 🎬 Animations & Transitions

### Standard Transitions
```
Duration: 200ms-300ms
Easing: ease-in-out
Properties: color, background, border, opacity, transform
```

### Animations

**Fade In**
```
Duration: 300ms
Keyframes: 0% opacity: 0 → 100% opacity: 1
```

**Slide Up**
```
Duration: 300ms
Keyframes: 0% translateY(20px), opacity: 0 → 100% translateY(0), opacity: 1
```

**Spin (Loading)**
```
Duration: 1s
Repeat: infinite
Keyframes: 0% rotate(0deg) → 100% rotate(360deg)
```

**Bounce**
```
Duration: 0.6s
Keyframes: Pulse scale and opacity
```

## 📱 Responsive Breakpoints

Tailwind breakpoints:
```
Mobile (xs): 0px - 374px (start)
Mobile (sm): 375px - 639px (iPhone SE+)
Tablet (md): 640px - 1023px (iPad)
Desktop (lg): 1024px+ (Web)

Safe Area (iOS):
- Top: env(safe-area-inset-top)
- Bottom: env(safe-area-inset-bottom)
- Left: env(safe-area-inset-left)
- Right: env(safe-area-inset-right)
```

## ♿ Accessibility

### WCAG 2.1 AA Compliance

**Color Contrast**
- Normal text: 4.5:1 (white on green OK ✓)
- Large text: 3:1
- UI components: 3:1

**Touch Targets**
- Minimum: 44x44px (Apple/Google standard)
- All buttons: 44px height
- All inputs: 44px height
- Icon buttons: 44x44px

**Keyboard Navigation**
- Tab order: Left to right, top to bottom
- Focus visible: 3px border/outline
- Skip to main content: Available

**Semantic HTML**
- Use `<button>` for buttons
- Use `<a>` for navigation
- Use proper heading hierarchy (h1 → h2 → h3)
- Use `<label>` for form inputs
- Use `aria-label` for icon-only buttons

## 🎨 Figma Setup Instructions

### Create Figma File
1. Go to figma.com (free account)
2. Create new file: "FarmAI Design System"
3. Set: 1920x1080 (for components)

### Page Structure
```
FarmAI Design System/
├── 01 - Colors & Typography
├── 02 - Components Library
│   ├── Buttons
│   ├── Inputs
│   ├── Cards
│   ├── Navigation
│   └── Lists
├── 03 - Mobile Screens (375px)
│   ├── Home
│   ├── Disease Scanner
│   ├── Disease Results
│   ├── Weather
│   ├── Chatbot
│   └── Farm Profile
├── 04 - Tablet Screens (768px)
└── 05 - Desktop Screens (1024px)
```

### Component Structure

**Naming Convention**:
```
Component Name / State
Examples:
- Button / Primary
- Button / Primary / Hover
- Input / Text / Default
- Input / Text / Focused
- Input / Text / Error
- Card / Disease Scan
```

### Design Tokens for Developers

Export this in Figma Dev Mode:
```json
{
  "colors": {
    "primary": "#10b981",
    "primary-dark": "#059669",
    "secondary": "#f59e0b",
    "danger": "#ef4444"
  },
  "typography": {
    "display": {
      "font-size": "32px",
      "font-weight": "700"
    },
    "body": {
      "font-size": "16px",
      "font-weight": "400"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px"
  }
}
```

## 🎯 Key UI Screens Specifications

### 1. Home Dashboard (375px width)
```
Header:
- Hero section with green gradient
- Title + subtitle
- 3 icons showing features

Quick Actions:
- 3 buttons (Scan, Weather, Chat)
- Grid layout, 100% width
- Icons + labels

Weather Widget:
- Blue gradient card
- Current temp (big), condition
- 3 forecast days
- Humidity + wind info

Recent Scans:
- List of cards
- Disease name, crop, date, confidence badge
- Clickable for details

Crop Advisory:
- Yellow/amber card
- AI-generated advice
- Truncated (3 lines max)
```

### 2. Disease Scanner
```
Tab Selection:
- Upload Image button (with upload icon)
- Answer Questions button (with question icon)

Image Upload Flow:
- Camera/upload area (dashed border)
- Selected image preview
- Loading spinner during analysis
- Results card when done

Symptom Questionnaire:
- Multi-step form (3 steps)
- Progress bar
- Radio buttons for crop
- Checkboxes for symptoms
- Radio buttons for weather
- Next/Previous/Analyze buttons

Results Display:
- Disease name (large, bold)
- Confidence score (colored badge)
- Description section
- Symptoms list
- Medicine recommendations (cards)
- Prevention methods
```

### 3. Weather Page
```
Header:
- "Weather & Climate" title
- Location subtitle

7-Day Forecast:
- Card per day
- Day name, high/low temps
- Weather icon, condition text
- Humidity, rainfall details

Crop Alerts:
- Alert cards (colored by severity)
- Icon + message
- High: Red, Medium: Yellow
```

### 4. Chatbot Interface
```
Header:
- "Farm Assistant" title
- Subtitle text

Chat Area (scrollable):
- User messages: Right align, green bubble
- AI messages: Left align, gray bubble
- Typing indicator (3 dots animation)

Initial State:
- Grey suggested questions (first 4)
- Icon + text

Input Area:
- Text input field
- Send button (icon)
- Bottom safe area padding
```

### 5. Farm Profile
```
Tab Navigation:
- Profile tab (active: green underline)
- History tab

Profile Tab - View Mode:
- Farm name, size, location, crops
- Edit button (top right)
- Card for each field

Profile Tab - Edit Mode:
- Text inputs for each field
- Save button
- Color with green background

History Tab:
- List of past scans
- Card per scan
- Emoji for crop type
- Confidence badge
- Date at bottom
```

## 📏 Grid System

**Mobile (375px)**
- Columns: 1 (full width)
- Padding: 16px left/right
- Gap: 16px vertical

**Tablet (768px)**
- Columns: 2
- Max width: 2xl container (672px)
- Padding: 32px left/right
- Gap: 24px

**Desktop (1024px+)**
- Columns: 3
- Max width: 4xl container (896px)
- Padding: 40px sides
- Gap: 32px

## 🔖 Design Checklist

Before handing off to developers:

- [ ] All colors defined and exported
- [ ] Typography system complete with weights/sizes
- [ ] All components created with variants
- [ ] Responsive layouts for 3 breakpoints
- [ ] Dark mode variants prepared
- [ ] Accessibility annotations added
- [ ] Spacing grid documented
- [ ] Animation specifications included
- [ ] Design tokens exported
- [ ] Prototype interactions defined
- [ ] Mobile safe areas marked
- [ ] High-res exports (2x) included

## 🎬 Prototype Interactions

Set up in Figma:

1. **Button interactions**: Hover → scale 105%, shadow increase
2. **Input focus**: Border color change to green
3. **Navigation**: Click → slide smoothly
4. **Modal**: Appear with fade + slide up
5. **Cards**: Hover → shadow increase, slight scale up
6. **Loading**: Spinner rotation animation

## 📦 Export Settings

**Component Sizes**
- Icons: 24x24px, 32x32px
- Button icons: 20x20px
- Illustrations: 1x, 2x (retina)

**Image Formats**
- Icons: SVG (scalable)
- Illustrations: PNG 2x (for retina)
- Screenshots: PNG

---

**Design System v1.0**  
Status: Ready for Implementation ✅

Use this as reference guide while building in [tailwind.config.ts](./farm-ai-web/tailwind.config.ts) and component files.
