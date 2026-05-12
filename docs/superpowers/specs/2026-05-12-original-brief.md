# Maia Tech Website Revision

*Created: 2026-05-12*
*Owner: Tim Gray (Maia AI LLC)*
*Repo: github.com/Ox805/maia_website*
*Local path: /home/tim/dev/maia_website*
*Deploy: Vercel (auto-deploys from `main` branch; default Create-React-App build)*
*Live URL: www.maiatech.ai*

---

## Why this work matters

This is a marketing-site revision triggered by a product-portfolio refresh in Maia AI LLC:

1. **EdgeView Sports is on hold** and may not resurface. Coming off the site.
2. **Maia Business Assistant** is being retired from the site lineup.
3. **Maia Personal Assistant is being renamed to just "Maia"** to reflect its position as the flagship Maia AI LLC product.
4. **BuildMyApp is shipping under Maia AI LLC** and will start processing real Stripe payments. Maia AI LLC's new Stripe account uses `MAIA AI` as the public operating name, and BMA charges will appear as `MAIA AI*BUILDMYAPP` on buyers' credit card statements. A buyer who sees that charge and googles `maiatech.ai` to verify the merchant must find a clear reference to BuildMyApp on the site. If they don't, they may file a chargeback assuming fraud.
5. **Vilora**, **AlphaAI**, and **AlphaPoker** are being added as flagship products.

**This work is gating** the BMA Stripe live launch. The Stripe risk team also looks at the operating company's website during account verification and during Connect platform approval, so a site that doesn't list BuildMyApp risks delays in those reviews.

---

## What this is

Maia AI LLC operates a marketing website at maiatech.ai. The site is a Create React App SPA, hosted on Vercel, that describes the company and its products.

**Current product lineup on the site (before this revision):**
- Maia Personal Assistant
- Maia Business Assistant
- EdgeView Sports Platform

**Target product lineup (after this revision):**
1. **Maia** *(rename from Maia Personal Assistant)*
2. **BuildMyApp** *(add)*
3. **Vilora** *(add)*
4. **AlphaAI** *(add)*
5. **AlphaPoker (GTO Trainer)** *(add)*

This revision removes two products, renames one, and adds four, for a net product count of five.

### Brand-family note

The new lineup has an emerging brand-family pattern worth designing around:
- **Maia** is the flagship AI assistant and the Maia AI LLC company namesake
- **BuildMyApp** and **Vilora** are standalone product brands (their own identities)
- **AlphaAI** and **AlphaPoker** form an "Alpha" sub-family (likely a future Maia AI LLC brand line for analytical/training tools)

