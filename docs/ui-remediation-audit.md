# UI Remediation Audit

This audit covers the active React application only. Legacy prototype styles under `styles.css` and `src/client/` are no longer used by the live React entrypoint.

## 1. Grid & Spacing

### Fix
- Category: `Grid & spacing`
- Element / selector: `.app-frame`
- Before → After: `padding 24px 18px 48px -> 24px 24px 48px`, `gap 20px -> 24px`
- Standard / rule violated: `ISO 9241-110 consistency` and the project 8pt grid rule
- Fixed code snippet:

```css
.app-frame {
  inline-size: clamp(20rem, 94vw, 90rem);
  margin-inline: auto;
  padding: var(--space-4) var(--space-3) var(--space-6);
  display: grid;
  gap: var(--space-4);
}
```

### Fix
- Category: `Grid & spacing`
- Element / selector: `.sidebar`
- Before → After: `top 20px -> 24px`, `gap 18px -> 16px`, `padding 22px -> 24px`
- Standard / rule violated: `Nielsen heuristic: consistency and standards`; non-grid values created uneven chrome spacing
- Fixed code snippet:

```css
.sidebar {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-panel);
}

@media (min-width: 1024px) {
  .sidebar {
    position: sticky;
    inset-block-start: var(--space-4);
  }
}
```

### Fix
- Category: `Grid & spacing`
- Element / selector: `.select-card`, `.question-block`, `.status-callout`
- Before → After: `padding 18px/18px/14px 16px -> 24px/24px/16px 16px`, `gap 14px/12px -> 16px`
- Standard / rule violated: 8pt base-grid rule; prior 14px and 18px values were off-grid
- Fixed code snippet:

```css
.select-card,
.question-block,
.status-callout,
.empty-state {
  border-radius: var(--radius-card);
  padding: var(--space-4);
}

.select-card {
  display: grid;
  gap: var(--space-3);
}
```

## 2. Typography Hierarchy

### Fix
- Category: `Typography hierarchy`
- Element / selector: `h1`
- Before → After: `font-size clamp(2.1rem, 4vw, 3.5rem) -> clamp(2rem, 4vw, 3rem)`, `line-height 1.04 -> 1.25`
- Standard / rule violated: `WCAG 1.4.8 Visual Presentation` and the requested 4-level type scale
- Fixed code snippet:

```css
h1 {
  font-size: var(--font-size-h1);
}

h1,
h2 {
  line-height: var(--line-height-heading);
  font-weight: var(--font-weight-semibold);
}
```

### Fix
- Category: `Typography hierarchy`
- Element / selector: `.eyebrow`, `dt`, `.field__helper`, `.notice__title`
- Before → After: `0.72rem -> 0.875rem`, `line-height implicit -> 1.4`
- Standard / rule violated: dense caption text fell below the defined caption scale
- Fixed code snippet:

```css
dt,
.eyebrow,
.field__helper,
.notice__title {
  font-size: var(--font-size-caption);
  line-height: var(--line-height-caption);
}
```

### Fix
- Category: `Typography hierarchy`
- Element / selector: `p`, `li`, `dd`
- Before → After: `no explicit measure cap -> max-inline-size 72ch`, `weight mixed -> 400`
- Standard / rule violated: `WCAG 1.4.8 Visual Presentation`; long lines reduced readability
- Fixed code snippet:

```css
p,
li,
dd,
.support-copy {
  max-inline-size: 72ch;
  font-size: var(--font-size-body);
  line-height: var(--line-height-body);
  color: var(--color-text-secondary);
}
```

## 3. Colour & Contrast

### Fix
- Category: `Colour & contrast`
- Element / selector: `src/styles/tokens.css`
- Before → After: raw presentation tokens such as `--accent`, `--cyan`, and direct component-level hex/rgba usage -> semantic tokens such as `--color-action-primary`, `--color-feedback-error`, `--color-border-subtle`
- Standard / rule violated: `WCAG 2.2 1.4.3 Contrast (Minimum)` and `1.4.11 Non-text Contrast`; semantic tokenization was missing
- Fixed code snippet:

```css
:root {
  --color-text-primary: #1e2430;
  --color-text-secondary: #4f5867;
  --color-border-subtle: #8a8175;
  --color-action-primary: #9a4b22;
  --color-feedback-error: #8a2f2f;
  --color-feedback-info: #165c68;
}
```

