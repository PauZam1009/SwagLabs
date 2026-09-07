import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
    readonly page: Page;
    readonly itemName: Locator;
    readonly itemDesc: Locator;
    readonly itemPrice: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.itemName = page.getByTestId('inventory-item-name');
        this.itemDesc = page.getByTestId('inventory-item-desc');
        this.itemPrice = page.getByTestId('inventory-item-price');
       
    }
}