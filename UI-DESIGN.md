# Career Pilot — UI Design Reference

> Last updated: April 2026 — reflects full app redesign (auth + dashboard + settings + admin)

---

## Overall Layout Architecture

The app has two distinct layout modes:

### Auth Layout (Login / Register / Forgot Password / Landing)
```
┌─────────────────────────────────┬──────────────────────┐
│         Left Panel              │    Right Panel        │
│  (flex:1, dark indigo gradient) │  (520px, dark bg)     │
│                                 │  ┌────────────────┐   │
│  Logo · Badge · Headline        │  │  White Card     │   │
│  Feature Pills (2×2 grid)       │  │  (max 400px)    │   │
│  Student Illustration (SVG)     │  │  Form / CTA     │   │
│  Stats row (4 items)            │  └────────────────┘   │
│  Testimonial block              │                        │
└─────────────────────────────────┴──────────────────────┘
```
- `position: fixed; inset: 0; z-index: 50` — escapes parent containers
- Shared via `AuthLeftPanel` component

### App Layout (Dashboard / Settings / Admin)
```
┌──────────────┬──────────────────────────────────────────┐
│  Dark Sidebar│           Main Content                    │
│   (240px)    │        (background: #f8fafc)              │
│              │                                           │
│  Logo        │   Page content (cards, forms, grids)      │
│  User card   │                                           │
│  Nav links   │                                           │
│  Footer      │                                           │
│  Email       │                                           │
│  Sign out    │                                           │
└──────────────┴──────────────────────────────────────────┘
```
- Shared via `AppSidebar` component — used by Dashboard, Settings, Admin layouts
- No topbar — content begins directly below sidebar logo

---

## Font

```
font-family: 'Inter', system-ui, sans-serif
```
Loaded via Google Fonts: `weights 400, 500, 600, 700, 800`

---

## Colors

### Primary — Indigo
| Token | Hex | Usage |
|---|---|---|
| Indigo 300 | `#a5b4fc` | Stat numbers, sidebar labels |
| Indigo 400 | `#818cf8` | Badge dots, muted accents |
| Indigo 500 | `#6366f1` | Input focus, links, eyebrow text |
| Indigo 600 | `#4f46e5` | Button base, action primary |
| Indigo 700 | `#4338ca` | Button hover |
| Indigo 800 | `#3730a3` | Button active, dark decorative fills |

### Secondary — Violet
| Hex | Usage |
|---|---|
| `#8b5cf6` | Logo gradient end |
| `#7c3aed` | Button gradient end, accent fills |
| `#6d28d9` | Emoji bubble gradient end |

### Text
| Hex | Usage |
|---|---|
| `#0f172a` | Primary headings, dark body text |
| `#374151` | Option card text |
| `#64748b` | Secondary body text, topbar labels |
| `#94a3b8` | Muted labels, placeholders |
| `rgba(255,255,255,0.55)` | Sidebar nav links (rest) |
| `rgba(255,255,255,0.9)` | Sidebar nav links (hover) |
| `#a5b4fc` | Sidebar nav links (active) |

### Surfaces
| Area | Value |
|---|---|
| Auth left panel | `linear-gradient(150deg, #0f172a 0%, #1e1b4b 55%, #2d1b69 100%)` |
| Auth right panel | `linear-gradient(160deg, #1e1b4b 0%, #0f172a 100%)` |
| App sidebar | `linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)` |
| App main content | `#f8fafc` |
| White card | `#ffffff` |
| Card border | `#e2e8f0` |
| Light input bg | `#f8fafc` |
| Disabled input bg | `#e2e8f0` |

### Feedback
| Type | Text | Background | Border |
|---|---|---|---|
| Success | `#16a34a` | `#dcfce7` | `#86efac` |
| Warning | `#b45309` | `#fef3c7` | `#fcd34d` |
| Error | `#b91c1c` | `#fee2e2` | `#fca5a5` |
| Info | `#4f46e5` | `rgba(99,102,241,0.08)` | `#6366f1` |