### Fix
- Category: `Colour & contrast`
- Element / selector: `.notice`, `.status-callout`, `.pill--success/.pill--warning/.pill--danger`
- Before → After: colour-only tone differentiation -> tone surface + border + icon + text label
- Standard / rule violated: `WCAG 1.4.1 Use of Color`
- Fixed code snippet:

```css
.pill--success::before {
  content: "✓";
}

.status-callout--danger::before {
  content: "!";
}

.notice--info {
  background: var(--color-feedback-info-surface);
  border-color: var(--color-feedback-info);
  color: var(--color-feedback-info);
}
```

## 4. Interactive States

### Fix
- Category: `Interactive states`
- Element / selector: `.button`, `.nav-link`, `.tab-button`, `.input`, `.textarea`, `.select-card`
- Before → After: inconsistent state coverage -> default, hover, focus-visible, active, disabled, and error-ready states
- Standard / rule violated: `Apple HIG touch targets`, `Material 3 state model`, `WCAG 2.4.7 Focus Visible`
- Fixed code snippet:

```css
.button,
.text-link,
.nav-link,
.tab-button {
  min-block-size: 48px;
}

.input:focus-visible,
.textarea:focus-visible,
.button:focus-visible,
.nav-link:focus-visible,
.tab-button:focus-visible,
.select-card:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  box-shadow: var(--shadow-focus);
}
```

### Fix
- Category: `Interactive states`
- Element / selector: `.button--primary`, `.button--secondary`, `.button--ghost`
- Before → After: hover-only treatment -> explicit hover and active states with disabled fallback
- Standard / rule violated: `Nielsen heuristic: visibility of system status`
- Fixed code snippet:

```css
.button--primary:hover {
  background: var(--color-action-primary-hover);
}

.button--primary:active {
  background: var(--color-action-primary-active);
}

.button:disabled {
  background: var(--color-surface-disabled);
  color: var(--color-text-secondary);
}
```

## 5. Form Alignment

### Fix
- Category: `Form alignment`
- Element / selector: `Field` component
- Before → After: helper text detached from controls -> helper text linked with `aria-describedby`, iconized messages, inline error state support
- Standard / rule violated: `WCAG 3.3.1 Error Identification`, `WAI-ARIA 1.2 form relationships`
- Fixed code snippet:

```tsx
const helperId = helperText ? `${htmlFor}-helper` : undefined;
const childElement = isValidElement<DescribedElementProps>(onlyChild) ? onlyChild : null;

const describedChild =
  helperId && childElement
    ? cloneElement(childElement, {
        "aria-describedby": [childElement.props["aria-describedby"], helperId].filter(Boolean).join(" "),
        "aria-invalid": helperTone === "error" ? true : undefined
      })
    : children;
```

### Fix
- Category: `Form alignment`
- Element / selector: `.input`, `.textarea`
- Before → After: `padding 13px 15px -> 8px 16px`, `border-radius 16px retained`, `min-height implicit -> 48px`
- Standard / rule violated: HIG and Material touch-target minimums
- Fixed code snippet:

```css
.input,
.textarea {
  min-block-size: 48px;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-control);
  border: 1px solid var(--color-border-strong);
}
```

## 6. Accessibility

### Fix
- Category: `Accessibility`
- Element / selector: `AuthModeTabs`
- Before → After: `role="tablist"/role="tab"` without full tabpanel semantics -> grouped toggle buttons with `aria-pressed`
- Standard / rule violated: `WAI-ARIA 1.2`; incomplete tab semantics are worse than no tab semantics
- Fixed code snippet:

```tsx
<div className="tab-list" role="group" aria-label="Registration mode">
  <button
    type="button"
    aria-pressed={item === mode}
    className={cn("tab-button", item === mode && "tab-button--active")}
  >
    {modeLabels[item]}
  </button>
</div>
```

### Fix
- Category: `Accessibility`
- Element / selector: `NoticeBanner`
- Before → After: single-line status message -> icon + titled message block with `role="alert"` for danger and `aria-live` for all notices
- Standard / rule violated: `WCAG 4.1.3 Status Messages`
- Fixed code snippet:

