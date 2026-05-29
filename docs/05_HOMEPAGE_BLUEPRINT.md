# 05 — Homepage Blueprint

## Purpose

Define the intended **home page** (`/`) message flow, sections, CTAs, proof logic, and CMS boundaries for the Parth AI Software Systems microsite.

---

## Homepage goal

After landing, the visitor should:

1. Understand that this is **Think Big’s AI software systems vertical**, led by **Parth Ghumatkar**.
2. Believe credibility comes from **visible proof** (GitHub, demos, documents)—not hype.
3. Know what gets built (six capability categories).
4. Take a clear next step: **Discuss a Software Use Case**.

---

## Core homepage message

**AI software systems built around real business workflows—with software-first delivery, AI where it improves the work, and proof before claims.**

---

## Visitor understanding (3–5 seconds)

| Question | Answer on page |
|----------|----------------|
| Who is this for? | Founders, operators, businesses needing custom software / automation / data systems |
| What is offered? | Software systems: internal tools, AI-assisted apps, automation, data platforms, SaaS-style tools, media pipelines |
| Why credible? | Self-built track record, proof signals, founder layer, future CMS project/proof cards |
| What next? | Discuss a Software Use Case |

---

## Approved section structure

### 1. Header

- Brand: Think Big AI Systems / by Think Big Digital Solutions
- Nav (scoped MVP): Proof, Systems, Process, Founder, Contact — expand when routes exist
- Primary CTA: Discuss a Software Use Case

### 2. Hero

**Copy (source of truth — live HTML)**

- H1: AI Software Systems Built Around Business Workflows
- Body: software, automation, AI-assisted tools, data platforms, internal systems, workflow applications — visible project proof and technical ownership
- Think Big vertical paragraph
- Parth founder paragraph (school-age electronics → current software/automation/AI — factual, not prodigy headline)

**CTAs**

- Primary: Discuss a Software Use Case
- Secondary: View Current Projects (anchor until Projects page)

**Visual:** Workflow diagram (SVG/CSS)

---

### 3. Proof Before Claims

**Eyebrow:** Proof Before Claims  
**Title:** This site is built around visible work, not abstract AI claims.

**Body:** Journey from age 11 through electronics, IoT, Python, GitHub, YouTube, current software systems. Self-built credibility paragraph.

**Proof signals (static list)**

- 10+ years self-led technical building exposure
- GitHub repositories and project history
- YouTube demos from early hardware and automation projects
- 2018 Nelkinda Tech Kids Meetup presentation
- Global Day of Coderetreat 2018 recognition
- Current full-project ownership across selected software builds

**CTA:** Review Proof Library

---

### 4. What We Build

**Title:** We build software systems where AI, automation, data, and workflow logic support business work.

**Six cards (static)**

1. Internal Tools  
2. AI-Assisted Workflow Applications  
3. Automation Systems  
4. Data and Reporting Platforms  
5. SaaS-Style Tools  
6. Content and Media Automation  

(Use approved descriptions from project brief / implementation prompt.)

---

### 5. Featured Project Evidence

**CMS-driven — Phase 3+**

**Intro (when section visible):**  
The current portfolio shows how the work has moved from early experiments into software systems. Featured projects appear from the project CMS, with links to GitHub, demos, screenshots, videos, or project notes where available.

**Display rules**

- 3 featured projects default; optional second row if more featured
- Manual `displayOrder` from CMS
- Each card links to project detail page

**Phase 1–2 behavior:** Section **not rendered** — empty `featuredProjects` array.

**CTA when live:** Explore All Projects

**Do not:** Hard-code Noctis, Nonprofit Platform, TradePre, or other mock-only names.

---

### 6. Technical Founder Layer

**Title:** This vertical is built around a technical founder profile with visible proof.

**Narrative:** Electronics origin, football setback → YouTube/robotics/Arduino/C++/IoT/drones/Python/Raspberry/sensors/automation/public demos → software systems and business-facing applications.

**Emphasis:** He kept building (not “prodigy” positioning).

**Credibility bullets (static)**

