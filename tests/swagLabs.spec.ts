import { expect, test } from './fixtures';

test('Navegar a Swag Labs y validar el titulo ', async ({ page }) => {
    await test.step('Navegamos a Swag Labs', async () => {
        await page.goto('');

        await expect(page).toHaveTitle('Swag Labs');
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

test('Login con credenciales inválidas', async ({ page }) => {
    await test.step('Login inválido', async () => {
        await page.goto('');
        await page.getByTestId('username').fill('paula_user');
        await page.getByTestId('password').fill('secret_sauces');
        await page.getByTestId('login-button').click();

        await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username and password do not match any user in this service');

    });
})

test('Agregar productos al carrito', async ({ loggedInPage }) => {
    
        await loggedInPage.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await loggedInPage.getByTestId('add-to-cart-sauce-labs-onesie').click();

        await expect(loggedInPage.getByTestId('shopping-cart-badge')).toHaveText('2');
    
    
})
