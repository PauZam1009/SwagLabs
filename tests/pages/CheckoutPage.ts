import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueBoton: Locator;
    readonly finishBoton: Locator;
    readonly confirmationMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.continueBoton = page.getByTestId('continue');
        this.finishBoton = page.getByTestId('finish');
        this.confirmationMessage = page.getByTestId('complete-header');

    }


    async fillCheckoutInfo(firstNameInput: string, lastNameInput: string, postalCodeInput: string) {

        await this.firstNameInput.fill(firstNameInput);
        await this.lastNameInput.fill(lastNameInput);
        await this.postalCodeInput.fill(postalCodeInput);

    }

    async clickContinue() {
        await this.continueBoton.click();
    }

    async clickFinish(){
        await this.finishBoton.click();
    }


}
