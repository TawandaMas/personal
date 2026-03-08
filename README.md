# tawanda.space

Personal site. Astro + Cloudflare Pages + Decap CMS.

## Local dev

```bash
npm install
npm run dev
# → http://localhost:4321
```

## Deploy to Cloudflare Pages

1. Push repo to GitHub
2. Go to Cloudflare Pages → Create project → Connect repo
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add `tawanda.space` as custom domain

## Setting up Decap CMS (WYSIWYG editor)

This only needs to be done once.

### 1. Update the repo name in the config

Open `public/admin/config.yml` and replace:
```
repo: YOUR_GITHUB_USERNAME/tawanda-space
```
with your actual GitHub username/repo.

### 2. Register your site with Decap's auth

Go to https://decapcms.org/docs/github-backend/ and follow the GitHub OAuth app setup.
The `base_url: https://decapcms.org` in config.yml uses their hosted auth proxy, so you don't need Netlify.

Alternatively: add the Netlify Identity widget (already in admin/index.html) and enable Identity in a free Netlify site pointed at the same repo — then Cloudflare Pages serves the site but Netlify handles auth only.

### 3. Edit content

Go to `tawanda.space/admin` → log in with GitHub → edit anything.

Every save commits a markdown file to your repo → Cloudflare rebuilds in ~30s.

## Content structure

```
src/content/
  projects/     ← one .md file per project
  books/        ← one .md file per book
  games/        ← one .md file per game
```

To edit manually: just open the markdown file and change the frontmatter fields. Push. Done.

## Pages

| Route | File |
|---|---|
| `/` | `src/pages/index.astro` |
| `/projects` | `src/pages/projects.astro` |
| `/books` | `src/pages/books.astro` |
| `/games` | `src/pages/games/index.astro` |
| `/games/snake` | `src/pages/games/snake.astro` |
| `/admin` | `public/admin/index.html` |
