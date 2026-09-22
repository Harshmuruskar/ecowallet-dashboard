# EcoWallet Dashboard

Build a full-screen financial dashboard called "EcoWallet" with a dark green theme (#0D1F1A background, #1A3A2E cards, #00C96B accent). The layout has 3 columns: a fixed left sidebar (220px), a main content area, and a right panel (220px).

LEFT SIDEBAR:

- Logo: leaf icon + "EcoWallet / Dashboard" text in green

- User avatar, name "Sarah", badge "Premium User"

- Nav links: Dashboard (active, green bg), Overview, Wallet, Transactions, Analytics, Settings, Help

- Bottom: "CO₂ Saved: 18.2 Kg" chip in dark green, "+ Add Transaction" green CTA button, Sign Out link

MAIN CONTENT (top to bottom):

1. Header: "Welcome Sarah!" h1, date filter dropdown ("Last 30 Days"), bell and share icon buttons — all in white on dark bg

2. Two-column row:

   LEFT — "Total Balance" card: shows $12,480.00 in large white text, "+2.45% This Month" in green, a sparkline line chart (green line on dark bg, slight upward trend), "+ Add" and "^ Send" buttons

   RIGHT — "Recent Transactions" card: list of 5 rows each with icon, merchant name, time, amount (red for expenses, green for income), and CO₂ badge. Items: Starbucks -$5.20 / 2.1kg, Ride Share -$12.80 / 1.2kg, Whole Foods -$54.20 / 3.5kg, Monthly Salary +$2,400.00 / 0kg, Electricity Bill -$62.00

3. Four stat cards in a row: Total Income $6,200 (green), Total Expense $3,350 (red/orange), Available Budget $1,500 (white), Savings Rate 45% (green)

4. "Carbon Footprint Insights" card (full width): tab switcher (This Month / This Week / This Year), left side = line chart of "Monthly CO₂ Output" with tooltip showing "Aug 14 – 42 Kg CO₂e", right side = donut chart "Carbon Breakdown" with 3 segments: Transportation (teal), Home (green), Other (amber). Below: "Total CO₂ Reduced → 18.4% — Your Carbon Footprint Is Improving Steadily. Keep Up The Good Work!"

RIGHT PANEL (top to bottom):

1. "My Carbon Goals" card: circular progress ring at 60% in green, "of monthly target", "Edit Goal" link

2. "Eco-Tips" card: 3 tip rows with amber bulb icon + tip text

3. "Offset Your Impact" card: 2 image cards (Amazon Reforestation Project, GreenWind Energy Project), each with a "Support" green button

4. "Your Eco Impact" card: two stat chips — "Trees Planted: 15" and "CO₂ Offset: 500 kg" with green leaf icons

DESIGN RULES:

- Dark theme only: bg #0D1F1A, cards #1A3A2E, accent #00C96B, text white/#A8C4B0

- Rounded corners (12–16px) on all cards

- Use Recharts for the sparkline and CO₂ line chart, and a CSS/SVG donut for carbon breakdown

- Use Tailwind for layout and spacing

- No light mode toggle needed

- Use placeholder images from picsum.photos for the offset project cards

- Make it fully responsive but optimized for 1440px desktopBuild a full-screen financial dashboard called "EcoWallet" with a dark green theme (#0D1F1A background, #1A3A2E cards, #00C96B accent). The layout has 3 columns: a fixed left sidebar (220px), a main content area, and a right panel (220px).

LEFT SIDEBAR:

- Logo: leaf icon + "EcoWallet / Dashboard" text in green

- User avatar, name "Sarah", badge "Premium User"

- Nav links: Dashboard (active, green bg), Overview, Wallet, Transactions, Analytics, Settings, Help

- Bottom: "CO₂ Saved: 18.2 Kg" chip in dark green, "+ Add Transaction" green CTA button, Sign Out link

MAIN CONTENT (top to bottom):

1. Header: "Welcome Sarah!" h1, date filter dropdown ("Last 30 Days"), bell and share icon buttons — all in white on dark bg

2. Two-column row:

   LEFT — "Total Balance" card: shows $12,480.00 in large white text, "+2.45% This Month" in green, a sparkline line chart (green line on dark bg, slight upward trend), "+ Add" and "^ Send" buttons

   RIGHT — "Recent Transactions" card: list of 5 rows each with icon, merchant name, time, amount (red for expenses, green for income), and CO₂ badge. Items: Starbucks -$5.20 / 2.1kg, Ride Share -$12.80 / 1.2kg, Whole Foods -$54.20 / 3.5kg, Monthly Salary +$2,400.00 / 0kg, Electricity Bill -$62.00

3. Four stat cards in a row: Total Income $6,200 (green), Total Expense $3,350 (red/orange), Available Budget $1,500 (white), Savings Rate 45% (green)

4. "Carbon Footprint Insights" card (full width): tab switcher (This Month / This Week / This Year), left side = line chart of "Monthly CO₂ Output" with tooltip showing "Aug 14 – 42 Kg CO₂e", right side = donut chart "Carbon Breakdown" with 3 segments: Transportation (teal), Home (green), Other (amber). Below: "Total CO₂ Reduced → 18.4% — Your Carbon Footprint Is Improving Steadily. Keep Up The Good Work!"

RIGHT PANEL (top to bottom):

1. "My Carbon Goals" card: circular progress ring at 60% in green, "of monthly target", "Edit Goal" link

2. "Eco-Tips" card: 3 tip rows with amber bulb icon + tip text

3. "Offset Your Impact" card: 2 image cards (Amazon Reforestation Project, GreenWind Energy Project), each with a "Support" green button

4. "Your Eco Impact" card: two stat chips — "Trees Planted: 15" and "CO₂ Offset: 500 kg" with green leaf icons

DESIGN RULES:

- Dark theme only: bg #0D1F1A, cards #1A3A2E, accent #00C96B, text white/#A8C4B0

- Rounded corners (12–16px) on all cards

- Use Recharts for the sparkline and CO₂ line chart, and a CSS/SVG donut for carbon breakdown

- Use Tailwind for layout and spacing

- No light mode toggle needed

- Use placeholder images from picsum.photos for the offset project cards

- Make it fully responsive but optimized for 1440px desktop also create login page 
use react for it not ts

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1d0a19c1-b73c-4879-baa1-46ca559ae470).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
