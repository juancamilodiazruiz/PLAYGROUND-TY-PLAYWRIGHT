
import type { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly confirmationMessage: Locator;

  constructor(private page: Page) {
    this.confirmationMessage = page.locator('[data-test="complete-header"]');
  }

  async fillCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.page.locator('[data-test="firstName"]').fill(firstName);

    await this.page.locator('[data-test="lastName"]').fill(lastName);

    await this.page.locator('[data-test="postalCode"]').fill(postalCode);

    await this.page.locator('[data-test="continue"]').click();
  }

  async finishPurchase(): Promise<void> {
    await this.page.locator('[data-test="finish"]').click();
  }
}