---

## Gradients

| Name | Value | Used On |
|---|---|---|
| Primary button | `linear-gradient(135deg, #4f46e5, #7c3aed)` | All CTA buttons |
| Logo icon | `linear-gradient(135deg, #6366f1, #8b5cf6)` | Logo tile |
| Headline accent | `linear-gradient(90deg, #a5b4fc, #f0abfc)` | "Build your future." |
| Emoji bubble | `linear-gradient(135deg, #4f46e5, #6d28d9)` | Floating background bubbles |
| App sidebar | `linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)` | Left nav |
| User avatar | `linear-gradient(135deg, #4f46e5, #7c3aed)` | Sidebar user icon |

---

## Typography

| Role | Size | Weight | Color | Notes |
|---|---|---|---|---|
| Hero heading (auth) | 36px | 800 | `#ffffff` | `letter-spacing: -0.03em` |
| H1 (app pages) | clamp(1.75rem, 3.5vw, 2.5rem) | 800 | `#0f172a` | `letter-spacing: -0.02em` |
| H2 (section) | 1.375rem | 800 | `#0f172a` | — |
| H3 (card title) | inherit | 700 | `#0f172a` | — |
| Greeting line | 20–22px | 800 | `#6366f1` | Dynamic time-based |
| Body | 14–15px | 400 | `#64748b` | `line-height: 1.6` |
| Input label (auth) | 11px | 600 | `#94a3b8` → `#6366f1` | Uppercase, `letter-spacing: 0.06em` |
| Eyebrow (app) | 11px | 600 | `#6366f1` | Uppercase, `letter-spacing: 0.06em` |
| Stat number | 17–20px | 800 | `#a5b4fc` | Auth left panel |
| Badge / pill text | 11–12px | 600–700 | varies | `letter-spacing: 0.01em` |
| Button text | 14–15px | 700 | `#ffffff` | Uppercase, `letter-spacing: 0.05em` |
| Sidebar logo name | 14px | 800 | `#ffffff` | `letter-spacing: -0.01em` |
| Sidebar nav link | 13px | 500 / 600 | white translucent / `#a5b4fc` | 600 when active |
| Sidebar section label | 10px | 600 | `rgba(255,255,255,0.25)` | Uppercase, wide tracking |

---

## Components

### White Card (Auth Form Container)
```
background:    #ffffff
border-radius: 24px
padding:       40px 36px
max-width:     400px
box-shadow:    0 25px 60px rgba(0,0,0,0.4),
               0 0 0 1px rgba(255,255,255,0.05)
```

### App Content Card
```
background:    #ffffff
border:        1px solid #e2e8f0
border-radius: 12px
padding:       16px (--space-4 via CSS)
box-shadow:    0 1px 8px rgba(15,23,42,0.06)
align-content: start   ← prevents vertical gap in equal-height grid rows
```

### Dark Sidebar
```
width:         240px
background:    linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)
border-right:  1px solid rgba(99,102,241,0.15)
padding:       24px 16px
position:      sticky; height: 100vh
```

### Sidebar User Card
```
background:    rgba(99,102,241,0.1)
border:        1px solid rgba(99,102,241,0.2)
border-radius: 10px
padding:       12px
```

### Sidebar Nav Link (rest)
```
color:         rgba(255,255,255,0.55)
background:    transparent
border:        1px solid transparent
border-radius: 8px
padding:       10px 12px
font-size:     13px; font-weight: 500
```
Hover: `background: rgba(99,102,241,0.15)` · `color: rgba(255,255,255,0.9)`
Active: `background: rgba(99,102,241,0.22)` · `border-color: rgba(99,102,241,0.4)` · `color: #a5b4fc` · `font-weight: 600`

