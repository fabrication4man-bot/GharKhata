# Security Policy — GharKhata

## Scope

GharKhata is a local-first household finance app. Records are stored in the user's browser/device using IndexedDB; this repository does not contain users' household records.

## Important security rule

Do not place passwords, API tokens, private keys, signing keys, database credentials, or other secrets in this repository or in client-side JavaScript.

## Reporting a vulnerability

If you discover a security problem in GharKhata, please report it privately to the repository owner rather than publishing sensitive details in a public issue.

## Data protection

The application is designed to keep household records on the user's device. Users should create and keep a JSON backup in a separate location because clearing browser/app storage, uninstalling the app, or losing the device can remove local records.

## Source-code visibility

The application is delivered as a browser/PWA application. Client-side HTML/CSS/JavaScript cannot be treated as secret, even when the source repository is private, because the browser must receive the code to run the application. Security must therefore not depend on hiding client-side code.
