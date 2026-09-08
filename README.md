# SwagLabs - Automatización de pruebas E2E

Suite de pruebas automatizadas end-to-end para [SauceDemo](https://www.saucedemo.com/), construida con **Playwright** y **TypeScript**, aplicando el patrón **Page Object Model (POM)**.

## 🛠️ Stack técnico

- **Playwright** — framework de automatización E2E
- **TypeScript**
- Patrón **Page Object Model (POM)** + **Component Objects** (header reutilizable entre pantallas)

## 📁 Estructura del proyecto

```
tests/
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── ProductDetailPage.ts
├── components/
│   └── HeaderComponent.ts     # Elementos compartidos entre pantallas (carrito, menú)
├── fixtures.ts                # Fixture de sesión logueada (loggedInPage)
└── swagLabs.spec.ts
```

## ✅ Cobertura de pruebas

- Login (credenciales válidas e inválidas)
- Navegación e inventario (orden de productos por precio)
- Agregar y remover productos al carrito (desde inventario y desde el carrito)
- Flujo de compra completo (checkout de 3 pasos)
- Detalle de producto
- Botón "Continue Shopping"
- Menú de navegación: *All Items*, *Logout*
- **Caso de bug documentado**: *Reset App State* no revierte visualmente el botón "Remove" a "Add to cart" tras reiniciar el estado del carrito

## 🚀 Cómo correr los tests

```bash
npm install
npx playwright test
```

Para ver el reporte HTML luego de la ejecución:

```bash
npx playwright show-report
```

## 🧩 Sobre el diseño

- Cada Page Object representa una pantalla real de la aplicación (una URL = una clase).
- Los elementos compartidos entre varias pantallas (carrito, menú de navegación) se extrajeron a un `HeaderComponent`, evitando duplicación de locators.
- Los tests están organizados en `test.step()` para que el reporte de ejecución se lea como una narrativa clara del flujo de negocio.
