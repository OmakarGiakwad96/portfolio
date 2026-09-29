# Omkar Sanjay Gaikwad — Portfolio

Next.js (App Router) + Tailwind CSS + Framer Motion. Frontend and backend live in
one app: the pages are React components and the contact form is handled by a
Next.js API route (`src/app/api/contact/route.js`).

## Run

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run preview   # build + serve the production build
```

## Edit content

Everything you'd want to change lives in `src/data/`:

| File | Contents |
| --- | --- |
| `profile.js` | name, tagline, about story, email, GitHub/LinkedIn, site URL |
| `skills.js` | skill categories + marquee words |
| `experience.js` | work history |
| `projects.js` | PhotoHub + "coming soon" slots |
| `journey.js` | developer-journey timeline |
| `education.js`, `achievements.js`, `navigation.js` | the rest |

Search for `TODO: replace` to find every placeholder.

## Resume

Put your PDF at `public/resume/Omkar-Sanjay-Gaikwad-Resume.pdf`.

## Contact form email (optional)

Copy `.env.example` to `.env.local` and fill in SMTP details (for Gmail, use an
App Password). Without them the form still works: it opens the visitor's email
app with the message pre-filled.

## Structure

```
src/
  app/            layout, page, API route, favicon, OG image
  components/     Button, Card, Reveal, SectionHeading, Navbar, CustomCursor, diagrams…
  sections/       Hero, About, Skills, Experience, Projects, Education, Achievements, Resume, Contact
  data/           all editable content
  lib/            validation (shared by client + server), cn helper
public/resume/    drop the resume PDF here
```
