
import { test, expect } from '@playwright/test';

import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';

test('Should complete purchase with two distinct products @smoke',
  async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const username = process.env.UI_USERNAME;
    const password = process.env.UI_PASSWORD;

    if (!username || !password) {
      throw new Error('Missing UI credentials');
    }

    await test.step('Login as standard user', async () => {
      await loginPage.navigate();

      await loginPage.login(username, password);
      await expect(page).toHaveURL(/inventory\.html/);
    });

    let selectedProducts: string[] = [];

    await test.step('Add two distinct products', async () => {
      selectedProducts = await inventoryPage.addTwoDistinctProducts();
      expect(selectedProducts).toHaveLength(2);
      expect(new Set(selectedProducts).size).toBe(2);
      await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    });

    await test.step('Validate shopping cart', async () => {
      await inventoryPage.openCart();
      await expect(page).toHaveURL(/cart\.html/);
      await expect(cartPage.cartItems).toHaveCount(2);

      const cartProducts = await cartPage.getProductNames();
      expect(cartProducts.map(name => name.trim()).sort())
        .toEqual([...selectedProducts].sort());

      const quantities = await cartPage.getQuantities();
      expect(quantities.map(q => q.trim()))
        .toEqual(['1', '1']);
    });

    await test.step('Complete checkout information', async () => {
      await cartPage.checkout();
      await expect(page).toHaveURL(/checkout-step-one\.html/);

      await checkoutPage.fillCustomerInformation('Juan','QA','12345');
      await expect(page).toHaveURL(/checkout-step-two\.html/);
    });

    await test.step('Complete purchase', async () => {
      await checkoutPage.finishPurchase();
      await expect(page).toHaveURL(/checkout-complete\.html/);
      await expect(checkoutPage.confirmationMessage)
        .toHaveText('Thank you for your order!');
    });
  }
);
