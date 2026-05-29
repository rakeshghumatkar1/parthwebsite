Universal Website Production System | Page
UPLOAD THIS TO CHATGPT FIRST
Universal Cursor Docs Template Reference
A lifetime reference file for generating project-specific website documentation with ChatGPT before using Cursor.
What this file is for
Upload this file to ChatGPT so it understands the document structure behind the Universal Website Production System. Then give ChatGPT your project notes, homepage chat, screenshots, content, and reference images. ChatGPT can generate filled project docs for your actual website project.
What this file is not
This is not the Cursor prompt library. It is not for implementation. It is only the documentation template reference that helps ChatGPT create the project brain.
Universal Website Production System | Page
1. Use this file before Cursor implementation
The purpose is simple: first create the project brain, then let Cursor build from that brain. This file teaches ChatGPT the documentation structure. Cursor prompts come later, after the filled docs are placed inside the project.
Project idea or existing site
Upload this reference to ChatGPT
Add screenshots and notes
Generate filled docs
Paste into /docs
Cursor reads docs
2. Recommended order for a real project
Step
What you do
Result
1
Upload this reference file to ChatGPT
ChatGPT understands the doc templates
2
Upload project material: homepage chat, screenshots, reference image, content, page list
ChatGPT understands your actual project
3
Ask ChatGPT to generate Batch 1 docs
You get the core project brain
4
Paste the filled docs into the Cursor project docs folder
Cursor has a source of truth
5
Ask Cursor to read docs and compare with current code
You find mismatches before coding
6
Use Cursor prompts later for implementation
Cursor stays on track because prompts refer back to docs
3. Batch order for document generation
Batch
Generate these docs
When to use
Batch 1 - Core project brain
01, 02, 03, 04, 05, 06, 09, 11
Use first for almost every new or already-started website project
Batch 2 - Workflow control
07, 08, 10
Use when the project direction is clear and Cursor needs implementation rules
Batch 3 - Advanced control
12, 13, 14, 15, 16
Use when pages, CMS/admin, SEO/OG, deployment, or repeatable Cursor workflows become relevant
Important for projects with reference images
If a project has an approved sample image, mock image, Figma image, Gamma image, or visual reference, include that image when generating docs. The docs should clearly define whether the image is a visual reference only or a real production asset.
4. Instruction to give ChatGPT after uploading this file
Copy-friendly instruction
Universal Website Production System | Page
Use this Universal Cursor Docs Template Reference. I will provide project material separately. Generate project-specific filled documentation from the templates. Do not create Cursor implementation prompts. Do not write code. First generate Batch 1 docs only. Separate confirmed facts, assumptions, gaps, and recommendations. Preserve approved project direction and mark uncertain items clearly.
5. What to provide for an existing project
Input
Why it matters
Current homepage chat or project notes
Contains the real decision history
Approved reference or mock image
Defines the intended visual direction
Current homepage screenshot
Shows current implementation reality
Master site screenshots, if this is a microsite
Keeps the microsite aligned with the parent brand
Current page list and navigation
Prevents fake sitemap or broken links
New content direction
Allows content change without design drift
What must not change
Protects approved work
Known issues
Helps create audit and correction rules
Universal Website Production System | Page
6. The 17 universal Cursor documentation templates
The following sections contain the template structure for all 17 docs. ChatGPT should use these as the base structure and customize them for the actual project. These are documentation templates only, not implementation prompts.
Universal Website Production System | Page
00_DOC_INDEX_AND_PRECEDENCE.md
How ChatGPT should use this template
Customize 00_DOC_INDEX_AND_PRECEDENCE.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
00_DOC_INDEX_AND_PRECEDENCE.md
Purpose
This file defines the document hierarchy for this website project. When instructions conflict, Cursor must follow this precedence order instead of guessing.
Source of Truth Order
1.
User's latest explicit instruction
2.
00_DOC_INDEX_AND_PRECEDENCE.md
3.
01_PROJECT_BRIEF.md
4.
02_BRAND_AND_VISUAL_IDENTITY.md
5.
03_LAYOUT_DIRECTION.md
6.
04_BASIC_DESIGN_SYSTEM.md
7.
05_HOMEPAGE_BLUEPRINT.md
8.
06_VISUAL_ASSET_AND_DESIGN_INTERPRETATION_WORKFLOW.md
9.
07_PROMPT_RULES.md
10.
08_IMPLEMENTATION_RULES.md
11.
09_AUDIT_CHECKLIST.md
12.
10_WEBSITE_PRODUCTION_WORKFLOW.md
13.
11_CONTENT_AND_NAVIGATION_STRATEGY.md
14.
12_PAGE_BLUEPRINTS.md
15.
13_CMS_AND_ADMIN_STRATEGY.md
16.
14_SEO_METADATA_AND_OG_WORKFLOW.md
17.
15_DEPLOYMENT_AND_VALIDATION_RULES.md
18.
16_CURSOR_WORKFLOW_PROMPT_SYSTEM.md
Conflict Rule
If two documents conflict, stop and report the conflict before implementation unless the current prompt clearly resolves it.
Cursor Rule
Before implementing any major task, Cursor must inspect relevant docs and report which docs were used.
Universal Website Production System | Page
01_PROJECT_BRIEF.md
How ChatGPT should use this template
Customize 01_PROJECT_BRIEF.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
01_PROJECT_BRIEF.md
Purpose
Define the business, website goal, audience, offer, scope, and non-goals.
Project Name
[PROJECT NAME]
Business Summary
[Describe the business in 3-5 lines.]
Primary Audience

