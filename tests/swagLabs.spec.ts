import { expect, test } from "@playwright/test";

test('Navegar a Swag Labs y validar el titulo ', async ({ page }) => {
    await test.step('Navegamos a Swag Labs', async () => {
        await page.goto('https://www.saucedemo.com/');
        await expect (page).toHaveTitle('Swag Labs');
    });
    
    
})
