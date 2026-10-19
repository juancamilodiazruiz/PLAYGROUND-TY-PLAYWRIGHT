# Title
Bug 01 - Inventory data inconsistency

## Description
During manual QA on the SauceDemo inventory page, product cards showed inconsistent metadata. Some titles, prices, and product images do not match the expected product information displayed for the correct item, which creates confusion and reduces trust in the storefront data.

## Steps to Reproduce
1. Open the SauceDemo login page.
2. Log in with the user `problem_user`.
3. Navigate to the inventory page.
4. Review the visible product cards.
5. Navigate into one card.
5. Compare the title, image, and price for each product with the data on the card.

## Expected Result
- Each product card should show the correct product title as is into the page.
- Each product image should correspond to the correct product into the prodict page.
- Each product price should match the expected value for that product into the product page.
- The product grid should present a consistent and trustworthy view of inventory.

## Actual Result
- Product cards display inconsistent metadata with the corresponding product page.
- Some images do not correspond to the correct product titles.
- Prices appear mismatched or inconsistent across the grid.

## Severity
High
