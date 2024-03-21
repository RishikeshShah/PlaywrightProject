const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager'); // importing pom manager
const dataSet = JSON.parse(
  JSON.stringify(require('../utils/placeorderTestData.json'))
);

test('Client App login', async ({ page }) => {
  const poManager = new POManager(page);
  //js file- Login js, DashboardPage
  // const username = 'anshika@gmail.com';
  // const password = 'Iamking@000';
  // const productName = 'ZARA COAT 3';
  // const products = page.locator('.card-body');
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(dataSet.username, dataSet.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(dataSet.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(dataSet.productName);
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect('ind', 'India');
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