[Audience 1]

[Audience 2]

[Audience 3]
Website Goal
[What should the website achieve? Example: generate leads, sell subscriptions, build trust, explain services, support hiring, publish resources.]
Core Offer
[What does the business offer?]
Primary CTA
[Example: Book a Strategy Call / Get a Quote / Start Free Trial / Donate / Apply Now]
Secondary CTA
[Example: View Services / Explore Work / Download Guide / Read Case Studies]
Proof Available

[Testimonials]

[Case studies]

[Portfolio]

[Client logos]

[Founder credibility]

[Certifications]

[Metrics]
MVP Scope
Build only:
Universal Website Production System | Page
19.
[Page/feature]
20.
[Page/feature]
21.
[Page/feature]
Non-Goals
Do not build:

[Non-goal]

[Non-goal]

[Non-goal]
Success Criteria

Visitor understands the business within 3-5 seconds.

Primary CTA is clear.

Core pages are responsive.

Navigation has no broken links.

Site passes build validation.
Universal Website Production System | Page
02_BRAND_AND_VISUAL_IDENTITY.md
How ChatGPT should use this template
Customize 02_BRAND_AND_VISUAL_IDENTITY.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
02_BRAND_AND_VISUAL_IDENTITY.md
Purpose
Define the brand feel, visual direction, color approach, typography mood, icon style, and overall design personality.
Brand Feel
The website should feel:

[premium / friendly / editorial / bold / calm / technical / playful]

[local / national / global]

[B2B / B2C / community / nonprofit / enterprise]
The website should not feel:

[cheap / cluttered / overly corporate / childish / generic / over-designed]
Color Direction
Primary colors:

[Color 1]

[Color 2]
Secondary/accent colors:

[Accent 1]

[Accent 2]
Avoid:

[Colors/styles to avoid]
Typography Direction
Headings should feel:

[clear / strong / refined / editorial / technical]
Body text should feel:

[readable / calm / simple / professional]
Avoid:

decorative fonts

unreadable font sizes

overly futuristic styles unless intentional
Icon / Illustration Style
Use:
Universal Website Production System | Page

[line icons / filled icons / geometric icons / photography / illustration / abstract system visuals]
Avoid:

mixed icon styles

emoji-style icons unless intentional

random stock illustrations
Motion Style
Allowed:

subtle hover states

gentle transitions

light reveal animations
Avoid:

heavy animation

distracting movement

constant parallax
Visual Reference Rule
Reference websites and images may guide mood, spacing, hierarchy, and rhythm. Do not copy brand identity, exact layout, logo, image assets, or proprietary copy.
Universal Website Production System | Page
03_LAYOUT_DIRECTION.md
How ChatGPT should use this template
Customize 03_LAYOUT_DIRECTION.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
03_LAYOUT_DIRECTION.md
Purpose
Define the preferred layout structure, section order, hero composition, grid behavior, spacing flow, and CTA placement.
Core Layout Principle
The website should communicate:

