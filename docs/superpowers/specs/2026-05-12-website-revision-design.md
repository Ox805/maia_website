# Maia Tech Website Revision: Design Spec

*Date: 2026-05-12*
*Owner: Tim Gray (Maia AI LLC)*
*Repo: github.com/Ox805/maia_website*
*Local path: /home/tim/dev/maia_website*
*Deploy: Vercel auto-deploys from `main`*
*Source brief: [REVISION_PROMPT.md](../../../REVISION_PROMPT.md)*

---

## 1. Purpose

Marketing-site revision triggered by a product-portfolio refresh in Maia AI LLC:

- **Remove** EdgeView Sports Platform (on hold) and Maia Business Assistant (retired).
- **Rename** Maia Personal Assistant to **Maia** (the flagship company namesake).
- **Add** four products: **BuildMyApp**, **Vilora**, **AlphaAI**, **AlphaPoker**.

The revision is gating the BuildMyApp Stripe live launch. BMA charges will appear on buyer statements as `MAIA AI*BUILDMYAPP`; a buyer who googles `maiatech.ai` must find a clear BMA reference to avoid chargebacks. Stripe's risk/Connect-approval reviews also examine the operating company's website.

## 2. Resolved strategic decisions (from brainstorm)

| # | Decision | Choice |
|---|---|---|
| 1 | **Brand framing** | Flat peers under Maia AI LLC. No "Alpha" sub-family grouping. |
| 2 | **Detail pages** | Consolidated `/products` page with anchor sections (`#maia`, `#buildmyapp`, `#vilora`, `#alphaai`, `#alphapoker`). No per-product routes. The existing `/products/edgeview` route is removed. |
| 3 | **Home stats block** | `3 Active Innovations` → `5 Active Products`. |
| 4 | **External links** | Maia: none (iOS app, show "Available on iOS" badge). BMA: `https://appmarketplace.dev`. Vilora: `https://vilora.ai`. AlphaAI + AlphaPoker: private apps with no public URL; use "Request Access" button → modal form → email to `support@maiatech.ai` via EmailJS. **All `myaiassistant.net` references removed.** |
| 5 | **Product icons** | All five images provided by Tim and staged in `/images/` (see §6). |
| 6 | **About narrative** | Trim the third "Our Story" paragraph to drop EdgeView/Maia-Business name-checks; keep generic "multiple products across industries" framing. Mission/Vision/Values/Partners unchanged. |

## 3. Architecture

### 3.1 Routing (`src/App.tsx`)

- **Remove** `import EdgeViewProduct from './pages/EdgeViewProduct';`
- **Remove** the `<Route path="/products/edgeview" element={<EdgeViewProduct />} />` line.
- No new routes.

### 3.2 New shared component: `AccessRequestModal`

**Files:** `src/components/AccessRequestModal.tsx`, `src/styles/AccessRequestModal.css`

**Props:**

```ts
type AccessRequestModalProps = {
  productName: 'AlphaAI' | 'AlphaPoker';
  isOpen: boolean;
  onClose: () => void;
};
```

**Fields (all required):**

- `name`: text
- `company`: text
- `email`: email
- `city`: text
- `reason`: textarea

**Behavior:**

- Closes on backdrop click, Escape key, and close-button click.
- Submits via `emailjs.send()` reusing the existing service ID (`service_swi6amx`) and public key (`DiJ2_UqcVKRzuKMBE`).
- A **new EmailJS template** (dedicated to access requests) is required. Tim creates it in the EmailJS dashboard before launch (see §7).
- Success state: form clears, modal auto-closes after ~1.5 seconds with a confirmation message.
- Error state: shows an error message with a fallback email link to `support@maiatech.ai`.
- Reuses styling patterns from `src/pages/Contact.tsx` (loading state, success/error messages) for consistency.

### 3.3 Product cards (three CTA variants)

Each card has a different call-to-action depending on the product:

