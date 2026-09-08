import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly openMenuButton: Locator;
    readonly allItemsLink: Locator;
    readonly logoutLink: Locator;
    readonly resetAppState: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link'); 
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' })
        this.allItemsLink = page.getByTestId('inventory-sidebar-link');
        this.logoutLink = page.getByTestId('logout-sidebar-link');
        this.resetAppState = page.getByTestId('reset-sidebar-link');

    }

    async openMenu(){
        await this.openMenuButton.click();
    }
    
    async clickAllItems(){
        await this.allItemsLink.click();
    }

    async clickLogout(){
        await this.logoutLink.click();
    }

    async clickResetAppState(){
        await this.resetAppState.click();
    }

}
