import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly sortDropdown: Locator;
    readonly productPrices: Locator;



    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link'); 
        this.sortDropdown = page.getByTestId('product-sort-container');
        this.productPrices = page.getByTestId('inventory-item-price');
        
    }

    async addProductToCart(productName: string) {
        await this.page.getByTestId(`add-to-cart-${productName}`).click();
    }

    getAddProductToCartButton(productName: string){
        return this.page.getByTestId(`add-to-cart-${productName}`);
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async sortProductsBy(sortValue: string) {
        await this.sortDropdown.selectOption(sortValue);
    }

    async goToProductDetail(itemIndex: number) {
        await this.page.getByTestId(`item-${itemIndex}-title-link`).click();
    }

    async removeProduct(productName: string) {
        await this.page.getByTestId(`remove-${productName}`).click();
    }

    getRemoveButton(productName: string){
        return this.page.getByTestId(`remove-${productName}`);
    }

}