| Card | Image source | CTA |
|---|---|---|
| Maia | woman with headset (real photo) | small "Available on iOS" badge, no outbound link |
| BuildMyApp | designer's workbench (real photo) | `Learn More →` link to `https://appmarketplace.dev` (new tab) |
| Vilora | human-AI hand composition (digital art, intentional visual outlier) | `Learn More →` link to `https://vilora.ai` (new tab) |
| AlphaAI | product screenshot | `Request Access` button → opens `AccessRequestModal` with `productName="AlphaAI"` |
| AlphaPoker | product screenshot | `Request Access` button → opens `AccessRequestModal` with `productName="AlphaPoker"` |

### 3.4 Card order (Home and `/products`)

```
[ Maia ]       [ BuildMyApp ]    [ Vilora ]
[ AlphaAI ]    [ AlphaPoker ]
```

Flat peers, no grouping. BMA sits in the top row for Stripe visibility. The existing `.products-grid` CSS uses `repeat(auto-fit, minmax(300px, 1fr))`, which already handles five cards with a natural reflow.

## 4. Page-by-page content changes

### 4.1 `src/pages/Home.tsx`

**Hero description (replaces existing paragraph):**

> We're a technology innovation lab that identifies transformative opportunities in the AI landscape and builds category-defining software products, from flagship AI assistants to mediation platforms, marketplaces, and analytical tools.

**Products section:** Rebuild the grid with five cards in the order above. Each card has:

- Image (see §6)
- Product name as `<h3>`
- One-paragraph description (see §5 for ready-to-use copy)
- CTA per §3.3

**Stats grid:** `3 Active Innovations` → `5 Active Products`.

**Innovation Approach section:** unchanged.

### 4.2 `src/pages/Products.tsx`

Replace the existing three sections with five sections, each with `id="<slug>"` for anchor linking. Slugs: `maia`, `buildmyapp`, `vilora`, `alphaai`, `alphapoker`. Each section has:

- Image
- Product name `<h2>`
- Tagline
- Full description
- Key features bullet list (where applicable, see §5)
- Outbound CTA matching the Home card (external link / iOS badge / Request Access button)

Copy ported from REVISION_PROMPT.md product blocks; **all em-dashes stripped** (replace with commas, colons, parentheses, or sentence restructures).

### 4.3 `src/pages/About.tsx`

**Only change:** rewrite the third "Our Story" paragraph (currently references EdgeView, Maia Personal, Maia Business). New copy:

> Today, we operate as an innovation lab, developing AI-powered products across personal productivity, software marketplaces, mediation, financial research, and consumer applications. We're committed to building products that matter.

Mission, Vision, Core Values, Technology Partners sections: unchanged.

Optional: if `maia-aI-lab-image.png` (the crystal-sphere asset) works visually, drop it into the About hero as a side or background panel. Implementer's discretion; not required for the revision to ship.

### 4.4 `src/components/Footer.tsx`

Replace the footer product link list with the five new anchor links:

- Maia → `/products#maia`
- BuildMyApp → `/products#buildmyapp`
- Vilora → `/products#vilora`
- AlphaAI → `/products#alphaai`
- AlphaPoker → `/products#alphapoker`

Remove the EdgeView footer link, the Maia Business link, and any `myaiassistant.net` references.

### 4.5 `src/components/Navigation.tsx`

Inspect for explicit product links. If the nav only links to `/products`, no change. If it lists products, update to the new lineup.

### 4.6 `src/pages/Contact.tsx`

No content changes. The existing EmailJS-powered contact form is reused as-is (it does not depend on the access-request template).

### 4.7 Files to delete

- `src/pages/EdgeViewProduct.tsx`
- `src/styles/EdgeViewProduct.css`
- `public/images/edgeview-icon.jpg`, `public/images/edgeview-icon.webp`
- `public/images/maia-business-icon.jpg`, `public/images/maia-business-icon.png`
- `public/images/maia-personal-icon.jpg`, `public/images/maia-personal-icon.webp` (replaced by `maia-icon.jpg`)

### 4.8 `README.md`

Update the product list paragraph: remove EdgeView and Maia Business, rename Maia Personal → Maia, add BuildMyApp + Vilora + AlphaAI + AlphaPoker with brief one-liners each.

