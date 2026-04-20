# DesignTwo — Self-Serve Menu Setup

Your menu is powered by a **Google Sheet**. Edit the sheet, refresh the page,
done. No developer needed.

## The Sheet

<https://docs.google.com/spreadsheets/d/1kJGk67jEl23U-w7A-vc5ywkipkAlmkz9Atu_zAjP-oU/edit?gid=1906695727>

The sheet ID and tab gid are wired into `src/lib/sheetMenu.ts`. You don't
need to change any code to edit the menu — just edit cells in the sheet.

---

## One-time setup

### 1. Columns

Row 1 must have exactly these headers, in this order:

```
Category | SubCategory | Name | Description | Variant | Price | DietType | Tags | Available
```

If the sheet is blank, seed it by **File → Import** and uploading
`menu.csv` from this repo (choose **Replace current sheet**).

**Section order in the nav:** Tabs follow the order each `Category` name
**first appears** in the sheet — **except** **BAR**, **HOT BEVERAGES**, and
**COLD BEVERAGES**, which the app **always moves to the end** of the strip
(so the sheet can keep spirits at the top for editing without the live site
jumping back to BAR first).

### 2. Share publicly (view-only)

**This is the most important step** — without it the website can't read
the sheet.

1. Top-right of the sheet → **Share**
2. Under **General access**, change from *Restricted* to
   **Anyone with the link**
3. Keep the role as **Viewer**
4. Click **Done**

Customers loading the website only ever see the rendered menu — never the
sheet itself. Only people you explicitly invite as editors can edit.

### 3. Test it

Run the site (`npm run dev`) and open it. You should see the menu. If the
menu looks identical to the hardcoded fallback even after edits, the sheet
probably isn't shared publicly — redo step 2.

---

## How to edit the menu (day-to-day)

Open the Google Sheet, change any cell, hit Enter, refresh the website.
That's it.

### Column reference

| Column         | What it does                                                                         |
| -------------- | ------------------------------------------------------------------------------------ |
| `Category`     | The big section heading (e.g. `BAR`, `HOT BEVERAGES`, `WRAPS`).                      |
| `SubCategory`  | Optional grouping inside a category (e.g. `Rum`, `Vodka`). Leave blank if unused.    |
| `Name`         | The dish / drink name shown in the item row.                                         |
| `Description`  | Short line under the name. Leave blank if none.                                      |
| `Variant`      | Leave blank for simple items. Fill it when the same item has multiple prices (e.g. `Veg`, `Chicken`). Use the **same `Name`** on each variant row and they'll merge into one display row with combined prices. |
| `Price`        | Number only — a `₹` will be added automatically. You may also paste a pre-formatted price like `₹179 / ₹199` directly. |
| `DietType`     | `veg`, `non-veg`, or `both` (lowercase). Controls the colour dot shown in the UI.    |
| `Tags`         | Comma- or `\|`-separated labels (e.g. `popular`, `seafood`, `chef`). Leave blank for none. |
| `Available`    | `TRUE` to show, `FALSE` to hide without deleting. Blank also counts as available.    |

### Common edits

- **Change a price:** edit `Price`, refresh.
- **Temporarily hide an item (e.g. 86'd):** set `Available` to `FALSE`.
- **Add a new dish:** add a row, fill in at least `Category`, `Name`, `Price`, `DietType`, and `Available=TRUE`.
- **Add a new section:** use a new value in `Category` — it'll automatically get its own section.
- **Add a sub-section (e.g. a new spirit type under BAR):** use a new value in `SubCategory` within that category.
- **Reorder sections:** reorder the rows. Categories appear in first-seen order.

### Variants — worked example

To show **"Tikka Wrap ₹279 (Paneer) / ₹299 (Chicken)"**, add two rows:

| Category | SubCategory | Name       | Variant | Price | DietType |
| -------- | ----------- | ---------- | ------- | ----- | -------- |
| WRAPS    |             | Tikka Wrap | Paneer  | 279   | veg      |
| WRAPS    |             | Tikka Wrap | Chicken | 299   | non-veg  |

The site merges them into a single row: `Paneer / Chicken` with
`₹279 / ₹299` and a `both` dot.

### Don't do

- Don't rename, remove, or reorder the header row.
- Don't delete the sheet or change "Anyone with the link — Viewer" sharing.
- Don't type `True ` / `Yes` / `1` with a trailing space — stick to `TRUE` / `FALSE`.

---

## Freshness

Google caches sheet responses for about a minute. The site also caches
in React Query for 60 seconds. If a change doesn't show up immediately,
wait ~60 seconds and hard-refresh (`Ctrl+F5` on Windows, `Cmd+Shift+R` on Mac).

---

## Fallback behaviour

If the sheet is unreachable (offline, deleted, un-shared), the site
automatically falls back to the hardcoded menu in
`src/data/menuData.ts`, so diners **never** see a broken page.

To refresh that baked-in fallback from the current sheet contents, export
the sheet as CSV, save it over `menu.csv`, and re-run your build pipeline.

---

## For the developer

- **Fetcher:** `src/lib/sheetMenu.ts` (CSV export + parse + variant merge)
- **Hook:** `src/hooks/useMenuCategories.ts` (React Query, 60s staleTime, fallback on error)
- **Consumed in:** `src/pages/Index.tsx`
- **To point at a different sheet:** edit `SHEET_CONFIG` at the top of `src/lib/sheetMenu.ts`.