clarity

trust

usefulness

business relevance

easy next steps
Homepage Structure
Recommended starting structure:
22.
Header / Navigation
23.
Hero
24.
Trust / Credibility strip
25.
Problem / Context section
26.
Solution / Offer overview
27.
Services / Products grid
28.
Process / How it works
29.
Proof / Outcomes / Testimonials
30.
Resources / Lead magnet / Useful next step
31.
Final CTA
32.
Footer
Adjust based on business type.
Hero Direction
Hero should include:

clear category/eyebrow

direct headline

short supporting copy

primary CTA

secondary CTA if needed

trust cue or proof line
Universal Website Production System | Page

visual or layout support only if it improves clarity
Section Rules

Every section must have a purpose.

Avoid sections that only decorate.

Avoid overloading the homepage.

Keep major sections visually distinct.

Keep CTA placement logical.
Grid Rules

1 column on mobile

2 columns on tablet where appropriate

3 columns on desktop for card grids where readability permits
Proof Direction
Use proof only if real or clearly marked as placeholder during drafting.
Avoid fake metrics, fake clients, fake testimonials, fake logos.
Universal Website Production System | Page
04_BASIC_DESIGN_SYSTEM.md
How ChatGPT should use this template
Customize 04_BASIC_DESIGN_SYSTEM.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
04_BASIC_DESIGN_SYSTEM.md
Purpose
Convert the brand and layout direction into practical UI rules for colors, typography, spacing, cards, buttons, sections, responsiveness, and accessibility.
Color System
Define:

page background

dark section background

light section background

primary text

muted text

border color

primary CTA color

secondary CTA color

accent color
Typography System
Rules:

One H1 per page.

H1 should quickly explain the page.

H2 should clearly introduce sections.

H3 should support cards and subsections.

Body copy should be readable and not too dense.
Spacing System
Use consistent spacing for:

section padding

card padding

grid gaps

heading-to-body distance

CTA spacing
Avoid cramped sections and inconsistent gaps.
Cards
Cards should be:

readable
Universal Website Production System | Page

consistent

not too text-heavy

visually aligned with the brand

reusable where possible
Buttons
Primary CTA:

strongest visual emphasis

short clear label

consistent style
Secondary CTA:

lower emphasis

does not compete with primary CTA
Responsive Rules
Check:

hero stacks cleanly

buttons stack on mobile

cards collapse properly

images do not overflow

text remains readable

navigation remains usable
Accessibility Rules

readable contrast

semantic headings

visible focus states

meaningful link/button labels

alt text for meaningful images

do not trap important information inside images
Universal Website Production System | Page
05_HOMEPAGE_BLUEPRINT.md
How ChatGPT should use this template
Customize 05_HOMEPAGE_BLUEPRINT.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
05_HOMEPAGE_BLUEPRINT.md
Purpose
Define homepage message flow, sections, CTAs, and proof logic.
Homepage Goal
[What should the visitor understand or do after landing on the homepage?]
Core Homepage Message
[One clear sentence explaining what the business does and for whom.]
Visitor Understanding Goal
Within 3-5 seconds, the visitor should understand:

who the website is for

what the business offers

why it is credible

what to do next
Working Section Structure
33.
Hero
34.
Trust / credibility line
35.
Problem / context
36.
Solution / offer overview
37.
Services / products / capabilities
38.
Process / how it works
39.
Proof / outcomes
40.
Resource / lead magnet / helpful next step
41.
Final CTA
42.
Footer
Hero
Should include:

eyebrow/category line

headline

subheadline

primary CTA

secondary CTA

