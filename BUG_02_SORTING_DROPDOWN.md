# Title
Bug 02 - Sorting dropdown does not work

## Description
During manual QA on the SauceDemo inventory page, the product sorting dropdown opens just if the Label is clicked (the arrow in dropdown is not working) but does not produce the expected ordering behavior. The selected option does not visibly reorder the items in the inventory list, suggesting the sorting action is not functioning as intended.

## Steps to Reproduce
1. Open the SauceDemo login page.
2. Log in with the user `problem_user`.
3. Navigate to the inventory page.
4. Open the product sorting dropdown cliking the arrow.
5. The options are not showed.
6. Open the product sorting dropdown cliking the label.
7. Select an option such as Name (A to Z) or Price (low to high).
8. Observe the product order on the page.

## Expected Result
- The dropdown should be opened if the user cliks any part of the component or at least using the arrow.
- The selected sort option should reorder the product list accordingly.
- Products should appear in the correct ascending or descending sequence based on the chosen criteria.

## Actual Result
- The dropdown opens(just clicking on label), but the product list does not reorder correctly.
- The page appears to remain in the same visual order despite selecting a sort option.

## Severity
High
