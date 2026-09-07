import { expect, test } from './fixtures';
import { CartPage } from './pages/CartPage';
import { InventoryPage } from './pages/InventoryPage';
import { LoginPage } from './pages/LoginPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

test('Navegar a Swag Labs y validar el titulo ', async ({ page }) => {
    await test.step('Navegamos a Swag Labs', async () => {
        await page.goto('');

        await expect(page).toHaveTitle('Swag Labs');
    }); 


})
test('Iniciar sesión con credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Login válido', async () => {
        await page.goto('');
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

});

test('Login con credenciales inválidas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Login inválido', async () => {
        await page.goto('');
        await loginPage.login('Paula_zam', 'secret_saucess');


        await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username and password do not match any user in this service');
        
    });
})

test('Agregar productos al carrito', async ({ loggedInPage }) => {
        const inventoryPage = new InventoryPage(loggedInPage);
    
        await inventoryPage.addProductToCart('sauce-labs-backpack');
        await inventoryPage.addProductToCart('sauce-labs-onesie');

        await expect(inventoryPage.cartBadge).toHaveText('2');
    
})

test('Realizar compra completa', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    const checkoutPage = new CheckoutPage(loggedInPage);
    
    await test.step('Agregar 3 productos al carrito ', async () => {
        await inventoryPage.addProductToCart('sauce-labs-backpack');
        await inventoryPage.addProductToCart('sauce-labs-fleece-jacket');
        await inventoryPage.addProductToCart('sauce-labs-onesie');

        await expect(inventoryPage.cartBadge).toHaveText('3');

    });

    await test.step('Ir al Checkout', async () => {

        await inventoryPage.goToCart();
        await cartPage.goToCheckout();
    });
    
    await test.step('Llenamos el formulario de envío', async () => {

        await checkoutPage.fillCheckoutInfo('Paula', 'Zambrano', '08205');
        
    });
    await test.step('Finalizar compra', async () => {
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();

        await expect (checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
    })
    
})

test('Dar click en el producto Verificar detalle y precio', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const productDetailPage = new ProductDetailPage(loggedInPage);

    await test.step('Descripción y Precio correcto', async () => {
        await inventoryPage.goToProductDetail(0);

        await expect(productDetailPage.itemDesc).toContainText('bike at night');
        await expect(productDetailPage.itemPrice).toHaveText('$9.99');
    })
    
})

test('Ordenar productos en el inventario de menor a mayor costo', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);

    await test.step('Seleccionamos la opcíon de menor a mayor precio', async () => {
        await inventoryPage.sortProductsBy('lohi');

        await expect (inventoryPage.productPrices.first()).toHaveText('$7.99');
        await expect (inventoryPage.productPrices.last()).toHaveText('$49.99');
    })
    
})


