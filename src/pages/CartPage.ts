
import type { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly cartItems: Locator;

  constructor(private page: Page) {
    this.cartItems = page.locator('.cart_item');
  }

  async getProductNames(): Promise<string[]> {
    return this.cartItems.locator('.inventory_item_name').allTextContents();
  }

  async getQuantities(): Promise<string[]> {
    return this.cartItems.locator('.cart_quantity').allTextContents();
  }

  async checkout(): Promise<void> {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
