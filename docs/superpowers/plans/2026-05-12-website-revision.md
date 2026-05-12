# Maia Tech Website Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the maiatech.ai marketing site to remove EdgeView and Maia Business, rename Maia Personal to "Maia", and add four new products (BuildMyApp, Vilora, AlphaAI, AlphaPoker) with a shared access-request modal for the two private-access products.

**Architecture:** Single Create React App SPA on Vercel. All product detail consolidated on `/products` via anchor sections; the per-product EdgeView route is removed. Two of the five new products (AlphaAI, AlphaPoker) open a shared `AccessRequestModal` component that submits via the existing EmailJS integration to `support@maiatech.ai`.

**Tech Stack:** Create React App 5, React 18, TypeScript 4.9, react-router-dom 6, @emailjs/browser 4, plain per-page CSS files (no Tailwind / CSS modules). Tests via React Testing Library + Jest (already in dependencies).

**Spec reference:** `docs/superpowers/specs/2026-05-12-website-revision-design.md`

**External prerequisite (Tim does this):** Create a new EmailJS template in the EmailJS dashboard with variables `product_name`, `from_name`, `company`, `from_email`, `city`, `reason`, routing to `support@maiatech.ai`. Note the new Template ID and pass it to the implementer. Tasks below use the placeholder string `'TEMPLATE_ID_FROM_TIM'` in code; the implementer must replace it with the real Template ID before the production deploy.

**Important coding rules (from project preferences):**
- No em-dashes (U+2014) anywhere in site content or in commit messages. Use commas, colons, parentheses, or restructure.
- No `Co-Authored-By: Claude` footer on any commit.

---

## File map

**Files created:**
- `src/components/AccessRequestModal.tsx`
- `src/styles/AccessRequestModal.css`
- `src/components/AccessRequestModal.test.tsx`
- `src/setupTests.ts` (CRA convention, currently missing)

**Files modified:**
- `src/App.tsx`
- `src/pages/Home.tsx`
- `src/pages/Products.tsx`
- `src/pages/About.tsx`
- `src/components/Footer.tsx`
- `README.md`
- `EMAILJS_SETUP.md`

**Files inspected (may not need changes):**
- `src/components/Navigation.tsx` (verify it has no product-specific links)

**Files deleted:**
- `src/pages/EdgeViewProduct.tsx`
- `src/styles/EdgeViewProduct.css`
- `public/images/edgeview-icon.jpg`
- `public/images/edgeview-icon.webp`
- `public/images/maia-business-icon.jpg`
- `public/images/maia-business-icon.png`
- `public/images/maia-personal-icon.jpg`
- `public/images/maia-personal-icon.webp`

**Image assets staged in `public/images/`:**
- `maia-icon.jpg` (from `images/personal_assistant_image.jpg`)
- `buildmyapp-icon.png` (from `images/bma-workbench.png`)
- `vilora-icon.png` (from `images/vilora-image.png`)
- `alphaai-icon.jpg` (from `images/AlphaAI-image.jpg`)
- `alphapoker-icon.jpg` (from `images/alphaPoker-image.jpg`)

---

## Task 1: Stage product images in public/images/

**Files:**
- Create: `public/images/maia-icon.jpg`, `public/images/buildmyapp-icon.png`, `public/images/vilora-icon.png`, `public/images/alphaai-icon.jpg`, `public/images/alphapoker-icon.jpg`

- [ ] **Step 1: Copy source images to public/images/ with target filenames**

Run from repo root:

```bash
cp images/personal_assistant_image.jpg public/images/maia-icon.jpg
cp images/bma-workbench.png            public/images/buildmyapp-icon.png
cp images/vilora-image.png             public/images/vilora-icon.png
cp images/AlphaAI-image.jpg            public/images/alphaai-icon.jpg
cp images/alphaPoker-image.jpg         public/images/alphapoker-icon.jpg
```