trust cue
Universal Website Production System | Page
Proof Rules
Use real proof where available. If proof is not ready, use restrained language or clearly marked placeholders.
CTA Logic
Primary CTA:
[CTA]
Secondary CTA:
[CTA]
Content Rule
All homepage text must remain editable HTML/UI text. Do not bake important text into images.
Universal Website Production System | Page
06_VISUAL_ASSET_AND_DESIGN_INTERPRETATION_WORKFLOW.md
How ChatGPT should use this template
Customize 06_VISUAL_ASSET_AND_DESIGN_INTERPRETATION_WORKFLOW.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
06_VISUAL_ASSET_AND_DESIGN_INTERPRETATION_WORKFLOW.md
Purpose
Define how mockups, screenshots, visual references, hero images, section artwork, icons, and production assets should be handled.
Core Rule
Mockup/reference image = interpretation only.
Production artwork = approved uploaded asset.
Cursor must never confuse these two.
Full-Page Mockup Rule
Full-page mockups are not production UI. Cursor must not:

place the full mockup inside the website

use it as a page background

slice it into sections

copy it pixel-by-pixel

recreate it literally

bake text into an image
Cursor may use mockups to extract:

layout structure

spacing rhythm

visual hierarchy

typography hierarchy

card patterns

CTA placement

section order

responsive intent
Design Interpretation Step
Before coding from any mockup or screenshot, Cursor must explain:

visible sections

layout logic

reusable components needed

spacing rhythm
Universal Website Production System | Page

CTA hierarchy

asset vs live-UI distinction

responsive behavior

implementation plan
Production Asset Rule
Approved hero images, section artwork, icons, and logos may be used directly if clearly identified as production assets.
Store assets in sensible folders such as:

public/images/hero/

public/images/sections/

public/images/logos/

public/images/references/
Text Rule
Important website text must remain editable as HTML/UI text.
Universal Website Production System | Page
07_PROMPT_RULES.md
How ChatGPT should use this template
Customize 07_PROMPT_RULES.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
07_PROMPT_RULES.md
Purpose
Define how prompts should be written for Cursor.
Standard Prompt Structure
Every implementation prompt should include:
43.
Workflow trigger line
44.
Objective
45.
Current state
46.
Scope
47.
Do not change
48.
Preflight
49.
Implementation rules
50.
Validation
51.
Audit
52.
Commit/push rule
53.
Final report format
Prompt Rule
Do not ask Cursor to “make it modern.” Give exact scope, references, docs to read, files/routes involved, and what must remain unchanged.
Prompt Types
Use these workflow types:

Static page implementation

Design interpretation only

Focused UI polish

Link/navigation wiring

DB/admin/CMS feature

Audit + self-correction
Safety Rule
If the task touches DB, auth, uploads, server actions, packages, routing, or deployment, mention it explicitly and require preflight.
Universal Website Production System | Page
08_IMPLEMENTATION_RULES.md
How ChatGPT should use this template
Customize 08_IMPLEMENTATION_RULES.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
08_IMPLEMENTATION_RULES.md
Purpose
Define technical implementation rules for Cursor.
General Rules

Keep changes minimal and additive.

Reuse existing components and patterns.

Do not redesign unrelated pages.

Do not rewrite approved copy unless instructed.

Do not add packages unless necessary and reported.

Do not expose unfinished pages.

Do not create broken links.

Do not create fake data, fake testimonials, fake metrics, or fake logos.
File Safety
Before editing, Cursor must inspect relevant files and report intended changes.
Package Safety
Do not add new libraries unless:

existing tools cannot solve the task

the package is compatible with deployment runtime

the reason is reported
Server Runtime Safety
Avoid server-side dependencies that are known to fail in deployment runtimes. For rich text sanitization on Vercel/Next.js server-rendered routes, prefer server-safe packages and test deployed runtime behavior.
DB Safety
If schema change is needed:

use append-only migrations

do not drop core tables

verify production DB access before pushing schema-dependent code

stop if production DB status is uncertain
Universal Website Production System | Page
09_AUDIT_CHECKLIST.md
How ChatGPT should use this template
Customize 09_AUDIT_CHECKLIST.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
09_AUDIT_CHECKLIST.md
Purpose
Define the QA checklist used after implementation.
Visual Audit

layout matches approved direction

spacing is consistent

typography hierarchy is clear

cards are readable

CTAs are visible and not competing

mobile layout is stable

images are not distorted
Content Audit

no fake metrics

no fake testimonials

no fake logos

no broken or placeholder copy on live pages

headings are clear