```tsx
<div
  aria-live={notice.tone === "danger" ? "assertive" : "polite"}
  className={`notice ${toneClassName}`}
  role={notice.tone === "danger" ? "alert" : "status"}
>
  <div className="notice__body">...</div>
</div>
```

### Fix
- Category: `Accessibility`
- Element / selector: `CareerExplorer` card picker
- Before → After: selection state visual only -> `aria-pressed` added to career buttons
- Standard / rule violated: `WCAG 4.1.2 Name, Role, Value`
- Fixed code snippet:

```tsx
<button
  type="button"
  aria-pressed={selectedCareer?.id === career.id}
  className={`select-card ${selectedCareer?.id === career.id ? "select-card--active" : ""}`}
>
```

## 7. Responsive Integrity

### Fix
- Category: `Responsive integrity`
- Element / selector: layout media queries
- Before → After: `max-width 1180/920/720` breakpoints -> `min-width 480/768/1024/1280/1440` mobile-first cascade
- Standard / rule violated: requested responsive breakpoint contract
- Fixed code snippet:

```css
@media (min-width: 768px) {
  .form-row,
  .grid--cards,
  .credential-list,
  .skeleton-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .shell--app {
    grid-template-columns: minmax(16rem, 18rem) minmax(0, 1fr);
  }
}
```

### Fix
- Category: `Responsive integrity`
- Element / selector: `.app-frame`
- Before → After: `max-width 1360px -> inline-size clamp(20rem, 94vw, 90rem)`
- Standard / rule violated: fixed-width container constraint
- Fixed code snippet:

```css
.app-frame {
  inline-size: clamp(20rem, 94vw, 90rem);
  margin-inline: auto;
}
```

## 8. Visual Consistency

### Fix
- Category: `Visual consistency`
- Element / selector: radius system
- Before → After: mixed `18px/22px/24px/28px/999px` -> `16px controls/cards`, `24px panels`, `999px chips`
- Standard / rule violated: inconsistent component shape language
- Fixed code snippet:

```css
:root {
  --radius-control: 16px;
  --radius-card: 16px;
  --radius-panel: 24px;
  --radius-chip: 999px;
}
```

### Fix
- Category: `Visual consistency`
- Element / selector: iconography and status affordances
- Before → After: unsized or implicit icon treatment -> `16px inline icons`, `20px status indicators`
- Standard / rule violated: `Apple HIG icon clarity` and internal consistency
- Fixed code snippet:

```css
.field__helper-icon,
.status-icon {
  inline-size: 16px;
  block-size: 16px;
}

.status-callout::before {
  inline-size: 20px;
  block-size: 20px;
}
```

### Fix
- Category: `Visual consistency`
- Element / selector: z-index map
- Before → After: ad hoc `z-index 30` -> semantic map `base 0 / card 10 / dropdown 100 / modal 200 / toast 300`
- Standard / rule violated: stacking context inconsistency
- Fixed code snippet:

```css
:root {
  --z-base: 0;
  --z-card: 10;
  --z-dropdown: 100;
  --z-modal: 200;
  --z-toast: 300;
}
```

## Consolidated Deployable Files

- CSS: [src/styles/tokens.css](/Users/irshad/Desktop/careerPilot/src/styles/tokens.css:1), [src/styles/global.css](/Users/irshad/Desktop/careerPilot/src/styles/global.css:1)
- Shared components: [src/shared/components/Field.tsx](/Users/irshad/Desktop/careerPilot/src/shared/components/Field.tsx:1), [src/shared/components/NoticeBanner.tsx](/Users/irshad/Desktop/careerPilot/src/shared/components/NoticeBanner.tsx:1)
- UI semantics: [src/features/auth/components/AuthModeTabs.tsx](/Users/irshad/Desktop/careerPilot/src/features/auth/components/AuthModeTabs.tsx:1), [src/features/dashboard/components/CareerExplorer.tsx](/Users/irshad/Desktop/careerPilot/src/features/dashboard/components/CareerExplorer.tsx:1), [src/features/dashboard/components/ProofHistoryList.tsx](/Users/irshad/Desktop/careerPilot/src/features/dashboard/components/ProofHistoryList.tsx:1), [src/features/dashboard/components/RecommendationGrid.tsx](/Users/irshad/Desktop/careerPilot/src/features/dashboard/components/RecommendationGrid.tsx:1)
