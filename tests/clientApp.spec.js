
const {test, expect} = require('@playwright/test');

test('Browser Context playwright test', async ({browser}) => {
    // chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    console.log(await page.title());

    // declearing variable
    const userName = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const signIn = page.locator("[value='Login']");

    // invalid login
    await userName.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await signIn.click();
    await page.waitForLoadState('networkidle'); // waiting all network call are successful
    const ItemTitles = await page.locator(".card-body b").allTextContents();
    console.log(ItemTitles);
 
});

test.only('@Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; i++) {
       if (await products.nth(i).locator("b").textContent() === productName) {
          //add to cart
          await products.nth(i).locator("text= Add To Cart").click();
          break;
       }
    }
  
    await page.locator("[routerlink*='cart']").click();
    //await page.pause();
  
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();

    // checkout process
    await page.locator("text=Checkout").click();
  
    await page.locator("[placeholder*='Country']").pressSequentially("ind"); // type slowly 
  
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
       const text = await dropdown.locator("button").nth(i).textContent();
       if (text === " India") {
          await dropdown.locator("button").nth(i).click();
          break;
       }
    }
  
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor(); // waiting for table body to be loaded
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();  // click view button
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
  
  
 