### Primary Button
```
background:    linear-gradient(135deg, #4f46e5, #7c3aed)
border-radius: 10px
padding:       15px
font-weight:   700; font-size: 15px
text-transform: uppercase; letter-spacing: 0.05em
box-shadow:    0 4px 20px rgba(79,70,229,0.4)
```
Hover: `linear-gradient(135deg, #4338ca, #6d28d9)` · shadow `0.45` opacity
Disabled: `background: #a5b4fc` · no shadow · `cursor: not-allowed`

### Outline Button
```
background:    transparent
border:        2px solid #4f46e5
color:         #4f46e5
border-radius: 10px; padding: 14px 24px; font-weight: 700
```

### Underline Input (Auth forms)
```
border:           none
border-bottom:    2px solid #e2e8f0  (rest)
                  2px solid #6366f1  (focus)
border-radius:    0
padding:          10px 0
font-size:        14px; color: #0f172a
background:       transparent
transition:       border-color 0.2s
```
Label: `#94a3b8` → `#6366f1` on focus/filled

### Box Input (App forms)
```
border:           1px solid #cbd5e1
border-radius:    10px
min-height:       48px; padding: 8px 16px
background:       #ffffff
transition:       border-color, box-shadow 120ms
focus outline:    2px solid #6366f1, offset 2px
```

### Auth Mode Tabs (Register page)
```
container:  background rgba(99,102,241,0.08), border rgba(99,102,241,0.15)
            border-radius 10px, padding 4px
active tab: linear-gradient(135deg, #4f46e5, #7c3aed), white text
            box-shadow 0 2px 8px rgba(79,70,229,0.35)
inactive:   transparent, color #6366f1
font:       12px, weight 700, letter-spacing 0.03em
```

### Light-mode Nav Tab (Settings/Admin topbar)
```
background:    #ffffff
border:        1px solid #e2e8f0
border-radius: 8px; padding: 9px 16px
color:         #64748b; font-size: 13px
```
Hover: `border-color: #c7d2fe` · `color: #4f46e5`
Active: `background: rgba(99,102,241,0.08)` · `border-color: #6366f1` · `color: #4f46e5` · `font-weight: 600`

### Badge / Pill
```
padding:       4px 10px
border-radius: 999px
font-size:     12px; font-weight: 600–700
```
| Variant | Background | Border | Text |
|---|---|---|---|
| Default | `#f8fafc` | `#e2e8f0` | `#64748b` |
| Success (Fit) | `#dcfce7` | `#86efac` | `#16a34a` — prefix `✓` |
| Warning | `#fef3c7` | `#fcd34d` | `#b45309` — prefix `!` |
| Danger | `#fee2e2` | `#fca5a5` | `#b91c1c` — prefix `✕` |
| Indigo (Demand) | `rgba(99,102,241,0.1)` | `rgba(99,102,241,0.2)` | `#6366f1` |

### Readiness Score Badge (traffic-light)
| Score | Color | Label |
|---|---|---|
| ≥ 80% | 🟢 Success (green) | "Strong Readiness" |
| 65–79% | 🟡 Warning (amber) | mid-range |
| < 65% | 🔴 Danger (red) | "Not Ready Yet" / "Below Par" |

### Emoji Bubble (Auth left panel background)
```
background:    linear-gradient(135deg, #4f46e5, #6d28d9)
border:        1px solid rgba(165,180,252,0.35)
border-radius: 11px
box-shadow:    0 4px 12px rgba(79,70,229,0.35)
size:          28–40px
animation:     floatBubble 4s ease-in-out infinite
               (translateY 0 → -9px → 0, rotate 0 → 2deg → 0)
```

### Feature Pill (Auth left panel)
```
background:    rgba(255,255,255,0.05)
border:        1px solid rgba(255,255,255,0.08)
border-radius: 10px; padding: 9px 12px
color:         rgba(255,255,255,0.7); font-size: 11px; font-weight: 600
layout:        2×2 CSS grid
```

