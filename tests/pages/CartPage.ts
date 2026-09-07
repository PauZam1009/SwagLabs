import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkout: Locator;


    constructor(page: Page) {
        this.page = page;
        this.checkout = page.getByTestId('checkout');

    }

    async goToCheckout() {
        await this.checkout.click();
    }
}