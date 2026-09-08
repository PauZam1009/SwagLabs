import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link'); 

    }
}
