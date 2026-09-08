import { Page, Locator } from '@playwright/test';
import { HeaderComponent } from '../components/HeaderComponent';

export class InventoryPage {
    readonly page: Page;
    readonly header: HeaderComponent;
    readonly sortDropdown: Locator;
    readonly productPrices: Locator;



    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(page);
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
        await this.header.cartLink.click();
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