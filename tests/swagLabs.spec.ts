import { expect, test } from "@playwright/test";

test('Navegar a Swag Labs y validar el titulo ', async ({ page }) => {
    await test.step('Navegamos a Swag Labs', async () => {
        await page.goto('');
        await expect (page).toHaveTitle('Swag Labs');
    });
    
    
})
test('Iniciar sesión con credenciales válidas', async ({ page }) => {
    await test.step('Login válido', async () => {
        await page.goto('');
        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('secret_sauce');
        await page.getByTestId('login-button').click();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });
    
});
