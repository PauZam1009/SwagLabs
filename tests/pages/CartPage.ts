import { Page, Locator } from '@playwright/test';
import { HeaderComponent } from '../components/HeaderComponent';

export class CartPage {
    readonly page: Page;
    readonly header: HeaderComponent;
    readonly checkout: Locator;
    readonly continueShoppingBoton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(page);
        this.checkout = page.getByTestId('checkout');
        this.continueShoppingBoton = page.getByTestId('continue-shopping');

    }

    async goToCheckout() {
        await this.checkout.click();
    }

    async clickContinueShopping() {
        await this.continueShoppingBoton.click();
    }

    async removeProduct(productName: string) {
        await this.page.getByTestId(`remove-${productName}`).click();
    }

    getRemoveButton(productName: string){
        return this.page.getByTestId(`remove-${productName}`);
    }

}