The website should be consistent with whatever framing Tim wants. Surface this as a brainstorming question (see strategic decision #6).

---

## Tech stack you'll be working with

- **Framework:** Create React App, React 18, TypeScript
- **Routing:** `react-router-dom` v6 (routes defined in `src/App.tsx`)
- **Styling:** Plain CSS files per page in `src/styles/` (no Tailwind, no CSS modules, no styled-components). Follow the existing per-page CSS pattern when adding a new page.
- **Email (contact form):** `@emailjs/browser`; already set up, don't touch unless asked.
- **Build:** `npm run build` outputs to `build/`
- **Dev server:** `npm start` serves `http://localhost:3000`
- **Deploy:** Vercel auto-deploys on push to `main`. No `vercel.json`; default CRA detection works.

---

## File map

| File | Current content | What to change |
|---|---|---|
| `src/App.tsx` | Defines all routes including `/products/edgeview` | Remove EdgeView route + import. Optionally add detail-page routes for the new products (mirroring the EdgeView pattern), or leave them as anchor-linked sections on `/products`. See strategic decision #1. |
| `src/pages/Home.tsx` | Hero copy references EdgeView; three product cards (Maia Personal, Maia Business, EdgeView) | Update hero copy. Rebuild product cards section: rename Maia Personal Assistant card to "Maia", remove Maia Business + EdgeView, add BuildMyApp + Vilora + AlphaAI + AlphaPoker. Update stat "3 Active Innovations" to 5 (or drop; see strategic decision #2). |
| `src/pages/About.tsx` | References EdgeView in company story | Refresh: remove EdgeView + Maia Business references; add brief mentions of the new products where contextually fitting, or just trim. |
| `src/pages/Products.tsx` | Three product detail sections (Maia Personal, Maia Business, EdgeView) | Rename "Maia Personal Assistant" section to "Maia". Remove Maia Business + EdgeView sections. Add BuildMyApp, Vilora, AlphaAI, AlphaPoker sections following the same structure. |
| `src/pages/EdgeViewProduct.tsx` | Standalone EdgeView product page | **Delete** the entire file. |
| `src/styles/EdgeViewProduct.css` | EdgeView page styles | **Delete** the entire file. |
| `src/components/Footer.tsx` | Footer with EdgeView link | Replace product links: rename Maia Personal to Maia, drop EdgeView + Maia Business, add BuildMyApp + Vilora + AlphaAI + AlphaPoker. |
| `src/components/Navigation.tsx` | Top nav | Check for any explicit product links; align with the new lineup if present. |
| `public/images/edgeview-icon.jpg` | EdgeView product icon | Delete (cleanup). |
| `public/images/maia-business-icon.jpg` | Maia Business icon | Delete (cleanup). |
| `public/images/maia-personal-icon.jpg` | Maia Personal Assistant icon | Either rename to `maia-icon.jpg` or leave (alt text + display name update is enough). |
| `public/images/` | Product icons | Need new icons for BuildMyApp, Vilora, AlphaAI, AlphaPoker (see strategic decision #4). |
| `README.md` | Mentions EdgeView + Maia Business + Maia Personal as flagship products | Update product list: remove EdgeView and Maia Business, rename Maia Personal → Maia, add BuildMyApp + Vilora + AlphaAI + AlphaPoker. |

---

## Product copy (drawn from each project's README, ready to use)

The implementing agent should still confirm each block with Tim before publishing, but these are derived from each product's actual README and should be close to launch-ready. Source READMEs:

- Maia: `/home/tim/dev/maia_code/` (also referenced on `myaiassistant.net`)
- BMA: `/home/tim/dev/build_my_app/developer-guides/BMA_FEATURES.md` and `BuildMyApp.md`
- Vilora: `/home/tim/dev/vilora/README.md`
- AlphaAI: `/home/tim/dev/investing/README.md`
- AlphaPoker: `/home/tim/dev/poker_app/README.md`

### 1. Maia (rename from "Maia Personal Assistant")

**Tagline:** Your AI-powered productivity companion.

**Card description:** Maia is the flagship AI assistant from Maia AI LLC. Leveraging advanced language models and adaptive learning, Maia transforms how individuals manage tasks, information, and daily workflows. Natural-language task management, intelligent information retrieval, personalized recommendations, multi-platform sync, and privacy-first design.

**External link:** `https://myaiassistant.net/personal-assistant` (existing; keep)
**Status:** Active

### 2. BuildMyApp

**Tagline:** A demand-first software marketplace.

**Card description:** BuildMyApp is an AI-augmented marketplace where non-technical buyers commission custom software from independent developers and license completed products. Buyers post fixed-price requests, developers commit to build, and BMA operates the runtime so buyers can launch their software with one click. Built-in warranty, AI-mediated collaboration, and lifecycle revenue sharing make it a new model for software commissioning.

**Key features:**
- Demand-first marketplace: buyers post requests with fixed prices; developers compete on quality, not bidding
- 30-day warranty on every build; AI-mediated dispute resolution
- Web-hosted delivery: one-click "Launch" for non-technical buyers; BMA operates the runtime
- Developer Marketplace: developers list completed software (Buy and Buy-out pricing)
- Lifecycle revenue split: original buyers earn when their commissioned software is re-licensed

**Target market:** Small businesses commissioning their first piece of custom software, domain experts inside organizations, and developers looking for validated demand.

**External link:** [Tim to provide BMA marketing URL or just link to `/products` anchor for now]
**Status:** Active (private pilot for web-hosted delivery)

### 3. Vilora

**Tagline:** Strength Through Dialogue.

**Card description:** Vilora is an AI-powered platform for mediation, collaboration, brainstorming, and decision-making. Whether working through a disagreement, exploring ideas, making a tough decision, or planning something complex, Vilora facilitates the conversation, surfaces what matters, and helps people reach clarity. Use it alone, with another person, or as a group.

**Three modes:**
- **Group Sessions**: Invite one or more people into a shared conversation. Pick a session purpose (Mediation, Brainstorming, Decision-making, Planning, General discussion) to shape how Vilora shows up. Each participant can share their perspective privately during intake.
- **One-on-One with Vilora**: A private conversation. Tone chips let you steer how Vilora engages: quick advice, deep exploration, devil's advocate, action plan, encouragement.
- **The Vilora Council**: Five specialized advisor personas analyze your question in parallel, peer-review each other's blind spots, then deliver a synthesized recommendation with a concrete next step.

**Key features:**
- Session purposes for mediation, brainstorming, decision-making, planning, and general discussion
- Tone chips to steer Vilora's style per session
- 8 specialized mediation frameworks (relationships, family, workplace, roommates, neighbors, politics, business partnerships, general disputes)
- Structured intake: each party shares privately before joint sessions
- AI-generated session summaries with concerns, agreements, and next steps
- Invite links via email or SMS
- Session history with unread counts and quick re-entry

**External link:** [Tim to provide Vilora marketing URL; `/home/tim/dev/vilora-website` exists locally: verify if it's live]
**Status:** Active

### 4. AlphaAI

**Tagline:** An intelligent investment research platform.

**Card description:** AlphaAI helps you find alpha in the markets using AI-powered analysis, automated screening, and strategy development. A dual-purpose platform combining on-demand AI agents for research and analysis with an automated investment discovery system. No coding required; point, click, and discover alpha.

**Three live AI agents:**
- **Morning Briefing Agent**: Daily market intelligence powered by real economic data: FRED API indicators (unemployment, inflation, Fed rates), earnings calendar, pre-market conditions, weekly themes, professional market analysis in minutes
- **Research Agent**: Comprehensive company and stock analysis: natural-language queries ("Analyze Tesla's growth potential vs Ford"), financial fundamentals via yfinance, multi-company comparisons, AI-powered investment recommendations
- **Strategy Agent**: Investment strategy development and portfolio optimization: interactive strategy builder (value, growth, momentum), risk tolerance configuration, portfolio allocation recommendations

**Plus** (in development): **Investment Discovery System**: automated daily screening using 21 quantitative factors to identify undervalued opportunities.

**External link:** `https://ai-investing-production.up.railway.app/` (existing live URL)
**Status:** Active (3 agents live; discovery system in development)

### 5. AlphaPoker (GTO Trainer)

**Tagline:** Practice poker against GTO-style AI opponents.

**Card description:** AlphaPoker is a web-based poker training application that helps you sharpen your game against AI opponents using GTO (Game-Theory-Optimal) strategy. Play No-Limit Texas Hold'em and Pot-Limit Omaha in heads-up through 6-max formats, with a real-time AI coach providing GTO-based feedback on every decision.

**Key features:**
- Multiple game types: No-Limit Texas Hold'em and Pot-Limit Omaha
- Flexible table sizes: heads-up through 6-max
- GTO AI opponents: position-aware pre-flop ranges, balanced post-flop strategy
- Real-time AI coach with GTO-based analysis
- Training feedback comparing your plays to optimal strategy
- Hand history tracking and statistics dashboard
- Leaderboard for comparing performance
- Tournament mode (elimination-style play)
- Scenario Analyzer with card picker and multi-street coaching
- Hand sharing via Text/SMS, WhatsApp, X, Email with OG preview images
- Responsive design for desktop, tablet, and mobile

**Target market:** Poker players seeking professional-level GTO training and analysis without paying for expensive solver software.

**External link:** [Tim to provide AlphaPoker marketing URL or production URL]
**Status:** Active

---

## Strategic decisions for the implementing agent to surface

Don't decide these alone; ask Tim:

1. **Standalone product detail pages?** EdgeView had a dedicated route (`/products/edgeview`). Mirror that pattern for any of the new products (BMA, Vilora, AlphaAI, AlphaPoker), OR keep all detail on the consolidated `/products` page using anchor links. With 5 products, the consolidated approach probably reads better; per-product pages might fit better when Tim wants deep marketing pages for individual products later.
2. **Stat block on Home.tsx ("3 Active Innovations").** New product count is 5. Bump to 5, or drop the count display entirely?
3. **External link targets.** Several products link out: Maia goes to `myaiassistant.net`, AlphaAI goes to `ai-investing-production.up.railway.app`. Confirm canonical URLs for BMA, Vilora, and AlphaPoker. If a product doesn't have its own marketing site yet, link to the product's app URL or just to a `/products#anchor` on maiatech.ai.
4. **Product icons.** Need new icons for BuildMyApp, Vilora, AlphaAI, AlphaPoker (probably JPG or PNG at the same resolution as the existing icons, around 512x512). Either Tim provides them or this is a separate design task before the website revision can fully ship. The implementer can use placeholder images while waiting.
5. **About.tsx narrative.** The current About page leans on EdgeView as a case study. With five products now in scope, the page might want a different narrative structure: maybe one paragraph per product family (Maia + the Alpha series), or a "what we build" summary with the product grid.
6. **Brand-family framing.** Worth a 10-minute conversation: should the website lean into the Alpha-* family (AlphaAI, AlphaPoker, future Alpha-products) as a sub-brand of Maia AI LLC, or treat each product as a flat peer of Maia? Affects product card ordering, About-page narrative, and the company's positioning long-term.

---

## Workflow guidance

This is a creative/UX revision, not a feature implementation. Suggested approach:

1. Invoke `superpowers:brainstorming` first to align with Tim on the strategic decisions above (especially #1, #4, #5, #6) before touching code.
2. Brainstorming produces a spec at `docs/superpowers/specs/YYYY-MM-DD-website-revision-design.md`. This is a new repo for that workflow; create the `docs/superpowers/specs/` directory tree if it doesn't exist, or put the spec at the repo root if simpler.
3. After spec approval, use `superpowers:writing-plans` to break the revision into tasks.
4. Execute via `superpowers:subagent-driven-development` (each page is mostly independent, well-suited to subagents) or inline for a project this size.
5. Most efficient with a local dev server running (`npm start`) so you can verify each page in the browser before committing.

---

## How to know you're done

- `EdgeView` text appears nowhere in the repo: `grep -ri "edgeview" src/ public/ README.md` returns nothing
- `Maia Business` text appears nowhere on Home/Products/Footer/About: `grep -ri "Maia Business" src/ README.md` returns nothing (or only historical context if appropriate)
- `Maia Personal Assistant` is renamed to just `Maia` everywhere on the site
- `/products/edgeview` route is removed from `App.tsx`
- BuildMyApp, Vilora, AlphaAI, AlphaPoker each appear on Home (product card), Products (product section), and Footer
- Production build succeeds: `npm run build` exits clean
- Manual smoke test: every page renders correctly in the browser, no broken links
- Vercel auto-deploy from `main` succeeds (push and check the Vercel dashboard)

---

## Important rules (carried from Tim's broader preferences)

- **NO em dashes** in any content. Use commas, parentheses, colons, or restructure the sentence. (Note: some of the product copy above came from READMEs that contain em dashes; the implementer must strip them when porting copy to the website.)
- **NO Claude attribution** in commit messages. "Co-Authored-By: Claude" footers are rejected by some commit hooks.
- Don't add new pages or features beyond the scope above. This is a focused content revision, not a redesign.
- Use the existing per-page CSS pattern. Don't introduce a CSS framework or refactor the styling system.

---

## Resume instructions

To start this session, open `/home/tim/dev/maia_website` and say:

> "Let's revise the maiatech.ai website per `REVISION_PROMPT.md`."

The session should begin by invoking `superpowers:brainstorming` to resolve the strategic decisions above before any code changes.