CTA labels make sense
Link Audit

no broken links

no unfinished pages exposed

nav and footer links point to real routes

external links open correctly where needed
Technical Audit

TypeScript passes

lint passes

build passes

no console/runtime errors known

no hydration issues

no package changes unless intended
Asset Audit

mockups not used as production UI

production assets stored in correct folders
Universal Website Production System | Page

important text remains editable

images have alt text where meaningful
Final Audit Result
Pass / Fail / Pass with follow-up.
Universal Website Production System | Page
10_WEBSITE_PRODUCTION_WORKFLOW.md
How ChatGPT should use this template
Customize 10_WEBSITE_PRODUCTION_WORKFLOW.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
10_WEBSITE_PRODUCTION_WORKFLOW.md
Purpose
Define the full website production workflow.
Workflow
54.
Define business and user.
55.
Define offer and CTA.
56.
Create project docs.
57.
Define visual identity.
58.
Define layout direction.
59.
Define design system.
60.
Define sitemap and navigation strategy.
61.
Create homepage blueprint.
62.
Create or collect visual references.
63.
Run design interpretation if using mockups/images.
64.
Ask Cursor for preflight and plan.
65.
Implement phase by phase.
66.
Validate.
67.
Audit.
68.
Commit/push only if validation passes.
69.
Verify deployment.
Do Not Skip

project brief

visual identity

design system

asset rules

validation

audit
Universal Website Production System | Page
11_CONTENT_AND_NAVIGATION_STRATEGY.md
How ChatGPT should use this template
Customize 11_CONTENT_AND_NAVIGATION_STRATEGY.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
11_CONTENT_AND_NAVIGATION_STRATEGY.md
Purpose
Define sitemap, page priorities, navigation, footer, content architecture, and page visibility rules.
Sitemap
Primary Pages
70.
Home
71.
Services / Products
72.
About
73.
Case Studies / Work / Portfolio
74.
Resources / Blog
75.
Contact
Optional Pages

Team

Testimonials

FAQ

Pricing

Downloads / Lead Magnets

Industries

Technologies / Platforms

Careers

Legal pages
Navigation Rule
Only completed, reviewed, and approved pages should appear in top navigation or footer.
Page Status

Planned

In Progress

Built

Approved

Live
Footer Rule
Footer may include more links than top navigation, but still must not expose broken or unfinished pages.
Universal Website Production System | Page
Link Wiring Rule
When a new page is built:
76.
Build page.
77.
Review page.
78.
Approve page.
79.
Decide where to link it.
80.
Ask Cursor to wire approved links only.
81.
Audit all links.
Universal Website Production System | Page
12_PAGE_BLUEPRINTS.md
How ChatGPT should use this template
Customize 12_PAGE_BLUEPRINTS.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
12_PAGE_BLUEPRINTS.md
Purpose
Reusable page structures for common website pages.
Service Page Blueprint
82.
Hero
83.
Problem/context
84.
What the service includes
85.
Process
86.
Proof/examples
87.
FAQ
88.
Final CTA
About Page Blueprint
89.
Hero
90.
Who we are
91.
What we do
92.
How we work
93.
Why clients/users trust us
94.
Team/founder preview
95.
CTA
Case Study Page Blueprint
96.
Client/context
97.
Challenge
98.
Approach
99.
What was implemented
100.
Results
101.
Testimonial
102.
CTA
Portfolio Page Blueprint
103.
Hero
104.
Category/filter system
105.
Work cards
106.
Featured work modal/detail
Universal Website Production System | Page
107.
Proof/CTA
Blog/Resource Page Blueprint
108.
Hero
109.
Featured content
110.
Category/filter/search
111.
Article grid/list
112.
Newsletter/lead magnet CTA
Contact Page Blueprint
113.
Hero
114.
Form
115.
Alternative contact details
116.
Qualification copy
117.
FAQ or expectation setting
Universal Website Production System | Page
13_CMS_AND_ADMIN_STRATEGY.md
How ChatGPT should use this template
Customize 13_CMS_AND_ADMIN_STRATEGY.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
13_CMS_AND_ADMIN_STRATEGY.md
Purpose
Define CMS/admin needs when the site requires editable content, uploads, publishing, user roles, or database-backed features.
Use CMS/Admin When

