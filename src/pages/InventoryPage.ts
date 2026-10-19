
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addTwoDistinctProducts(): Promise<string[]> {
    const products = this.page.locator('[data-test="inventory-item"]');
    await expect(products.first()).toBeVisible();

    const totalProducts = await products.count();

    if (totalProducts < 2) {
      throw new Error('Not enough products in inventory');
    }

    const selectedNames: string[] = [];

    for (
      let index = 0;
      index < totalProducts && selectedNames.length < 2;
      index++
    ) {
      const product = products.nth(index);

      const productName = (
        await product.locator('[data-test="inventory-item-name"]').innerText()
      ).trim();

      if (selectedNames.includes(productName)) {
        continue;
      }

      await product.getByRole('button', {name: 'Add to cart'}).click();

      selectedNames.push(productName);
    }

    if (selectedNames.length !== 2) {
      throw new Error('Could not select two distinct products');
    }

    return selectedNames;
  }

  async openCart(): Promise<void> {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