### 4.9 `EMAILJS_SETUP.md`

Append a section documenting the new access-request EmailJS template:

- Template purpose: routing private-access requests for AlphaAI and AlphaPoker to `support@maiatech.ai`.
- Template variables: `product_name`, `from_name`, `company`, `from_email`, `city`, `reason`.
- Reminder: recipient is set on the EmailJS template, not in code.

## 5. Copy (ready to use, em-dash-free)

All copy below has been validated for em-dash-free language. Implementer must double-check when porting; if any em-dashes slipped through, replace with commas, colons, parentheses, or restructure.

### 5.1 Maia

**Tagline:** Your AI-powered productivity companion.

**Card description:**
> Maia is the flagship AI assistant from Maia AI LLC. Leveraging advanced language models and adaptive learning, Maia transforms how individuals manage tasks, information, and daily workflows. Natural-language task management, intelligent information retrieval, personalized recommendations, multi-platform sync, and privacy-first design.

**CTA:** "Available on iOS" badge (no link).
**Status:** Active.

### 5.2 BuildMyApp

**Tagline:** A demand-first software marketplace.

**Card description:**
> BuildMyApp is an AI-augmented marketplace where non-technical buyers commission custom software from independent developers and license completed products. Buyers post fixed-price requests, developers commit to build, and BMA operates the runtime so buyers can launch their software with one click. Built-in warranty, AI-mediated collaboration, and lifecycle revenue sharing make it a new model for software commissioning.

**Key features (Products page):**

- Demand-first marketplace: buyers post requests with fixed prices; developers compete on quality, not bidding.
- 30-day warranty on every build; AI-mediated dispute resolution.
- Web-hosted delivery: one-click "Launch" for non-technical buyers; BMA operates the runtime.
- Developer Marketplace: developers list completed software (Buy and Buy-out pricing).
- Lifecycle revenue split: original buyers earn when their commissioned software is re-licensed.

**Target market:** Small businesses commissioning their first piece of custom software, domain experts inside organizations, and developers looking for validated demand.

**CTA:** Learn More → `https://appmarketplace.dev` (new tab).
**Status:** Active (private pilot for web-hosted delivery).

### 5.3 Vilora

**Tagline:** Strength Through Dialogue.

**Card description:**
> Vilora is an AI-powered platform for mediation, collaboration, brainstorming, and decision-making. Whether working through a disagreement, exploring ideas, making a tough decision, or planning something complex, Vilora facilitates the conversation, surfaces what matters, and helps people reach clarity. Use it alone, with another person, or as a group.

**Three modes (Products page):**

- **Group Sessions:** Invite one or more people into a shared conversation. Pick a session purpose (Mediation, Brainstorming, Decision-making, Planning, General discussion) to shape how Vilora shows up. Each participant can share their perspective privately during intake.
- **One-on-One with Vilora:** A private conversation. Tone chips let you steer how Vilora engages: quick advice, deep exploration, devil's advocate, action plan, encouragement.
- **The Vilora Council:** Five specialized advisor personas analyze your question in parallel, peer-review each other's blind spots, then deliver a synthesized recommendation with a concrete next step.

**Key features:**

- Session purposes for mediation, brainstorming, decision-making, planning, and general discussion.
- Tone chips to steer Vilora's style per session.
- Eight specialized mediation frameworks (relationships, family, workplace, roommates, neighbors, politics, business partnerships, general disputes).
- Structured intake: each party shares privately before joint sessions.
- AI-generated session summaries with concerns, agreements, and next steps.
- Invite links via email or SMS.
- Session history with unread counts and quick re-entry.

**CTA:** Learn More → `https://vilora.ai` (new tab).
**Status:** Active.

### 5.4 AlphaAI

**Tagline:** An intelligent investment research platform.

**Card description:**
> AlphaAI helps you find alpha in the markets using AI-powered analysis, automated screening, and strategy development. A dual-purpose platform combining on-demand AI agents for research and analysis with an automated investment discovery system. No coding required; point, click, and discover alpha.

**Three live AI agents (Products page):**

