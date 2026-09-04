import { test as base } from '@playwright/test';

export const test = base.extend({
    loggedInPage: async ({ page }, use) => {
        await page.goto('');
        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('secret_sauce');
        await page.getByTestId('login-button').click();

        await use(page);
    },
});

export { expect } from '@playwright/test';