# Budgeting By — Student Finance Prototype

A static React + TypeScript + CSS prototype for tracking student spending.

## Run locally

1. Install Node.js (18+ recommended).
2. In this folder run `npm install`.
3. Run `npm run dev` and open the local URL printed by Vite.

## Included
- Transaction list with search, month/year/all-time filters, and category filter.
- Clickable transaction detail modal.
- Add transaction form with client-side validation.
- Spending report with illustrative Recharts bar and donut charts.
- Sample initial data in `public/transactions.json`.

## Prototype notes
The app reads the initial sample transactions from the JSON file. New transactions are held in React state only, so they disappear after a page refresh. Report charts use static illustrative values and are not recalculated from the transaction list. No backend or authentication is included.