- **Morning Briefing Agent:** Daily market intelligence powered by real economic data. FRED API indicators (unemployment, inflation, Fed rates), earnings calendar, pre-market conditions, weekly themes, and professional market analysis in minutes.
- **Research Agent:** Comprehensive company and stock analysis. Natural-language queries (e.g., "Analyze Tesla's growth potential vs Ford"), financial fundamentals via yfinance, multi-company comparisons, and AI-powered investment recommendations.
- **Strategy Agent:** Investment strategy development and portfolio optimization. Interactive strategy builder (value, growth, momentum), risk tolerance configuration, and portfolio allocation recommendations.

**Plus, in development:** Investment Discovery System, automated daily screening using 21 quantitative factors to identify undervalued opportunities.

**CTA:** Request Access button → opens AccessRequestModal.
**Status:** Active (3 agents live; discovery system in development).

### 5.5 AlphaPoker

**Tagline:** Practice poker against GTO-style AI opponents.

**Card description:**
> AlphaPoker is a web-based poker training application that helps you sharpen your game against AI opponents using GTO (Game-Theory-Optimal) strategy. Play No-Limit Texas Hold'em and Pot-Limit Omaha in heads-up through 6-max formats, with a real-time AI coach providing GTO-based feedback on every decision.

**Key features (Products page):**

- Multiple game types: No-Limit Texas Hold'em and Pot-Limit Omaha.
- Flexible table sizes: heads-up through 6-max.
- GTO AI opponents: position-aware pre-flop ranges, balanced post-flop strategy.
- Real-time AI coach with GTO-based analysis.
- Training feedback comparing your plays to optimal strategy.
- Hand history tracking and statistics dashboard.
- Leaderboard for comparing performance.
- Tournament mode (elimination-style play).
- Scenario Analyzer with card picker and multi-street coaching.
- Hand sharing via Text/SMS, WhatsApp, X, Email with OG preview images.
- Responsive design for desktop, tablet, and mobile.

**Target market:** Poker players seeking professional-level GTO training and analysis without paying for expensive solver software.

**CTA:** Request Access button → opens AccessRequestModal.
**Status:** Active.

## 6. Image assets

All source images already staged in `/home/tim/dev/maia_website/images/`. Implementer copies them into `public/images/` with the destination filenames.

