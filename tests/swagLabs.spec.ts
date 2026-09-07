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

test('Realizar compra completa', async ({ loggedInPage }) => {
    await test.step('Agregar 3 productos al carrito ', async () => {
        await loggedInPage.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await loggedInPage.getByTestId('add-to-cart-sauce-labs-fleece-jacket').click();
        await loggedInPage.getByTestId('add-to-cart-sauce-labs-onesie').click();

        await expect(loggedInPage.getByTestId('shopping-cart-badge')).toHaveText('3');

    });

    await test.step('Damos click en el carrito y hacemos checkout', async () => {
        await loggedInPage.getByTestId('shopping-cart-link').click();
        await loggedInPage.getByTestId('checkout').click();
    });
    
    await test.step('Llenamos el formulario de envío', async () => {
        await loggedInPage.getByTestId('firstName').fill('Paula');
        await loggedInPage.getByTestId('lastName').fill('Zambrano');
        await loggedInPage.getByTestId('postalCode').fill('08205');
        
    });
    await test.step('Finalizar compra', async () => {
        await loggedInPage.getByTestId('continue').click();
        await loggedInPage.getByTestId('finish').click();

        await expect (loggedInPage.getByTestId('complete-header')).toHaveText('Thank you for your order!');
    })
    
    
    
})

