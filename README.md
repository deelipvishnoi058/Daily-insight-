# The Daily Insight — 100% Free GitHub Edition

## Free architecture
- Hosting: GitHub Pages
- News data: `news.json`
- Admin/editor: `admin.html`
- Backup: JSON download/restore
- Images: public image URLs for now
- No Supabase, no paid server, no API key required

## Mobile workflow
1. Open `admin.html` on your phone.
2. Add/edit your news locally.
3. Download `news.json` backup.
4. Open the GitHub repository.
5. Open `news.json` → Edit.
6. Replace its contents with the downloaded JSON.
7. Commit changes.
8. GitHub Pages updates the website.

## Important limitation
This is a genuinely free static setup. The browser admin cannot securely write directly into GitHub without a backend/token. Never put a GitHub Personal Access Token in browser JavaScript.

## Next free upgrade
A GitHub Actions workflow can validate/format the news file automatically after each commit. For a true online multi-device admin dashboard, a backend/database is eventually required.