| Product | Source file | Destination filename | Style |
|---|---|---|---|
| Maia | `images/personal_assistant_image.jpg` | `public/images/maia-icon.jpg` | Real photography (woman with headset) |
| BuildMyApp | `images/bma-workbench.png` | `public/images/buildmyapp-icon.png` | Real photography (designer's workbench, overhead) |
| Vilora | `images/vilora-image.png` | `public/images/vilora-icon.png` | Digital art (human + AI hands, intentional visual outlier) |
| AlphaAI | `images/AlphaAI-image.jpg` | `public/images/alphaai-icon.jpg` | Product screenshot (Investment Discovery view) |
| AlphaPoker | `images/alphaPoker-image.jpg` | `public/images/alphapoker-icon.jpg` | Product screenshot (poker simulator with AI coach) |
| Brand asset | `images/maia-aI-lab-image.png` | (optional, About page area) | Crystal sphere; available for About / "Maia AI Lab" moments. Placement at implementer's discretion. |

**Unused / discarded:** `images/hands-phone-image.png`, `images/alphaAI.png` (not referenced by the site).

**CSS note:** The existing `.product-icon-img` styling uses a 140 px container. The two screenshot images (`AlphaAI-image.jpg`, `alphaPoker-image.jpg`) are landscape ~16:9, while the photographic ones are roughly square. Implementer must verify each renders cleanly. Recommended starting point: `object-fit: cover` for screenshots so the most visually distinctive portion fills the frame; switch to `object-fit: contain` only if cropping eats meaningful UI elements.

## 7. Prerequisite: EmailJS access-request template

Tim creates this in the EmailJS dashboard **before** the access-request modal will work end-to-end. The implementer can build the form and wire the call site against placeholder template ID, but live submissions require the template to exist.

**Template variables** (must match `emailjs.send()` payload in `AccessRequestModal.tsx`):

- `product_name`: "AlphaAI" or "AlphaPoker"
- `from_name`
- `company`
- `from_email`
- `city`
- `reason`

**Recipient:** `support@maiatech.ai` (configured on the template; not in code).

**Suggested subject:** `Access request for {{product_name}} from {{from_name}}`

**Suggested body:**

```
New access request from the Maia Technologies website:

Product:   {{product_name}}
Name:      {{from_name}}
Company:   {{company}}
Email:     {{from_email}}
City:      {{city}}

Reason for request:
{{reason}}

This message was sent from the Request Access form on maiatech.ai.
```

After creation, Tim shares the **Template ID** with the implementer to drop into `AccessRequestModal.tsx`.

## 8. Verification

### 8.1 Local

1. `npm install` (no-op if deps unchanged).
2. `npm run build` exits clean. TypeScript errors fail the build.
3. `npm start` and walk every page in the browser:
   - **Home:** new hero copy; five cards in order; Maia shows iOS badge with no outbound link; BMA opens `appmarketplace.dev` in a new tab; Vilora opens `vilora.ai` in a new tab; AlphaAI and AlphaPoker buttons open the access-request modal; modal form submits successfully (test with a real submission and confirm `support@maiatech.ai` receives the email via the EmailJS dashboard).
   - **About:** "Our Story" third paragraph reflects the new lineup; no EdgeView, Maia Business, or `myaiassistant.net` references anywhere.
   - **Products:** five anchor sections render in order; deep-linking via `/products#vilora` (and the other slugs) scrolls correctly.
   - **Footer:** five product links resolve to anchors; no removed-product links.
   - **Contact:** unchanged, still works.
4. Grep the done conditions:
   - `grep -ri "edgeview" src/ public/ README.md` → empty
   - `grep -ri "Maia Business" src/ README.md` → empty
   - `grep -ri "Maia Personal Assistant" src/` → empty
   - `grep -ri "myaiassistant.net" src/` → empty
   - Em-dash scan: grep `src/` and `README.md` for the U+2014 character (em-dash). Any new or edited content must contain none. (The exact command requires the em-dash character literal in the search term; the implementer can construct it from the codepoint or copy it from existing content before stripping.)

### 8.2 Production

- Commit (no `Co-Authored-By: Claude` footer).
- Push to `main`. Vercel auto-deploys.
- Repeat the smoke test against `www.maiatech.ai` after deploy succeeds.

### 8.3 Rollback plan

- Revert the PR / commit in GitHub if anything is broken on production. Vercel redeploys the previous commit automatically.

## 9. Done criteria

- `grep -ri "edgeview" src/ public/ README.md` returns nothing.
- `grep -ri "Maia Business" src/ README.md` returns nothing.
- `grep -ri "Maia Personal Assistant" src/` returns nothing.
- `grep -ri "myaiassistant.net" src/` returns nothing.
- `/products/edgeview` route is removed from `App.tsx`.
- BuildMyApp, Vilora, AlphaAI, AlphaPoker each appear on Home (card), Products (section), and Footer.
- Access-request modal opens from AlphaAI and AlphaPoker cards on both Home and Products; submissions reach `support@maiatech.ai` in the EmailJS dashboard.
- `npm run build` exits clean.
- Vercel auto-deploy from `main` succeeds and the production site reflects the revision.

## 10. Out of scope

The following are explicitly **not** part of this revision (carried from REVISION_PROMPT.md and the brainstorming):

- New pages or features beyond the changes above. This is a focused content revision, not a redesign.
- CSS framework changes or refactors of the styling system. Continue using per-page CSS files.
- Modifications to the existing `Contact.tsx` form or its EmailJS configuration.
- Per-product detail routes (`/products/<slug>`). All product detail lives on the consolidated `/products` page.
- Visual cohesion enforcement across the five card images. The chosen mix (real photography + digital art + product screenshots) is intentional.

## 11. Implementation hand-off

Once this spec is approved, the next step is `superpowers:writing-plans` to produce a step-by-step implementation plan, then `superpowers:subagent-driven-development` or inline execution.
