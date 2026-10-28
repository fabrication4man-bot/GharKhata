GharKhata final website update files

Upload the three files into the ROOT of the GitHub repository:
1. index.html — replace the existing index.html
2. final-update.js — add this new file
3. sw.js — replace the existing sw.js

The index.html in this ZIP loads final-update.js after app.js and includes the grocery photo/file import controls.
The update script adds Back-button section navigation, collapsible optional transaction details, shorter grocery units (g, kg, l, ml, PCS, Packet, Rupees), photo OCR and text/CSV import, and a more compact A4 grocery PDF with bigger/bolder text.
The Service Worker cache version is increased to gharkhata-v5 and includes final-update.js.

Important:
- Back up your existing app files and export your app data before replacing files.
- Upload all three files to the same folder where app.js and manifest.webmanifest are located.
- Photo OCR needs internet on first use and results must be checked before saving.
- Test the website first. An already-installed APK may need to be rebuilt to include these website changes.
