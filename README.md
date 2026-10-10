# Crumbella website (test design)

Static site, no build step. Plain HTML, CSS and JavaScript.

## Files

- index.html: page structure and copy
- styles.css: brand colors (top of file) and layout
- script.js: flavors, prices and the box/cart (top of file)
- images/: drop real product photos here

## Using the real cookie photos

Export transparent PNGs from the packaging files and save them as:

- images/choc.png
- images/brookie.png
- images/smores.png
- images/mm.png

The site picks them up automatically. Until then it shows built in illustrations.

## Deploy

1. Push this folder to a GitHub repository.
2. On vercel.com choose Add New, Project, import the repository.
3. Framework preset: Other. Leave build and output settings empty. Deploy.

## Editing

- Prices and flavor text: top of script.js (prices are placeholders)
- Colors: the :root block at the top of styles.css
- Order form is front end only. Connect it to a form service, WhatsApp or a backend when approved.
