# Sabana Asmi S — Portfolio

Personal portfolio for **Sabana Asmi S**, Android engineer and Technical Project Manager.

Built with **React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · Lucide**.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:5173.

| Command             | What it does                              |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload      |
| `npm run build`     | Type-check, then build to `dist/`         |
| `npm run preview`   | Serve the production build locally        |
| `npm run typecheck` | Type-check only                           |

## Editing content

All copy lives in **`src/data/content.ts`**: profile, hero, about, skills, projects, experience, leadership and achievements. Components only read from it, so you can update text without touching layout.

- **Resume download:** replace `public/Sabana-Asmi-Resume.pdf` (keep the same name, or update `profile.resumeUrl`).
- **Add a job:** add an entry to `experience` (latest first).
- **Add a project:** add an entry to `projects`. Case-study phone screens are illustrative concepts and are labelled as such on the page. Don't replace them with images unless they are real screenshots you're allowed to publish.

## Healthcare app screenshots

The **Healthcare Technology – Mobile Application Portfolio** section shows three apps: HealthBasix Parent, HBX Nurse Care Station and Wellness. Until you add real screenshots, each phone shows an illustrative concept screen labelled *Illustrative concept — not a production screenshot*.

To show your real screens:

1. Save the screenshots (PNG, JPG or WebP, ideally about 1080×2280 portrait) into `public/screenshots/`, e.g. `parent-home.webp`, `carestation-home.webp`, `wellness-home.webp`.
2. In `src/data/content.ts`, list them in that app's `screenshots` array:

   ```ts
   screenshots: ['/screenshots/parent-home.webp', '/screenshots/parent-report.webp'],
   ```

The card then shows the real images with an *App screenshot* label. With more than one, small dots appear for switching between them.

The banner image is `public/images/healthcare-apps-showcase.webp`. It is captioned as a concept showcase. Replace it the same way if you make a version from real screenshots.

## Contact form

The form validates name, email and message on the client.

- **Default (no setup):** on submit, it opens the visitor's email app with the message pre-filled and addressed to you.
- **Direct delivery (optional):** create a free form at [formspree.io](https://formspree.io), then set the endpoint as an environment variable:

  ```bash
  VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-id
  ```

  Put it in `.env` locally (see `.env.example`), and in your host's environment variables when you deploy. Messages are then sent with `fetch` and a success message is shown.

## Deploy

### Vercel
1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository. Vite is detected automatically (`vercel.json` is included).
3. Optional: add `VITE_FORMSPREE_ENDPOINT` under **Settings → Environment Variables**.
4. Deploy.

Or from the terminal: `npm i -g vercel`, then `vercel`.

### Netlify
1. Push to GitHub, then **Add new site → Import an existing project** in Netlify. `netlify.toml` sets the build command (`npm run build`) and publish folder (`dist`).
2. Optional: add `VITE_FORMSPREE_ENDPOINT` under **Site configuration → Environment variables**.

Or drag and drop the `dist/` folder (after `npm run build`) onto https://app.netlify.com/drop.

### GitHub Pages
A workflow (`.github/workflows/deploy.yml`) builds and deploys the site on every push to `main`.

1. Create an empty repository on GitHub, e.g. `sabana-asmi-portfolio`.
2. Push this folder to it:

   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/sabana-asmi-portfolio.git
   git push -u origin main
   ```

3. On GitHub, open the repository's **Settings → Pages**, and under **Build and deployment → Source**, choose **GitHub Actions**.
4. Open the **Actions** tab. Re-run the "Deploy to GitHub Pages" workflow if the first run happened before step 3. When it turns green, the site is live at `https://YOUR-USERNAME.github.io/sabana-asmi-portfolio/`.

The workflow sets the sub-path automatically from the repository name. If you name the repository `YOUR-USERNAME.github.io`, the site is served from the root instead: `https://YOUR-USERNAME.github.io/`.

Optional contact-form delivery: add a repository secret named `VITE_FORMSPREE_ENDPOINT` under **Settings → Secrets and variables → Actions**.

To update the site later, commit and `git push`. It redeploys automatically.

### After deploying
Add your live URL to `index.html` as `<link rel="canonical" href="…">` and `<meta property="og:url" content="…">` for better SEO.

## Accessibility & performance

- Semantic sections with labelled headings, skip link, visible focus rings, ARIA on tabs, accordions, menu and form.
- All motion respects `prefers-reduced-motion`. The cursor glow is only on mouse or trackpad devices.
- The only images are the SVG favicon and the WebP showcase banner (lazy-loaded with fixed dimensions). Phone mockups are pure HTML/CSS.

## Project structure

```
src/
  data/content.ts         All portfolio copy (single source of truth)
  components/
    ui.tsx                Brand mark, Reveal, SectionHeading, PhoneFrame, icons
    Chrome.tsx            Nav, scroll progress, cursor glow, back-to-top
    Hero.tsx              Hero with animated background, phone and code card
    About.tsx             Career story and working principles
    Expertise.tsx         Interactive technology constellation + skill categories
    Projects.tsx          Tabbed case studies with illustrative mockups
    Experience.tsx        Scroll-animated career timeline
    Leadership.tsx        Leadership, delivery lifecycle and achievements
    Contact.tsx           Contact links, validated form, footer
  hooks/useActiveSection.ts
public/
  Sabana-Asmi-Resume.pdf  Downloadable resume
  favicon.svg, robots.txt
```