### Testimonial Block (Auth left panel)
```
background:    rgba(99,102,241,0.1)
border:        1px solid rgba(99,102,241,0.2)
border-radius: 12px; padding: 12px 14px
font-style:    italic; color: rgba(255,255,255,0.65); font-size: 11px
```

### Question Option Card (Profile Studio)
```
display:       flex; align-items: center; gap: 14px
padding:       14px 16px
border-radius: 12px
border:        2px solid #e2e8f0  (rest)
               2px solid #6366f1  (selected via :has(input:checked))
background:    #ffffff → rgba(99,102,241,0.06) when selected
box-shadow:    0 2px 12px rgba(99,102,241,0.15) when selected
cursor:        pointer
```
Custom radio: 20×20px circle, `border: 2px solid #cbd5e1` rest → filled `#6366f1` with `box-shadow: inset 0 0 0 4px #ffffff` when checked

### Toast Notification (NoticeBanner)
```
position:      fixed; top: 20px; left: 50%; transform: translateX(-50%)
background:    #ffffff
border-radius: 14px
box-shadow:    0 8px 32px rgba(15,23,42,0.14), 0 0 0 1px rgba(15,23,42,0.06)
width:         300–420px
animation:     slideInToast 0.25s ease (translateY -16px → 0)
```
- Left stripe: 4px colored bar per tone (green/amber/red/indigo)
- Icon badge: 32px circle with tinted background
- Two-line text: bold label + muted `#64748b` message
- Dismiss: `#f1f5f9` pill button, `#94a3b8` ✕

---

## Spacing Reference

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Icon gaps, tiny padding |
| `--space-2` | 8px | Small gaps |
| `--space-3` | 16px | Card internal gap |
| `--space-4` | 24px | Card padding, section gap |
| `--space-5` | 32px | Large section gap |
| `--space-6` | 48px | Page-level padding |

---

## Border Radius Reference

| Element | Radius |
|---|---|
| White auth card | 24px |
| App content card | 12px |
| Primary button | 10px |
| Auth tabs container | 10px |
| Auth tab button (active) | 8px |
| Sidebar user card | 10px |
| Logo icon | 10–14px |
| Input (box style) | 10px |
| Badge / pill | 999px |
| Toast notification | 14px |
| Testimonial block | 12px |
| Option card | 12px |
| Custom radio | 50% |

---

## Animations

```css
/* Auth left panel floating bubbles */
@keyframes floatBubble {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-9px) rotate(2deg); }
}
/* Each bubble: animation-delay 0s–1.4s, staggered */

/* Toast slide-in */
@keyframes slideInToast {
  from { opacity: 0; transform: translateX(-50%) translateY(-16px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* Skeleton loading wave */
@keyframes skeleton-wave {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## Page-by-page Summary

| Page | Layout | Key UI elements |
|---|---|---|
| `/` Landing | AuthLeftPanel + white card | Sign In + Create Account buttons, trust badges |
| `/login` | AuthLayout | Underline inputs, eye icon, remember me, dynamic greeting |
| `/register` | AuthLayout | AuthModeTabs (3 modes), underline inputs, eye icon |
| `/forgot-password` | AuthLayout | Single email input, send link button |
| `/dashboard` | AppSidebar + content | Hero card, stat cards, RecommendationGrid, ProofHistoryList |
| `/dashboard/careers` | AppSidebar + content | CareerLibrary with search + category filter, career cards grid |
| `/dashboard/careers/:id` | AppSidebar + content | CareerDetail: header card, 3-col info grid, salary progress, CTA |
| `/dashboard/profile` | AppSidebar + content | Profile form, AI question set with option cards |
| `/dashboard/proof` | AppSidebar + content | Proof session flow |
| `/settings/*` | AppSidebar + content | Profile/Security forms with box inputs |
| `/admin/*` | AppSidebar + content | Student roster, career management tables |
