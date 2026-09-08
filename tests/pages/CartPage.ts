import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkout: Locator;
    readonly continueShoppingBoton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.checkout = page.getByTestId('checkout');
        this.continueShoppingBoton = page.getByTestId('continue-shopping');

    }

    async goToCheckout() {
        await this.checkout.click();
    }

    async clickContinueShopping(){
        await this.continueShoppingBoton.click();
    }

    async removeProduct(productName: string) {
    await this.page.getByTestId(`remove-${productName}`).click();
}
}