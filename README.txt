GharKhata requested fixes — handoff package
============================================

Important: This package is NOT a ready-to-upload complete app. GitHub write operations are blocked for the connected integration (403 Resource not accessible by integration), so no live commit was made.

Confirmed source issues in the currently fetched app.js:
- dashboard category mapping sends Milk/Dairy to groceries.
- Utilities list contains Mobile recharge while Recharge card also maps to utilities.
- Hospital and Medicine are separate cards; both route to the health subcategory list.
- grocery renderer has Hindi-only labels/placeholders and only 50 rows.
- existing save action is manual; no auto-save listener exists.
- grocery download is CSV and print, not a designed PDF.

Required final behavior:
1. Milk/Dairy dedicated dairy subcategory list.
2. Utilities and Mobile Recharge separate.
3. Merge Hospital + Medicine into one Hospital & Medical category; retain medicines as a subcategory.
4. Hindi/English localization of grocery controls, units and labels.
5. Auto-save on input/change with debounce and month-specific storage.
6. Add row button; start with 50 rows, add 51+ on demand.
7. PDF table with compact columns, only populated rows, monthly title and total.
8. Footer brand GharKhata and QR code. Website URL is https://fabrication4man-bot.github.io/GharKhata/
9. APK link is currently a planned GitHub Releases URL and must be tested after the APK release exists.
10. Test month switching, restore from backup, PDF Hindi rendering, QR scanning, mobile viewport and data persistence before deployment.

Do not upload the .txt replacement snippets as app.js or index.html. They are integration notes only.
