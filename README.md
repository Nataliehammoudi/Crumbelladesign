# Crumbella website (test design)

Static site, no build step. Plain HTML, CSS and JavaScript.

## Files

- index.html: page structure and copy
- styles.css: brand colors (top of file) and layout
- script.js: flavors, prices and the box (top of file)
- images/: put real photos here

## Image placeholders

Every picture spot shows a labelled placeholder. Add a file with the matching name to the images folder and it replaces the placeholder automatically:

- hero-1.png, hero-2.png, hero-3.png, hero-4.png (the four photos around the banner), classic.png
- choc.png, brookie.png, smores.png, mm.png
- delivery.jpg, pickup.jpg, stores.jpg
- catering.png, giftcard.png

## Deploy

1. Push this folder to a GitHub repository.
2. On vercel.com choose Add New, Project, import the repository.
3. Framework preset: Other. Leave build and output settings empty. Deploy.

## Notes

- Prices, the free delivery line and the email address are placeholders.
- The order form and newsletter are front end only. Connect them to a backend or WhatsApp when approved.
