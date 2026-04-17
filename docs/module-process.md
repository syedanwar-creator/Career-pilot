# Career Reality Platform: Module-by-Module Process

## 1. Server Entry
- `server.js`
  - Starts the Node server
  - Handles static file delivery
  - Exposes the full API surface for auth, tenants, profiles, careers, proof sessions, and school reporting

## 2. Server Infrastructure
- `src/server/http.js`
  - Request parsing
  - JSON response helpers
  - Static asset serving
- `src/server/db.js`
  - File-based persistence in `data/app-db.json`
  - Record creation
  - User/profile/proof lookup helpers
- `src/server/auth.js`
  - Password hashing with `scrypt`
  - Signed cookie sessions
  - Login/logout cookie helpers
- `src/server/gemini.js`
  - Gemini API client wrapper
  - Structured JSON generation support

## 3. AI Assessment Layer
- `src/server/assessment.js`
  - Generates random AI profile interview questions
  - Analyzes student character and personality
  - Generates 8 career-proof questions for each career
  - Evaluates proof sessions into points, parent summary, and school summary
  - Includes fallback logic when `GEMINI_API_KEY` is not configured

## 4. Career Intelligence Layer
- `src/server/careers.js`
  - Seeds `165` careers
  - Expands each career into deep detail:
    - How to become one
    - Challenges
    - Positives
    - Negatives
    - Salary progression
    - Crisis / world-war-level resilience
- `src/server/recommendations.js`
  - Matches careers to student personality scores and interest signals
  - Produces ranked recommendations with reasoning

## 5. Client API Layer
- `src/client/services/api.js`
  - Wraps every backend endpoint for the frontend
- `src/client/utils/format.js`
  - Formatting utilities for display-safe UI rendering

## 6. Client View Layer
- `src/client/views/guestView.js`
  - Login
  - Individual registration
  - School registration
  - School-student join flow
- `src/client/views/studentView.js`
  - Student dashboard
  - AI profile studio
  - Career explorer
  - Proof center
- `src/client/views/schoolView.js`
  - School overview
  - Student management
  - School-side student report visibility
- `src/client/components/shared.js`
  - Shared career cards
  - Career detail panel
  - Proof summary blocks

## 7. Frontend Orchestration
- `src/main.js`
  - Loads session state
  - Chooses guest, student, or school workspace
  - Handles form submits, proof sessions, student creation, and career selection
- `index.html`
  - Single SPA root
- `styles.css`
  - Production-style visual shell for all flows

## End-to-End Runtime Flow
1. User registers either as an individual, school admin, or school-linked student.
2. Auth session is persisted in a signed cookie.
3. A student opens the AI profile studio and generates randomized interview questions.
4. The profile is analyzed into character summary, personality scores, and interest signals.
5. The dashboard recommends careers based on that analysis.
6. The student explores one of 165 careers in full detail.
7. The student launches an 8-question readiness proof session for a chosen career.
8. The server scores the answers into points and produces parent + school summaries.
9. School admins can view students, recommendations, and proof evidence inside the tenant workspace.
