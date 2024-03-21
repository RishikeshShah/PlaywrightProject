const {test, expect} = require('@playwright/test');
const { link } = require('fs');



test('First playwright test', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    
    // getByLabel method
    await page.getByLabel("Check me out if you Love IceCreams!").click(); // tag name is label
    await page.getByLabel("Employed").check(); // alternative of click for radio buttons
    await page.getByLabel("Gender").selectOption("Female"); // selectOption is only applicable for select tag in dropdown menu

    //getByPlaceholder
    await page.getByPlaceholder("password").fill("abc123"); // applicable only for textbox which has attribute placeholder

    // getByRole()
    await page.getByRole("button", {value: 'Submit'}).click(); // universal locator application for various webelement, second argument can be any attribute

    // getByText()
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); // applicable for text on webpage

    await page.getByRole('link', {name: "Shop"}).click();
    
    // finding element from list without loop, here we add Blackberry to cart
    await page.locator("app-card").filter({hasText: 'Blackberry'}).getByRole('button').click();









 
   
});