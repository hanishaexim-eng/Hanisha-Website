# Hanisha EXIM – Angular Website

Same export-import merchant trading site, built with **Angular 19** (standalone components, single page).

## Prerequisites

- **Node.js** 18.19+ or 20.11+ (LTS from [nodejs.org](https://nodejs.org))
- **npm** (comes with Node.js)

See **[SETUP.md](../SETUP.md)** in the parent folder for step-by-step installation of Node.js and Angular CLI.

## Quick start (after Node is installed)

1. **Install Angular CLI** (one-time, global):
   ```bash
   npm install -g @angular/cli@19
   ```

2. **Go to this folder**:
   ```bash
   cd "d:\New folder\angular-app"
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the app**:
   ```bash
   ng serve
   ```
   Or: `npm start`

5. Open **http://localhost:4200** in your browser.

## Commands

| Command        | Description              |
|----------------|--------------------------|
| `npm start`    | Run dev server           |
| `ng serve`     | Same as above            |
| `ng build`     | Production build         |
| `ng test`      | Run unit tests           |

## Project structure

- `src/app/app.component.*` – Main page (header, hero, services, products, why us, contact, footer)
- `src/styles.css` – Global styles (same look as the static site)
- `src/index.html` – Shell HTML
- `src/main.ts` – Bootstrap

## Build for production / hosting

```bash
ng build
```

Output is in `dist/hanisha-exim/`. Upload the contents of that folder to your web server (or use Netlify/Vercel/GitHub Pages with the build command `ng build` and output directory `dist/hanisha-exim`).