- Self-built credibility  
- Project-led learning  
- GitHub and YouTube proof  
- Public presentation and recognition  
- Current full-project ownership  
- Review and delivery structure through Think Big  

**CTA:** Read About Parth

---

### 7. How the Work Happens

**Intro:** Starts with business problem, workflow, or rough idea → system thinking, build, test, improve.

**Steps (static)**

1. Understand the workflow  
2. Define the system  
3. Build the first version  
4. Test and improve  
5. Review for serious delivery (Think Big review, QA, documentation, security, deployment)

**CTA:** Discuss a Software Use Case

---

### 8. Proof Library Preview

**CMS-driven — Phase 3+**

**Intro when visible:**  
The Proof Library collects the material behind the claims: repositories, demos, presentations, recognition proof, screenshots, downloads, and project documents.

**Categories (CMS):** GitHub, YouTube, 2018 presentation, recognition, screenshots, downloads, technical notes, build documents.

**Phase 1–2:** Section **hidden** — empty `featuredProofItems`.

**CTA when live:** Review Proof Library

---

### 9. Software First. AI Where It Improves the Workflow.

**Copy:** AI supports the system (analysis, summaries, reports, content, classification, research, decision support, routing, automation). Foundation: software structure, data flow, interface, security, testing, deployment, documentation, adoption. Focus on buildable systems—not AI slogans.

**Visual:** Software-first flow diagram (problem → software logic → data → AI layer → workflow output)

---

### 10. Latest Updates / Build Notes

**CMS-driven — hidden at launch**

Future content: new project, repo, video, proof document, feature, build note.

**Intro when visible:**  
Follow recent project updates, build notes, technical observations, and new proof added to the site.

**Phase 1–2:** Section **hidden** — empty `featuredUpdates`.

**CTA when live:** View Updates

---

### 11. Final CTA

**Title:** Have a Software or AI Workflow Idea?

**Body:** Bring problem/workflow/idea; think through system and build. Larger projects: Think Big review, documentation, QA, security, structured oversight.

**CTAs:** Discuss a Software Use Case; View Current Projects; Review Proof Library (anchors only until routes/URLs approved)

---

### 12. Footer

- Brand blurb  
- Link groups: Systems, Proof, Company (in-page anchors MVP)  
- Copyright Think Big Digital Solutions / Parth Ghumatkar  

---

## Content rules

| Rule | Detail |
|------|--------|
| Live text | All copy in HTML/React — not in images |
| No fake proof | No project/proof/update cards without CMS |
| No fake links | No placeholder github.com/user/repo |
| Banned word | “practical” in visible microsite copy |
| Tone bans | genius, prodigy, world-class, revolutionary, AI magic, etc. |

---

## CMS vs static summary

| Section | Static / CMS |
|---------|----------------|
| Hero, Proof Before Claims, What We Build, Founder, Process, Software First, Final CTA, Header, Footer | **Static** (Page Sections CMS optional later) |
| Featured Projects, Proof Preview, Latest Updates | **CMS** |
| Videos strip (optional home) | **CMS** — not on home MVP |

---

## SEO (homepage)

- **Title:** Think Big AI Systems \| AI Software, Automation, and Data Workflow Systems  
- **Description:** AI software systems, automation, internal tools, data platforms, and workflow applications built around real business workflows under Think Big Digital Solutions.  
- One H1 in hero; section titles as H2

---

## Mock vs implementation gaps

| Mock element | Doc decision |
|--------------|--------------|
| 4-column “proof trail” icons | Implemented as checklist panel (same content, different layout) |
| Self-led timeline band | Merged into Proof + Founder sections |
| 4 “What We Build” cards in mock | **6 cards** per approved copy |
| 6 hard-coded project cards | **Not implemented** until CMS |
| Explore GitHub in hero | Omitted until real URL approved |

---

## Gaps / decisions needed

- Full nav matching mock (GitHub, Videos, Downloads) when pages exist  
- Whether Featured Projects section shows intro-only without cards  
- Approved external URLs for footer social/GitHub/YouTube  
