const { test, expect } = require('@playwright/test');

test('@smoke Calendar validations', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice');
  // await page.goto('https://google.com');
  // await page.goBack(); // go back tab click
  // await page.goForward(); // go forward tab click
  await expect(page.locator('#displayed-text')).toBeVisible(); // should be visible
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).toBeHidden();
});

// handling popup java based pop up
test('@smoke Popup handling and hover over', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice');

  //there is a special event listner to handle java popup, this method should not be in sequental order
  //page.on('dialog', dialog => dialog.accept()); // this is to accept the pop up
  page.on('dialog', (dialog) => dialog.dismiss()); // this is to reject the pop up
  page.pause();
  await page.locator('#confirmbtn').click();

  // hover over
  await page.locator('#mousehover').click();
});
test('iframe handling', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice');
  const framePage = page.frameLocator('#courses-iframe'); // locate first iframe locater
  await framePage.locator("a[href*='lifetime-access']:visible").click(); // work with framePage
  const textCheck = await framePage.locator('.text h2').textContent(); // get the text: Join 13,522 Happy Subscribers!
  console.log(textCheck.split(' ')[1]); // print only number from array of word
});

test('screenshot and Visual comparision', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice');
  await expect(page.locator('#displayed-text')).toBeVisible(); // should be visible
  // take screeshot only for locater
  await page
    .locator('#displayed-text')
    .screenshot({ path: 'locaterScreenshot.png' });

  await page.locator('#hide-textbox').click();
  // take screenshot of whole page after clicking
  await page.screenshot({ path: 'screenshot.png' });
  await expect(page.locator('#displayed-text')).toBeHidden();
});
