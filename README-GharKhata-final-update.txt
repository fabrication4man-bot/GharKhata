GharKhata final update package (patch files, not a full replacement app)

Files:
- final-update.js: load this AFTER app.js. Adds Back navigation, collapsible optional fields, short grocery units, OCR photo import and text/CSV import.
- grocery-import-html-snippet.html: add the grocery import controls inside the existing #grocery section and add <script src="final-update.js"></script> after app.js.
- style-additions.css: append its contents to the END of style.css.
- sw-final.js: use its contents as sw.js so the new script is included in the updated offline cache.

Important:
1. Do NOT replace your existing app.js, full index.html, or data stores with this patch package.
2. Back up the current repo and app data first.
3. The account selector only shows accounts already created in Accounts; the family selector only shows members created in Family.
4. OCR uses Tesseract.js from a CDN, so the first photo read needs internet. Always review OCR results before saving.
5. A new Android APK is needed only after the website/PWA changes have been tested.
