# AI Resume Insights

AI Resume Insights is an AI-driven resume feedback system built with **LangChain**, **LangGraph**, and the **Gemini API**, using a **Django** backend (Django REST Framework + SimpleJWT) and a **Next.js 15 / TypeScript** frontend. The system helps job seekers enhance their resumes by evaluating them across **25+ key metrics**, generating actionable suggestions, and providing tools like cover letter generation and job matching.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **UI Libraries** | Material UI, Headless UI, Radix UI, Lucide React |
| **Backend** | Django 5, Django REST Framework, SimpleJWT |
| **AI / LLM** | LangChain, LangGraph, Google Gemini Flash Lite |
| **Auth** | Google OAuth 2.0 (NextAuth.js) + Email/Password (DRF) |
| **Database** | SQLite (dev) / PostgreSQL (prod) |
| **PDF Handling** | pdf.js (pdfjs-dist) via a Next.js proxy route |

---

## Features

### Resume Analysis

The resume is evaluated across **five key categories**, each broken down into specific sub-metrics scored on a scale of 1–10:

#### Impact
- Quantify Impact
- Repetition
- Weak Verbs
- Responsibilities
- Verb Tenses
- Spelling & Consistency

#### Brevity
- Length & Depth
- Use of Bullets
- Bullet Lengths
- Filler Words
- Page Density

#### Style
- Buzzwords
- Dates
- Contact & Personal Details
- Readability
- Personal Pronouns
- Active Voice
- Consistency

#### Sections
- Overall Sections
- Education
- Unnecessary Sections
- Skills

#### Soft Skills
- Communication
- Leadership
- Analytical
- Teamwork
- Drive

Each category receives a score out of 10, and the system produces an aggregated **overall ATS score** along with a **Final Verdict** paragraph.

---

### Tools

| Tool | Description |
|------|-------------|
| **Job Matches** | AI-powered job recommendations based on resume content and current market trends |
| **Cover Letter Generator** | Generates a personalized, context-aware cover letter from your resume data |
| **Line Analysis** | Granular diagnostic evaluation of each line of your resume |

---

### Skills Analysis

| Section | Sub-pages |
|---------|-----------|
| **Hard Skills** | Displays all technical skills extracted from the resume |
| **Soft Skills** | Communication · Leadership · Analytical · Teamwork · Drive |

---

### Resume History (`/my-resumes`)

- View all previously submitted resumes
- Delete individual resumes
- Graphical visualization of score trends over time (ApexCharts)
- Download previous resume PDFs

---

### User Profiles & Authentication

- **Google OAuth 2.0** — one-click sign-in via NextAuth.js
- **Email / Password** — standard login and registration
- **Forgot Password** — password reset flow
- **Profile Management** — update name and avatar
- Tokens: Access (60 min) + Refresh (7 days) via SimpleJWT (HS512)

---

### Resources Page

- Resume templates gallery
- Curated bullet point suggestions for common roles
- Action verb library
- Recruiter insights & FAQ cards

---

## LangGraph AI Architecture

The backend uses a **Directed Acyclic Graph (DAG)** of AI agents orchestrated by LangGraph:

1. **Worker Subagents** — evaluate all sub-metrics for a category (e.g. Impact, Brevity) in a single bundled LLM call to avoid rate limits
2. **Manager Agents** — synthesize category-level results into a summary and category score
3. **Superagent** — reads all manager outputs to produce the final ATS score and verdict
4. **Execution** — completes in exactly **12 API requests** per analysis (~15 seconds), down from 30+ sequential calls

Additional LangGraph agents handle **cover letter generation** and **job matching** using the same parsed resume state.

---

## Project Structure

```
AI-Resume_checker/
├── backend/
│   └── backend/
│       ├── ats/              # Resume model, analysis API, views
│       ├── useraccount/      # Custom user model, Google OAuth view
│       ├── backend/          # Django settings, URLs, WSGI
│       ├── requirements.txt
│       └── manage.py
└── frontend/
    └── src/
        ├── app/
        │   ├── (auth)/       # Login, Signup, Reset Password pages
        │   ├── (default)/    # Landing page
        │   ├── resume-upload/
        │   ├── resume-analysis/
        │   ├── factors/      # Impact · Brevity · Style · Sections
        │   ├── skills/       # Hard Skills · Soft Skills (+ sub-pages)
        │   ├── tools/        # Job Matches · Cover Letter · Line Analysis
        │   ├── my-resumes/
        │   ├── profile/
        │   ├── resources/
        │   └── api/          # NextAuth route, PDF proxy
        └── components/       # Dashboard, Sidebar, PDFCanvas, Charts, etc.
```

---

## Running the Project

Both servers must run simultaneously.

### 1. Backend (Django)

```powershell
cd backend\backend

# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Start server
python manage.py runserver
```

Backend runs at **`http://localhost:8000`**

### 2. Frontend (Next.js)

```powershell
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at **`http://localhost:3000`**

---

## Environment Variables

### Backend — `backend/backend/.env`

```env
DEBUG=1
SECRET_KEY=your_secret_key
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]

# Gemini API
GOOGLE_API_KEY=your_gemini_api_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/callback/google
```

> Copy from `backend/backend/.env.example`

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_HOST=http://localhost:8000
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=any_random_string
NEXTAUTH_URL=http://localhost:3000
```

> Copy from `frontend/.env.local.example`

---

## API Endpoints

### Auth (`/api/auth/`)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login/` | Email/password login |
| POST | `/api/auth/register/` | New user registration |
| POST | `/api/auth/token/refresh/` | Refresh access token |
| POST | `/api/auth/google/` | Google OAuth token exchange |
| GET | `/api/auth/<uuid>/` | Get user profile |

### ATS (`/api/ats/`)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/ats/upload-resume/` | Upload resume PDF |
| GET | `/api/ats/<uuid>/` | Get resume analysis |
| GET | `/api/ats/<uuid>/is-exist/` | Check if analysis exists |
| POST | `/api/ats/cover-letter-gen/` | Generate cover letter |
| POST | `/api/ats/job-matches/` | Get job match recommendations |
| GET | `/api/ats/my-resumes/` | List all user resumes |
| DELETE | `/api/ats/resumes/<uuid>/` | Delete a resume |

---

## Known Issues & Fixes Applied

- **Google OAuth intermittent failure** — fixed by adding `clock_skew_in_seconds=10` to `verify_oauth2_token` in `useraccount/views.py`
- **Google Workspace login failure** — fixed by safely resolving `user.avatar.url` in a `try/except` block (Workspace accounts may have no profile picture, causing a `ValueError`)