content changes often

team needs non-developer editing

case studies/articles/portfolio need publishing flow

uploads are required

users/roles are required

lead data or form submissions must be managed
CMS Content Types
Potential content types:

articles

case studies

portfolio items

testimonials

team members

FAQs

downloads

leads

users
Admin Feature Rules

Create/edit/delete/publish actions should be clear.

Draft vs published state should be visible.

Uploads should be validated.

No fake success states.

Data should persist after refresh.

Admin-only data should not leak publicly.
DB Safety
Run DB preflight before coding database-backed features.
Use append-only migrations.
Do not push schema-dependent code if production DB status is unknown.
Universal Website Production System | Page
Universal Website Production System | Page
14_SEO_METADATA_AND_OG_WORKFLOW.md
How ChatGPT should use this template
Customize 14_SEO_METADATA_AND_OG_WORKFLOW.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
14_SEO_METADATA_AND_OG_WORKFLOW.md
Purpose
Define SEO metadata, Open Graph image, canonical, robots, sitemap, and social preview workflow.
Required SEO Items

title

meta description

canonical URL

Open Graph title

Open Graph description

Open Graph image

Twitter/X card metadata if needed

robots.txt

sitemap.xml
OG Image Rules

Use correct image dimensions.

Store in public/social or relevant folder.

Keep branding readable at small preview sizes.

Test preview after deployment.
Robots/Sitemap Rules

Ensure crawler access is not blocked.

Include public live pages in sitemap.

Avoid indexing unfinished pages.
Domain Consistency

Choose canonical domain.

Ensure www/non-www behavior is intentional.

Metadata should use canonical domain consistently.
Social Preview Testing
Test after deployment using platform preview/debug tools where relevant.
Expect caching delays on some platforms.
Universal Website Production System | Page
15_DEPLOYMENT_AND_VALIDATION_RULES.md
How ChatGPT should use this template
Customize 15_DEPLOYMENT_AND_VALIDATION_RULES.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
15_DEPLOYMENT_AND_VALIDATION_RULES.md
Purpose
Define validation, commit, push, and deployment rules.
Validation Commands
Run separately:
npx tsc --noEmit
npm run lint -- --max-warnings 0
npm run build
Use project-specific equivalents if scripts differ.
Commit Rule
Commit only if:

validation passes

audit passes

only intended files changed

no broken links introduced

no unfinished pages exposed
Push Rule
Push only after commit is clean and intended.
Deployment Rule
After push, verify:

build status

live route

mobile route

key forms/interactions

metadata/social preview where relevant
Failure Rule
If validation fails:

do not commit

do not push

report exact error

explain likely cause
Universal Website Production System | Page

suggest safest fix
Universal Website Production System | Page
16_CURSOR_WORKFLOW_PROMPT_SYSTEM.md
How ChatGPT should use this template
Customize 16_CURSOR_WORKFLOW_PROMPT_SYSTEM.md for the actual project using the project material, screenshots, reference images, current homepage, and confirmed decisions. Keep confirmed facts separate from assumptions, gaps, and recommendations.
16_CURSOR_WORKFLOW_PROMPT_SYSTEM.md
Purpose
Define reusable Cursor workflow prompts for website projects.
Core Rule
Prefer one complete implementation phase when safe:
Preflight -> Implementation -> Validation -> Audit -> Commit/Push -> Final Report.
Avoid fragmented prompts when one scoped workflow can safely handle the task.
Workflow Types
118.
STATIC PAGE IMPLEMENTATION WORKFLOW
119.
DESIGN INTERPRETATION WORKFLOW
120.
FOCUSED UI POLISH WORKFLOW
121.
FOCUSED LINK WIRING WORKFLOW
122.
FULL DB-BACKED FEATURE WORKFLOW
123.
AUDIT + SELF-CORRECTION WORKFLOW
Universal Validation
Run:
npx tsc --noEmit
npm run lint -- --max-warnings 0
npm run build
If DB-backed, also run project DB status/check commands.
Final Report Required

preflight result

files changed

validation result

audit result

commit hash

push status

live/test routes

remaining risks