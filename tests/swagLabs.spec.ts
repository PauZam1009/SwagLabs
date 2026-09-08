import { expect, test } from './fixtures';
import { CartPage } from './pages/CartPage';
import { InventoryPage } from './pages/InventoryPage';
import { LoginPage } from './pages/LoginPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { HeaderComponent } from './components/HeaderComponent';

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

    await expect(inventoryPage.header.cartBadge).toHaveText('2');

})

test('Realizar compra completa', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    const checkoutPage = new CheckoutPage(loggedInPage);

    await test.step('Agregar 3 productos al carrito ', async () => {
        await inventoryPage.addProductToCart('sauce-labs-backpack');
        await inventoryPage.addProductToCart('sauce-labs-fleece-jacket');
        await inventoryPage.addProductToCart('sauce-labs-onesie');

        await expect(inventoryPage.header.cartBadge).toHaveText('3');

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

        await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
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

        await expect(inventoryPage.productPrices.first()).toHaveText('$7.99');
        await expect(inventoryPage.productPrices.last()).toHaveText('$49.99');
    })

})

test('El botón de Continue Shopping funciona', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    await test.step('Se agrega un producto al carrito', async () => {
        await inventoryPage.addProductToCart('sauce-labs-backpack');

        await expect(inventoryPage.header.cartBadge).toHaveText('1');
    })

    await test.step('Entramos al carrito y continuamos comprando', async () => {

        await inventoryPage.goToCart();
        await cartPage.clickContinueShopping();

        await expect(inventoryPage.header.cartBadge).toHaveText('1');
        await expect(loggedInPage).toHaveURL("https://www.saucedemo.com/inventory.html");

    })

})

test('Funcionamiento botón Remove desde inventory', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);

    await test.step('Agregamos un producto y confirmamos que quedó en el carrito', async () => {
        await inventoryPage.addProductToCart('sauce-labs-onesie');

        await expect(inventoryPage.header.cartBadge).toHaveText('1');
        await expect(inventoryPage.getRemoveButton('sauce-labs-onesie')).toBeVisible();

    })

    await test.step('Removemos el producto y confirmamos que se sacó del carrito', async () => {
        await inventoryPage.removeProduct('sauce-labs-onesie');

        await expect(inventoryPage.header.cartBadge).not.toBeVisible();
        await expect(inventoryPage.getAddProductToCartButton('sauce-labs-onesie')).toBeVisible();
    })

})

test('Funcionamiento botón Remove desde cartlink', async ({ loggedInPage }) => {
    const cartPage = new CartPage(loggedInPage);
    const inventoryPage = new InventoryPage(loggedInPage);

    await test.step('Agregamos dos productos y damos click en el carrito', async () => {
        await inventoryPage.addProductToCart('sauce-labs-fleece-jacket');
        await inventoryPage.addProductToCart('sauce-labs-bolt-t-shirt');
        await inventoryPage.goToCart();

        await expect(loggedInPage).toHaveURL("https://www.saucedemo.com/cart.html");
        await expect(cartPage.header.cartBadge).toHaveText('2');
        await expect(cartPage.getRemoveButton('sauce-labs-fleece-jacket')).toBeVisible();
        await expect(cartPage.getRemoveButton('sauce-labs-bolt-t-shirt')).toBeVisible();
    })

    await test.step('Removemos un producto y el carrito baja a 1', async () => {
        await cartPage.removeProduct('sauce-labs-fleece-jacket');

        await expect(cartPage.header.cartBadge).toHaveText('1');
    })

    await test.step('Removemos los dos productos y el contador del carrito desaparece', async () => {
        await cartPage.removeProduct('sauce-labs-bolt-t-shirt');

        await expect(cartPage.header.cartBadge).not.toBeVisible();
    })

})

test('Funcionamiento Menú Hamburguesa opción All Items', async ({ loggedInPage }) => {
    const cartPage = new CartPage(loggedInPage);
    const inventoryPage = new InventoryPage(loggedInPage);

    await test.step('Agregamos productos al carrito y damos click', async () => {
        await inventoryPage.addProductToCart('sauce-labs-fleece-jacket');
        await inventoryPage.addProductToCart('sauce-labs-bolt-t-shirt');
        await inventoryPage.goToCart();

        await expect(loggedInPage).toHaveURL("https://www.saucedemo.com/cart.html");
    })

    await test.step('Abrimos el menu Hamburguesa y seleccionamos All Items', async () => {
        await cartPage.header.openMenu();
        await cartPage.header.clickAllItems();

        await expect(loggedInPage).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(cartPage.header.cartBadge).toHaveText('2');
    })
})

test('Funcionamiento Menú Hamburguesa opción Logout', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);

    await test.step('En la página de inventory, abrir menú hamburguesa y dar click en Logout', async () => {
        await inventoryPage.header.openMenu();
        await inventoryPage.header.clickLogout();

        await expect(loggedInPage).toHaveTitle('Swag Labs');
        await expect(loggedInPage).toHaveURL("https://www.saucedemo.com/");

    })

})







