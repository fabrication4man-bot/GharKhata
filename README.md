# Household Expense Manager — first MVP

Mobile-first, offline-first Progressive Web App (PWA) for household income/expenses and farming records.

## Included
- Hindi and English UI toggle
- IndexedDB local storage
- Income, expenses, transfers, loans given/taken and repayments
- Multiple local accounts (cash, bank, UPI, cards, other wallets) and currencies
- Family members, categories, budgets, due-date reminders
- Farming/livestock record tags
- Monthly report and category bars
- JSON backup and restore; CSV transaction export
- Installable PWA shell and service worker for offline app files

## Not included in this version
- PIN/app lock
- Automatic multi-phone sync or cloud account
- Live exchange-rate lookup or automatic conversion between currencies
- Scheduled system push notifications; reminders are shown inside the app
- Automatic bank/UPI integration

## Run / deploy
Serve this folder from an HTTPS static host (GitHub Pages works). PWA installation and service worker require HTTPS (or localhost). Opening `index.html` directly may allow local database usage in some browsers but will not provide full PWA installation/offline caching.

## Data safety
Records live in this browser profile on this device. Browser/site data clearing can erase them. Use **Backup & restore → Download backup** regularly. Each device stores its own separate records. JSON restore replaces the current local dataset.

## Accounting notes
- The dashboard balance is the sum of INR-denominated accounts only; foreign-currency account balances are displayed individually and are not mixed into INR totals.
- Transfer records move money between selected accounts without counting as income/expense.
- Loan/repayment tracking is a basic record type in this MVP; advanced loan schedules and receivable/payable ledgers are future work.