- [ ] **Step 2: Verify the five files now exist in public/images/**

Run:

```bash
ls -la public/images/maia-icon.jpg public/images/buildmyapp-icon.png public/images/vilora-icon.png public/images/alphaai-icon.jpg public/images/alphapoker-icon.jpg
```

Expected: five lines, each showing a file with non-zero size.

- [ ] **Step 3: Commit**

```bash
git add public/images/maia-icon.jpg public/images/buildmyapp-icon.png public/images/vilora-icon.png public/images/alphaai-icon.jpg public/images/alphapoker-icon.jpg
git commit -m "chore: Stage product card images for website revision"
```

---

## Task 2: Remove EdgeView surface area

This task wipes EdgeView out of the codebase. After this task, `grep -ri "edgeview" src/ public/ README.md` should still find references in `src/pages/Products.tsx`, `src/pages/Home.tsx`, `src/pages/About.tsx`, `src/components/Footer.tsx`, and `README.md` (those are addressed in later tasks). But the dedicated route and its assets are gone.

**Files:**
- Modify: `src/App.tsx`
- Delete: `src/pages/EdgeViewProduct.tsx`, `src/styles/EdgeViewProduct.css`, `public/images/edgeview-icon.jpg`, `public/images/edgeview-icon.webp`

- [ ] **Step 1: Edit `src/App.tsx` to remove EdgeView**

Remove the import line:

```tsx
import EdgeViewProduct from './pages/EdgeViewProduct';
```

Remove the route line:

```tsx
<Route path="/products/edgeview" element={<EdgeViewProduct />} />
```

The resulting routes block should be:

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/products" element={<Products />} />
  <Route path="/team" element={<Team />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

- [ ] **Step 2: Delete the EdgeView files**

Run from repo root:

```bash
rm src/pages/EdgeViewProduct.tsx
rm src/styles/EdgeViewProduct.css
rm public/images/edgeview-icon.jpg
rm public/images/edgeview-icon.webp
```

- [ ] **Step 3: Verify the build still compiles**

Run:

```bash
npm run build
```

Expected: build succeeds (Compiled successfully or Compiled with warnings; no errors).

If TypeScript reports unresolved references to `EdgeViewProduct`, those will be in files modified in later tasks. They will be resolved as those tasks complete. For this task, the build must succeed. If it fails, double-check that `App.tsx` no longer imports `EdgeViewProduct`.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git rm src/pages/EdgeViewProduct.tsx src/styles/EdgeViewProduct.css public/images/edgeview-icon.jpg public/images/edgeview-icon.webp
git commit -m "refactor: Remove EdgeView route, page, styles, and images"
```

---

## Task 3: Build the AccessRequestModal component (TDD)

This task creates the shared modal for AlphaAI and AlphaPoker access requests. The modal submits to EmailJS using the existing service/public key plus a new template ID supplied by Tim (placeholder used in code).

**Files:**
- Create: `src/setupTests.ts` (CRA convention; missing)
- Create: `src/components/AccessRequestModal.tsx`
- Create: `src/styles/AccessRequestModal.css`
- Create: `src/components/AccessRequestModal.test.tsx`

- [ ] **Step 1: Create `src/setupTests.ts`**

CRA picks this up automatically. It is required so the jest-dom matchers (`toBeInTheDocument`, etc.) work.

```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 2: Write the failing test at `src/components/AccessRequestModal.test.tsx`**

```tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import emailjs from '@emailjs/browser';
import AccessRequestModal from './AccessRequestModal';

jest.mock('@emailjs/browser', () => ({
  __esModule: true,
  default: { send: jest.fn() },
}));

const sendMock = (emailjs as unknown as { send: jest.Mock }).send;

describe('AccessRequestModal', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  test('does not render when isOpen is false', () => {
    render(<AccessRequestModal productName="AlphaAI" isOpen={false} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders with product name in heading when isOpen is true', () => {
    render(<AccessRequestModal productName="AlphaAI" isOpen={true} onClose={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /AlphaAI/i })).toBeInTheDocument();
  });

  test('submits filled form via emailjs.send with the expected payload', async () => {
    sendMock.mockResolvedValueOnce({ status: 200, text: 'OK' });
    const onClose = jest.fn();
    render(<AccessRequestModal productName="AlphaPoker" isOpen={true} onClose={onClose} />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Sam Sample' } });
    fireEvent.change(screen.getByLabelText(/company/i), { target: { value: 'Acme Co' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'sam@example.com' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Austin' } });
    fireEvent.change(screen.getByLabelText(/reason/i), { target: { value: 'Want to try it.' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(sendMock).toHaveBeenCalledTimes(1));
    const [serviceId, templateId, payload] = sendMock.mock.calls[0];
    expect(serviceId).toBe('service_swi6amx');
    expect(typeof templateId).toBe('string');
    expect(payload).toEqual(expect.objectContaining({
      product_name: 'AlphaPoker',
      from_name: 'Sam Sample',
      company: 'Acme Co',
      from_email: 'sam@example.com',
      city: 'Austin',
      reason: 'Want to try it.',
    }));
  });

  test('calls onClose when the backdrop is clicked', () => {
    const onClose = jest.fn();
    render(<AccessRequestModal productName="AlphaAI" isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('access-modal-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run:

```bash
CI=true npm test -- --watchAll=false src/components/AccessRequestModal.test.tsx
```

Expected: FAIL with a "Cannot find module './AccessRequestModal'" or equivalent module-resolution error.

- [ ] **Step 4: Implement `src/components/AccessRequestModal.tsx`**

```tsx
import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/AccessRequestModal.css';

export type AccessRequestModalProps = {
  productName: 'AlphaAI' | 'AlphaPoker';
  isOpen: boolean;
  onClose: () => void;
};

const EMAILJS_SERVICE_ID = 'service_swi6amx';
const EMAILJS_PUBLIC_KEY = 'DiJ2_UqcVKRzuKMBE';
const EMAILJS_ACCESS_TEMPLATE_ID = 'TEMPLATE_ID_FROM_TIM';

const initialForm = {
  name: '',
  company: '',
  email: '',
  city: '',
  reason: '',
};

const AccessRequestModal: React.FC<AccessRequestModalProps> = ({ productName, isOpen, onClose }) => {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialForm);
      setSubmitStatus('idle');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ACCESS_TEMPLATE_ID,
        {
          product_name: productName,
          from_name: formData.name,
          company: formData.company,
          from_email: formData.email,
          city: formData.city,
          reason: formData.reason,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSubmitStatus('success');
      setTimeout(onClose, 1500);
    } catch (err) {
      console.error('AccessRequestModal EmailJS error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="access-modal-backdrop"
      data-testid="access-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="access-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="access-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="access-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 id="access-modal-title">Request access to {productName}</h2>
        <p className="access-modal-subtitle">
          Tell us a bit about yourself and we'll be in touch.
        </p>

        <form onSubmit={handleSubmit} className="access-modal-form">
          <div className="form-group">
            <label htmlFor="access-name">Name *</label>
            <input
              type="text"
              id="access-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="access-company">Company *</label>
            <input
              type="text"
              id="access-company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="access-email">Email *</label>
            <input
              type="email"
              id="access-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="access-city">City *</label>
            <input
              type="text"
              id="access-city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="access-reason">Reason for request *</label>
            <textarea
              id="access-reason"
              name="reason"
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          {submitStatus === 'success' && (
            <div className="form-message success">
              Thanks! Your request has been sent. We'll be in touch soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="form-message error">
              Sorry, something went wrong. Please email us directly at <a href="mailto:support@maiatech.ai">support@maiatech.ai</a>.
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccessRequestModal;
```

- [ ] **Step 5: Create the styles at `src/styles/AccessRequestModal.css`**

```css
.access-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 15, 30, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.access-modal {
  position: relative;
  background: white;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}

.access-modal-close {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  color: #555;
}

.access-modal-close:hover {
  color: #000;
}

.access-modal h2 {
  margin: 0 0 0.5rem;
  color: #1a1a2e;
}

.access-modal-subtitle {
  margin: 0 0 1.5rem;
  color: #555;
}

.access-modal-form .form-group {
  margin-bottom: 1rem;
}

.access-modal-form label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1a1a2e;
}

.access-modal-form input,
.access-modal-form textarea {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #d0d0d8;
  border-radius: 6px;
  font: inherit;
  box-sizing: border-box;
}

.access-modal-form input:focus,
.access-modal-form textarea:focus {
  outline: 2px solid #667eea;
  outline-offset: 1px;
  border-color: #667eea;
}

.access-modal-form .btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
}

.access-modal-form .btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.access-modal-form .form-message {
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.access-modal-form .form-message.success {
  background: #e8f5e9;
  color: #1b5e20;
}

.access-modal-form .form-message.error {
  background: #ffebee;
  color: #b71c1c;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run:

```bash
CI=true npm test -- --watchAll=false src/components/AccessRequestModal.test.tsx
```

Expected: PASS, 4 tests.

- [ ] **Step 7: Run the production build to confirm TypeScript compiles**

Run:

```bash
npm run build
```

Expected: Compiled successfully (or with warnings, no errors).

- [ ] **Step 8: Commit**

```bash
git add src/setupTests.ts src/components/AccessRequestModal.tsx src/components/AccessRequestModal.test.tsx src/styles/AccessRequestModal.css
git commit -m "feat: Add AccessRequestModal component for AlphaAI and AlphaPoker"
```

---

## Task 4: Refresh Home.tsx

Replace hero copy, rebuild the product grid with five cards (Maia, BuildMyApp, Vilora, AlphaAI, AlphaPoker), update the stats block.

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Replace the full contents of `src/pages/Home.tsx`**

```tsx
import React, { useState } from 'react';
import '../styles/Home.css';
import AccessRequestModal from '../components/AccessRequestModal';

type AccessProduct = 'AlphaAI' | 'AlphaPoker';

const Home: React.FC = () => {
  const [accessOpen, setAccessOpen] = useState<AccessProduct | null>(null);

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Building Tomorrow's AI-Powered Businesses</h1>
          <p className="tagline">Transforming Industries Through AI Innovation</p>
          <p className="hero-description">
            We're a technology innovation lab that identifies transformative opportunities in the AI landscape and builds category-defining software products, from flagship AI assistants to mediation platforms, marketplaces, and analytical tools.
          </p>
          <div className="hero-buttons">
            <a href="#products" className="btn-primary">Explore Our Products</a>
            <a href="/about" className="btn-secondary">About Our Approach</a>
          </div>
        </div>
      </section>

      <section id="products" className="products-showcase">
        <div className="container">
          <h2>Our Flagship Products</h2>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-icon">
                <img src="/images/maia-icon.jpg" alt="Maia" className="product-icon-img" />
              </div>
              <h3>Maia</h3>
              <p>
                Maia is the flagship AI assistant from Maia AI LLC. Leveraging advanced language models and adaptive learning, Maia transforms how individuals manage tasks, information, and daily workflows.
              </p>
              <span className="product-badge">Available on iOS</span>
            </div>

            <div className="product-card">
              <div className="product-icon">
                <img src="/images/buildmyapp-icon.png" alt="BuildMyApp" className="product-icon-img" />
              </div>
              <h3>BuildMyApp</h3>
              <p>
                A demand-first software marketplace where non-technical buyers commission custom software from independent developers and license completed products with one-click launch.
              </p>
              <a href="https://appmarketplace.dev" className="learn-more" target="_blank" rel="noopener noreferrer">Learn More &rarr;</a>
            </div>

            <div className="product-card">
              <div className="product-icon">
                <img src="/images/vilora-icon.png" alt="Vilora" className="product-icon-img" />
              </div>
              <h3>Vilora</h3>
              <p>
                An AI-powered platform for mediation, collaboration, brainstorming, and decision-making. Use it alone, with another person, or as a group.
              </p>
              <a href="https://vilora.ai" className="learn-more" target="_blank" rel="noopener noreferrer">Learn More &rarr;</a>
            </div>

            <div className="product-card">
              <div className="product-icon">
                <img src="/images/alphaai-icon.jpg" alt="AlphaAI" className="product-icon-img" />
              </div>
              <h3>AlphaAI</h3>
              <p>
                An intelligent investment research platform combining on-demand AI agents for research, analysis, and strategy development with an automated investment discovery system.
              </p>
              <button type="button" className="btn-primary" onClick={() => setAccessOpen('AlphaAI')}>
                Request Access
              </button>
            </div>

            <div className="product-card">
              <div className="product-icon">
                <img src="/images/alphapoker-icon.jpg" alt="AlphaPoker" className="product-icon-img" />
              </div>
              <h3>AlphaPoker</h3>
              <p>
                Practice poker against GTO-style AI opponents in No-Limit Texas Hold'em and Pot-Limit Omaha, with a real-time AI coach providing GTO-based feedback on every decision.
              </p>
              <button type="button" className="btn-primary" onClick={() => setAccessOpen('AlphaPoker')}>
                Request Access
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="company-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <h3>Founded</h3>
              <p>2024</p>
            </div>
            <div className="stat">
              <h3>Experience</h3>
              <p>45+ Years Combined</p>
            </div>
            <div className="stat">
              <h3>Products</h3>
              <p>5 Active Products</p>
            </div>
            <div className="stat">
              <h3>Mission</h3>
              <p>AI-Driven Transformation</p>
            </div>
          </div>
        </div>
      </section>

      <section className="innovation-approach">
        <div className="container">
          <h2>Our Innovation Approach</h2>
          <p className="approach-intro">
            At Maia AI, we don't just build products; we identify market opportunities where AI can create transformative value and develop solutions that define new categories.
          </p>
          <div className="approach-grid">
            <div className="approach-card">
              <h3>Market Discovery</h3>
              <p>We continuously scan industries for opportunities where AI can solve real problems and create significant value.</p>
            </div>
            <div className="approach-card">
              <h3>Rapid Prototyping</h3>
              <p>Our agile development process allows us to quickly validate ideas and iterate based on user feedback.</p>
            </div>
            <div className="approach-card">
              <h3>Strategic Partnerships</h3>
              <p>We collaborate with industry leaders to ensure our solutions integrate seamlessly into existing ecosystems.</p>
            </div>
          </div>
        </div>
      </section>

      <AccessRequestModal
        productName={(accessOpen ?? 'AlphaAI') as AccessProduct}
        isOpen={accessOpen !== null}
        onClose={() => setAccessOpen(null)}
      />
    </>
  );
};

export default Home;
```

Note on the existing copy: the previous Home had a "we're creating the future" line in the hero and used an en-dash (`–`) in the Innovation Approach paragraph. The replacement uses neither em-dash nor en-dash; the "we don't just build products; we identify" semicolon construction replaces the original `–` punctuation.

- [ ] **Step 2: Add minimal CSS for the new elements**

Append to `src/styles/Home.css`:

```css
.product-badge {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.4rem 0.8rem;
  background: #f1f3f5;
  color: #1a1a2e;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.product-card .btn-primary {
  margin-top: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
}

.product-card .btn-primary:hover {
  opacity: 0.95;
}
```

- [ ] **Step 3: Verify the screenshot images render cleanly**

Some of the new card images (`alphaai-icon.jpg`, `alphapoker-icon.jpg`) are landscape product screenshots while the others are roughly square. Inspect existing `.product-icon-img` rules in `src/styles/Home.css`. If `object-fit` is not already set, append the following to that file to ensure all five images crop cleanly in the 140 px tall slot:

```css
.product-icon {
  overflow: hidden;
}

.product-icon-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}
```

Skip this step if `Home.css` already specifies these rules.

- [ ] **Step 4: Verify the build compiles**

Run:

```bash
npm run build
```

Expected: Compiled successfully (no errors).

- [ ] **Step 5: Manual smoke test**

Run:

```bash
npm start
```

Open `http://localhost:3000/` and verify:
- Hero description has no EdgeView reference and no "we're creating the future" phrase.
- Five product cards in this order: Maia, BuildMyApp, Vilora, AlphaAI, AlphaPoker.
- Maia card shows the "Available on iOS" badge and has no link.
- BuildMyApp card "Learn More" link opens `https://appmarketplace.dev` in a new tab.
- Vilora card "Learn More" link opens `https://vilora.ai` in a new tab.
- AlphaAI card "Request Access" button opens the modal with "Request access to AlphaAI" as the heading.
- AlphaPoker card "Request Access" button opens the modal with "Request access to AlphaPoker" as the heading.
- Modal closes on Escape, on backdrop click, and on the X button.
- Stats grid shows "5 Active Products".

Stop the dev server after smoke testing.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Home.tsx src/styles/Home.css
git commit -m "feat: Refresh Home page with five-product lineup"
```

---

## Task 5: Refresh Products.tsx

Replace the three sections (Maia Personal, Maia Business, EdgeView) with five sections (Maia, BuildMyApp, Vilora, AlphaAI, AlphaPoker), each with `id="<slug>"` for anchor linking. Wire CTAs.

**Files:**
- Modify: `src/pages/Products.tsx`

- [ ] **Step 1: Replace the full contents of `src/pages/Products.tsx`**

```tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Products.css';
import AccessRequestModal from '../components/AccessRequestModal';

type AccessProduct = 'AlphaAI' | 'AlphaPoker';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [accessOpen, setAccessOpen] = useState<AccessProduct | null>(null);

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="container">
          <h1>Our Products</h1>
          <p className="lead">Innovative AI Solutions Transforming Industries</p>
        </div>
      </section>

      <section className="product-details">
        <div className="container">

          <div className="product-section" id="maia">
            <div className="product-header">
              <h2>Maia</h2>
              <span className="product-status active">Active</span>
            </div>
            <div className="product-content reverse">
              <div className="product-image">
                <img src="/images/maia-icon.jpg" alt="Maia" className="product-detail-img" />
              </div>
              <div className="product-description">
                <h3>Your AI-powered productivity companion</h3>
                <p>
                  Maia is the flagship AI assistant from Maia AI LLC. Leveraging advanced language models and adaptive learning, Maia transforms how individuals manage tasks, information, and daily workflows.
                </p>
                <h4>Key Features:</h4>
                <ul>
                  <li>Natural-language task management</li>
                  <li>Intelligent information retrieval</li>
                  <li>Personalized recommendations</li>
                  <li>Multi-platform sync</li>
                  <li>Privacy-first design</li>
                </ul>
                <h4>Target Market:</h4>
                <p>
                  Professionals, students, and individuals seeking to enhance their productivity through intelligent AI assistance.
                </p>
                <span className="product-badge">Available on iOS</span>
              </div>
            </div>
          </div>

          <div className="product-section" id="buildmyapp">
            <div className="product-header">
              <h2>BuildMyApp</h2>
              <span className="product-status active">Active (private pilot)</span>
            </div>
            <div className="product-content">
              <div className="product-description">
                <h3>A demand-first software marketplace</h3>
                <p>
                  BuildMyApp is an AI-augmented marketplace where non-technical buyers commission custom software from independent developers and license completed products. Buyers post fixed-price requests, developers commit to build, and BMA operates the runtime so buyers can launch their software with one click. Built-in warranty, AI-mediated collaboration, and lifecycle revenue sharing make it a new model for software commissioning.
                </p>
                <h4>Key Features:</h4>
                <ul>
                  <li>Demand-first marketplace: buyers post fixed-price requests; developers compete on quality, not bidding.</li>
                  <li>30-day warranty on every build; AI-mediated dispute resolution.</li>
                  <li>Web-hosted delivery: one-click "Launch" for non-technical buyers; BMA operates the runtime.</li>
                  <li>Developer Marketplace: developers list completed software (Buy and Buy-out pricing).</li>
                  <li>Lifecycle revenue split: original buyers earn when their commissioned software is re-licensed.</li>
                </ul>
                <h4>Target Market:</h4>
                <p>
                  Small businesses commissioning their first piece of custom software, domain experts inside organizations, and developers looking for validated demand.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => window.open('https://appmarketplace.dev', '_blank', 'noopener,noreferrer')}
                >
                  View Detailed Information
                </button>
              </div>
              <div className="product-image">
                <img src="/images/buildmyapp-icon.png" alt="BuildMyApp" className="product-detail-img" />
              </div>
            </div>
          </div>

          <div className="product-section" id="vilora">
            <div className="product-header">
              <h2>Vilora</h2>
              <span className="product-status active">Active</span>
            </div>
            <div className="product-content reverse">
              <div className="product-image">
                <img src="/images/vilora-icon.png" alt="Vilora" className="product-detail-img" />
              </div>
              <div className="product-description">
                <h3>Strength Through Dialogue</h3>
                <p>
                  Vilora is an AI-powered platform for mediation, collaboration, brainstorming, and decision-making. Whether working through a disagreement, exploring ideas, making a tough decision, or planning something complex, Vilora facilitates the conversation, surfaces what matters, and helps people reach clarity. Use it alone, with another person, or as a group.
                </p>
                <h4>Three Modes:</h4>
                <ul>
                  <li><strong>Group Sessions:</strong> Invite one or more people into a shared conversation. Pick a session purpose (Mediation, Brainstorming, Decision-making, Planning, General discussion) to shape how Vilora shows up.</li>
                  <li><strong>One-on-One with Vilora:</strong> A private conversation. Tone chips let you steer how Vilora engages: quick advice, deep exploration, devil's advocate, action plan, encouragement.</li>
                  <li><strong>The Vilora Council:</strong> Five specialized advisor personas analyze your question in parallel, peer-review each other's blind spots, then deliver a synthesized recommendation with a concrete next step.</li>
                </ul>
                <h4>Key Features:</h4>
                <ul>
                  <li>Eight specialized mediation frameworks (relationships, family, workplace, roommates, neighbors, politics, business partnerships, general disputes).</li>
                  <li>Structured intake: each party shares privately before joint sessions.</li>
                  <li>AI-generated session summaries with concerns, agreements, and next steps.</li>
                  <li>Invite links via email or SMS.</li>
                  <li>Session history with unread counts and quick re-entry.</li>
                </ul>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => window.open('https://vilora.ai', '_blank', 'noopener,noreferrer')}
                >
                  View Detailed Information
                </button>
              </div>
            </div>
          </div>

          <div className="product-section" id="alphaai">
            <div className="product-header">
              <h2>AlphaAI</h2>
              <span className="product-status active">Active (private access)</span>
            </div>
            <div className="product-content">
              <div className="product-description">
                <h3>An intelligent investment research platform</h3>
                <p>
                  AlphaAI helps you find alpha in the markets using AI-powered analysis, automated screening, and strategy development. A dual-purpose platform combining on-demand AI agents for research and analysis with an automated investment discovery system. No coding required; point, click, and discover alpha.
                </p>
                <h4>Three Live AI Agents:</h4>
                <ul>
                  <li><strong>Morning Briefing Agent:</strong> Daily market intelligence powered by real economic data. FRED API indicators (unemployment, inflation, Fed rates), earnings calendar, pre-market conditions, weekly themes, and professional market analysis in minutes.</li>
                  <li><strong>Research Agent:</strong> Comprehensive company and stock analysis. Natural-language queries (e.g., "Analyze Tesla's growth potential vs Ford"), financial fundamentals via yfinance, multi-company comparisons, and AI-powered investment recommendations.</li>
                  <li><strong>Strategy Agent:</strong> Investment strategy development and portfolio optimization. Interactive strategy builder (value, growth, momentum), risk tolerance configuration, and portfolio allocation recommendations.</li>
                </ul>
                <p>
                  <strong>Plus, in development:</strong> Investment Discovery System, automated daily screening using 21 quantitative factors to identify undervalued opportunities.
                </p>
                <button type="button" className="btn-primary" onClick={() => setAccessOpen('AlphaAI')}>
                  Request Access
                </button>
              </div>
              <div className="product-image">
                <img src="/images/alphaai-icon.jpg" alt="AlphaAI" className="product-detail-img" />
              </div>
            </div>
          </div>

          <div className="product-section" id="alphapoker">
            <div className="product-header">
              <h2>AlphaPoker</h2>
              <span className="product-status active">Active (private access)</span>
            </div>
            <div className="product-content reverse">
              <div className="product-image">
                <img src="/images/alphapoker-icon.jpg" alt="AlphaPoker" className="product-detail-img" />
              </div>
              <div className="product-description">
                <h3>Practice poker against GTO-style AI opponents</h3>
                <p>
                  AlphaPoker is a web-based poker training application that helps you sharpen your game against AI opponents using GTO (Game-Theory-Optimal) strategy. Play No-Limit Texas Hold'em and Pot-Limit Omaha in heads-up through 6-max formats, with a real-time AI coach providing GTO-based feedback on every decision.
                </p>
                <h4>Key Features:</h4>
                <ul>
                  <li>Multiple game types: No-Limit Texas Hold'em and Pot-Limit Omaha.</li>
                  <li>Flexible table sizes: heads-up through 6-max.</li>
                  <li>GTO AI opponents: position-aware pre-flop ranges, balanced post-flop strategy.</li>
                  <li>Real-time AI coach with GTO-based analysis.</li>
                  <li>Training feedback comparing your plays to optimal strategy.</li>
                  <li>Hand history tracking and statistics dashboard.</li>
                  <li>Leaderboard for comparing performance.</li>
                  <li>Tournament mode (elimination-style play).</li>
                  <li>Scenario Analyzer with card picker and multi-street coaching.</li>
                  <li>Hand sharing via Text/SMS, WhatsApp, X, Email with OG preview images.</li>
                  <li>Responsive design for desktop, tablet, and mobile.</li>
                </ul>
                <h4>Target Market:</h4>
                <p>
                  Poker players seeking professional-level GTO training and analysis without paying for expensive solver software.
                </p>
                <button type="button" className="btn-primary" onClick={() => setAccessOpen('AlphaPoker')}>
                  Request Access
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="future-products">
        <div className="container">
          <h2>What's Next?</h2>
          <p className="future-intro">
            We're constantly exploring new opportunities where AI can create transformative value. Our innovation lab is always working on the next breakthrough.
          </p>
          <div className="innovation-cta">
            <p>Interested in partnering with us or learning about upcoming products?</p>
            <button
              className="btn-secondary"
              onClick={() => {
                navigate('/contact');
                window.scrollTo(0, 0);
              }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      <AccessRequestModal
        productName={(accessOpen ?? 'AlphaAI') as AccessProduct}
        isOpen={accessOpen !== null}
        onClose={() => setAccessOpen(null)}
      />
    </div>
  );
};

export default Products;
```

- [ ] **Step 2: Add minimal CSS for the badge on the detail page**

Append to `src/styles/Products.css`:

```css
.product-section .product-badge {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.4rem 0.8rem;
  background: #f1f3f5;
  color: #1a1a2e;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}
```

- [ ] **Step 3: Verify the build compiles**

```bash
npm run build
```

Expected: Compiled successfully.

- [ ] **Step 4: Manual smoke test**

Run `npm start` and visit:
- `http://localhost:3000/products`: five sections in the order Maia, BuildMyApp, Vilora, AlphaAI, AlphaPoker.
- `http://localhost:3000/products#maia` scrolls to the Maia section.
- `http://localhost:3000/products#buildmyapp` scrolls to BuildMyApp.
- `http://localhost:3000/products#vilora` scrolls to Vilora.
- `http://localhost:3000/products#alphaai` scrolls to AlphaAI; "Request Access" opens the modal.
- `http://localhost:3000/products#alphapoker` scrolls to AlphaPoker; "Request Access" opens the modal.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Products.tsx src/styles/Products.css
git commit -m "feat: Rebuild Products page with five-product lineup and anchors"
```

---

## Task 6: Update About.tsx

Rewrite the third "Our Story" paragraph; leave everything else alone.

**Files:**
- Modify: `src/pages/About.tsx`

- [ ] **Step 1: Replace the third paragraph**

In `src/pages/About.tsx`, find this block (lines 28-33 in the existing file):

```tsx
            <p>
              Today, we operate as an innovation lab, developing multiple AI-powered solutions 
              across different industries. From innovations in tournament management and AI video 
              coaching with EdgeView to creating intelligent assistants for personal and business use, 
              we're committed to building products that matter.
            </p>
```

Replace it with:

```tsx
            <p>
              Today, we operate as an innovation lab, developing AI-powered products across personal productivity, software marketplaces, mediation, financial research, and consumer applications. We're committed to building products that matter.
            </p>
```

- [ ] **Step 2: Verify the build compiles**

```bash
npm run build
```

Expected: Compiled successfully.

- [ ] **Step 3: Manual smoke test**

Run `npm start` and visit `http://localhost:3000/about`. The "Our Story" section's third paragraph should reflect the new lineup with no EdgeView, Maia Personal, or Maia Business references. Mission, Vision, Core Values, and Technology Partners sections unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/pages/About.tsx
git commit -m "refactor: Update About story paragraph for new product lineup"
```

---

## Task 7: Update Footer.tsx and verify Navigation.tsx

Footer's Products section currently lists EdgeView, Maia Personal, and Maia Business with external URLs. Replace with the five new products as anchor links to `/products`. Navigation currently has no product-specific links; verify and skip if true.

**Files:**
- Modify: `src/components/Footer.tsx`
- Inspect: `src/components/Navigation.tsx`

- [ ] **Step 1: Replace the Products section in `src/components/Footer.tsx`**

Find this block (currently lines 16-23):

```tsx
          <div className="footer-section">
            <h4>Products</h4>
            <ul>
              <li><Link to="/products/edgeview">EdgeView Pickleball</Link></li>
              <li><a href="https://myaiassistant.net/personal-assistant" target="_blank" rel="noopener noreferrer">Maia Personal</a></li>
              <li><a href="https://myaiassistant.net/business-assistant-1" target="_blank" rel="noopener noreferrer">Maia Business</a></li>
            </ul>
          </div>
```

Replace it with:

```tsx
          <div className="footer-section">
            <h4>Products</h4>
            <ul>
              <li><Link to="/products#maia">Maia</Link></li>
              <li><Link to="/products#buildmyapp">BuildMyApp</Link></li>
              <li><Link to="/products#vilora">Vilora</Link></li>
              <li><Link to="/products#alphaai">AlphaAI</Link></li>
              <li><Link to="/products#alphapoker">AlphaPoker</Link></li>
            </ul>
          </div>
```

Leave the other footer sections (Company, Connect, footer-bottom) unchanged.

- [ ] **Step 2: Inspect Navigation.tsx**

Open `src/components/Navigation.tsx`. Confirm the navigation contains only top-level links (Home, About Us, Our Products, Contact) and no product-specific links. The current Navigation.tsx has exactly these top-level links, so no edit is required. If the inspection reveals a product link (e.g., to `/products/edgeview` or `myaiassistant.net`), remove it.

- [ ] **Step 3: Verify the build compiles**

```bash
npm run build
```

Expected: Compiled successfully.

- [ ] **Step 4: Manual smoke test**

Run `npm start` and visit any page. In the footer, the Products section should list the five new product names as links to `/products#<slug>`. Click each and confirm the page scrolls to the right section.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: Update footer product links for new lineup"
```

(If Navigation.tsx required changes, include `src/components/Navigation.tsx` in the `git add` and update the commit message accordingly.)

---

## Task 8: Update README.md and EMAILJS_SETUP.md

**Files:**
- Modify: `README.md`
- Modify: `EMAILJS_SETUP.md`

- [ ] **Step 1: Update the product list in README.md**

Open `README.md` and find the section that lists the flagship products (currently includes EdgeView, Maia Personal Assistant, and Maia Business Assistant). Replace that product list with:

```markdown
## Flagship Products

- **Maia**: Your AI-powered productivity companion (iOS).
- **BuildMyApp**: A demand-first software marketplace where buyers commission custom software and license completed products.
- **Vilora**: An AI-powered platform for mediation, collaboration, brainstorming, and decision-making.
- **AlphaAI**: An intelligent investment research platform combining AI agents with automated discovery (private access).
- **AlphaPoker**: A web-based GTO poker training application with AI opponents and a real-time coach (private access).
```

If the README content is structured differently, edit in place: remove every mention of EdgeView and Maia Business; replace any mention of "Maia Personal Assistant" with "Maia"; introduce the four new products in the prose.

- [ ] **Step 2: Verify the README is em-dash free**

Run:

```bash
grep -n $(printf '\xe2\x80\x94') README.md
```

Expected: no matches. If there are matches, edit them out (use comma, colon, parenthesis, or restructure).

- [ ] **Step 3: Append the access-request template section to EMAILJS_SETUP.md**

Append the following section to the end of `EMAILJS_SETUP.md`:

```markdown
---

## Access Request Template (for AlphaAI and AlphaPoker)

The `AccessRequestModal` component (`src/components/AccessRequestModal.tsx`) submits to a dedicated EmailJS template separate from the contact form. Create this template in the EmailJS dashboard before the live launch.

### Template Variables (must match the `emailjs.send()` payload in code)

- `product_name`: "AlphaAI" or "AlphaPoker"
- `from_name`
- `company`
- `from_email`
- `city`
- `reason`

### Suggested Subject

```
New access request for {{product_name}} from {{from_name}}
```

### Suggested Body

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

### Recipient

The recipient (`support@maiatech.ai`) is configured on the EmailJS template, not in code.

### Wiring the Template ID

After creating the template, copy the Template ID and replace the placeholder constant `EMAILJS_ACCESS_TEMPLATE_ID` in `src/components/AccessRequestModal.tsx` (currently set to `'TEMPLATE_ID_FROM_TIM'`).
```

Note: When pasting this into EMAILJS_SETUP.md, strip any em-dashes that creep in. The above is written with hyphens and colons only.

- [ ] **Step 4: Run grep to confirm no em-dashes in the new docs**

```bash
grep -n $(printf '\xe2\x80\x94') EMAILJS_SETUP.md README.md
```

Expected: no matches.

- [ ] **Step 5: Commit**

```bash
git add README.md EMAILJS_SETUP.md
git commit -m "docs: Update README product list and document access-request EmailJS template"
```

---

## Task 9: Delete unused legacy images

After Tasks 4 and 5, the codebase no longer references `maia-personal-icon.*` or `maia-business-icon.*`. Remove them.

**Files:**
- Delete: `public/images/maia-personal-icon.jpg`, `public/images/maia-personal-icon.webp`, `public/images/maia-business-icon.jpg`, `public/images/maia-business-icon.png`

- [ ] **Step 1: Confirm no references remain**

```bash
grep -rln "maia-personal-icon\|maia-business-icon" src/ public/ README.md
```

Expected: no matches. If there are matches in `src/`, those are bugs from earlier tasks and must be fixed before continuing.

- [ ] **Step 2: Delete the files**

```bash
rm public/images/maia-personal-icon.jpg
rm public/images/maia-personal-icon.webp
rm public/images/maia-business-icon.jpg
rm public/images/maia-business-icon.png
```

- [ ] **Step 3: Verify the build still compiles**

```bash
npm run build
```

Expected: Compiled successfully.

- [ ] **Step 4: Commit**

```bash
git rm public/images/maia-personal-icon.jpg public/images/maia-personal-icon.webp public/images/maia-business-icon.jpg public/images/maia-business-icon.png
git commit -m "chore: Remove unused legacy product icons"
```

---

## Task 10: Final verification

Run the full set of done-condition checks from the spec.

- [ ] **Step 1: Confirm EmailJS template ID has been replaced**

Open `src/components/AccessRequestModal.tsx` and confirm the constant `EMAILJS_ACCESS_TEMPLATE_ID` is **NOT** still the placeholder `'TEMPLATE_ID_FROM_TIM'`. If it is, stop and request the real template ID from Tim before proceeding to production deploy. (Local smoke testing of the form-render and validation behavior can still proceed with the placeholder, but live submissions will fail.)

- [ ] **Step 2: Grep done-conditions**

```bash
grep -ri "edgeview" src/ public/ README.md
grep -ri "Maia Business" src/ README.md
grep -ri "Maia Personal Assistant" src/
grep -ri "myaiassistant.net" src/
```

Expected: all four commands return zero matches.

- [ ] **Step 3: Em-dash scan on all touched files**

```bash
grep -rn $(printf '\xe2\x80\x94') src/ README.md EMAILJS_SETUP.md
```

Expected: no matches.

- [ ] **Step 4: Full production build**

```bash
npm run build
```

Expected: Compiled successfully, no errors.

- [ ] **Step 5: Run the test suite**

```bash
CI=true npm test -- --watchAll=false
```

Expected: AccessRequestModal tests pass (4 tests). No other tests exist in the repo and no failures.

- [ ] **Step 6: Manual smoke test of the production build**

```bash
npm install -g serve   # only if not already installed
serve -s build
```

Visit `http://localhost:3000` (or whatever port `serve` reports) and walk:
- Home: hero copy correct, five cards in order, all CTAs behave per spec, stats show "5 Active Products".
- /about: third paragraph reflects new lineup, no removed-product references.
- /products: five anchor sections in order, deep-link `/products#vilora` etc. scrolls correctly.
- /contact: still works (no changes intended).
- Footer: five product links to anchors.
- AccessRequestModal: opens from AlphaAI and AlphaPoker cards on both Home and Products; submit succeeds against the configured EmailJS template (verify in the EmailJS dashboard).

Stop `serve` after smoke testing.

- [ ] **Step 7: Push to main (deploys to Vercel)**

```bash
git push origin main
```

- [ ] **Step 8: Verify production deploy**

Open `https://www.maiatech.ai`. Repeat the manual smoke test against production. If anything is broken, revert the relevant commit(s) and push again; Vercel redeploys the previous main automatically.

---

## Out of scope (per spec §10)

- New pages, features, or routes beyond what is listed above.
- CSS framework changes or refactors of the styling system.
- Modifications to the existing Contact.tsx form or its EmailJS configuration.
- Per-product detail routes.
- Visual cohesion enforcement across the five card images (the mix of photography, digital art, and product screenshots is intentional).

## Notes for the implementer

- Every commit message uses conventional commit prefix (feat/fix/refactor/chore/docs) matching the repo's existing style. Never include a `Co-Authored-By: Claude` footer.
- The repo deploys automatically from `main` to Vercel. Reverting the merge commit is the rollback path.
- If `npm run build` or `npm test` fails at any task, do not proceed to the next task until the failure is understood and fixed.
